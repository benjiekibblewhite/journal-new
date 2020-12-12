var express = require("express");
var bodyParser = require("body-parser");

const PORT = 3000;

var app = express();
app.use(bodyParser.json());

// Serve static directory
var distDir = __dirname + "/static/";
app.use(express.static(distDir));

// API

app.get("/api", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Server started at: ${PORT}`);
});
