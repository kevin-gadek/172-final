var router = require('express').Router();
var user = require("./userModel");
//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.
router.route('/')
  .get(function(req, res){
	  
	 user.find({}, function(err, docs){
		 if(err){
			 res.send(err);
		 }else{
			 res.json(docs);
		 }

	 });
    console.log('Hey from user!!');
	//res.send("Got a GET request");
  });
  
router.route('/')
	.post(function(req, res){
			var document = {username: req.body.name,
							address: req.body.address};
			document.save(function(err, records){
				res.send('User successfully inserted');
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

