var request = require('request');
const query = (url = 'http://localhost:8080/query', authorization = 'Api-Key abcdef') => {
    var options = {
        'method': 'POST',
        'url': url,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'Cookie': 'myapp_cookiename=Fe26.2*1*d09d95c492eeb91aa5543f444037adc79846a6670d884eb2a2ba2d61e9dbb46a*ZM4MZsljSqwFwklP1f-pIA*FaSjWToOWODoCIwtozK1qw*1644996112887*ebf30b49c6e785ce61a966806bef398a72151fb476ce25c4ceec37c98c90ec07*XJBzLGoLaDDCzHrWZgzCizdZW4QSGyiTpzSJ3pqteKE~2'
        },
        body: '{\n    "query": {\n        "actor_type": "user"\n    }\n    // "start": "2021-05-18T20:51:39+01:00",\n    // "end": "2022-05-18T20:56:39+01:00"\n}\n'

    };
    return options;
}

const ingest = (url = 'http://localhost:8080/ingest', authorization = 'Api-Key abcdef') => {
    var options = {
        'method': 'POST',
        'url': url,
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': authorization,
            'Cookie': 'myapp_cookiename=Fe26.2*1*d09d95c492eeb91aa5543f444037adc79846a6670d884eb2a2ba2d61e9dbb46a*ZM4MZsljSqwFwklP1f-pIA*FaSjWToOWODoCIwtozK1qw*1644996112887*ebf30b49c6e785ce61a966806bef398a72151fb476ce25c4ceec37c98c90ec07*XJBzLGoLaDDCzHrWZgzCizdZW4QSGyiTpzSJ3pqteKE~2'
        },
        body: JSON.stringify([
            {
                "actor": "deepak",
                "actor_type": "user",
                "group": "boxyhq",
                "where": "127.0.0.1",
                "where_type": "ip",
                "when": new Date().toISOString(),
                "target": "user.login",
                "target_id": "target_id",
                "action": "login",
                "action_type": "U",
                "name": "user.login",
                "description": "This is a login event",
                "metadata": {
                    "foo": "bar",
                    "hey": "you"
                }
            }
        ])
    };
    return options;
}


module.exports = {
    query: query,
    ingest: ingest
};
