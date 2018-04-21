'use strict';
const config = require('config');
const fs = require('fs');
const Q = require('q');
const logger = require('../common/winstonlog.js');
const web3 = require('../common/ethweb.js');
const util = require('../common/util.js');
const Tx = require('ethereumjs-tx');

logger.info('web3 init-ed');

var erc20 = {};

// var erc20ContractList[]

// config/contract/msertoken.js
var contract = new web3.eth.Contract([ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_value", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "keys", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Burn", "type": "event" } ], "0x43f4303ccccb57bec7da6bef520f228385c77b08");

erc20.getBalance = (address) => {
    return contract.methods.balanceOf(address).call();
};

erc20.transfer = (from, to, value, pwd) => {
    logger.debug('erc20.tranfer: try to send tranfer Transaction');
    logger.debug('from: ' + from + ',  to: ' + to + ',  value: ' + value + ',  pwd: ' + pwd);

    return web3.eth.personal.unlockAccount(from, pwd).then((result) => {
        logger.debug('erc20.tranfer: unlockAccount ' + result);

        var deferred = Q.defer();
        contract.methods.transfer(to, value).send(
            {from: from}, 
            function(error, hash){
            if (error) 
                deferred.reject(error);
            else
                deferred.resolve(hash);
        });

        return deferred.promise;
    });
};

erc20.rawTransfer = (pri, to, value) => {
    logger.debug('walletapi.sendRawTransaction: try to sendRawTransaction');

    var privateKey = new Buffer(pri,'hex');
    var Gas, GasPrice;
    var address = web3.eth.accounts.privateKeyToAccount('0x' + pri);

    return contract.methods.transfer(to, value).estimateGas({from:address.address}).then((gas) => {
        logger.debug('gas: ' + gas);
        Gas = gas;

        return web3.eth.getGasPrice();
    }).then((gasPrice) => {
        logger.debug('gasPrice: ' + gasPrice);
        GasPrice = gasPrice;

        logger.debug('from: ' + address.address);
        return web3.eth.getTransactionCount(address.address);
    }).then((number) => {
        logger.debug('0x' + (number).toString(16)); 
        logger.debug('0x' + (parseInt(GasPrice)).toString(16));
        logger.debug('0x' + Gas.toString(16));
        logger.debug(to + ' : ' + typeof(to));
        logger.debug('0x' + value.toString(16));

        var data = contract.methods.transfer(to, value).encodeABI();
        logger.debug(data);

        var rawTx = {
            nonce: '0x' + (number).toString(16),
            gasPrice: '0x' + (parseInt(GasPrice)).toString(16), 
            gasLimit: '0x' + Gas.toString(16),
            to: contract.options.address, 
            value: '0x0', 
            data: data
        }

        var tx = new Tx(rawTx);
        tx.sign(privateKey);
    
        var serializedTx = tx.serialize();
        logger.debug(serializedTx.toString('hex'));
    
        var deferred = Q.defer()

        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(error, hash) {
            logger.debug('txhash: ' + hash);

            if (error) 
                deferred.reject(error);
            else
                deferred.resolve(hash);
        });

        return deferred.promise;
    });
};

logger.info('erc20 api finished loading');

module.exports = erc20;