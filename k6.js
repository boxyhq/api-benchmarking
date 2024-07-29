import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    // { duration: "1m", target: 1000 },
    // { duration: "1m", target: 2000 },
    // { duration: "1m", target: 3000 },
    // { duration: "1m", target: 4000 },
    // { duration: "1m", target: 5000 },
    // { duration: "1m", target: 6000 },
    // { duration: "1m", target: 7000 },
    // { duration: "1m", target: 8000 },
    // { duration: "1m", target: 9000 },
    { duration: "1m", target: 10000 },
    { duration: "1m", target: 11000 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
  },
  //   scenarios: {
  //     shared_iter_scenario: {
  //       executor: "shared-iterations",
  //       vus: 1000,
  //       iterations: 1000,
  //       startTime: "0s",
  //       stages: [
  //         { duration: "10m", target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
  //         { duration: "30m", target: 200 }, // stay at higher 200 users for 30 minutes
  //         { duration: "5m", target: 0 }, // ramp-down to 0 users
  //       ],
  //     },
  // load_test: {
  //   executor: "ramping-arrival-rate",
  //   preAllocatedVUs: 1000,
  //   stages: [
  //     { duration: "2m", target: 1000000000 }, // just slowly ramp-up to a HUGE load
  //   ],
  // },
  //   },
};

export default function () {
  const options = random();
  const res = http.post(options.url, options.body, {
    headers: options.headers,
  });
  check(res, { "status was 201": (r) => r.status == 201 });
  sleep(1);
}

// get a random value from a collection
const getRandomValue = (collection) => {
  return collection[randomIntFromInterval(0, collection.length - 1)];
};
const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const random = () => {
  let groups = ["dev", "business"];
  let wheres = [
    "128.101.101.101",
    "209.142.68.29",
    "69.162.81.155",
    "192.199.248.75",
    "162.254.206.227",
    "207.250.234.100",
  ];
  let targets = [
    "user.login",
    "user.profile",
    "dashboard.edit",
    "dashboard.view",
    "user.logout",
  ];
  let targetIds = ["10", "20", "30", "40"];
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
    description: "dsfsdf dsf dsf dsf sdf sd fw gw ev 3er gw",
    action: action,
    group: {
      id: getRandomValue(groups),
      name: getRandomValue(groups),
    },
    crud: "c",
    created: new Date().toISOString(),
    source_ip: getRandomValue(wheres),
    actor: actor,
    target: {
      id: getRandomValue(targets),
      name: getRandomValue(targetIds),
      type: "UI",
    },
    component: getRandomValue(names),
    fields: {
      webhookUrl: "http://vector:9000",
      uuid: "dfsfsdfsd-fsd-fsd-f-dsf-sd-f",
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
