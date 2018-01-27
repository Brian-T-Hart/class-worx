var express = require("express");
var passport = require("passport");
var db = require("../models");
var path = require("path");
var router = express.Router();

// ALL links in this file get prepended with /account
// ==================================================
router.get('/login' , (req, res, next) => {
    res.render(path.join(__dirname, "../views/login.handlebars"));
});

// app.get('/login', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info) {
//         if (err) { return next(err) }
//         if (!user) {
//             // *** Display message without using flash option
//             // re-render the login form with a message
//             return res.render('login', { message: info.message })
//         }
//         req.logIn(user, function (err) {
//             if (err) { return next(err); }
//             return res.redirect('/users/' + user.username);
//         });
//     })(req, res, next);
// });

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, teacher, info) {
        if (err) { return next(err) }
        if (!teacher) {
            console.log('Cannot find username. Please try again.');
            res.send('Error');
        }
        req.logIn(teacher, function (err) {
            if (err) { return next(err); }
            console.log("teacher: ", teacher);
            res.send('Login Successful');
        });
    })(req, res, next);
});

//     successRedirect: '/dashboard',
//     failureRedirect: '/account/login',
//     failureFlash: true })
// );

router.post('/signup', passport.authenticate('local-register', {
    successRedirect: '/dashboard',
    failureRedirect: '/account/login'
}))

router.get('/logout', (req, res, next) => {
    req.session.destroy(err => {
      res.redirect('/account/login')
    })
  })

module.exports = router;