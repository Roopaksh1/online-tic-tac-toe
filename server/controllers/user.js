const userOperations = require("../db/repository/user_operation");

module.exports = {
  login(request, response) {
    const userObject = request.body;
    userOperations.read(userObject, response);
  },
  register(request, response) {
    const userObject = request.body;
    userOperations.add(userObject, response);
  },
  profile(request, response) {},
};
