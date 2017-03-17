"use strict";
angular.module("attendance").directive("student",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/student.html",
        
        controller:"studentCtrl"
    }
}]);