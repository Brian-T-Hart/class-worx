var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");
var passport = require("passport");

// PUT route for updating student points via buttons
router.post("/points/:class/:id/:points", function(req, res, done) {
    if (req.isAuthenticated()) {
        var points = parseInt(req.params.points);
        db.students.findById(req.params.id).then( student => {
            var score = student.student_score;
            if (points < 0 && score > 0) {
            return student.increment( "student_score" , {by: points});
            }
            if (points > 0) {
                return student.increment( "student_score" , {by: points});
                }
        }).then(function(results){
            console.log("Points were updated successfully!");
            res.json("Points for " + results.student_firstName + " were updated successfully");
        });
    }
    else {
        res.redirect("/account/login");
    }
});

// route for updating the number of hall passes
router.post("/hallpass/:class/:id/:passes", function(req, res) {
    if (req.isAuthenticated()) {
        var passes = parseInt(req.params.passes);
        db.students.findById(req.params.id).then( student => {
            var currentPasses = student.student_hallPass;
            if (passes > 0) {
                return student.increment( "student_hallpass" , {by: passes}),student.increment( "student_score" , {by: 100});
                }
            if (passes < 0 && currentPasses > 0) {
                return student.increment( "student_hallpass" , {by: passes}), student.increment( "student_score" , {by: -100});
                }
        }).then(function(results){
            console.log("Hallpasses were updated successfully!");
            res.json("Hallpass for " + results.student_firstName + " was updated successfully");
        });
    }
    else {
        res.redirect("/account/login");
    }
});

// route for updating the number of homework passes
router.post("/homeworkPass/:class/:id/:passes", function(req, res, done) {
    if (req.isAuthenticated()) {
        var passes = parseInt(req.params.passes);
        db.students.findById(req.params.id).then( student => {
            var currentPasses = student.student_homeworkPass;
            if (passes > 0) {
                return student.increment( "student_homeworkPass" , {by: passes}), student.increment( "student_score" , {by: 100});
                }
            if (passes < 0 && currentPasses > 0) {
                return student.increment( "student_homeworkPass" , {by: passes}), student.increment( "student_score" , {by: -100});
                }
        }).then(function(results){
            console.log("HW Pass was updated successfully!");
            res.json("HW Pass for " + results.student_firstName + " was updated successfully");
        });
    }
    else {
        res.redirect("/account/login");
    }
});

module.exports = router;