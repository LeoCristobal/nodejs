const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const fsPromises = require('fs').promises
const fs = require('fs')

async function LogEvents(message) {
    const dateTime = `${format(new Date(), 'MM/dd/yyyy\tHH:mm:ss\t')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    console.log(logItem);

    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    try {
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', 'log.txt'), logItem);
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    LogEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.url}`);
    next();
}
module.exports = { LogEvents, logger };