/**
 * @swagger
 * resourcePath: /ops
 * description: Certificate operation API
 */ 
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlogger.js');
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

module.exports = router;
