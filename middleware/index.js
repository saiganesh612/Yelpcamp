var	Campground  = require("../models/campground"),
	Comment     = require("../models/comment");

var middlewareObj = {};

//We can't compare campground.Author.id and req.user._id with normal operators (i.e: "===" and "==") because campground.Author.id is a mongoose object and req.user._id is a string so mongoose provides a method called ".equals" which is helpful for this operation..
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, campground) => {
			if(err || !campground){
				req.flash("error", "Campground not Found");
				res.redirect("back");
			} else{
				if(campground.Author.id.equals(req.user._id)){
					next();
				} else{
					req.flash("error", "Access Denied! You don't have permission to do that..");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be LoggedIn to do that!!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, comment) => {
			if(err || !comment){
				req.flash("error", "Comment not Found");
				res.redirect("back");
			} else{
				if(comment.author.id.equals(req.user._id)){
					next();
				} else{
					req.flash("error", "Access Denied! You don't have permission to do that..");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be LoggedIn to do that!!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be LoggedIn to do that!!");
	res.redirect("/login");
}

module.exports = middlewareObj;
