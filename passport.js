var bcrypt = require('bcrypt-nodejs');
var db = require('./models');
const LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

const authenticate = (email, password, done) =>{
	db.teachers.find({
		where:{
		  teacher_email: email,
		}
	  }).then(teacher => {
		  if (!teacher) {
			  return done(null, false, { message: 'Incorrect username.' });
		  }

		  if (!bcrypt.compareSync(password, teacher.teacher_password)) {
			  return done(null, false, { message: 'Incorrect password.' });
		  } 
		done(null, teacher);
	  })
	  .catch(done)
}

const register = (req, email, password, done) => {
	db.teachers.find({
		where:{
			teacher_email: req.body.email,
		}
	})
	.then(user => {
		if (user) {
			return done(null, true, { message: 'an account with that email has already been created' });
		}

		if (password !== req.body.password2) {
			return done(null, true, { message: `passwords don't match` });
		}

		db.teachers.create({
			teacher_firstName: req.body.firstName,
			teacher_lastName: req.body.lastName,
			teacher_userName: req.body.username,
			teacher_email: req.body.email,
			teacher_password: bcrypt.hashSync(password)
		})
		.then(function() {
			done(null, false);
		})
	})
	.catch(done)
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