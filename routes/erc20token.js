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
  
    var balance = erc20.getBalance(address);
    
    res.json({
        "result": "success",
        "errorMsg": null,
        "errorCode": null,
        "content": balance
    });
});