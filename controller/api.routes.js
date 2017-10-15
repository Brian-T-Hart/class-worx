var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");
var passport = require("passport");

// PUT route for updating student points via buttons
router.put("/points/:class/:id/:points", function(req, res) {
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
            res.redirect("/class/"+req.params.class);
        });
});

// route for updating the number of hall passes
router.put("/hallpass/:class/:id/:passes", function(req, res) {
    var passes = parseInt(req.params.passes);
    db.students.findById(req.params.id).then( student => {
        var currentPasses = student.student_hallPass;
        if (passes > 0) {
            return student.increment( "student_hallpass" , {by: passes});
            }
        if (passes < 0 && currentPasses > 0) {
            return student.increment( "student_hallpass" , {by: passes});
            }
    }).then(function(results){
        res.redirect("/class/"+req.params.class);
    });
});

// route for updating the number of homework passes
router.put("/homeworkPass/:class/:id/:passes", function(req, res) {
    var passes = parseInt(req.params.passes);
    db.students.findById(req.params.id).then( student => {
        var currentPasses = student.student_homeworkPass;
        if (passes > 0) {
            return student.increment( "student_homeworkPass" , {by: passes});
            }
        if (passes < 0 && currentPasses > 0) {
            return student.increment( "student_homeworkPass" , {by: passes});
            }
    }).then(function(results){
        res.redirect("/class/"+req.params.class);
    });
});

module.exports = router;