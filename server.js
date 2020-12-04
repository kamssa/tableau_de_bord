const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
app.use(express.static(__dirname + "dist/gstoreplusimmobilier"));

app.listen(process.env.port || 4200, function() {
  console.log("up and running on port "+ process.env.PORT);
});
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "dist/gstoreplusimmobilier/index.html"));
});

console.log("app is listenning");
