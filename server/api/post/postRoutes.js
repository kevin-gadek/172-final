var router = require('express').Router();
//var post = require("./postModel");
// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){

    console.log('Hey from post!!');
  });

module.exports = router;
