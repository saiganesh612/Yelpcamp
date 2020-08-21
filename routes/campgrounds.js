var express = require("express"),
	router  = express.Router(),
	Campground = require("../models/campground"),
	Comment    = require("../models/comment"),
	middleware = require("../middleware");

                   // INDEX ROUTE
// We can view the CampGrounds in this page
router.get("/", (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

                  // CREATE ROUTE
// We are going to add a new CampGround as per the user to our DataBase
// And redirect to the page where you can view all CampGrounds
router.post("/", middleware.isLoggedIn, (req, res) => {
	var name = req.body.name,
		price = req.body.price,
	    image = req.body.image,
		description = req.body.description,
		author = {
			id: req.user._id,
			username: req.user.username
		},
		newCampground = {Name: name, Price: price, Image: image, Description: description, Author: author}
	Campground.create(newCampground, (err, newCampground) => {
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

                  // NEW ROUTE
// It will takes the user to another page where we can add details of new CampGround to the database
// After sumbitting the data it will send our data to "/campgrounds" route and redirects to the page where we can the 	    campgrounds...
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

                  // SHOW ROUTE
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, campgroundInfo) => {
		if(err || !campgroundInfo){
			req.flash("error", "Don't dare to crash my app again!!");
			res.redirect("back");
		}else{
			res.render("campgrounds/show", {campgroundInfo: campgroundInfo});
		}
	});
});

                  // EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.render("campgrounds/edit", {campground: campground});
		}
	});
});

                 // UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

                //DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, err => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;
