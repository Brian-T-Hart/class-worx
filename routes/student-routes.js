// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {


  // Get route for retrieving a student
  app.get("/api/students/:id", function(req, res) {
    db.students.findOne({
      where: {
        student_id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });

  // POST route for creating a new student
  app.post("/api/newStudent", function(req, res) {
    db.students.create({
      student_lastName: req.body.lastName,
      student_firstName: req.body.firstName,
      student_email: req.body.email,
      student_phone: req.body.phone,
      student_image: req.body.image,
      student_gender: req.body.gender,
      student_gradeLevel: req.body.grade
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    })
  });

  // DELETE route for deleting a teacher
  app.delete("/api/posts/:id", function(req, res) {
    db.student.destroy({
      where: {
        student_id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });


  // PUT route for updating teacher info
  app.put("/api/updateStudent", function(req, res) {
    db.students.update(
      req.body,
      {
        where: {
          student_id: req.body.id
        }
      }).then(function(result) {
        res.json(result);
        // console.log(result);
      });
  });
};