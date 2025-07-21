/* ========================== Dependencies ========================== */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Song = require("./models/song.js");
const methodOverride = require("method-override");
const morgan = require("morgan");
/* ========================== Constants ========================== */
const app = express();

/* ====================== Middleware ======================*/
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
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

app.get("/songs", async (req, res) => {
  const allSongs = await Song.find();
  res.render("songs/index.ejs", { songs: allSongs });
});

app.post("/songs", async (req, res) => {
  await Song.create(req.body);
  res.redirect("/songs");
});

app.get("/songs/:songId", async (req, res) => {
  const foundSong = await Song.findById(req.params.songId);
  res.render("songs/show.ejs", { song: foundSong });
});

app.delete("/songs/:songId", async (req, res) => {
  await Song.findByIdAndDelete(req.params.songId);
  res.redirect("/songs");
});
/* ========================== Server ========================== */

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
