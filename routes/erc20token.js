/**
 * @swagger
 * resourcePath: /erc20
 * description: erc20 API
 */ 
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const walletapi = require('../lib/contract/erc20.js');
const wif = require('../lib/common/wif.js');
const bip = require('../lib/common/bip.js');
const VError = require('verror');
const Q = require('q');
//const cache = require('memory-cache');
const dao = require('../dao/accountDAO.js')

/**
 * @swagger
 * path: /erc20/getBalance/{address}
 * operations:
 *   - httpMethod: GET
 *     nickname: getBalance
 *     summary: get the balance of the address
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: address
 *         paramType: path
 *         dataType: string
 *         required: true
 */
router.get('/getBalance/:address', function(req, res){
    let address = req.params.address;
  
    return erc20.getBalance(address).then((balance)=>{
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
 * path: /erc20/transfer
 * operations:
 *   - httpMethod: POST
 *     nickname: sendTransaction
 *     summary: send the transaction
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: args
 *         paramType: body 
 *         dataType: accountDAO
 *         description: account private key and password
 *         required: true
 */
router.post('/transfer', function(req, res) {
    let from = req.body.from;
    let to = req.body.to;
    let value = req.body.value;
    let pwd = req.body.pwd;

    return erc20.transfer(from, to, value, pwd).then((hash)=>{ 
        logger.debug('erc20.transfer: txhash = ' + hash);

        res.json({
            "result": "success",
            "errorMsg": null,
            "errorCode": null,
            "content": hash
        });
    }).catch((error) => {
        logger.debug('erc20.transfer: error = ' + error.message);

        res.json({
                "result": "failed",
                "errorMsg": error.message,
                "errorCode": null,
                "content": null
            });
    });
  });
