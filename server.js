/* ========================== Dependencies ========================== */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Song = require("./models/song.js");

/* ========================== Constants ========================== */
const app = express();

/* ====================== Middleware ======================*/
app.use(express.urlencoded({ extended: false }));

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

app.get("/songs/new", async (req, res) => {
  res.render("songs/new.ejs");
});

app.post("/songs", async (req, res) => {
  await Song.create(req.body);
  res.redirect("/songs/new");
});
/* ========================== Server ========================== */

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
