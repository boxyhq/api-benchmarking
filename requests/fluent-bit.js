const ingest = () => {
    let tenentIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        'url': 'http://localhost:8888/app.log',
        'headers': {
            'content-type': 'application/json',
            'Cookie': 'myapp_cookiename=Fe26.2*1*64607ddb46bb73838251260eab133382d63429ca48d8f96e62b5d4e4540a4914*tNgb6c6XAGm95IWEwhckIA*cMLn6Uxwb3VGGAnwQLGz8g*1646827515234*beb6f9d7f57463c5cfeeec8da08735bb27e4ed6be8d125ca9b789778b4954491*l9iv-JVF1JQ2n7Li3OMTk9UQ2nEwcErb0JtEGO_xH1s~2'
        },
        body: JSON.stringify({
            "tenantId": getRandomValue(tenentIds),
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
            "timestamp": +new Date(),
            "metadata": {
                "foo": "bar",
                "hey": "you"
            }
        })
    }
    return options;
}
module.exports = {
    ingest: ingest
}