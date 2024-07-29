const fs = require("fs");
const readline = require("readline");
var Promise = require("bluebird");
var ParallelRequest = Promise.promisifyAll(require("parallel-http-request"));
const loremIpsum = require("lorem-ipsum").loremIpsum;
var request = new ParallelRequest({ response: "simple" });

const interations = 10;
let options = {
    numOfBatches: 5000,
    reqPerBatch: 20,
  },
  reqCount = 0,
  responses = 0,
  totalFailed = 0,
  paused = false;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const readAndSendReuest = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Listen for "p" key to pause or resume the loop
  rl.on("line", (input) => {
    if (input === "p") {
      paused = !paused;
      console.log(`Loop ${paused ? "paused" : "resumed"}`);
    }
  });

  for (let a = 0; a < interations; a++) {
    let dt = await fs.readFileSync(`${a + 1}.json`, {
      encoding: "utf-8",
    });
    let parsed = JSON.parse(dt);
    reqCount = 0;
    for (let i = 0; i < options.numOfBatches; i++) {
      // Pause the loop if "paused" is true
      while (paused) {
        await sleep(100);
      }

      //Create batch
      for (let j = 0; j < options.reqPerBatch; j++) {
        let body = parsed[reqCount++];
        // body.description = loremIpsum({
        //   count: 1, // Number of sentences to generate
        //   units: "sentences", // Output type
        //   format: "plain", // Output format
        //   sentenceLowerBound: 5, // Minimum sentence length
        //   sentenceUpperBound: 15, // Maximum sentence length
        // }),
        body.created = new Date().toISOString();
        request.add({
          method: "POST",
          url: "http://localhost:3000/auditlog/publisher/v1/project/dev/event",
          headers: {
            Authorization: "token=dev",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        // sleep(1);
      }
      //Send batch to endpoint
      // reqCount += options.reqPerBatch;
      console.log(`[Sent Batch ${i + 1}/${options.numOfBatches}]`);
      await sendAndProcessRequest(request);
      await sleep(250);
      request = new ParallelRequest({ response: "simple" });
    }
  }
  rl.close();
};

const sendAndProcessRequest = async (request) => {
  return new Promise((resolve) => {
    request.send(async (response) => {
      let filter = response.filter((r) => r.status !== 200 && r.status !== 201);
      console.log(
        "Failed requests",
        filter.length,
        filter.map((r) => r.status)
      );
      responses++;
      console.log("Response Received");
      console.log(
        `[${responses}/${
          options.numOfBatches * interations
        }] Dropped req count ${filter.length}`
      );
      totalFailed += filter.length;
      console.log(`Total Failed: ${totalFailed}`);
      resolve(true);
    });
  });
};

readAndSendReuest();
