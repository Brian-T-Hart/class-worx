var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../../models");


router.get("/", function(req, res) {
    res.render(path.join(__dirname, "../../views/login.handlebars"));
    // C:\Users\mjbel\class-worx\controller\user_interface\index.routes.js
    // C:\Users\mjbel\class-worx\views\login.handlebars
});

module.exports = router;