'use strict';

var util = {};

util.ts = () => {
    return (Math.floor(new Date() / 1000));
};

util.millits = () => {
    return new Date().getTime();
};

module.exports = util;
