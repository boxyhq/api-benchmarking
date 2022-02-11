const ingest = () => {
    var options = {
        'method': 'POST',
        'url': 'http://127.0.0.1:3000',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: {
            "actor":"john-doe",
            "actor_type":"user",
            "group":"boxyhq",
            "where":"127.0.0.1",
            "where_type":"ip",
            "when":"2021-05-18T20:53:39+01:00",
            "target":"user.login",
            "target_id":"10",
            "action":"login",
            "action_type":"U",
            "name":"user.login",
            "description":"This is a login event",
            "metadata":{
            "foo":"bar",
            "hey":"you"
            } 
        }
    };
    return options;
}
module.exports = {
    ingest: ingest
}