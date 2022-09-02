require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./db/connection");
const app = express();

app.use(express.static("../client/build"));
app.use(express.json());
app.use(cors());


app.use("/", require("./routes/user"));

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("server crash", err);
  } else {
    console.log("server up", server.address().port);
  }
})