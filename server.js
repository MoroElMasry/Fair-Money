const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const { port } = process.env;
app.listen(port, () => {
  console.log(`app running on port = ${port}`);
});
