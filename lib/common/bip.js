
var bip = require('bip39');
const logger = require('./winstonlog.js');

bip.entropyToMnemonic = (privateKey) => {
    logger.debug('trying to entropyToMnemonic, privateKey = ', privateKey);

    var mnemonic = bip39.entropyToMnemonic(privateKey);
    return mnemonic;
};

bip.mnemonicToEntropy = (mnemonic) => {
    logger.debug('trying to mnemonicToEntropy, mnemonic = ', mnemonic);

    return bip39.mnemonicToEntropy(mnemonic);
};

module.exports = bip;
