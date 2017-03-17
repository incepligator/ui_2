"use strict";
angular.module("attendance").directive("studentForm",[function(){
    return{
        restrict:"EA",
        templateUrl:"/app/views/studentForm.html",
        
        controller:["$scope","passwordService",function($scope,ps){
            $scope.logout=ps.logout;
            
        }]
    }
}]);