"use strict";
angular.module("attendance").controller("studentCtrl",["$scope","studentService",function($scope,ss){
    
    
     $scope.studentForm=ss.studentServiceForm;
    
     $scope.dataStudentCtrl= ss.dataStudent;
       
    
    
/*   var studentForm={
       
        "firstName":"",
        "lastName":"",
         "address":"",
        "dob":"",
         "ssn":"",
        "gender":"",
         "email":"",
        "git":""
        
         
    };*/
    
    
    
     $scope.submitForm=()=>{
         
     /*    
          ss.studentServiceForm={
                                            
         "firstName":"$scope.studentForm.firstName",
        "lastName":"$scope.studentForm.lastName",
         "address":"$scope.studentForm.address",
        "dob":"$scope.studentForm.dob",
         "ssn":"$scope.studentForm.ssn",
        "gender":"$scope.studentForm.gender",
         "email":"$scope.studentForm.email",
        "git":"$scope.studentForm.git"
              
              
              
                                        }
         */
         
         ss.setFirstName($scope.studentForm.firstName);
         
          ss.setLastName($scope.studentForm.lastName);
         
         ss.setAddress($scope.studentForm.address);
         ss.setDob($scope.studentForm.dob);
         
         ss.setGender($scope.studentForm.gender);
         
         ss.setSsn($scope.studentForm.ssn);
         ss.setEmail($scope.studentForm.email);
         ss.setGit($scope.studentForm.git);
           
         ss.dataStudent.push(ss.studentServiceForm);
         
         console.log( $scope.dataStudentCtrl);
         
    //     console.log( ss.dataStudentCtrl.studentForm.firstName);
         
    //     ss.submitForm();
         
       
    }
    
    
    
     
}]);