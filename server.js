/* ========================== Dependencies ========================== */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

/* ========================== Constants ========================== */
const app = express();

/* ====================== DB Connection ======================*/
mongoose.connect(process.env.MONGODB_URI);
//log conneciton status in terminal at start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});
/* ========================== Routes ========================== */
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
/* ========================== Server ========================== */

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
