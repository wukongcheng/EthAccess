
var wif = require('wif');

wif.encodePriKey = (privateKey) => {
    logger.debug('trying to encodePriKey, privateKey = ', privateKey);
    return wif.encode(128, privateKey, true);
};

module.exports = wif;