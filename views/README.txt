DB--> DataBase
  -> It is used to store any type of data.
  -> And it provides an interface to interact with the data with the code written by us.
  -> This is the main difference between Array's, Object's, and DataBase... 

-> db.collections.drop()
	--> This method will remove all data from the database.
	--> We can use this method when we want to change the whole data and doesn't care with the previous data.

RESTFUL Routes
-> REST - A mapping between HTTP Routes and CRUD.
-> When we are creating the routes we need to follow these RESTFUL routes because this is much more effective and easy way of creating routes without confussion...
-> We need to follow these according to the given below...
-> The path mentioned below is relative you can keep any name as you like to define a route.
-> Their are total of 7 RESTFUL Routes.

  RESTFUL ROUTES
  
  Name         Path         HTTP Verb             Purpose                                Mongoose Method
========================================================================================================
  INDEX      /dogs            GET      Display the list of all dogs                     Dog.find()
  NEW        /dogs/new        GET      Displays form to make new dog                       N/A
  CREATE     /dogs            POST     Add new dog to the DB                            Dog.create()
  SHOW       /dogs/:id        GET      show info of a particular dog based on id       Dog.findById()
  EDIT       /dogs/:id/edit   GET      show edit form for a particular dog             Dog.findById()
  UPDATE     /dogs/:id        PUT      update a particular dog and redirect -
                                                somewhere                       Dog.findByIdAndUpdate()
  DESTROY    /dogs/:id        DELETE   delete a particular dog and redirect -
                                                somewhere                       Dog.findByIdAndRemove()
  
Sample example of how to create the data and save into a particular DataBase!!!!

		Campground.create({
				Name: "Salmon Creek", 
				Image: "https://encrypted-tbn0.gstatic.com/imageq?q=tbn%3AANd9GcSRexEbT8xcKY_yVhujmwGdhwrtv57WYLPfZQ&usqp=CAU"
			}, (err, campground) => {
			if(err){
				console.log(err);
			}else{
				console.log("New CAMPGROUND was added.....");
				console.log(campground);
			}
		});

