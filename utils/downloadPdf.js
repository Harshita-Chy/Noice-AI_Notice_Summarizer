const axios = require("axios");
const fs = require("fs");

async function downloadPdf(
  url,
  filePath
) {

  const response =
    await axios.get(
      url,
      {
        responseType:
          "arraybuffer",
        headers: {
          "User-Agent":
            "Mozilla/5.0",
          Referer:
            "https://www.imsnsit.org/imsnsit/notifications.php"
        }
      }
    );

  fs.writeFileSync(
    filePath,
    response.data
  );

  return filePath;
}

module.exports =
  downloadPdf;