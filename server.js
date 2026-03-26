const app = require("./src/routes/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server PORT: ${PORT}`));
