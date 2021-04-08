var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/Yelp_Camp"
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
// body-parser will parse our data and converts it into JavaScript Object...
// and it is the way of getting data from "forms".
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seed our database with initial data
// seedDB(); 

// Passport Configuration
app.use(require("express-session")({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This function will make use of user data(login info) to all routes instead of hardcoding on each and every route....
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Using all the routes.........
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// If the user want to go to an unknown page then this code snippent will triggers and shown an error....
app.get("*", (req, res) => {
	res.send("<h1>404 ERROR: Page Not Found</h1>");
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("YelpCamp server was started!!!");
});
