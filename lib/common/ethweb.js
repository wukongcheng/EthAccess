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

module.exports = web3;

