const hello = () => {
    var options = {
        'method': 'GET',
        'url': 'http://localhost:9090/hello',
        'headers': {
        }
    }
    return options;
}
module.exports = {
    hello: hello
}