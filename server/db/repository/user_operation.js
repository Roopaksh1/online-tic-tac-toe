const UserModel = require("../models/user_schema");

module.exports = {
  add(userObject, response) {
    if(UserModel.create(userObject)) {
      response.json({message: "Registered"});
    } else {
      response.json({message: "ERROR"});
    }
  },
  read(userObject, response) {
    UserModel.findOne(
      { username: userObject.username, password: userObject.password },
      (err, doc) => {
        if (err) {
          response.json({ message: "Error in DB " });
          console.log(err);
        } else if (doc && doc.username) {
          response.json({ message: "Welcome " + userObject.username });
        } else {
          response.json({ message: "Invalid Username or Password" });
        }
      }
    );
  },
  update(userObject) {
    UserModel.findOneAndUpdate(
      { userid: userObject.userid },
      { password: userObject.password }
    );
  },
  remove(userObject) {},
};
