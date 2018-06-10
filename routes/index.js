var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var dbs = require('monk')('mongodb://sandy:sandy444@ds245240.mlab.com:45240/nodeblog');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var db = req.db;
	var posts = db.get('posts');
	
	posts.find({},{},function(err, posts){
		console.log(posts);
		res.render('index', { posts: posts });
	});
});

module.exports = router;
