var express = require("express");
var path = require("path");
var router = express.Router();
var db = require("../models");
var passport = require("passport");

// PUT route for updating student points via buttons
router.put("/:id/:value", (req, res) => {
        console.log("Hello");
        res.redirect("/class/" +req.params.id);
})
    
    // if (req.body.name == +1) {
    //     value = parseInt(param)
    // }
    // if(req.body.name == +10){
    //     value = parseInt(param)
    // }
    // if(req.body.name == decrement){
    //     value= -1
    // }
    // db.students.update({   
    //     student_score: student_score + value},
    //     {where: 
    //         {student_id: req.params.id}
    //   }).then(function(result) {
    //     res.json(result);
    //     // console.log(result);
    //   });
    // });

module.exports = router;