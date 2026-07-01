const summarizeNotice =
require("./services/gemini");

(async () => {

  const result =
    await summarizeNotice(
`
The last date for summer semester registration has been extended to 15 June 2026. Students must complete fee payment before the deadline.
`
);

  console.log(result);

})();