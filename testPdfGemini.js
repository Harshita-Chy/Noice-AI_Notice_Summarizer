require("dotenv").config();

const analyzePdf =
require("./services/analyzePdf");

(async () => {

  const result =
    await analyzePdf(
      "./temp.pdf"
    );

  console.log(result);

})();
