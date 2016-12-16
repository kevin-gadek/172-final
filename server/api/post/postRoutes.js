var router = require('express').Router();
var post = require("./postModel");

//working
//.populate('author', 'categories') doesn't seem to work 
router.route('/')
  .get(function(req, res){
	post.find({})
	.populate('author')
	.populate('categories')
	.exec(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.json(data);
		}
	});
    console.log('Hey from post!!');
  });
  
  //ehh, works enough, seems to sometimes overwrite existing posts though
  router.route('/')
	.post(function(req,res){
		var postData = {title: req.body.title,
						text: req.body.text,
						author: req.body.author,
						categories: req.body.category} //single category can be POSTed
		var userPost = new post(postData);
		userPost.save(function(err, records){
			if(err){
				res.send(err);
			}else{
				res.send("Post added successfully");
			}
		});
	});
	
	router.route('/:post_id')
		.get(function(req, res){
			var id = req.params.post_id;
			post.findById(id, function(err, data){
				if(err){
					res.send(err);
				}else{
					res.json(data);
				}
				
			});
			
			
		});
		
router.route('/:post_id')
	.put(function(req, res){
		var id = req.params.post_id;
		var updateData = {title: req.body.title,
						  text: req.body.text,
						  author: req.body.author,
						  categories: req.body.category}; //messy with multiple categories
		var updatePost = new post(updateData); //create new post
		var upsertData = updatePost.toObject();
		delete upsertData._id;
		post.update({_id: id}, upsertData, {upsert:true}, function(err, data){
			if(err){
				res.send(err);
			}else{
				res.send("Post updated successfully");
			}
			
		});
		
	});
// /:post_id DELETE request
router.route('/:post_id')
	.delete(function(req, res){
		var id = req.params.post_id;
		post.remove({_id: id}, function(err){
			if(err){
				res.send(err);
			}else{
				res.send("Post deleted successfully")
			}
		});
		
		
	});
//error handlers		
//if any other page other than ones above, this function gets called
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
