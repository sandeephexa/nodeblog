var express = require('express');
var mongo = require('mongodb');
var db = require('monk')('mongodb://sandy:sandy444@ds245240.mlab.com:45240/nodeblog');
var router = express.Router();


router.get('/show/:category', function(req, res, next) {
    var posts = db.get('posts');
    posts.find({'category':req.params.category},{},function(err,posts){
       res.render('index',{
           "title" : req.params.category,
           "posts" : posts

       });
    });
});

/* GET users listing. */
router.get('/add', function(req, res, next) {
       res.render('addcategory',{
           "title" : "Add Category"
    });
});

/* POST users listing. */
router.post('/add', function(req, res, next) {
    
    var name = req.body.name;
   
    // form validation
    req.checkBody('name','name is required');

    // check errors
    var errors = req.validationErrors();

    if(errors){
        res.render('addcategory', {
            "errors" : errors
        });
    }
    else{

        var categories = db.get('categories');
        categories.insert({
            "name": name
            
        }, function(err,posts){
            if(err){
                res.send(err);
            }else{
                req.flash("success" , "category added");
                res.location('/');
                res.redirect('/');
            }
        })
    }




   });

module.exports = router;
