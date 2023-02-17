const ingest = () => {
  const event = () => {
    return {
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
        sessionId: 8498798495498498498498489489498498489489498489494,
        timeElasped: 9879849651984984984984651651984984984984984984984,
        scale: 8498498154984561289456123984561239845613298465123984561298456123,
        field1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        field2:
          "Pellentesque tincidunt erat vel mauris faucibus, vel facilisis ipsum interdum.",
        field3: "Quisque euismod elit a elit ultrices hendrerit.",
        field4: "Morbi hendrerit est quis est lobortis scelerisque.",
        field5: "Suspendisse volutpat sapien at tincidunt faucibus.",
        field6: "Phasellus id velit vitae nunc faucibus facilisis.",
        field7: "Donec ac felis eu sapien venenatis mattis.",
        field8:
          "Nullam vehicula quam eget ante aliquet, in rutrum augue mattis.",
        field9: "Nam varius purus sed nisl sagittis malesuada.",
      },
    };
  };
  let events = [];
  for (let i = 0; i < 50; i++) {
    events.push(event());
  }
  let body = {
    events,
  };
  const stringifiedBody = JSON.stringify(body);
  var options = {
    method: "POST",
    url: "http://localhost:3000/auditlog/publisher/v1/project/dev/event/bulk",
    headers: {
      Authorization: "token=dev",
      "Content-Type": "application/json",
    },
    body: stringifiedBody,
  };
  return options;
};
module.exports = {
  ingest: ingest,
};
