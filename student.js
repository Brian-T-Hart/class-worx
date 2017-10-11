// PUT route for updating student points via buttons
app.put("api/:id", function(req, res) {
    if (req.body.name == +1) {
        value = parseInt(param)
    }
    if(req.body.name == +10){
        value = parseInt(param)
    }
    if(req.body.name == decrement){
        value= -1
    }
    db.students.update({   
        student_score: student_score + value},
        {where: 
            {student_id: req.params.id}
      }).then(function(result) {
        res.json(result);
        // console.log(result);
      });
    });

// get average of student scores for a class
db.students.findAll({
    include:[{
        model: db.schedules,
        attributes: [[sequelize.fn('SUM', sequelize.col('student_scores'))]],
    }],
    where:{
        class: req.user.teacher_id
    }
    });