var port=8088,
    express=require('express'),
    app=express();
app.use('/',express.static(__dirname));
app.listen(port);
console.log('Now Serving http://localhost:'+port+'/login.html');