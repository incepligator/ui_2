"use strict";
angular.module("attendance").directive("studentReport",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/report.html",
        
        controller:"attendanceCtrl"
    }
}]); 