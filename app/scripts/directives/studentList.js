"use strict";
angular.module("attendance").directive("studentList",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/studentList.html",
        
        controller:"studentCtrl"
    }
}]);