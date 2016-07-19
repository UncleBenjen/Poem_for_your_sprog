var express = require('express');
var router = express.Router();
var request = require("request");

function getParentComment(subreddit, thread_id, thread_name, comment_id, cb) {

  var redditUrl 	= 'https://reddit.com';
  var subredditPath	= 'r';
  var commentsPath	= 'comments'
  var url 			= [redditUrl, subredditPath, subreddit, commentsPath, thread_id, thread_name, comment_id].join('/'); 
  url 				= [url, '.json?raw_json=1&depth=1'].join('')


  request(url, function (error, response, body) {
    cb(error, response, body)
  });
}


router.get('/:subreddit/:thread_id/:thread_name/:comment_id', function(req, res) {

  try{
    getParentComment(req.params.subreddit,req.params.thread_id,req.params.thread_name,req.params.comment_id, function (error, response, body) {

      if (error) {
        console.log("We’ve encountered an error: " + error);
      }

      res.json({ comment: JSON.parse(body)[1].data.children[0].data })
    })
  }catch(e){
    res.status(500).json({ message: "Yeeeeaah something broke, my bad... Try again, or maybe don't." })
  }

});

module.exports = router;
