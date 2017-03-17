var express=require('express');
var app=express();

app.use(express.static(__dirname + '/'));

//Routes
app.get('/', function (req, res) {
    res.redirect('/app/views/index.html');
});

app.get('/prod', function (req, res) {
    res.redirect('/dist/app/views/main.html');
});

//Launching server
app.listen(4200, function (req,res) {
  console.log("Opening port 8080");    
  console.log('application launched at localhost:8080');
});
