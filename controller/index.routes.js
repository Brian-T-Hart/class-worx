var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");

router.get('/', (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect("/Welcome Page?");
    }else{
        res.redirect("/account/login");
    }
});

router.get('/dashboard', (req, res, next) =>{
    if(req.isAuthenticated()){
        //go to dashboard automatically
        res.render(path.join(__dirname, "../views/teacher.handlebars"));
    }else{
        res.redirect("/account/login");
    }
});

router.get('/class', (req, res, next) =>{
    if(req.isAuthenticated()){
        //go to dashboard automatically
        res.render(path.join(__dirname, "../views/class.handlebars"));
    }else{
        res.redirect("/account/login");
    }
});

module.exports = router;