/**
 * @swagger
 * resourcePath: /ops
 * description: Certificate operation API
 */ 
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const walletapi = require('../lib/walletapi.js');
const VError = require('verror');
const Q = require('q');

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
router.get('/encodePriKey/:privateKey', function(req, res){
    let privateKey = req.params.privateKey;
    var encodePriKey = walletapi.encodePriKey(privateKey);

	res.json({
	      "result": "success",
	      "errorMsg": null,
	      "errorCode": null,
	      "content": encodePriKey
	});
});

module.exports = router;
