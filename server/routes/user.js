const express = require("express");
const routes = express.Router();
const userController = require("../controllers/user");

routes.post('/login',userController.login);
routes.post('/signup',userController.signup);

module.exports = routes;