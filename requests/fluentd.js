const ingest = () => {
    var options = {
        'method': 'POST',
        'url': 'http://127.0.0.1:9880/sample.test',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'json': `{\n   "actor":"john-doe",\n   "actor_type":"user",\n   "group":"boxyhq",\n   "where":"127.0.0.1",\n   "where_type":"ip",\n   "when":${new Date().toISOString()},\n   "target":"user.login",\n   "target_id":"10",\n   "action":"login",\n   "action_type":"U",\n   "name":"user.login",\n   "description":"This is a login event",\n   "metadata":{\n      "foo":"bar",\n      "hey":"you"\n   }\n}`
        }
    };
    return options;
}
