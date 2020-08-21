var express 	= require("express"),
	router  	= express.Router({mergeParams: true}),
	Campground  = require("../models/campground"),
	Comment     = require("../models/comment"),
	middleware = require("../middleware");

// COMMENTS ROUTES
                  //NEW ROUTE                 
router.get("/new", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});	
		}
	});
});

                  //CREATE ROUTE
router.post("/", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment, (err, comment) => {
				if(err){
					req.flash("error", "Something went wrong!!")
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Woow! You ended with a new comment!!")
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

                     // EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err || !campground){
			req.flash("error", "Campground not Found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, (err, comment) => {
			if(err){
				res.redirect("back");
			} else {
				res.render("comments/edit", {campground_id: req.params.id, comment: comment});
			}
		})
	});
});

                    // UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

                    // DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndRemove(req.params.comment_id, err => {
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted Successfully!!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;
