var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy
var db = require('./models');

const authenticate = (username, password, done) =>{
    db.teachers.find({
        where:{
          teacher_email: username,
        }
      }).then(teacher => {
        // if (!teacher || !bcrypt.compareSync(password, teacher.teacher_password)) {
        if (!teacher || password !== teacher.teacher_password) {
          console.log("failed to login, but sucess in getting this far.")
            return done(null, false, {message: 'invalid username/or and password combination'});
        }
  
        done(null, teacher);
      })
      .catch(done) // pass the error back
}

const register = (req, email, password, done) => {
    //sequelize?
    
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
