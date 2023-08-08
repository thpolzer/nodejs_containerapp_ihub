const http = require('http');
const express = require('express');
const path = require('path');

const api = express();

const clientDirectory = path.join(__dirname, 'public');

api.use('/', express.static(clientDirectory));

const server = http.createServer(api);

server.listen(4000, () => {
    console.log("web server running and listening on port 4000...")
});
