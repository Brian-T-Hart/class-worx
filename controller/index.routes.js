var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");
var passport = require("passport");
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dfonttj4w',
    api_key: '122777653667279',
    api_secret: 'e1h1VMQZUQl7I9R2wfhrMcsXAWs'
});

router.get('/', (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect("/dashboard");
    }else{
        res.redirect("/account/login");
    }
});

// route to teacher dashboard
router.get('/dashboard', (req, res, next) =>{
    if(req.isAuthenticated()){
        db.classes.findAll({
            include:[{
                model: db.teachers,
                attribute: [['name', 'teacher_userName']]
            }],
            where:{
                teacherTeacherId: req.user.teacher_id,
                class_active: true
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

// post to create a new class
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

// route to get students from a particular class
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
            order: db.sequelize.col('student_lastName')
        }).then(function(results){
            var studentList = {students: results}
            res.render('specificClass', studentList);
        });
    }else{
        res.redirect("/account/login");
    }
});

// route to order students from a particular class by points
router.get('/classbypoints/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        db.students.findAll({
            order: [['student_score', 'DESC']],
            include: [{
                model: db.schedules,
                where: {
                    classClassId: req.params.id
                },
                include: [{
                    model: db.classes,
                    include: [{
                        model: db.teachers,
                        where: {
                            teacher_id: req.user.teacher_id,
                        }
                    }],
                }],
            }],
            // order: db.sequelize.col('student_score')
        }).then(function (results) {
            var studentList = { students: results }
            res.render('specificClass', studentList);
        });
    } else {
        res.redirect("/account/login");
    }
});

// route to get all students belonging to the teacher
router.get('/students', (req,res,next) => {
    if(req.isAuthenticated()){
        db.classes.findAll({
            include:[{
                model: db.teachers,
                attribute: [['name', 'teacher_userName']]
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
            }],
            // order: db.sequelize.col('student_lastName')
        }).then(function(results){
            // res.json(results);
            var classList = { classes: results };
            res.render('allStudents', classList);
        });
    }else{
        res.redirect("/account/login");
    }
});

// route to page for creating new student
router.get('/newstudent' , (req, res, done) => {
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
        res.render('newstudent', classNames);
        });
    }else{
        res.redirect("/account/login");
    }        
})

// route to create a new student and schedule in the database
router.post("/newstudent" , (req, res, done) =>{
    if(req.isAuthenticated()){
        db.students.create({
            student_lastName: req.body.inputStudentLastName,
            student_firstName: req.body.inputStudentFirstName,
            student_phone: req.body.inputStudentPhone,
            student_email: req.body.inputStudentEmail,
            student_image: req.body.inputStudentImage,
            student_gender: req.body.selectGender,
            student_gradeLevel: req.body.selectGrade,
            student_score: 300,
            student_hallPass: 2,
            student_homeworkPass: 1,
            student_active: true
        }).then(function(results){
        db.schedules.create({
            classClassId: req.body.classPicker,
            studentStudentId: results.student_id
        }).then(function(results2){
            res.redirect("/class/" + req.body.classPicker)
        })   
    });
    }else{
        res.redirect("account/login");
    }
})

router.get('/editStudent/:class/:id', (req,res,next) => {
    if(req.isAuthenticated()){
        db.classes.findAll({
            where:{
                class_id: req.params.class,
            },
            include:[{
                model: db.schedules,
                include:[{
                    model: db.students,
                    where:
                       { student_id: req.params.id }
                }]
            }]
        }).then(function(results){
            var studentInfo = {classes: results}
            res.render('editStudent', studentInfo);
            // res.json(results[0].schedules[0].student.student_firstName);
            // res.json(results);
        });
    }else{
        res.redirect("/account/login");
    }
});

