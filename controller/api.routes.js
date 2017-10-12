var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");
var passport = require("passport");

// PUT route for updating student points via buttons
router.put("/points/:class/:id/:points", function(req, res) {
        var points = parseInt(req.params.points);
        db.students.findById(req.params.id).then( student => {
            return student.increment( "student_score" , {by: points});
        }).then(function(results){
            res.redirect("/class/"+req.params.class);
        });
});

router.put("/hallpass/:class/:id/:passes", function(req, res) {
    var passes = parseInt(req.params.passes);
    db.students.findById(req.params.id).then( student => {
        return student.increment( "student_hallpass" , {by: passes});
    }).then(function(results){
        res.redirect("/class/"+req.params.class);
    });
});

module.exports = router;