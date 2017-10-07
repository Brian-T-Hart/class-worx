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
        if (!teacher || !bcrypt.compareSync(password, teacher.teacher_password)) {
        //if (!teacher || password !== teacher.teacher_password) {
          console.log("failed to login, but sucess in getting this far.")
            return done(null, false, {message: 'invalid username/or and password combination'});
        }
  
        done(null, teacher);
      })
      .catch(done) // pass the error back
}

const register = (req, username, password, done) => {
    //sequelize?
    db.teachers.find({
        where:{
            teacher_email: username,
        }
    })
    .then(user => {
      if (user) {
        return done(null, false, { message: 'an account with that email has already been created' });
      }
      if (password !== req.body.registerPassword2) {
        return done(null, false, { message: `passwords don't match` });
      }
      db.teachers.create({
        teacher_firstName: "TEST",
        teacher_lastName: "TEST",
        teacher_userName: "USER NAME",
        teacher_email: username,
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
