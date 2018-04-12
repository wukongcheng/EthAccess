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

walletapi.sendRawTransaction = (pri, gasPrice, to, value, data) => {
    logger.debug('walletapi.sendRawTransaction: try to sendRawTransaction');

    var privateKey = new Buffer(pri,'hex')

    var rawTx = {
        nonce: '0x00',
        gasPrice: gasPrice, 
        gasLimit: '0x2710',
        to: to, 
        value: value, 
        data: data
    }

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();
    //console.log(serializedTx.toString('hex'));

    return web3.eth.sendRawTransaction(serializedTx.toString('hex'));
};

logger.info('walletapi finished loading');

module.exports = walletapi;
