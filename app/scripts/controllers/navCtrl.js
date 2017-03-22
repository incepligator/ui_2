angular.module("attendance").controller("navCtrl",["$scope",function($scope){
   
    
    
    $scope.navList=[{
        "title":"Student Form",
        "id":1
                    },
        {
            "title":"Student List",
            "id":2
        },
                    {
            "title":"Attendance",
            "id":3
        },
                    {
            "title":"Report",
            "id":4
                    }
        ];
    
    
    
    $scope.checkid=4    ;
        
    $scope.updateId=(id)=>{  
        
         $scope.checkid=id;
    }
      
    
    
    
}]);