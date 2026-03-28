const createFetchClient = require("./fetch");

const apiMelolo = createFetchClient({
  baseURL: "https://melolo-api-azure.vercel.app/api/melolo",
});

module.exports = { apiMelolo };
