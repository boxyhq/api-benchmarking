const moment = require("moment");
var Promise = require("bluebird");
var ParallelRequest = Promise.promisifyAll(require('parallel-http-request'));
var request = new ParallelRequest({ response: "simple" });
var options = {}, startTime = [];
let lastTime = 0, currTime = 0;
let timer = setInterval(() => {
    currTime += 10;
}, 10);
const getTimeElasped = () => {
    let seconds = (currTime - lastTime) / 1000;
    lastTime = currTime;
    return seconds;
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

let reqInfo = {}, printsPerReq, wsId, responses = 0, totalFailed = 0;

//Options
let reqFile = process.argv.length >= 3 ? process.argv[2] : 'hermes.ingest';
if (!reqFile) {
    console.warn("Request file and method required!");
    process.exit(1);
} else {
    let parts = reqFile.split('.');
    if (parts.length === 1) {
        console.warn("Request file and method required!");
        process.exit(1);
    } else {
        reqInfo.file = parts[0];
        reqInfo.func = parts[1];
    }
}

let type = process.argv.length >= 4 ? process.argv[3] : "onetime";

switch (type) {
    case "onetime":
        options.type = type;
        let reqPerBatch = process.argv.length >= 5 ? parseInt(process.argv[4]) : 10;
        options.reqPerBatch = reqPerBatch;
        let numOfBatches = process.argv.length >= 6 ? parseInt(process.argv[5]) : 2;
        options.numOfBatches = numOfBatches;

        break;
    case "incr":
        options.type = type;
        let start = process.argv.length >= 5 ? parseInt(process.argv[4]) : 10;
        options.start = start;
        let increment = process.argv.length >= 6 ? parseInt(process.argv[5]) : 2;
        options.increment = increment;
        let end = process.argv.length >= 7 ? parseInt(process.argv[6]) : 20;
        options.end = end;
        break;
    default:
        console.warn("Invalid benchmarking type", type);
        process.exit(1);
}

const sendRequests = async () => {
    try {
        let reqFactory = require(`./requests/${reqInfo.file}`)[reqInfo.func];
        let pool = [], responses = 0, totalFailed = 0, requestCount = 0;
        if(options.type === "onetime") {
            requestCount = options.numOfBatches * options.reqPerBatch;
            for(let i = 0; i < options.numOfBatches; i++) {
                //Create batch
                for(let j = 0; j < options.reqPerBatch; j++) {
                    request.add(reqFactory());
                    sleep(1);
                }
                //Send batch to endpoint
                startTime.push(new Date());
                request.send(async (response) => {
                    let filter = response.filter(r => r.status !== 200);
                    console.log("Failed requests", filter.length);
                    responses++;
                    console.log("Response Received");
                    console.log(`[${responses}/${options.numOfBatches}] Dropped req count ${filter.length}`);
                    totalFailed += filter.length;
                    console.log(`Total Failed: ${totalFailed}`);
                    if (responses == options.numOfBatches) {
                        console.log(`Total: ${(options.reqPerBatch * options.numOfBatches)}`);
                        console.log(`Passed: ${(options.reqPerBatch * options.numOfBatches) - totalFailed}`);
                        process.exit(1);
                    }
                });
                await sleep(250);
                request = new ParallelRequest({ response: "simple" });
            }
        } else if(options.type === "incr") {

        } else {

        }
    } catch (ex) {
        console.error(ex);
        process.exit(1);
    }
};

//Initiate the program
sendRequests();


function duration() {
    return 20;
}
/*
 * first arg => req file/folder
 * type of test =>  one time(onetime), incremental(incr)
 *                  one time => 10 * 10 => 100
 *                  incremental => 10 => 10 + 5 => 50
*/