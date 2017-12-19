
var bip = require('bip39');
const logger = require('./winstonlog.js');

bip.getMnemonic = (privateKey) => {
    logger.debug('trying to entropyToMnemonic, privateKey = ', privateKey);

    var mnemonic = bip.entropyToMnemonic(privateKey);
    return mnemonic;
};

bip.getEntropy = (mnemonic) => {
    logger.debug('trying to mnemonicToEntropy, mnemonic = ', mnemonic);

    return bip.mnemonicToEntropy(mnemonic);
};

module.exports = bip;
