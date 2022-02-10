import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');


export default function () {
    let req = {
        'method': 'POST',
        'url': 'http://localhost:8080/ingest',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Api-Key abcdef',
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
    check(http.post(req.url, req.body, {
        headers: req.headers
    }), {
        'status is 200': (r) => r.status == 200,
    }) || errorRate.add(1);
    sleep(0.5);
}