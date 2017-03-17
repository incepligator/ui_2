 "use strict";
angular.module("attendance").service("studentService",[function(){


    this.dataStudent=[];
    


   this.studentServiceForm={
       
        "firstName":"",
        "lastName":"",
         "address":"",
        "dob":"",
         "ssn":"",
        "gender":"",
         "email":"",
        "git":""
        
         
    };
    
    this.setFirstName=(fname)=>this.studentServiceForm.firstName=fname;
    this.setLastName=(fname)=>this.studentServiceForm.lastName=fname;
    this.setAddress=(fname)=>this.studentServiceForm.address=fname;
    this.setDob=(fname)=>this.studentServiceForm.dob=fname;
    this.setSsn=(fname)=>this.studentServiceForm.ssn=fname;
    this.setGender=(fname)=>this.studentServiceForm.gender=fname;
    this.setEmail=(fname)=>this.studentServiceForm.email=fname;
    this.setGit=(fname)=>this.studentServiceForm.git=fname;
   
    this.getFirstName=()=>this.studentServiceForm.firstName;
    
    
    
    
   /* 
     this.submitForm=function(){
                                       
                                        this.dataStudent.push(this.studentServiceForm);
                                                   
                                        console.log(this.dataStudent);
         
         
                                    };*/
        
       
   
    
    
    
    }]);
