const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

/* ------------------------------ mongoose code ----------------------------- */
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE).then((con) => {
  console.log(`connection successful to ${con.connection.name} db`);
});
/* -------------------------------------------------------------------------- */

const { port } = process.env;
app.listen(port, () => {
  console.log(`app running on port = ${port}`);
});
