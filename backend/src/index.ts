import express = require("express");
import path = require("path");

import { Network } from "./network";

const app = express();
const network = new Network();

app.use("/", express.static(path.join(__dirname, "../../frontend/public")));
app.listen(80, () => { console.log("Server has started...") });