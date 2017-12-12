
var wif = require('wif');
const logger = require('./winstonlog.js');

wif.encodePriKey = (privateKey) => {
    logger.debug('trying to encodePriKey, privateKey = ', privateKey);

    var privateKeyBuf = new Buffer(privateKey, 'hex');
    return wif.encode(128, privateKeyBuf, true);
};

module.exports = wif;