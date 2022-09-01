const express = require("express");
const routes = express.Router();
const userController = require("../controllers/user");
routes.post('/login',userController.login);
routes.post('/register',userController.register);
routes.post('/profile',userController.profile);
module.exports = routes;