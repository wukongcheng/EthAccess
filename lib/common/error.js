'use strict';
const VError = require('verror');

var error = {};

error.InvalidArgument = (name) => {
    return new VError({
        'name' : 'InvalidArgument',
        'info': {
            'errno': 400,
        }
    }, 'Invalid Argument "%s"', name);
}

error.EmptyArgument = (name) => {
    return new VError({
        'name' : 'EmptyArgument',
        'info': {
            'errno': 400,
        }
    }, 'Argument "%s" can not be empty.', name);
}

error.DuplicatedFile = (textHash) => {
    return new VError({
        'name' : 'DuplicatedFile',
        'info': {
            'errno': 400,
        }
    }, 'FileHash="%s"', textHash);
}

error.AlreadyProcessing = (txHash) => {
    return new VError({
        'name' : 'AlreadyProcessing',
        'info': {
            'errno': 400,
        }
    }, 'Already Processing');
}

error.FileNotFound = () => {
    return new VError({
        'name' : 'FileNotFound',
        'info': {
            'errno': 400,
        }
    }, 'File Not Found');
}

error.InternalError = () => {
    return new VError({
        'name' : 'InternalError',
        'info': {
            'errno': 500,
        }
    }, 'Internal Error');
}

error.DatabaseUnavailable = () => {
    return new VError({
        'name' : 'DatabaseUnavailable',
        'info': {
            'errno': 500,
        }
    }, 'Database Unavailable');
}

module.exports = error;