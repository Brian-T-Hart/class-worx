var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var passport = require("passport");
var passportLocal = require("passport-local");
var session = require('express-session');
var bcrypt = require("bcrypt-nodejs");
var path = require("path");

// Set up the Express App
// ======================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
// ================================
var db = require("./models");

// Set up the Express app to handle data parsing
// =============================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vmd.api+json"}));

// Static Directory
// ================
app.use(express.static("public"));

// Allow use of handlebars and method override
// ===========================================
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine" , "handlebars");

// Routes
// ======
var UIRoutes = require("./controller/user_interface/index.routes");
// var APIRoutes = require("./controller/api/api.routes");
app.use("/", UIRoutes);
// app.use("/api", APIRoutes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log("App is listening on PORT " + PORT);
    });
});

module.exports = app;