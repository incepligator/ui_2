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
    
    var person1={
                                                 
         "firstName":"Shrawan",
        "lastName":"Shrestha",
         "address":"Dillibazar",
        "dob":"2042-08-17",
         "ssn":"984-14-3147",
        "gender":"Male",
         "email":"metal.ray17@gmail.com",
        "git":"incepligator"
              
          }
    var person2={
                                                 
         "firstName":"Jeet",
        "lastName":"Kharka",
         "address":"Jhapa",
        "dob":"2037-08-17",
         "ssn":"984-14-3147",
        "gender":"Male",
         "email":"jeet@gmail.com",
        "git":"jeetkhark"
              
          }
         
        this.dataStudent.push(person1);
    this.dataStudent.push(person2);
    
   /* 
     this.submitForm=function(){
                                       
                                        this.dataStudent.push(this.studentServiceForm);
                                                   
                                        console.log(this.dataStudent);
         
         
                                    };*/
        
       
   
    
    
    
    }]);
