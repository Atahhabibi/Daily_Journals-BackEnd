const express = require("express");
const bodyParser = require("body-parser");
var _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin-atah:jan@cluster0.clahmhi.mongodb.net/DailyJournal"
);

const JournalSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Journal = mongoose.model("Journal", JournalSchema);

const HomeContent =
  "Cricket is a bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard (20-metre) pitch with a wicket at each end, each comprising two bails balanced on three stumps. The batting side scores runs by striking the ball bowled at one of the wickets with the bat and then running between the wickets,";

const AboutContent =
  "Baseball is a bat-and-ball sport played between two teams of nine players each, taking turns batting and fielding. The game occurs over the course of several plays, with each play generally beginning when a player on the fielding team, called the pitcher, throws a ball that a player on the batting team, called the batter, tries to hit with a bat. The objective of the offensive team (batting team) is to hit the ball into the field of play, away from the other team's players, allowing its players to run the bases, having them advance counter-clockwise around four bases to score what are called ";

const contactContent =
  "Snooker one at each corner and one in the middle of each long side. First played by British Army officers stationed in India in the second half of the 19th century, the game is played with twenty-two balls, comprising a white cue ball, fifteen red balls, and six other balls—a yellow, green, brown, blue, pink, and black—collectively called the colours. Using a cue stick, the individual players or teams take turns to strike the cue ball to pot other balls in a predefined sequence, accumulating points for each successful pot and for each time the opposing player or team commits a foul. An individual frame of snooker is won by the player who has scored the most points. A snooker match ends when a player reaches a predetermined number of frames.";

const app = express();
app.use(express.static("/public"));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.set("view engine", "ejs");

app.listen(process.env.PORT||3000, (req, res) => {
  console.log("SERVER LISTENING PORT: 3000");
});

app.get("/", (req, res) => {
  Journal.find()
    .then((result) => {
      res.render("home", { content: HomeContent, posts: result });
    })
    .catch((err) => console.log(err));
});

app.get("/about", (req, res) => {
  res.render("about", { content: AboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { content: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const title = req.body.postTitle;
  const content = req.body.postBody;

  const journal = new Journal({
    title: title,
    content: content,
  });

  journal
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  Journal.findById({ _id: id })
    .then((result) => {
      console.log(result);
      res.render("post", { title: result.title, content: result.content });
    })
    .catch((err) => console.log(err));
});
