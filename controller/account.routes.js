var express = require("express");
var passport = require("passport");
var db = require("../models");
var path = require("path");
var router = express.Router();

// ALL links in this file get prepended with /account
// ==================================================
router.get('/login' , (req, res, next) => {
    res.render(path.join(__dirname, "../views/login.handlebars"));
});


router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/account/login'
}))

module.exports = router;