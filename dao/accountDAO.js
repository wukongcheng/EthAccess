'use strict';
const config = require('config');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../data/account.db');
const Q = require('q');
const logger = require('../../lib/common/winstonlog.js');
const Error = require('../../lib/common/error.js');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS counts (pri TEXT, pub TEXT)");
    db.run("INSERT INTO counts (pri, pub) VALUES (?, ?)", "6e96bb12e34a762a39bef2bea9355d24a826cebb01f972629a1ce00c2e959a93", "0x34a4c6c5247b20c7affda13b3e3cfb10591cad51");
});

var accountDAO = {};

accountDAO.add = (pri, pub) => {
    return Q(db.run("INSERT INTO counts (pri, pub) VALUES (?, ?)", pri, pub));
};

accountDAO.query = (pri) => {
    return Q(db.get("SELECT pub FROM counts WHERE pri = ?", "6e96bb12e34a762a39bef2bea9355d24a826cebb01f972629a1ce00c2e959a93"));
};

module.exports = accountDAO;
