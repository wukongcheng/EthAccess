
var wif = require('wif');
const logger = require('./winstonlog.js');

wif.encodePriKey = (privateKey, token) => {
    logger.debug('trying to encodePriKey, privateKey = ', privateKey);
    var privateKeyBuf = new Buffer(privateKey, 'hex');

    if(token == 'BTC' || token == 'QTUM' || token == 'ETH') {
    	return wif.encode(128, privateKeyBuf, true);
    }
    else if(token == 'LTC') {
    	return wif.encode(176, privateKeyBuf, true);
    }
};

module.exports = wif;
