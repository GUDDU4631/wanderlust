const express = require("express");
const Router = express.Router();
const User = require("../models/user");
const asyncWrap = require("../utils/asyncWrap");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware");
const controllerUser = require("../controllers/users");

Router.route("/signup")
    .get(controllerUser.signUpForm)
    .post(asyncWrap(controllerUser.signUp));

Router.route("/login")
    .get(controllerUser.loginForm)
    .post(saveredirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), asyncWrap(controllerUser.login));


Router.get("/logout", controllerUser.logout);

module.exports = Router;