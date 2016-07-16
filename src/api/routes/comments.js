var express = require('express');
var router = express.Router();
var request = require("request");

function getComments(sort, cb) {

  var redditUrl = 'https://reddit.com';
  var userPath     = 'user';
  var user   = 'poem_for_your_sprog';
  var commentsPath = 'comments.json';
  var url = [redditUrl, userPath, user, commentsPath].join('/'); 

  url = [url, '?raw_json=1'].join('')

  if(sort){
    var query = 'sort='+sort
    url = [url, query].join('&') 
  }

  request(url, function (error, response, body) {
    cb(error, response, body)
  });
}


router.get('/', function(req, res) {

  var sort = req.query['sort'] || null;


  try{
    getComments(sort, function (error, response, body) {
      

      if (error) {
        console.log("We’ve encountered an error: " + error);
      }

      res.json({ comments: JSON.parse(body).data.children })
    })
  }catch(e){
    res.status(500).json({ message: "Yeeeeaah something broke, my bad... Try again, or maybe don't." })
  }

});

module.exports = router;
