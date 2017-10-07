// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/teachers", function(req, res) {
    var query = {};
    if (req.query.teacher_id) {
      query.teacher_id = req.query.teacher_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.teachers.findAll({
      where: query,
      include: [db.teachers]
    }).then(function(results) {
      res.json(results);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/teachers/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.teachers.findOne({
      where: {
        id: req.params.id
      },
      include: [db.classes]
    }).then(function(result) {
      res.json(result);
    });
  });

  // POST route for creating a new teacher
  app.post("/api/posts", function(req, res) {
    db.teachers.create(req.body).then(function(result) {
      res.json(result);
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
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.teacher.update(
      req.body,
      {
        where: {
          teacher_id: req.body.id
        }
      }).then(function(result) {
        res.json(result);
      });
  });
};