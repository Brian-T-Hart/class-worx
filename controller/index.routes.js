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
                attribute: [['name', 'teacher_userName']]
            }],
            where:{
                teacherTeacherId: req.user.teacher_id,
            },
            order: db.sequelize.col('class_period')
        }).then(function(results){
            console.log("class id: " + results[0].class_id);
            console.log("class name: " + results[0].class_name);
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
            // console.log(results);
            var studentList = {students: results}
            res.render('specificClass', studentList);
        });
    }else{
        res.redirect("/account/login");
    }
});


router.get('/students', (req,res,next) => {
    if(req.isAuthenticated()){
        db.classes.findAll({
            include:[{
                model: db.teachers,
                attribute: [['name', 'teacher_userName']] // should this be techer_userName, varchar;
            }],
            where:{
                teacherTeacherId: req.user.teacher_id,
            },
            include:[{
                model: db.schedules,
                include:[{
                    model: db.students,
                    where:
                       {}
                }]
            }]
        
        // db.students.findAll({
        //     include:[{
        //         model: db.schedules,
        //         where:{
        //             classClassId: db.classes.class_id
        //         },
        //         include:[{
        //             model: db.classes,
        //             where:{
        //                 teacherTeacherId: req.user.teacher_id
        //             },
        //             include:[{
        //                 model: db.teachers,
        //             }],
        //         }],
        //     }],
        }).then(function(results){
            res.json(results);
            // var studentList = {students: results}
            // res.render('class', studentList);
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

router.post("/newStudent" , (req, res, done) =>{
    if(req.isAuthenticated()){
        db.students.create({
            student_lastName: req.body.inputStudentLastName,
            student_firstName: req.body.inputStudentFirstName,
            student_phone: req.body.inputStudentPhone,
            student_email: req.body.inputStudentEmail,
            student_image: "/assets/images/portrait.png",
            student_gender: req.body.selectGener,
            student_gradeLevel: req.body.selectGrade,
            student_score: 0,
            student_hallPass: 2,
            student_active: true
        }).then(function(results){

        db.schedules.create({
            classClassId: req.body.classPicker,
            studentStudentId: results.student_id
        }).then(function(results2){
            res.redirect("/dashboard")
        })   
    });
    }else{
        res.redirect("account/login");
    }
})

module.exports = router;