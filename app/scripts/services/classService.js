angular.module("attendance").service("classService",['$http',function($http){
    
    
    
    
/*    this.classList = [];
    this.classListAll = [];
    this.classListId = [];*/
    
     this.studentListId = [];
    
    var that = this;
    
    
       this.getStudentList= function(){
        return $http({
            
            method:"GET",
            url:"/service/studentlist/all"
        }).then(function(result){
            
            that.studentListId = result.data;
            return result.data
        });
    };
    
    
/*    this.getClassListActive = function(){
        return $http({
            
            method:"GET",
            url:"/service/class"
        }).then(function(result){
            
            that.classList = result.data;
            return result.data
        });
    };*/
    
/*    this.getClassListAll = function(){
        return $http({
            method:"GET",
            url:"/service/class/all"
        }).then(function(result){
            that.classListAll = result.data;
            return result.data
        });
    };*/
    
    
/*    this.getClassListId = function(id){
        return $http({
            method:"GET",
            url:"/service/class/"+id
        }).then(function(result){
            that.classListId = result.data;
            return result.data
        });
    }
    */
    
    //post 
/*   var sampleTest={
       "title":"test123",
        "active":1
    }
    
    
    
    this.postClass = function(dataParam){
        return $http({
            method:"POST",
            url:"/service/class",
            data:dataParam
        }).then(function(result){
            return result.status;
        });
    };*/
    
        this.postStudentData = function(dataParam){
            
        return $http({
            
            method:"POST",
            url:"/service/studentlist",
            data:dataParam
            
           
            
            
        }).then(function(result){
            return result.status;
        });
    };
    
    
        this.putStudentData = function(dataParam){
            
          console.log(dataParam.id);
            
            
         var idx=dataParam.id;
            
            
        return $http({
            
            method:"PUT",
            url:"/service/studentlist/"+idx,
            data:dataParam
            
           
            
            
        }).then(function(result){
            return result.status;
        });
    };
    
     this.deleteStudentData = function(dataParam){
            
        return $http({
            
            method:"delete",
            url:"/service/studentlist/"+dataParam
            
            
           
            
            
        }).then(function(result){
            return result.status;
        });
    };
    
}]);