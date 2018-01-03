/**
 * used to configure web3
 * */
const config = require('config');
const ethereumConfig = config.get('app.ethereum');
const logger = require('./winstonlog.js');

const Q = require('q');
logger.debug('init ethereum.js');

var Web3 = require('web3');
var web3 = new Web3(ethereumConfig.url);

logger.info('Web3 provider url', ethereumConfig.url);

web3.getBlockNumber = () => {
    logger.debug('trying to get block number');
    return web3.eth.getBlockNumber();
};

web3.getBlock = (blocknumber) => {
    logger.debug('trying to get block');
    return web3.eth.getBlock(blocknumber);
};

web3.getAccounts = () => {
    logger.debug('trying to get accounts');
    return web3.eth.getAccounts();
};

web3.getTransaction = (txhash) => {
    logger.debug('trying to get transaction');
    return web3.eth.getTransaction(txhash);
};

module.exports = web3;

