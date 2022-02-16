const ingest = (id) => {
    let actors = ['Deepak', 'Vishal', 'Kiran', 'Utkarsh', 'Aswin', 'Sama'];
    let actorTypes = ['user', 'admin', 'dev'];
    let groups = ['dev', 'business'];
    let whereType = ['ip', 'city'];
    let wheres = ['127.0.0.1', '192.168.1.1', 'Pune', 'Chennei', 'London'];
    let targets = ['user.login', 'user.profile', 'dashboard.edit', 'dashboard.view', 'user.logout'];
    let targetIds = ['10', '20', '30', '40'];
    let actions = ['login', 'logout', 'view', 'scroll', 'click'];
    let actionTypes = ['U', 'V', 'C', 'S', 'L'];
    let names = ['User', 'Profile', 'Dashboard', 'Edit'];
    let descriptions = ["This is a event", "Hello world!", "What did you expect?", "This is so cool!"];
    const getRandomValue = (collection) => {
        return collection[randomIntFromInterval(0, collection.length - 1)];
    }
    const randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    var options = {
        'method': 'POST',
        'url': 'http://localhost:3000',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'myapp_cookiename=Fe26.2*1*d09d95c492eeb91aa5543f444037adc79846a6670d884eb2a2ba2d61e9dbb46a*ZM4MZsljSqwFwklP1f-pIA*FaSjWToOWODoCIwtozK1qw*1644996112887*ebf30b49c6e785ce61a966806bef398a72151fb476ce25c4ceec37c98c90ec07*XJBzLGoLaDDCzHrWZgzCizdZW4QSGyiTpzSJ3pqteKE~2'
        },
        body: JSON.stringify({
            "id": id,
            "actor": getRandomValue(actors),
            "actor_type": getRandomValue(actorTypes),
            "group": getRandomValue(groups),
            "where": getRandomValue(wheres),
            "where_type": getRandomValue(whereType),
            "date": new Date().toISOString().slice(0, 10),
            "when": new Date().toISOString(),
            "target": getRandomValue(targets),
            "target_id": getRandomValue(targetIds),
            "action": getRandomValue(actions),
            "action_type": getRandomValue(actionTypes),
            "name": getRandomValue(names),
            "description": getRandomValue(descriptions),
            "metadata": {
                "foo": "bar",
                "hey": "you"
            }
        })
    };
    return options;
}
module.exports = {
    ingest: ingest
}