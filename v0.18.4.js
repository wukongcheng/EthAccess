var fs = require("fs");
var path = require('path');
var express = require('express');
var Web3 = require('web3');
var app = express();
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:8545"));
//web3.setProvider(new web3.providers.HttpProvider("https://api.myetherapi.com/eth"));

var bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'));

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};
app.use(allowCrossDomain);

app.get('/getMsg', function(req, res){
  res.send(web3.eth.coinbase + "    " + web3.eth.blockNumber + "    " + web3.eth.accounts);
});

app.get('/getBlock',function(req, res){
  var block = web3.eth.getBlock(req.query.id);
  res.send(block);
});

app.post('/newAccount', function(req, res){
  res.send(web3.personal.newAccount(''));
});

app.get('/getBalance', function(req, res){
  var address = req.query.address;
  console.log(address);
  var balance = web3.eth.getBalance(address);
  res.send(balance);
});

app.get('/getPriKeys', function(req, res){
  var p = "/Users/chengsilei/ethereum/eth/test/keystore/";
  var keys = new Array();
  var i = 0;

  fs.readdir(p,function(err, files){
    if (err) {
      console.error(err);
    }
    files.forEach(function(file) {
      filepath = path.join(p,file);

      fs.readFile(filepath, function (err, data) {
        if (err) {
           return console.error(err);
        }
        keys[i++] = data.toString();
        
        if (i == files.length) {
          res.send(keys.toString());
        }
      });

    });
    
  });
});

app.get('/getPriKeyByAddress', function(req, res){
  var p = "/Users/chengsilei/ethereum/eth/test/keystore/";
  var address = req.query.address;
  if (address[0] == '0' && address[1] == 'x') {
    address = address.slice(2);
    console.log(address);
  }

  fs.readdir(p,function(err, files){
    if (err) {
      console.error(err);
    }
    files.forEach(function(file) {
      l = file.split("--");
      if (l[l.length-1] == address) {
        filepath = path.join(p,file);

        fs.readFile(filepath, function (err, data) {
          if (err) {
             return console.error(err);
          }
          
          res.send(data.toString());
        });
      }
    });
    
  });
    
});


var server = app.listen(8011, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
