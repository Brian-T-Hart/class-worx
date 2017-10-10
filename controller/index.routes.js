var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");
var passport = require("passport");

router.get('/', (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect("/dashboard");
    }else{
        res.redirect("/account/login");
    }
});

router.get('/dashboard', (req, res, next) =>{
    if(req.isAuthenticated()){
        db.classes.findAll({
            include:[{
                model: db.teachers,
                attribute: [['name', 'teacher_userName']] // should this be techer_userName, varchar;
            }],
            where:{
                teacherTeacherId: req.user.teacher_id,
            }
        }).then(function(results){
            var classList = {classes: results}
            res.render('teacher', classList);
        });
    }else{
        res.redirect("/account/login");
    }
});

router.post('/dashboard', (req, res, next) =>{
    if(req.isAuthenticated()){
        db.classes.create({
            class_name: req.body.className,
            class_subject: req.body.classSubject,
            class_score: 0,
            class_active: true,
            teacherTeacherId: req.user.teacher_id
        }).then(function(results){
            res.redirect('/dashboard');
        });
    }else{
        res.redirect("/account/login");        
    }
})

router.get('/class/:id', (req, res, next) =>{
    if(req.isAuthenticated()){
        //go to dashboard automatically
        //if statement if teacher has class
    }else{
        res.redirect("/account/login");
    }
});


router.get('/students', (req,res,next) => {
    if(req.isAuthenticated()){
        db.students.findAll({
            include:[{
                model: db.schedules,
                include:[{
                    model: db.classes,
                    include:[{
                        model: db.teachers,
                        where:{
                            teacher_id: req.user.teacher_id,
                        }
                    }],
                }],
            }],
        }).then(function(results){
            var studentList = {students: results}
            res.render('class', studentList);
        });
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