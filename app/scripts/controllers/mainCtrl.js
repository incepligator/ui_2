"use strict";
angular.module("attendance").controller("mainCtrl",["$scope","passwordService","$http",function($scope,ps,$http){
    $scope.testString = "Hello World";
    
    
    $scope.auth=ps.auth;
    
    $scope.$watch(function(){
        return ps.auth;
        
    },function(newVal,oldVal){
        if(newVal!=oldVal){
            $scope.auth=newVal;
        }
    });
    
    
    
   $http.get("/service/studentlist/all").then(function(response) {
        
      $scope.myWelcome = response.data;
  });
    
   
   
}]);