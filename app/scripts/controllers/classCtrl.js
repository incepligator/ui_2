"use strict";
angular.module("attendance").controller("classCtrl",
                                        

                                        
                                        
    ["$scope","$http","classService",function($scope,$http,classService){
        
        
        
    $scope.classFormModel = {
        id:"",
        fname:"",
        lname:"",
        address:"",
        dob:"",
        ssn:"",
        gender:"",
        email:"",
        git:""
    }
    
        
  /*  $scope.classListActive;
    $scope.classListAll;
    $scope.classListId;*/
    
    $scope.studentListId;
        
        
    //Calling service to get class list
/*    var classListPromise = classService.getClassListActive();
    var classListPromise2 = classService.getClassListAll();
    var classListPromise3 = classService.getClassListId(2);*/
        
        var studentListPromise=classService.getStudentList();
        
    
/*    classListPromise.then(function(response){
        $scope.classListActive = response;
    });
    
    
    classListPromise2.then(function(response){
        $scope.classListAll = response;
    });
    
    classListPromise3.then(function(response){
        $scope.classListId = response;
    });
        */
        
        
        studentListPromise.then(function(response){
            
            $scope.studentListId=response;
            console.log(response);
            
            
        });
        
        
    
/*   var sampleTest={
        "title":"test123",
        "active":1
    }*/
    
    
    
    
    $scope.classPost=()=>{
        
        alert("classPost");
        
        
        classService.postStudentData($scope.classFormModel).then(function(response){
        alert("success data write in server")});
        
    };
        
       $scope.classPut=()=>{
        
        alert("classPut");
        
       
           
        classService.putStudentData($scope.classFormModel).then(function(response){
        alert("success data put in server")});
        
    };
    
       $scope.classDelete=()=>{
        
        alert("deleted");
        
       console.log($scope.classFormModel.id);
           
           var deltry=$scope.classFormModel.id;
           
        classService.deleteStudentData(deltry).then(function(response){
        alert("success data delete in server")});
        
    };   
   
        
        
        
/*    $scope.classSubmit=function(){
        console.log($scope.classListActive);
        console.log($scope.classListAll);
        console.log($scope.classListId);
    }
    $scope.testPromises=function(){
        console.log($scope.classListActive);
        console.log($scope.classListAll);
        console.log($scope.classListId);
    }*/
    
    
}]);