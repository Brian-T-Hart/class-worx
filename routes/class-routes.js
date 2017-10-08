// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {


  // Get route for retrieving all classes for a teacher
  app.get("/api/classes/:id", function(req, res) {
    db.classes.findAll({
      where: {
        teacherTeacherId: req.params.id
      }
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });

  // POST route for creating a new class
  app.post("/api/newClass", function(req, res) {
    db.classes.create({
      class_name: req.body.name,
      class_subject: req.body.subject,
      class_period: req.body.period,
      teacherTeacherId: req.body.id
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });

  // DELETE route for deleting a class
  app.delete("/api/posts/:id", function(req, res) {
    db.classes.destroy({
      where: {
        class_id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
      // console.log(result);
    });
  });


  // PUT route for updating teacher info
  app.put("/api/updateTeacher", function(req, res) {
    db.classes.update(
      req.body,
      {
        where: {
          class_id: req.body.id
        }
      }).then(function(result) {
        res.json(result);
        // console.log(result);
      });
  });
};