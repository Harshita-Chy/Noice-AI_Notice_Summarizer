const axios = require("axios");
const cheerio = require("cheerio");
const connectDB = require("../config/db");
const Notice = require("../models/Notice");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

const downloadPdf = require("../utils/downloadPdf");
const analyzePdf = require("../services/analyzePdf");

const URL = "https://www.imsnsit.org/imsnsit/notifications.php";

async function scrapeNotices() {
    try {

        await connectDB();
        console.log("MongoDB Connected");

        const response = await axios.get(URL);
        console.log("Page Downloaded");

        const $ = cheerio.load(response.data);

        const notices = [];

        $("tr").each((i, row) => {
            const date = $(row)
                .find("td")
                .first()
                .text()
                .trim();

            const linkElement = $(row).find("a");

            const title = linkElement.text().trim();

            const link = linkElement.attr("href");

            const fullText = $(row).text();

            let publishedBy = "";

            const match = fullText.match(
                /Published By:(.*)/i
            );

            if (match) {
                publishedBy = match[1].trim();
            }

            if (
                date.match(/\d{2}-\d{2}-\d{4}/) &&
                title.length > 0
            ) {
                notices.push({
                    date,
                    title,
                    link,
                    publishedBy
                });
            }
        });

        console.log(
            `Scraped ${notices.length} notices`
        );

        const noticesToProcess = notices;

        const existingNotices =
          await Notice.find(
            {},
            { link: 1 }
          );

        const existingLinks =
          new Set(
            existingNotices.map(
              notice => notice.link
            )
          );

        console.log(
          "Starting processing..."
        );

        let currentIndex = 0;
        let successCount = 0;
        let failCount = 0;

        for (const notice of noticesToProcess) {
            console.log(
                `Processing ${currentIndex + 1}/${noticesToProcess.length}`
            );
            console.log(
                `Title: ${notice.title}`
            );

            try {
                if (
                  existingLinks.has(
                    notice.link
                  )
                ) {
                  console.log(
                    `Already Exists: ${notice.title}`
                  );
                  currentIndex++;
                  continue;
                }

                const filePath =
                  `temp/${Date.now()}.pdf`;

                console.log("Downloading PDF...");
                await downloadPdf(
                  notice.link,
                  filePath
                );
                console.log("PDF Downloaded");

                const stats =
                  fs.statSync(filePath);

                console.log(
                  `PDF Size: ${stats.size}`
                );

                console.log("Calling Gemini...");
                const ai =
                  await analyzePdf(filePath);
                console.log("Gemini Success");

                console.log("Saving to MongoDB...");
                await Notice.create({

                  ...notice,

                  summary:
                    ai.summary,

                  category:
                    ai.category,

                  priority:
                    ai.priority,

                  actionItems:
                    ai.actionItems,

                  importantDates:
                    ai.importantDates

                });

                console.log("Saved to MongoDB");
                successCount++;

                await new Promise(
                  resolve =>
                    setTimeout(resolve, 2000)
                );

            } catch (err) {
                failCount++;

                console.error(
                  `Failed: ${notice.title}`
                );

                console.error(
                  "ERROR DETAILS:"
                );

                console.error(err);

                // Classify failures
                const errorStr = (err.message || String(err)).toLowerCase();
                const isRateLimit = errorStr.includes("429") || errorStr.includes("quota") || errorStr.includes("resource_exhausted");

                if (isRateLimit) {
                  console.error("GEMINI RATE LIMIT / QUOTA EXCEEDED");
                }

                if (err.message && err.message.includes("document has no pages")) {
                  console.error("INVALID PDF");
                }

                if (err.message && err.message.includes("Unexpected token")) {
                  console.error("JSON PARSE FAILURE");
                }

                if (err.message && err.message.includes("E11000")) {
                  console.error("DUPLICATE KEY ERROR");
                }

                // Save Failure Report to logs/errors.txt
                try {
                  fs.mkdirSync("logs", { recursive: true });
                  const now = new Date();
                  const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                  const logEntry = `NOTICE:\n${notice.title}\n\nTIME:\n${formattedTime}\n\nERROR:\n${err.message || err}\n\n`;
                  fs.appendFileSync(path.join("logs", "errors.txt"), logEntry);
                } catch (writeErr) {
                  console.error("Failed to write to logs/errors.txt:", writeErr);
                }

                if (isRateLimit) {
                  console.log("Stopping further scraping in this run to respect the API quota. Remaining notices will be processed in subsequent runs.");
                  break;
                }
            }
            currentIndex++;
        }

        console.log("==========");
        console.log({
          totalNotices:
            notices.length,
          successCount,
          failCount
        });
        console.log("==========");
        console.log(`Found ${notices.length} notices`);
    } catch (error) {
        console.error(error);
    }
}

if (require.main === module) {
  scrapeNotices();
}

module.exports = scrapeNotices;