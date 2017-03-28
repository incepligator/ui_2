var express = require('express');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var connection = require("express-myconnection");
var app = express();

app.use(bodyParser.json());  //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ //to support URL-encoded bodies
    extended:true
}));

//Hosting static files
app.use(express.static(__dirname + '/'));
console.log("Static files initialized...");

// Create Sql Connection
app.use(connection(mysql, {
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9165055',
    password : 'ep3BtcDAzS',
    database : 'sql9165055'
},'request'));

console.log("Query Setup complete...")

//collection of services.
var services ={
    "class":{
        "get":{
            "all":{
                "url":"/service/class/all",
                "query":"SELECT * FROM classtbl",
                "params":[]
            },
            "active":{
                "url":"/service/class",
                "query":"SELECT * FROM classtbl WHERE active = 1",
                "params":[]
            },
            "byId":{
                "url":"/service/class/:classid",
                "query":"SELECT * FROM classtbl where classid = ?",
                "params":['classid']
            }
        },
        "post":{
            "url":"/service/class",
            "query":"INSERT INTO classtbl SET ?",
            "params":[]
        },
        "put":{
            "url":"/service/class/:id",
            "query":"UPDATE classtbl SET ? WHERE classid = ?",
            "params":[]
        },
        "delete":{
            "url":"/service/class/:classid",
            "query":"DELETE FROM classtbl WHERE classid = ?",
            "params":["classid"]
        }
    },
    "workstatus":{
        "get":{
            "all":{
                "url":"/service/workstatus/all",
                "query":"SELECT * FROM workstatustbl",
                "params":[]
            },
            "active":{
                "url":"/service/workstatus",
                "query":"SELECT * FROM workstatustbl WHERE active = 1",
                "params":[]
            },
            "byId":{
                "url":"/service/workstatus/:workstatusid",
                "query":"SELECT * FROM workstatustbl where workstatusid = ?",
                "params":['workstatusid']
            }
        },
        "post":{
            "url":"/service/workstatus",
            "query":"INSERT INTO workstatustbl SET ?",
            "params":[]
        },
        "put":{
            "url":"/service/workstatus/:id",
            "query":"UPDATE workstatustbl SET ? WHERE workstatusid = ?",
            "params":[]
        },
        "delete":{
            "url":"/service/workstatus/:workstatusid",
            "query":"DELETE FROM workstatustbl WHERE workstatusid = ?",
            "params":["workstatusid"]
        }
    },
    
    
    "studentlist":{
        "get":{
            "all":{
                "url":"/service/studentlist/all",
                "query":"SELECT * FROM studentlist",
                "params":[]
            },
            "active":{
                "url":"/service/studentlist",
                "query":"SELECT * FROM studentlist WHERE id = not null",
                "params":[]
            },
            "byId":{
                "url":"/service/studentlist/:studentlistid",
                "query":"SELECT * FROM studentlist where id = ?",
                "params":['studentlistid']
            }
        },
        
        "post":{
            "url":"/service/studentlist",
            "query":"INSERT INTO studentlist SET ?",
            "params":[]
        },
        "put":{
            "url":"/service/studentlist/:id",
            "query":"UPDATE studentlist SET ? WHERE id = ?",
            "params":[]
        },
        "delete":{
            "url":"/service/studentlist/:id",
            "query":"DELETE FROM studentlist WHERE id = ?",
            "params":["id"]
        }
    }

};
console.log("Service API collections instantiated...");

//Generating API from service collection
for(var key in services){
    if (services[key].hasOwnProperty('post')){
        createPostServices(services[key].post.url,services[key].post.query,services[key].post.params);   
    }
    
    //Creating rest services for different properties in the GET object
    if (services[key].hasOwnProperty('get')){
        for (var service in services[key]["get"]){
            createGetServices(services[key]['get'][service].url,services[key]['get'][service].query,services[key]['get'][service].params); 
        } 
    }
    if (services[key].hasOwnProperty('put')){
        createPutServices(services[key].put.url,services[key].put.query,services[key].put.params);
    }
    if (services[key].hasOwnProperty('delete')){
        createDeleteServices(services[key].delete.url,services[key].delete.query,services[key].delete.params);
    }
    
} 
console.log("REST API modules ready for launch...");

//Function to create get services
function createGetServices(url,query,params){
    console.log("Creating GET services for... " + url);
    app.get(url,function(req,res,next){
        //Array to store dynamic parameters
        var ids = [];
        for (var i=0;i<params.length;i++){
            ids.push(req.params[params[i]]);
        }
       req.getConnection(function(err, connection) {
          if (err) return next(err);

          connection.query(query,ids, function(err, results) {
            if (err){
              console.log(err);
              return next("Mysql error, check your query");  
            }         
            res.json(results);
          });      
        });   
    });
}

/**
Function to genreate the post service
**/
function createPostServices(url,query,params){
    console.log("Creating POST services for... " + url);
    app.post(url,function(req,res,next){
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            var queryx =connection.query(query,reqObj,function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

/**
Function to generate the put services
**/
function createPutServices(url,query,params){
    console.log("Creating PUT services for... "+url);
    app.put(url,function(req,res,next){
        var id=req.params.id;
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            var queryx =connection.query(query,[reqObj,id],function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

function createDeleteServices(url,query,params){
    console.log("Creating DELETE services for ... "+url);
    app.delete(url,function(req,res,next){
        //Array to store dynamic parameters
        var ids = [];
        for (var i=0;i<params.length;i++){
            ids.push(req.params[params[i]]);
        }
        req.getConnection(function(err, connection){
            if (err){
                return next(err);
            }
            connection.query(query, ids, function(err, results){
                if (err){
                    console.log(err);
                }
                res.json(results);
            })
        })
        
    })
}

//Routes
app.get('/', function (req, res) {
    res.redirect('/app/views/index.html');
});

//Launching server
app.listen(4200, function (req,res) {
  console.log("Opening port 8080");    
  console.log('application launched at localhost:8080');
});