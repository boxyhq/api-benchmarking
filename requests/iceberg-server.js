const ingest = (id) => {
  let tenentIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let actors = ["Deepak", "Vishal", "Kiran", "Utkarsh", "Aswin", "Sama"];
  let actorTypes = ["user", "admin", "dev"];
  let groups = ["dev", "business"];
  let whereType = ["ip", "city"];
  let wheres = ["127.0.0.1", "192.168.1.1", "Pune", "Chennei", "London"];
  let targets = [
    "user.login",
    "user.profile",
    "dashboard.edit",
    "dashboard.view",
    "user.logout",
  ];
  let targetIds = ["10", "20", "30", "40"];
  let actions = ["login", "logout", "view", "scroll", "click"];
  let actionTypes = ["U", "V", "C", "S", "L"];
  let names = ["User", "Profile", "Dashboard", "Edit"];
  let descriptions = [
    "This is a event",
    "Hello world!",
    "What did you expect?",
    "This is so cool!",
  ];
  const getRandomValue = (collection) => {
    return collection[randomIntFromInterval(0, collection.length - 1)];
  };
  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const body = [];
  for (let i = 0; i < 500; i++) {
    body.push(getEvent());
  }
  var options = {
    method: "POST",
    url: "http://localhost:9090/ingest/bulk",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return options;
};

function getEvent() {
  return {
    action: "some.recordWithHalfDate.created",
    actor: {
      fields: null,
      id: "jackson@boxyhq.com",
      name: "Jackson",
      url: null,
    },
    canonical_time: +new Date(),
    created: +new Date(),
    crud: "c",
    environment_id: "dev",
    group: {
      id: "boxyhq",
      name: "BoxyHQ",
    },
    id: "c41c81030f2345eba19de9a2e1ec3b69",
    project_id: "dev",
    received: +new Date(),
    source_ip: "127.0.0.1",
    target: {
      fields: null,
      id: "100",
      name: "tasks",
      type: "Tasks",
      url: null,
    },
    fields: {
      id: "value",
    },
  };
}

module.exports = {
  ingest: ingest,
};