// post to edit student info
router.post('/editStudent/:class/:id', (req, res, next) =>{
    if(req.isAuthenticated()){
        console.log("request body: " + req.body);
        db.students.update({
            student_lastName: req.body.inputStudentLastName,
            student_firstName: req.body.inputStudentFirstName,
            student_phone: req.body.inputStudentPhone,
            student_email: req.body.inputStudentEmail,
            student_gender: req.body.selectGender,
            student_image: req.body.inputStudentImage,
            student_gradeLevel: req.body.selectGrade,
            student_hallPass: req.body.inputStudentHallPass,
            student_homeworkPass: req.body.inputStudentHomeworkPass,
            student_score: req.body.inputStudentScore,
            student_gender: req.body.selectGender,
            student_active: req.body.studentActive},
           { where: {
                student_id: req.params.id
            }
        }).then(function(results){
            console.log("post complete");
            res.redirect('/class/' + req.params.class);
        });
    }else{
        res.redirect("/account/login");        
    }
})

router.post('/editNotes/:class/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("request body: " + req.body);
        db.students.update({
            student_notes: req.body.inputStudentNotes
        },
            {
                where: {
                    student_id: req.params.id
                }
            }).then(function (results) {
                console.log("post complete");
                res.redirect("/class/" + req.params.class);
            });
    } else {
        res.redirect("/account/login");
    }
})

router.get('/editClass/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        db.classes.findAll({
            where: {
                class_id: req.params.id
            },
            include: [{
                model: db.teachers,
                attributes: ['teacher_userName'],
            where: {
                teacher_id: req.user.teacher_id,
                }
            }]
        }).then(function (results) {
            console.log(results[0]);
            var classInfo = { class: results }
            res.render('editClass', classInfo);
            // res.json(results);
        });
    } else {
        res.redirect("/account/login");
    }
});

// post to edit student info
router.post('/editClass/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("request body: " + req.body);
        db.classes.update({
            class_name: req.body.className,
            class_subject: req.body.classSubject,
            class_period: req.body.classPeriod,
            class_active: req.body.classActive
        },
            {
                where: {
                    class_id: req.params.id
                }
            }).then(function (results) {
                console.log("post complete");
                res.redirect('/dashboard');
            });
    } else {
        res.redirect("/account/login");
    }
});


// reset points for all students of a particular class
router.post('/reset/:id', (req, res, next) => {
    if (req.isAuthenticated()) {
        db.students.findAll({
            include: [{
                model: db.schedules,
                where: {
                    classClassId: req.params.id
                },
                include: [{
                    model: db.classes,
                    include: [{
                        model: db.teachers,
                        where: {
                            teacher_id: req.user.teacher_id,
                        }
                    }],
                }],
            }],
            order: db.sequelize.col('student_lastName')
        }).then(function (results) {
            for (let i = 0; i < results.length; i++) {    
                if (req.params.id == results[i].schedules[0].classClassId) {
                    db.students.update({
                        student_hallPass: 2,
                        student_homeworkPass: 1,
                        student_score: 300
                    },
                        {
                            where: {
                                student_id: results[i].student_id
                            }
                        }).then(function (results) {
                            console.log("post complete");
                            res.redirect('/class/' + req.params.id);
                        })
                    }
                else {
                    res.json("something went wrong!")
                }
            }
        })
    } 
    else {
        res.redirect("/account/login");
    }
});

router.get('/exampleImage', (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log('posting image');
        cloudinary.v2.uploader.upload("http://coloringpages2015.com/wp-content/uploads/2014/05/barbie-mermaid-tale-coloring-pages-zuma-and-merliah-playing-429598.jpg", { public_id: "student_id" },
            function (error, result) { 
                if (error) {
                    console.log(error)
                }
                else {
                    console.log("result ", result);
                    console.log("secure_url ", result.secure_url)
                }
            })        
            .then(function (results) {
                // console.log('picture posted', results);
                // res.redirect("/exampleImage");
                // res.json(results);
                var imageInfo = { image: results }
                res.render('exampleImage', imageInfo);
            })
    }
    else {
        res.redirect("/account/login"); 
    }
});


module.exports = router;