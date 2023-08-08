'use strict';

const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{
        'content-type': 'text/html'
    });
    res.write('Hello IHUB!');
    res.end();

});

server.listen(3000,()=>{
    console.log("Server running on port 3000 ...")
});