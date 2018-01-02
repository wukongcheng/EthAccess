'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/account.db');
const Q = require('q');
const logger = require('../lib/common/winstonlog.js');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS counts (pri TEXT, pub TEXT)");
    //db.run("INSERT INTO counts (pri, pub) VALUES (?, ?)", "6e96bb12e34a762a39bef2bea9355d24a826cebb01f972629a1ce00c2e959a93", "0x34a4c6c5247b20c7affda13b3e3cfb10591cad51");
});

var accountDAO = {};

accountDAO.add = (pri, pub) => {
	var deferred = Q.defer();
   	db.run("INSERT INTO counts (pri, pub) VALUES (?, ?)", [pri, pub], (err) => {
   		if (err) {
            logger.error('Failed to commit ', err);
            deferred.reject(new Error('Failed to commit, err = ', err));
        } else {
            deferred.resolve(pub);
        }
   	});
   	return deferred.promise;
};

accountDAO.query = (pri) => {
    var deferred = Q.defer();
    db.get("SELECT pub FROM counts WHERE pri = ?", [pri], (err, row) => {
        if (err || !row) {
            logger.error('Failed to query by pri = ', err);
            deferred.reject(new Error('Failed to query by pri, err = ', err));
        } else {
            deferred.resolve(row.pub);
        }
    });
    return deferred.promise;
};

module.exports = accountDAO;
