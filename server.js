const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const memberController = require('./server/controllers/member.controller');
const matchController = require('./server/controllers/match.controller');
const scoreController = require('./server/controllers/score.controller');
const scorecardController = require('./server/controllers/scorecard.controller');
const passport = require('passport');
const path = require('path');
const port = process.env.PORT || 3000;
//process.env['NODE_ENV'] = 'test';

const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');
const config = require('./server/_config');
const options = { customScopeKey: 'permissions' };
console.log('ENVIRON', app.settings.env, process.env.NODE_ENV);
// *** mongoose *** ///
mongoose.Promise = global.Promise;
// mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
//   if(err) {
//     console.log('Error connecting to the database. ' + err);
//   } else {
//     console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
//   }
// });
var promise = mongoose.connect(config.mongoURI[app.settings.env],{
  useMongoClient: true,
});
promise.then(function(db){
  // if(err) {   ###ADD catch try for promise
  //   console.log('Error connecting to the database. ' + err);
  // } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  // }
});
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure API to accept RS256 signed tokens
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://roch.auth0.com/.well-known/jwks.json"
  }),
  aud: 'http://localhost:4200/home',
  issuer: "https://roch.auth0.com/",
  algorithms: ['RS256']
});

app.use(jwtCheck);
var router = express.Router();

// Create endpoint handlers for /members
router.route('/members')
  .post(jwtCheck,  jwtAuthz(['create:member'], options), memberController.postMember)
  .get(jwtCheck, jwtAuthz(['read:members'], options), memberController.getMembers)
  ;

// Create endpoint handlers for /members/_id
router.route('/members/:id')
  .get(jwtCheck, jwtAuthz(['read:members'], options), memberController.getMember)
  .put(jwtCheck, jwtAuthz(['create:member'], options), memberController.putMember)
  .delete(jwtCheck, jwtAuthz(['remove:member'], options), memberController.deleteMember);


router.route('/matches')
  .post(jwtCheck, jwtAuthz(['create:match'], options), matchController.postMatch)
  .get(jwtCheck, jwtAuthz(['read:matches'], options), matchController.getMatches);

// Create endpoint handlers for /matches/_id
router.route('/matches/:id')
  .get(jwtCheck, jwtAuthz(['read:matches'], options), matchController.getMatch)
  .put(jwtCheck, jwtAuthz(['create:match'], options), matchController.putMatch)
  .delete(jwtCheck, jwtAuthz(['remove:match'], options), matchController.deleteMatch);

router.route('/scores')
  .post(jwtCheck, jwtAuthz(['create:score'], options), scoreController.postScore)
  .get(jwtCheck, jwtAuthz(['read:scores'], options), scoreController.getScores);
  // .post(jwtCheck, checkScopes, jwtAuthz(['create:score']), scoreController.postScore)

// Create endpoint handlers for /scores/_id
router.route('/scores/:id')
  .get(jwtCheck,  jwtAuthz(['read:scores'], options), scoreController.getScore)
  .put(jwtCheck, jwtAuthz(['create:score'], options), scoreController.putScore)
  .delete(jwtCheck, jwtAuthz(['remove:score'], options), scoreController.deleteScore);

router.route('/scoresByMatch/:id')
 .get(scoreController.getMatchScores);

router.route('/scoresByMatchPlayer/:matchId/:memberId')
  .get(scoreController.getMatchPlayer);

router.route('/scorecards')
  .post(jwtCheck, jwtAuthz(['create:scorecard'], options), scorecardController.postScorecard)
  .get(jwtCheck, jwtAuthz(['read:scorecards'], options), scorecardController.getScorecards);
  // .get( scorecardController.getScorecards);
// Create endpoint handlers for /scorecards/_id
router.route('/scorecards/:id')
  .get(jwtCheck, jwtAuthz(['read:scorecards'], options), scorecardController.getScorecard)
  .put(jwtCheck, jwtAuthz(['create:scorecard'], options), scorecardController.putScorecard)
  .delete(jwtCheck, jwtAuthz(['remove:scorecard'], options), scorecardController.deleteScorecard);


// Register all our routes with /api
app.use('/api', router);

app.get('*', function(req, res) {
  res.status(404);
  res.send("No such path in this API");
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

//
// app.get('/authorized', function (req, res) {
//   res.send('Secured Resource');
// });

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});
