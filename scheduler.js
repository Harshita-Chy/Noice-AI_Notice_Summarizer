const cron = require("node-cron");
const scrapeNotices = require("./scraper/scrape");

// Cron scheduling rules:
// "* * * * *" is every minute (used here for testing)
// "0 * * * *" is every hour (recommended for production)
cron.schedule(
  "0 * * * *",
  async () => {

    console.log(
      "Running scraper..."
    );

    try {

      await scrapeNotices();

      console.log(
        "Scraping completed"
      );

    } catch (err) {

      console.error(err);

    }

  }
);

console.log(
  "Scheduler started"
);
