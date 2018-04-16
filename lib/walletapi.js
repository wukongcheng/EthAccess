'use strict';
const config = require('config');
const fs = require('fs');
const Q = require('q');
const logger = require('../lib/common/winstonlog.js');
const web3 = require('../lib/common/ethweb.js');
const util = require('../lib/common/util.js');
const Tx = require('ethereumjs-tx');

logger.info('web3 init-ed');

var walletapi = {};

walletapi.getBalance = (address) => {
    logger.debug('walletapi.getBalance: try to getBalance, address =', address);  
    return web3.eth.getBalance(address);
};

walletapi.newAccount = (pwd) => {
    logger.debug('walletapi.newAccount: try to newAccount, pwd =', pwd);  
    return web3.eth.personal.newAccount(pwd);
};

walletapi.importRawKey = (pri, pwd) => {
    logger.debug('walletapi.importRawKey: try to importRawKey');
    return web3.eth.personal.importRawKey(pri, pwd);
};

walletapi.privateKeyToAccount = (pri) => {
    logger.debug('walletapi.privateKeyToAccount');
    if (pri[0] != '0' || pri[1] != 'x') {
    	pri = '0x' + pri;
    }
    var address = web3.eth.accounts.privateKeyToAccount(pri);

    return address['address'];
};

walletapi.sendRawTransaction = (pri, to, value, data) => {
    logger.debug('walletapi.sendRawTransaction: try to sendRawTransaction');

    var privateKey = new Buffer(pri,'hex');
    var Gas, GasPrice, Number;

    return web3.eth.estimateGas({
        to: to,
        data: data
    }).then((gas) => {
	logger.debug('gas: ' + gas);
	Gas = gas;

        return web3.eth.getGasPrice();    
    }).then((gasPrice) => {
	logger.debug('gasPrice: ' + gasPrice);
	GasPrice = gasPrice;
        var address = web3.eth.accounts.privateKeyToAccount('0x' + pri);
        return web3.eth.getTransactionCount(address.address);
    }).then((number) => {
        var rawTx = {
            nonce: (number+1).toString(16),
            gasPrice: GasPrice, 
            gasLimit: Gas,
            to: to, 
            value: value, 
            data: data
        }

	logger.debug('gas: ' + Gas + '; gasPrice: ' + GasPrice + '; nonce: ' + number ) 
    
        var tx = new Tx(rawTx);
        tx.sign(privateKey);
    
        var serializedTx = tx.serialize();
        //console.log(serializedTx.toString('hex'));
    
        return web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    }).fail((err) => {
        logger.error('Failed to sendRawTransaction err=', err);
    });
};


logger.info('walletapi finished loading');

module.exports = walletapi;
