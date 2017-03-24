"use strict";
angular.module("attendance").directive("rippleTest",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/text.html",
        controller:"rippleCtrl"
    }
}]);