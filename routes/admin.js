/**
 * @swagger
 * resourcePath: /ops
 * description: Certificate operation API
 */ 
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const web3 = require('../lib/common/ethweb.js');
const VError = require('verror');
const Q = require('q');

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.json({"key":"for test"});
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
router.get('/getBlockNumber', function(req, res){
  return web3.getBlockNumber().then((blockNumber)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": blockNumber
          });
    });
});

router.get('/getBlock/:blocknumber', function(req, res){
  let no = req.params.blocknumber;
  return web3.getBlock(no).then((block)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": block
          });
    });
});

router.get('/getAccounts', function(req, res){
  return web3.getAccounts().then((accounts)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": accounts
          });
    });
});

router.get('/getTransaction/:txhash', function(req, res){
  let txhash = req.params.txhash;
  return web3.getTransaction(txhash).then((tx)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": tx
          });
    });
});

module.exports = router;
