const ingest = () => {
    var options = {
        'method': 'POST',
        'url': 'http://localhost:9880/sample.test',
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'myapp_cookiename=Fe26.2*1*d09d95c492eeb91aa5543f444037adc79846a6670d884eb2a2ba2d61e9dbb46a*ZM4MZsljSqwFwklP1f-pIA*FaSjWToOWODoCIwtozK1qw*1644996112887*ebf30b49c6e785ce61a966806bef398a72151fb476ce25c4ceec37c98c90ec07*XJBzLGoLaDDCzHrWZgzCizdZW4QSGyiTpzSJ3pqteKE~2'
        },
        form: {
          'json': `{\n   "actor":"john-doe",\n   "actor_type":"user",\n   "group":"boxyhq",\n   "where":"127.0.0.1",\n   "where_type":"ip",\n   "when":"${new Date().toISOString()}",\n   "target":"user.login",\n   "target_id":"10",\n   "action":"login",\n   "action_type":"U",\n   "name":"user.login",\n   "description":"This is a login event",\n   "metadata":{\n      "foo":"bar",\n      "hey":"you"\n   }\n}`
        }
      };
    return options;
}
module.exports = {
    ingest: ingest
}