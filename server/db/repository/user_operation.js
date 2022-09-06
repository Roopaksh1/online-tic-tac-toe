const UserModel = require("../models/user_schema");

module.exports = {
  add(userObject, response) {
    UserModel.create(userObject, (err) => {
      if (err) {
        console.log(err.message);
        response.json({ message: "All fields are required." });
      } else {
        response.json({ message: "Registered." });
      }
    });
  },

  read(userObject, response) {
    UserModel.findOne({ username: userObject.username }, (err, doc) => {
      if (err) {
        response.json({ flag: -1 });
        console.log(err);
      } else if (doc && doc.username) {
        response.json({ flag: 1, doc });
      } else {
        response.json({ flag: 0 });
      }
    });
  },
};
