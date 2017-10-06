var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");

router.get('/', (req, res, next) => {
    if(req.isAuthenticated()){
        //go to dashboard automatically
    }else{
        res.redirect("/account/login");
    }
});

module.exports = router;