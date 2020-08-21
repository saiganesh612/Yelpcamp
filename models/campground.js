var mongoose = require("mongoose");
// DB Schema setup
// With this we are going to figure out our data in which it should looks like
var campgroundSchema = new mongoose.Schema({
	Name: String,
	Price: String,
	Image: String,
	Description: String,
	Author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// Now we are going to model our data such that we can use different methods like .find(), .create() etc
module.exports = mongoose.model("Campground", campgroundSchema);
                            		// |-> mongoose will change this to plural (campgrounds) 
