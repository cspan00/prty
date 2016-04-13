require('dotenv').load()
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var request = require('request');
var jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary');
var fs = require('fs')
var multer = require('multer')
var upload = multer({dest: './'})
var twilio = require('twilio')
var client = new twilio.RestClient(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var moment = require("moment")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,

});


function Users(){
  return knex('users')
}
function Parties(){
  return knex('parties')
}
function Images(){
  return knex('images')
}
function createToken(user){
  return jwt.sign(user, process.env.TOKEN_SECRET)
}
function verifyToken(user){
  return jwt.verify(user, process.env.TOKEN_SECRET)
}

function sendSMS(number, url){
  client.messages.create({
    to:'+1'+number,
    from:'+15168742608',
    body: url
}, function(error, message) {
    if (error) {
        console.log(error.message);
    }
  });
}


router.post('/auth/facebook', function(req,res){
  var fields = ['id', 'email', 'first_name', 'last_name', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
  code: req.body.code,
  client_id: req.body.clientId,
  client_secret: process.env.FACEBOOK_CLIENT_SECRET,
  redirect_uri: req.body.redirectUri
 };
   request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: accessToken.error.message });
      }
      request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (response.statusCode !== 200) {
          return res.status(500).send({ message: profile.error.message });
        }
          var user = {}
          user.facebook_id = profile.id
          user.email = profile.email
          user.first_name = profile.first_name
          user.last_name = profile.last_name
          user.name = profile.name;
          var token = createToken(user)
          Users().insert(user)
            .catch(function(error){
              console.log(error);
            }).then(function(){
              res.send({token: token})
              res.redirect('/prtymain')
            })

      })
    });
})

router.post('/user', function(req,res){
    var token = req.body.token
    var user = verifyToken(token)
    Users().where('facebook_id', user.facebook_id).first().then(function(result){
    res.send(result)
  })
})

router.post('/new', function(req, res){
  var party = {}
  party.facebook_id = req.body.facebook_id;
  party.new = req.body.new;
  party.created_at = new Date();
  Parties().insert(party).then(function(result){
    res.send('new party created');
  })

})

//get the current newest party id for the user, and then toggle new to false
router.get('/new/:facebook_id', function(req, res){
  Parties().where({facebook_id: req.params.facebook_id, new: true}).select('id').then(function(result){
    res.send(result)
    Parties().where({facebook_id: req.params.facebook_id, new: true}).update({new: false}).then(function(result){
      res.status(200)
    });

  })
})

router.post('/new/img', upload.single('file'), function(req, res){
  cloudinary.uploader.upload(req.file.filename, function(result){
    var id = req.body.party_id
    var img = {};
    img.party_id = req.body.party_id;
    img.image_url = result.secure_url;
    Images().insert(img).then(function(result){
      res.redirect("/#/mobile/"+id)
    })
    fs.unlink('./'+req.file.filename)
  })
})

router.get('/pics/:id', function(req, res){
  Images().select('*').where('party_id', req.params.id).then(function(result){
    res.send(result)
  })
})

router.get('/random', function(req, res){
  request('https://randomuser.me/api/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    res.send(body) // Print the google web page.
  }
})
})

router.get('/userpics/:id', function(req, res){
  Images().select('image_url').innerJoin('parties', 'images.party_id', '=', 'parties.id').andWhere('parties.facebook_id', req.params.id).then(function(result){
    res.send(result)
  })
})

router.post('/text', function(req, res){
   var url = req.body.url
   var numbers = [req.body.number1, req.body.number2, req.body.number3]
   numbers.forEach(function(elem, i){
     sendSMS (elem, url)
   })

})

router.post('/old', function(req, res){
    Parties().where('facebook_id', req.body.facebook_id).then(function(result){
      res.send(result)
    })
})







module.exports = router;
