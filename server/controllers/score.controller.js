/**
 * Created by cliff on 8/19/2017.
 */
const Score = require('../models/score');

exports.getScores = function(req, res){
  console.log('Get request for all scores');
  Score.find({})
    .exec(function(err, scores){
      if (err){
        console.log("Error retrieving scores");
      }else {
        res.json(scores);
      }
    });
};

exports.getScore = function(req, res){
  console.log('Get request for a single score');
  Score.findById(req.params.id)
    .exec(function(err, score){
      if (err) {
        console.log("Error retrieving score");
      }else {
        if (!score) {
          res.statusCode = 404;
          console.log("Not FOUND - get")
        }
        res.json(score);
      }
    });
};

exports.getMatchScores = function(req, res){
  console.log('Get request for match scores');
  Score.find({'matchId': req.params.id})
    .exec(function(err, score){
      if (err){
        console.log("Error retrieving match score");
      }else {
        res.json(score);
      }
    });
};

exports.getMatchPlayer = function(req, res){
  console.log('Get request for player-match score');
  Score.find({'matchId': req.params.matchId,'memberId': req.params.memberId})
    .exec(function(err, score){
      if (err){
        console.log("Error retrieving match score");
      }else {
        res.json(score);
        console.log('Response',score);
      }
    });
};

exports.postScore = function(req, res){
  console.log('Post a score', req.body);
  var newScore = new Score();
  newScore.name = req.body.name;
  newScore.memberName = req.body.memberName;
  newScore.cap = req.body.cap;
  newScore.todaysscore = req.body.todaysscore;
  newScore.wonTwoBall = req.body.wonTwoBall;
  newScore.wonOneBall = req.body.wonOneBall;
  newScore.wonIndo = req.body.wonIndo;
  newScore.foursomeIds = req.body.foursomeIds;
  newScore.partnerIds = req.body.partnerIds;
  newScore.matchId  = req.body.matchId;
  newScore.memberId  = req.body.memberId;
  newScore.user = req.body.user;
  newScore.save(function(err, insertedScore){
    if (err){
      console.log('Error saving a new posted score');
    }else{
      res.json(insertedScore);
    }
  });
};


exports.putScore = function(req, res, next){
  console.log('Update a score', req.params.id);
  Score.findByIdAndUpdate(req.params.id,
   req.body)
   .then(function(){
     Score.findOne({_id:req.params.id}).then(function(score){
       res.send(score)
     });
   })
   .catch(function(err){
      err = res.status(400).json('Error: ' + err)
      console.log('Error :', err.statusMessage)
   })
};

exports.deleteScore = function(req, res){
  console.log('Deleting a score');
  Score.findByIdAndRemove(req.params.id, function(err, deletedScore){

    if(err){
      res.send("Error deleting score");
    }else{
      if (!deletedScore) {
        res.statusCode = 404;
        console.log("Not FOUND - delete")
      }
      res.json(deletedScore);
    }
  });
};
