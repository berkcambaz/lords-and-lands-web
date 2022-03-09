import express = require("express");
import path = require("path");

const app = express();

app.use("/", express.static(path.join(__dirname, "../../frontend/public")));
app.listen(80, () => { console.log("Server has started...") });