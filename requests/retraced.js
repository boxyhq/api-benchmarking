const ingest = () => {
    let tenentIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let actors = ['Deepak', 'Vishal', 'Kiran', 'Utkarsh', 'Aswin', 'Sama'];
    let actorTypes = ['user', 'admin', 'dev'];
    let groups = ['dev', 'business'];
    let whereType = ['ip', 'city'];
    let wheres = ['127.0.0.1', '192.168.1.1', '0.0.0.0', '10.10.10.10', '10.20.30.40'];
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
        'url': 'http://localhost:3000/auditlog/publisher/v1/project/dev/event',
        'headers': {
            'Authorization': 'token=dev',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "action": getRandomValue(actions),
            "crud": "c",
            "group": {
                "id": "string",
                "name": getRandomValue(groups),
            },
            "displayTitle": getRandomValue(names),
            "created": new Date().toISOString(),
            "actor": {
                "id": "string",
                "name": getRandomValue(actors),
                "href": "string"
            },
            "target": {
                "id": "string",
                "name": getRandomValue(targets),
                "href": "string",
                "type": getRandomValue(targetIds),
            },
            "source_ip": getRandomValue(wheres),
            "description": getRandomValue(descriptions),
            "is_anonymous": true,
            "is_failure": true,
            "fields": {},
            "component": "string",
            "version": "string"
        })
    
    };
    return options;
}
module.exports = {
    ingest: ingest
}