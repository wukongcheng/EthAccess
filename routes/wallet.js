/**
 * @swagger
 * resourcePath: /ops
 * description: Certificate operation API
 */ 
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const walletapi = require('../lib/walletapi.js');
const wif = require('../lib/common/wif.js');
const bip = require('../lib/common/bip.js');
const VError = require('verror');
const Q = require('q');
//const cache = require('memory-cache');
const dao = require('../dao/accountDAO.js')

/**
 * @swagger
 * path: /ops/getBlockNumber
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlockNumber
 *     summary: get the block number of the blockchain
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: none
 */
router.get('/getBalance/:address', function(req, res){
  let address = req.params.address;

  return walletapi.getBalance(address).then((balance)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": balance
          });
    });
});

/**
 * @swagger
 * path: /ops/getBlockNumber
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlockNumber
 *     summary: get the block number of the blockchain
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: none
 */
router.get('/newAccount/:pwd', function(req, res){
  let pwd = req.params.pwd;

  return walletapi.newAccount(pwd).then((address)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": address
          });
    });
});

/**
 * @swagger
 * path: /ops/getBlockNumber
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlockNumber
 *     summary: get the block number of the blockchain
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: none
 */
router.get('/encodePriKey/:privateKey/:token', function(req, res){
    let privateKey = req.params.privateKey;
    let token = req.params.token;
    var encodePriKey = wif.encodePriKey(privateKey, token);

	res.json({
	      "result": "success",
	      "errorMsg": null,
	      "errorCode": null,
	      "content": encodePriKey
	});
});

/**
 * @swagger
 * path: /ops/getBlockNumber
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlockNumber
 *     summary: get the block number of the blockchain
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: none
 */
router.post('/importRawKey', function(req, res){
  let pri = req.body.pri;
  let pwd = req.body.pwd;

  return walletapi.importRawKey(pri, pwd).then((address)=>{
  		  //cache.put(pri, address);
        return dao.add(pri, address);
    }).then((result)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": result
          });
    }).catch((error) => {
       res.json({
              "result": "failed",
              "errorMsg": error.message,
              "errorCode": null,
              "content": null
          });
     });
});


router.get('/getAddress/:pri', function(req, res){
  let pri = req.params.pri;

  return dao.query(pri).then((address)=>{
    res.json({
      "result": "success",
      "errorMsg": null,
      "errorCode": null,
      "content": address
    });
  }).catch((error) => {
     res.json({
            "result": "failed",
            "errorMsg": error.message,
            "errorCode": null,
            "content": null
        });
   });
});

router.get('/privateKeyToAccount/:pri', function(req, res){
  let pri = req.params.pri;

	res.json({
	  "result": "success",
	  "errorMsg": null,
	  "errorCode": null,
	  "content": walletapi.privateKeyToAccount(pri)
	});
});

/**
 * @swagger
 * path: /ops/getBlockNumber
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlockNumber
 *     summary: get the block number of the blockchain
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: none
 */
router.get('/entropyToMnemonic/:privateKey', function(req, res){
    let privateKey = req.params.privateKey;
    var mnemonic = bip.getMnemonic(privateKey);

	res.json({
	      "result": "success",
	      "errorMsg": null,
	      "errorCode": null,
	      "content": mnemonic
	});
});

/**
 * @swagger
 * path: /ops/getBlockNumber
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlockNumber
 *     summary: get the block number of the blockchain
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: none
 */
router.get('/mnemonicToEntropy/:mnemonic', function(req, res){
    let mnemonic = req.params.mnemonic;
    var privateKey = bip.getEntropy(mnemonic);

	res.json({
	      "result": "success",
	      "errorMsg": null,
	      "errorCode": null,
	      "content": privateKey
	});
});


router.post('/sendRawTransaction', function(req, res){
    let pri = req.body.pri;
    let to = req.body.to;
    let value = req.body.value;
    let data = req.body.data;
  
    return walletapi.sendRawTransaction(pri, to, value, data).then((hash) => {
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
          });
    }).catch((error) => {
	    res.json({
              "result": "failed",
              "errorMsg": error.message,
              "errorCode": null,
              "content": null
          });
	});
  });

router.post('/sendTransaction', function(req, res) {
    let from = req.body.from;
    let to = req.body.to;
    let value = req.body.value;
    let pwd = req.body.pwd;

    return walletapi.sendTransaction(from, to, value, pwd).then((hash)=>{ 
        logger.debug('walletapi.sendTransaction: txhash = ' + hash);

        res.json({
            "result": "success",
            "errorMsg": null,
            "errorCode": null,
            "content": hash
        });
    }).catch((error) => {
        logger.debug('walletapi.sendTransaction: error = ' + error.message);

        res.json({
                "result": "failed",
                "errorMsg": error.message,
                "errorCode": null,
                "content": null
            });
    });
  });

module.exports = router;
