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
            },
            order: db.sequelize.col('class_period')
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
            class_period: req.body.classPeriod,
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
        db.students.findAll({
            include:[{
                model: db.schedules,
                where:{
                    classClassId: req.params.id
                },
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


router.get('/students', (req,res,next) => {
    if(req.isAuthenticated()){
        db.students.findAll({
            include:[{
                model: db.schedules,
                where:{
                    classClassId: req.params.id
                },
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

router.get('/newStudent' , (req, res, done) => {
    if(req.isAuthenticated()){
        db.classes.findAll({
            include:[{
                model: db.teachers,
                attribute: [['name', 'teacher_userName']]
            }],
            where:{
                teacherTeacherId: req.user.teacher_id,
            },
            order: db.sequelize.col('class_period')
    }).then(function(results){
        var classNames = {classes: results}
        res.render('newStudent', classNames);
        });
    }else{
        res.redirect("/account/login");
    }        
})

module.exports = router;