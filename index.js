var logger = require("morgan");
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const db = require("./db/queries");

const PORT = process.env.PORT || 8080;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static directory
var distDir = __dirname + "/static/";
app.use(express.static(distDir));

// API

app.get("/api", (req, res) => {
  return res.status(200).json({ message: "Welcome to Express API template" });
});

app.get("/api/posts", db.getPosts);
app.get("/api/posts/:id", db.getPost);
app.post("/api/posts", db.createPost);
app.put("/api/posts/:id", db.updatePost);
app.delete("/api/posts/:id", db.deletePost);

app.listen(PORT, () => {
  console.log(`Server started at: ${PORT}`);
});
