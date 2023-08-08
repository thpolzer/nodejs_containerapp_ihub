const http = require('http');
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const { processenv } = require('processenv');

const app = express();


app.set('view engine','ejs'); // wann immer ejs-Datein angefordert werden, wird zunächst standardmäßig im views-Verzeichnis nachgeschaut

const server = http.createServer(app);

const clientDirectory = path.join(__dirname, 'lib'); // __dirname = Verzeichnis, zu dem die vorliegende Datei (app1.js) gehört

app.use('/', express.static(clientDirectory));

const servername = processenv('SERVERNAME','localhost'); // localhost ist default value

app.get("/", (req,res) => {

var con = mysql.createConnection({
  host: servername,
  user: "testuser",
  password: "testuser",
  database: "testuser"
});


con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM persons", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render('index', {data: result});
  });
});
});

server.listen(3000, () => {
    console.log("web server running and listening on port 3000...")
});
