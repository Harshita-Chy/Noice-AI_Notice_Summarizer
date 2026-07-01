const downloadPdf =
require("./utils/downloadPdf");

(async () => {

  const url =
    "https://www.imsnsit.org/imsnsit/plum_url.php?Zat1DmXpR1/0/5lk/br9WkJJy4A+pT2+JbiX3kHQQkp7Fu8b5LkKoALaPR7aRoEzHt1HBNkLHMSDv0AhjvZWfrAiDLilY5fraJJ+NdpAPnVsBYjjPANY9vd9jGpWLO8kSKFiVNuEvh+7w0lvUiyrlZRC40qLhnBMYHBbHnkZyqmxSRrDSAMh5QzbJMcPi8rm5Rd2iugO111bynSsME5QnuEEuZmwyKHJTuFmPX3oSqI=";

  await downloadPdf(
    url,
    "./temp.pdf"
  );

  console.log(
    "PDF downloaded successfully"
  );

})();