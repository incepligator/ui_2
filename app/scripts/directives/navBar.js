"use strict";
angular.module("attendance").directive("navBar",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/navBar.html",
        
        controller:"navCtrl"
    }
}]);