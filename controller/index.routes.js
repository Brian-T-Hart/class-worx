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

router.get('/class/:id', (req, res, next) =>{
    if(req.isAuthenticated()){
        //go to dashboard automatically
        //if statement if teacher has class
        res.render(path.join(__dirname, "../views/class.handlebars"));
    }else{
        res.redirect("/account/login");
    }
});



//class and students in class
// class/:id/students
// all students of teacher
// /students
/*
specific studnets = /students/:Studentid
// search based on class id = /students?classid=1
specifc student from specific class should be the same
 */

module.exports = router;