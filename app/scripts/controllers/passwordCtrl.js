"use strict";
angular.module("attendance").controller("passwordCtrl",["$scope","passwordService",function($scope,ps){
    
    
    //Scope variable for biding form elements
    $scope.passwordModel={
        "username":"",
        "password":""
    };
    
    $scope.login=()=>{
        ps.setUsername($scope.passwordModel.username);
        ps.setPassword($scope.passwordModel.password);
        console.log($scope.passwordModel);
        ps.validateUser();
        
    }
}]);