const moment = require("moment");
var Promise = require("bluebird");
var ParallelRequest = Promise.promisifyAll(require("parallel-http-request"));
var request = new ParallelRequest({ response: "simple" });
var options = {},
  startTime = [];
let lastReqCount = 0,
  reqCount = 0,
  reqPerSec = 0;
// setInterval(() => {
//     let temp = reqCount;
//     reqPerSec = (reqCount - lastReqCount) / 5;
//     lastReqCount = temp;
//     console.log(`[Requests Per Second]: ${reqPerSec}`);
// }, 5000);
const getTimeElasped = () => {
  let seconds = (currTime - lastTime) / 1000;
  lastTime = currTime;
  return seconds;
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

let reqInfo = {},
  printsPerReq,
  wsId,
  responses = 0,
  totalFailed = 0;

//Options
let reqFile = process.argv.length >= 3 ? process.argv[2] : "hermes.ingest";
if (!reqFile) {
  console.warn("Request file and method required!");
  process.exit(1);
} else {
  let parts = reqFile.split(".");
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
  case "fixed":
    options.type = type;
    let count = process.argv.length >= 5 ? parseInt(process.argv[4]) : 10;
    options.count = count;
    break;
  default:
    console.warn("Invalid benchmarking type", type);
    process.exit(1);
}

const sendRequests = async () => {
  try {
    let count = 1;
    let reqFactory = require(`./requests/${reqInfo.file}`)[reqInfo.func];
    let startTime = +new Date(),
      responses = 0,
      totalFailed = 0,
      requestCount = 0;
    if (options.type === "onetime") {
      requestCount = options.numOfBatches * options.reqPerBatch;
      for (let i = 0; i < options.numOfBatches; i++) {
        //Create batch
        for (let j = 0; j < options.reqPerBatch; j++) {
          request.add(reqFactory(count++));
          // sleep(1);
        }
        //Send batch to endpoint
        reqCount += options.reqPerBatch;
        console.log(`[Sent Batch ${i + 1}/${options.numOfBatches}]`);
        request.send(async (response) => {
          let filter = response.filter(
            (r) => r.status !== 200 && r.status !== 201
          );
          console.log(
            "Failed requests",
            filter.length,
            filter.map((r) => r.status)
          );
          responses++;
          console.log("Response Received");
          console.log(
            `[${responses}/${options.numOfBatches}] Dropped req count ${filter.length}`
          );
          totalFailed += filter.length;
          console.log(`Total Failed: ${totalFailed}`);
          if (responses == options.numOfBatches) {
            console.log(`Total: ${options.reqPerBatch * options.numOfBatches}`);
            console.log(
              `Passed: ${
                options.reqPerBatch * options.numOfBatches - totalFailed
              }`
            );
            console.log(
              `% Failed: ${
                (totalFailed * 100) /
                (options.reqPerBatch * options.numOfBatches)
              }`
            );
            let diff = Math.floor((+new Date() - startTime) / 1000);
            console.log(
              `Request Per Second: ${
                (options.reqPerBatch * options.numOfBatches - totalFailed) /
                diff
              }`
            );
            // var player = require('play-sound')(opts = {})
            // player.play('./foo.mp3', function (err) {
            //     if (err) throw err
            // })
            process.exit(1);
          }
        });
        await sleep(250);
        request = new ParallelRequest({ response: "simple" });
      }
    } else if (options.type === "fixed") {
      let totalRequests = 0,
        sleepTime = 250;
      options.reqPerBatch = 10;
      do {
        console.log(`Request/Batch: [${options.reqPerBatch}]`);
        console.log(`Sleep: [${sleepTime}]`);
        for (let j = 0; j < options.reqPerBatch; j++) {
          request.add(reqFactory(count++));
          // sleep(1);
        }
        totalRequests += options.reqPerBatch;
        //Send batch to endpoint
        reqCount += options.reqPerBatch;
        request.send(async (response) => {
          let filter = response.filter(
            (r) => r.status !== 200 && r.status !== 201
          );
          console.log(
            "Failed requests",
            filter.length,
            filter.map((r) => r.status)
          );
          responses++;
          console.log("Response Received");
          console.log(
            `[${responses}/${totalRequests}] Dropped req count ${filter.length}`
          );
          totalFailed += filter.length;
          console.log(`Total Failed: ${totalFailed}`);

          if (filter.length > 0) {
            if (options.reqPerBatch !== 1) {
              options.reqPerBatch--;
            }
            sleepTime += 100;
          } else {
            if (options.reqPerBatch !== 100) {
              options.reqPerBatch++;
            }
            if (sleepTime !== 250) {
              sleepTime -= 100;
            }
          }
        });
        await sleep(sleepTime);
        request = new ParallelRequest({ response: "simple" });
      } while (totalRequests < options.count + totalFailed);
      // console.log(`Total: ${options.reqPerBatch * options.numOfBatches}`);
      // console.log(
      //   `Passed: ${options.reqPerBatch * options.numOfBatches - totalFailed}`
      // );
      // console.log(
      //   `% Failed: ${
      //     (totalFailed * 100) / (options.reqPerBatch * options.numOfBatches)
      //   }`
      // );
      // let diff = Math.floor((+new Date() - startTime) / 1000);
      // console.log(
      //   `Request Per Second: ${
      //     (options.reqPerBatch * options.numOfBatches - totalFailed) / diff
      //   }`
      // );
      // var player = require('play-sound')(opts = {})
      // player.play('./foo.mp3', function (err) {
      //     if (err) throw err
      // })
      process.exit(1);
    } else {
    }
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
};

//Initiate the program
sendRequests();
