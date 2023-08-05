'use strict';

const http = require('http');

const { processenv } = require('processenv');

const message = processenv('MESSAGE', 'Hello IHUB!');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'content-type': 'text/html'
    });
    res.write(`${message}\n`);
    res.end();

});

server.listen(3000,()=>{
    console.log("Server running on port 3000 ...")
});