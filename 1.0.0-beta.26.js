var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545');

var fs = require("fs");
var path = require('path');
var express = require('express');
var app = express();

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

var server = app.listen(8011, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/getBlockNumber', function(req, res){
	web3.eth.getBlockNumber(function(err,data) {
		if (err)  {
			console.error(err);
		}
		console.log(data);
		res.send(String(data));
	});
});

app.get('/getBlock',function(req, res){
	web3.eth.getBlock(req.query.id, function(err,data) {
		if (err)  {
			console.error(err);
		}
		console.log(data);
		res.send(data);
	});

});

app.get('/getBalance', function(req, res){
	var address = req.query.address;
  	console.log(address);
 	
  	web3.eth.getBalance(address, function(err,data) {
		if (err)  {
			console.error(err);
		}
		console.log(data);
		res.send(data);
	});
});

app.post('/newAccount', function(req, res){
  	web3.eth.personal.newAccount('', function(err,data) {
		if (err)  {
			console.error(err);
		}
		console.log(data);
		res.send(data);
	});
});

app.post('/importRawKey', function(req, res){
  	var pri = req.body.pri;
  	var pwd = req.body.pwd;
  	web3.eth.personal.importRawKey(pri, pwd, function(err,data) {
		if (err)  {
			console.error(err);
		}
		console.log(data);
		res.send(data);
	});
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


