'use strict';
const config = require('config');
const fs = require('fs');
const Q = require('q');
const cache = require('memory-cache');
const logger = require('../lib/common/winstonlog.js');
const web3 = require('../lib/common/ethweb.js');
const util = require('../lib/common/util.js');

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
    var address = web3.eth.personal.importRawKey(pri, pwd);

    cache.put(pri, address);
    return address;
};


walletapi.getAddress = (pri) => {
    logger.debug('walletapi.getAddress: try to getAddress');  
    return cache.get(pri);
};

logger.info('walletapi finished loading');

module.exports = walletapi;
