var winston = require('winston');
var rotate=require('winston-daily-rotate-file');
var fs = require('fs');
const formatter = (()=>{
    const options = {
        timezone: process.env.TZ ||'Asia/Shanghai', 
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12:false
    };
    return new Intl.DateTimeFormat('en-AU', options);
})();
const tsFormat = () =>( formatter.format(new Date()));

const logDir = (()=>{
    let logDirName = __dirname + '/../../logs/';
    if (!fs.existsSync(logDirName)) {
          fs.mkdirSync(logDirName);
    }
    return logDirName;
})();

var logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({ json: false, timestamp: tsFormat, level: process.env.NODE_ENV === 'production' ? 'error':'debug' }),
        new winston.transports.DailyRotateFile({name:'full-log', timestamp: tsFormat, filename: logDir + '/certificate.log', prepend: true, json: false, level: process.env.NODE_ENV === 'production' ? 'info':'debug' }),
        new winston.transports.DailyRotateFile({name:'error-log', timestamp: tsFormat, filename: logDir + '/certificate-error.log', prepend:true, json: false, level:'error' })
      ],
      exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: tsFormat }),
        new winston.transports.DailyRotateFile({name:'exceptions-log', timestamp: tsFormat, filename: logDir + '/exceptions.log', prepend: true, json: false })
      ],
      exitOnError: false
});

module.exports = logger;
