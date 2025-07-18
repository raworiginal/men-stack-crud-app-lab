/* ========================== Dependencies ========================== */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

/* ========================== Constants ========================== */
const app = express();

/* ========================== Routes ========================== */
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
/* ========================== Server ========================== */

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
