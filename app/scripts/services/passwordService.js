"use strict";
angular.module("attendance").service("passwordService",[function(){
    
    
    var _this=this;
    this.auth = false;
    
    
    var passwordModel={
        "username":"",
        "password":""
    };
    
    var validUser=[
        {
            "username":"cat",
            "password":"123"
        },{
            "username":"cc",
            "password":"cc"
        }
    ];
    this.logout=()=>_this.auth = false;
    //Function to validate the user
    
    this.validateUser=()=>{
        for(let i =0;i<validUser.length;i++){
            if (validUser[i].username==passwordModel.username
                &&
                validUser[i].password==passwordModel.password
               ){
                _this.auth = true;
                break;
            }
        }
        return _this.auth;
    }
    
    this.setUsername=(uname)=>passwordModel.username=uname;
    this.setPassword=(pass)=>passwordModel.password=pass;
    this.getUsername=()=>passwordModel.username;
    this.getPassword=()=>passwordModel.password;
    
}]);