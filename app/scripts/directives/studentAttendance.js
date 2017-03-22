"use strict";
angular.module("attendance").directive("studentAttendance",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/studentAttendance.html",
        
        controller:"attendanceCtrl"
    }
}]); 