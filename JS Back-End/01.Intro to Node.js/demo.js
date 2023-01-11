/*const is = require('is');

console.log(is.decimal(3.14));

const myUrl = new URL('https://softuni.bg/trainings/resources/video/79027/video-09-january-2023-ivaylo-papazov-js-back-end-january-2023/3972');
console.log(myUrl);
console.log(myUrl.hostname)*/

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    switch (req.url){    
        case '/':
            res.write("<h1>Hello form NodeJS server!</h1>");
            break;
        case '/dogs':
            res.write("Hello form dogs!");
            break;
    }
    /*console.log('Http request');
    console.log(req.headers);
    console.log(req.method);
    console.log(req.url);
    res.write("Hello form NodeJS server!");*/
    res.end();
});

server.listen(5000);
console.log('This server is wrking on port 5000...');