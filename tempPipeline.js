require("dotenv").config();

const connectDB =
  require("./config/db");

const Notice =
  require("./models/Notice");

const downloadPdf =
  require("./utils/downloadPdf");

const analyzePdf =
  require("./services/analyzePdf");

async function run() {

  await connectDB();

  const notice =
    await Notice.findOne();

  console.log(
    "Processing:",
    notice.title
  );

  const filePath =
    `temp/${Date.now()}.pdf`;


  console.log(
    "Notice URL:"
  );

  console.log(
    notice.link
  );

  await downloadPdf(
    notice.link,
    filePath
  );

  const fs = require("fs");

  const stats =
    fs.statSync(filePath);

  console.log(
    "File size:",
    stats.size
  );

  const buffer =
    fs.readFileSync(filePath);

  console.log(
    "First 100 chars:"
  );

  console.log(
    buffer.toString(
      "utf8",
      0,
      100
    )
  );

  const ai =
    await analyzePdf(
      filePath
    );

  notice.summary =
    ai.summary;

  notice.category =
    ai.category;

  notice.priority =
    ai.priority;

  notice.actionItems =
    ai.actionItems;

  notice.importantDates =
    ai.importantDates;

  await notice.save();

  console.log(
    "Updated Notice"
  );

  console.log(ai);
}

run();