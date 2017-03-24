
angular.module("attendance").controller("attendanceCtrl",["$scope","attendanceService", function($scope,as){
    
    
    $scope.studentAttendance=as.studentAttendanceService;
  
    $scope.date=new Date();
    
    
    var studentAttendance ={
        
        name:"",
        id:""
        
    }
   
    $scope.present="present";
    

    
    $scope.attendent=[];
    
    
    
    
     $scope.submitAttendance=()=>{
         
                  
                                
         var testObj={};
         
        
        $scope.studentAttendance.map(function(item) {
            
                if (item.status){
                
                    item.date=$scope.date;
                      
                if(testObj[item.date]==undefined){
                    testObj[item.date]=[];
                }
                    
                    if(testObj[item.date])
                
                testObj[item.date].push({
                    "name":item.name
                });
                
                
            }
        
        });
         
         $scope.attendent.push(testObj);
       
       
        
        
        
    }

     console.log($scope.attendent);
    
     
     
}]);


