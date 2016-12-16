var router = require('express').Router();
var user = require("./userModel");
//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

//working
router.route('/')
  .get(function(req, res){
	  
	 user.find({}, function(err, data){
		 if(err){
			 res.send(err.stack);
		 }else{
			 res.json(data);
		 }

	 });
    console.log('Hey from user!!');
	//res.send("Got a GET request");
  });
  
 //working
router.route('/')
	.post(function(req, res){
			var userData = {username: req.body.name,
							address: req.body.address};
			var account = new user(userData);
			account.save(function(err, records){
				if(err){
					res.send(err.stack);
				}else{
					res.send('User successfully inserted');
				}
			});
	});
	
//working
router.route('/:user_id')
	.get(function(req, res){
		var id = req.params.user_id;
		user.findById(id, function(err, data){
			if(err){
				res.send(err.stack);
			}else{
				res.json(data);
			}
		});
	});
//working
router.route('/:user_id')
		.put(function(req, res){
			var id = req.params.user_id;
			var updateData = {username: req.body.name,
							  address: req.body.address};
			var updatedAccount = new user(updateData);
			var upsertData = updatedAccount.toObject(); //object cast error without this line
			delete upsertData._id; 
			user.update({_id: id}, upsertData, {upsert: true}, function(err, data){
				if(err){
					res.send(err.stack); //will probably send a cast error as res if id not found
				}else{
					res.send("User successfully updated");
				}
			});
			
		});
		
//working
router.route('/:user_id')
		.delete(function(req, res){
			var id = req.params.user_id;
			user.remove({_id: id}, function(err){
				if(err){
					res.send(err.stack);
				}else{
					res.send("User successfully deleted");
				}
				
			});
			
			
			
		});
  
  //if request for anything else not part of routes specified above; for instance localhost:8080/api/users/dajs/321 will return "Page not found"
  
  //error-handling middleware functions
router.get('*', function(req, res, next){
	var err = new Error();
	err.status = 404;
	next(err);
});  
  

router.use(function(err, req, res, next){
	console.log(err.stack);
	if(err.status == 404){
			res.send("Page not found");
	}
	if(err.status == 500){
			res.send({"Error": err.stack});
	}
	/*
	if(err.status !== 404){
		return next();
	}else{
		
		res.send("Page not found");
	}
	*/
})
  
module.exports = router;

