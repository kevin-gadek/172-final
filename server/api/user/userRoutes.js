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
			 res.send(err);
		 }else{
			 res.json(data);
		 }

	 });
    console.log('Hey from user!!');
	//res.send("Got a GET request");
  });
 
router.route('/')
	.post(function(req, res){
			var document = {username: req.body.name,
							address: req.body.address};
			var account = new user(document);
			document.save(function(err, records){
				res.send('User successfully inserted');
			});
	});
//working
router.route('/:user_id')
	.get(function(req, res){
		var id = req.params.user_id;
		user.findById(id, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.json(data);
			}
		});
	});
  
  
  //error-handling middleware
router.get('*', function(req, res, next){
	var err = new Error();
	err.status = 404;
	next(err);
});  
  

router.use(function(err, req, res, next){
	if(err.status !== 404){
		return next();
	}else{
		
		res.send("Page not found");
	}
})
  
module.exports = router;

