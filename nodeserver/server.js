var app = require('express')();
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var https = require('https');
var userdata = require('./routes/users');


app.use(bodyParser.json());

var httpServer = http.createServer(app);
var httpsServer = https.createServer({
    key: fs.readFileSync('./cert/privatekey.pem', 'utf8'), 
    cert: fs.readFileSync('./cert/certificate.crt', 'utf8')
}, app);
var PORT = 80;
var SSLPORT = 443;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
app.get('/',function(req,res){
    res.send('heelo!');
});
app.post('/checkuser',userdata.checkuser);
app.get('/test',function(req,res){
    console.log('get test');
    res.send({name:'geyunfei',demo:'demo 1.0'});
});
