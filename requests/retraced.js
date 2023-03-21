const { v4 } = require("uuid");

const loremIpsum = require("lorem-ipsum").loremIpsum;

const ingest = () => {
  let tenentIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // let actors = ["Deepak", "Vishal", "Kiran", "Utkarsh", "Aswin", "Sama"];
  let actorTypes = ["user", "admin", "dev"];
  let groups = ["dev", "business"];
  let whereType = ["ip", "city"];
  let wheres = ["127.0.0.1", "192.168.1.1", "10.10.10.10", "10.20.30.40"];
  let targets = [
    "user.login",
    "user.profile",
    "dashboard.edit",
    "dashboard.view",
    "user.logout",
  ];
  let targetIds = ["10", "20", "30", "40"];
  // let actions = ["login", "logout", "view", "scroll", "click"];
  let actionTypes = ["U", "V", "C", "S", "L"];
  let names = ["User", "Profile", "Dashboard", "Edit"];
  let descriptions = [
    "This is a event",
    "Hello world!",
    "What did you expect?",
    "This is so cool!",
  ];

  // pm.environment.set("created", new Date().toISOString())
  const actors = [
    {
      id: "jackson@boxyhq.com",
      name: "Jackson",
    },
    {
      id: "admin@boxyhq.com",
      name: "Admin",
    },
    {
      id: "support@boxyhq.com",
      name: "Support",
    },
  ];
  const actions = {
    Jackson: [
      "user.logged.in",
      "user.viewed.dashboard",
      "user.updated.expenses",
    ],
    Admin: [
      "user.logged.in",
      "user.edited.dashboard",
      "user.approved.expenses",
    ],
    Support: ["user.logged.in", "user.ticker.viewed", "user.ticket.resolved"],
  };
  const actor = actors[Math.floor(Math.random() * 3)];
  const action = actions[actor.name][Math.floor(Math.random() * 3)];
  let body = {
    // description: loremIpsum({
    //   count: 1, // Number of sentences to generate
    //   units: "sentences", // Output type
    //   format: "plain", // Output format
    //   sentenceLowerBound: 5, // Minimum sentence length
    //   sentenceUpperBound: 15, // Maximum sentence length
    // }),
    action: action,
    teamId: "boxyhq",
    group: {
      id: "boxyhq",
      name: "BoxyHQ",
    },
    crud: "c",
    created: new Date().toISOString(),
    source_ip: "127.0.0.1",
    actor: actor,
    target: {
      id: "iwhdfiwhdfi-wdcwedc-ece-rc-erc-erc-er-ce-rc-erc-e-cer-ce-c",
      name: "freferf-erf-erf-er-ver-ver-ver-ve-rv-erv-erv-erv-erv-er-v",
      type: "dfgdfg-fdgdfg-dfgdfgdf-ertreer-bgthbt-dvfr-tbv-tyb-tyb-rb",
    },
    fields: {
      uuid: v4(),
      uuid1: v4(),
      uuid2: v4(),
      uuid3: v4(),
      uuid4: v4(),
      uuid5: v4(),
      uuid6: v4(),
      uuid7: v4(),
      uuid8: v4(),
    },
  };
  const getRandomValue = (collection) => {
    return collection[randomIntFromInterval(0, collection.length - 1)];
  };
  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const stringifiedBody = JSON.stringify(body);
  var options = {
    method: "POST",
    url: "http://localhost:3000/auditlog/publisher/v1/project/dev/event",
    headers: {
      Authorization: "token=dev",
      "Content-Type": "application/json",
    },
    body: stringifiedBody,
  };
  return options;
};
const sameSize = () => {
  const body = {
    action: "test.log.entry.to.make.sure.all.logs.are.of.same.size",
    teamId: "boxyhq",
    group: {
      id: "boxyhq",
      name: "BoxyHQ",
    },
    crud: "c",
    created: new Date().toISOString(),
    source_ip: "127.0.0.1",
    actor: {
      name: "I.am.an.actor.for.load.testing",
      id: "1",
    },
    target: {
      id: "21321-4654654-98798654-23132198",
      name: "need to make sure that all logs are of same size",
      type: "text",
    },
    fields: {
      webhookUrl: "http://3e9b-116-75-27-24.ngrok.io",
      field1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      field2:
        "Pellentesque tincidunt erat vel mauris faucibus, vel facilisis ipsum interdum.",
      field3: "Quisque euismod elit a elit ultrices hendrerit.",
      field4: "Morbi hendrerit est quis est lobortis scelerisque.",
      field5: "Suspendisse volutpat sapien at tincidunt faucibus.",
      field6: "Phasellus id velit vitae nunc faucibus facilisis.",
      field7: "Donec ac felis eu sapien venenatis mattis.",
      field8: "Nullam vehicula quam eget ante aliquet, in rutrum augue mattis.",
      field9: "Nam varius purus sed nisl sagittis malesuada.",
    },
  };
  const stringifiedBody = JSON.stringify(body);
  var options = {
    method: "POST",
    url: "http://localhost:3000/auditlog/publisher/v1/project/dev/event",
    headers: {
      Authorization: "token=dev",
      "Content-Type": "application/json",
    },
    body: stringifiedBody,
  };
  return options;
};

module.exports = {
  ingest,
  sameSize,
};
