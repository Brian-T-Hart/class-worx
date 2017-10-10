// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {


  // Get route for retrieving a teacher
  app.get("/api/teachers/:id", function(req, res) {
    db.teachers.findOne({
      where: {
        teacher_id: req.params.id
      },
      include: [db.classes]
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });

  // POST route for creating a new teacher
  app.post("/api/newTeacher", function(req, res) {
    db.teachers.create({
      teacher_lastName: req.body.lastName,
      teacher_firstName: req.body.firstName,
      teacher_email: req.body.email,
      teacher_userName: req.body.userName,
      teacher_password: req.body.password
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });

  // DELETE route for deleting a teacher
  app.delete("/api/posts/:id", function(req, res) {
    db.teacher.destroy({
      where: {
        teacher_id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });


  // PUT route for updating teacher info
  app.put("/api/updateTeacher", function(req, res) {
    db.teacher.update(
      req.body,
      {
        where: {
          teacher_id: req.body.id
        }
      }).then(function(result) {
        res.json(result);
        // console.log(result);
      });
  });
};