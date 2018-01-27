var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
var db = require('./models');

const authenticate = (email, password, done) =>{
    db.teachers.find({
        where:{
          teacher_email: email,
        }
      }).then(teacher => {
          if (!teacher) {
              console.log("username not found.");
              return done(null, false, { message: 'Incorrect username.' });
          }
          if (!bcrypt.compareSync(password, teacher.teacher_password)) {
              console.log("incorrect password.");
              return done(null, false, { message: 'Incorrect password.' });
          } 
        done(null, teacher);
      })
      .catch(done) // pass the error back
}

const register = (req, email, password, done) => {
    //sequelize?
    db.teachers.find({
        where:{
            teacher_email: req.body.email,
        }
    })
    .then(user => {
      if (user) {
        return done(null, false, { message: 'an account with that email has already been created' });
      }
      if (password !== req.body.password2) {
        return done(null, false, { message: `passwords don't match` });
      }
      db.teachers.create({
        teacher_firstName: req.body.firstName,
        teacher_lastName: req.body.lastName,
        teacher_userName: req.body.username,
        teacher_email: req.body.email,
        teacher_password: bcrypt.hashSync(password)
      }).then(function(){
          done(null, user);
        })
    })
    
}

passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));

passport.serializeUser((teachers, done) => {
    done(null, teachers.teacher_id)
});

passport.deserializeUser((id, done) => {
    db.teachers.find({
        where:{
            teacher_id: id,
        }
      })
      .then(teacher => {
          done(null, teacher)
      })
      .catch(done)
})
