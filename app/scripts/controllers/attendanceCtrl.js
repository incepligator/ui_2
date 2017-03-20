
angular.module("attendance").controller("attendanceCtrl",["$scope","attendanceService", function($scope,as){
    
    
    $scope.studentAttendance=as.studentAttendanceService;
    
    $scope.date=new Date();
    
    
    var studentAttendance ={
        
        name:"",
        id:""
        
    }
   
    
/*    $scope.date=[{
                    
        
        
    }];*/
    
    
    $scope.present="present";
    
    
    
    $scope.attendent=[];
    
    
     $scope.submitAttendance=()=>{
         
     //   var attendent = [];
         
         
         
        $scope.studentAttendance.map(function(item) {
            if (item.status){
                item.date=$scope.date;
                
                
                var water={
                    
                    "name":"",
                    "status":"",
                    "date":""
                    
                }
                $scope.attendent.push(item);
                
            }
         //   return attendent;
            
            
        });
         
         
      //   this.report=attendent;
         
         
        console.log($scope.attendent);
        
      
         
        
    }

 //   console.log(report);
    
/*    $scope.report=[
        
        {
            "Date":"$scope.date",
            "Name":""
        
        
        }
    ];*/
    
    
    
}]);


