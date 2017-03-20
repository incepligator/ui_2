"use strict";
angular.module("attendance").controller("studentCtrl",["$scope","studentService",function($scope,ss){
    
    
     $scope.studentForm=ss.studentServiceForm;
    
     $scope.studentList = ss.dataStudent;
    
    
    $scope.present="Present";
    
       
       $scope.submitForm=()=>{
            alert();
          var studentServiceForm={
                                            
         "firstName":$scope.studentForm.firstName,
        "lastName":$scope.studentForm.lastName,
         "address":$scope.studentForm.address,
        "dob":$scope.studentForm.dob,
         "ssn":$scope.studentForm.ssn,
        "gender":$scope.studentForm.gender,
         "email":$scope.studentForm.email,
        "git":$scope.studentForm.git
                                               }
          
          
          
           
         ss.dataStudent.push(studentServiceForm);
         console.log("from ctrl");
         console.log(ss.dataStudent);
 
    }
       $scope.test=function(){alert("what the duce");};
    
       
}]);