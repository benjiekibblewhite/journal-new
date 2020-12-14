var logger = require("morgan");
var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const db = require("./src/db/queries");
const users = require("./src/db/user/UserController");
const { verifyToken } = require("./src/db/auth/VerifyToken");
const PORT = process.env.PORT || 8080;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// API

app.get("/api", (req, res) => {
  return res.status(200).json({ message: "online" });
});

// userOps
app.get("/api/user", verifyToken, users.getUser);
app.post("/api/user", users.createUser);
app.post("/api/user/login", users.loginUser);

// posts
app.get("/api/posts", db.getPosts);
app.get("/api/posts/:id", db.getPost);
app.post("/api/posts", db.createPost);
app.put("/api/posts/:id", db.updatePost);
app.delete("/api/posts/:id", db.deletePost);

// Serve static directory
var distDir = __dirname + "/src/static/";
app.use(express.static(distDir));

app.listen(PORT, () => {
  console.log(`Server started at: ${PORT}`);
});
