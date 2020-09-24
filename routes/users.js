var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/authenticate', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  if(req.body.username != undefined && req.body.username!="" 
  	&& req.body.username == req.body.password){
      var payload = {
        admin: req.body.username

      }
      //generating token
      var token = jwt.sign(payload,"trainingIsGood", {
        expiresIn: 86400 // expires in 24 hours
      });
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
  }else{
  	res.send({result:'fail', msg:"Incorrect uername or password." });
  }
});

module.exports = router;