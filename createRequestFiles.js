const fs = require("fs");
var options = {},
  reqInfo = {};

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

const createRequests = async () => {
  try {
    let count = 1;
    let reqFactory = require(`./requests/${reqInfo.file}`)[reqInfo.func];
    requestCount = options.numOfBatches * options.reqPerBatch;
    for (let i = 0; i < 10; i++) {
      let request = [];
      for (let j = 0; j < 100000; j++) {
        let req = reqFactory(count++);
        request.push(JSON.parse(req.body));
      }
      fs.writeFile(`${i + 1}.json`, JSON.stringify(request), (err) => {
        if (err) throw err;
        console.log("Data written to file");
      });
      // dump to file
    }
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
};

//Initiate the program
createRequests();
