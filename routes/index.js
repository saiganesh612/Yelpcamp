var express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

// Home Page of YelpCamp
router.get("/", (req, res) => {
	res.render("home");
});

// AUTHENTICATION ROUTES
         //Route to register 
router.get("/register", (req, res) => {
	res.render("register");
});

        //Signup logic
router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp " + user.username)
			res.redirect("/campgrounds");
		});
	});
});

        //LOGIN PAGE 
router.get("/login", (req, res) => {
	res.render("login");
});

       //LOGIN logic goes here
// We can rid of that callback function as you like because their is no use of it as of now.....
router.post("/login", passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), (req, res) => {
});

        // logout ROUTE
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", " You LoggedOut Successfully!!");
	res.redirect("/campgrounds");
});

module.exports = router;
