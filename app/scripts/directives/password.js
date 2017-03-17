"use strict";
angular.module("attendance").directive("password",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/password.html",
        controller:"passwordCtrl"
    }
}]);