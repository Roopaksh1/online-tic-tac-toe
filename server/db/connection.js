const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, (err) => {
  if (err) {
    console.log("Connection Error ", err);
  } else {
    console.log("Connected....");
  }
});
module.exports = mongoose;
