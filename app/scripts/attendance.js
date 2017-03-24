"use strict";
angular.module("attendance",['ngMaterial','ngMessages', 'ui.router']).config(function($mdThemingProvider){
    
    
    
    
    
    
    
    
    
}).config(['$locationProvider','$stateProvider','$urlRouterProvider',
             
             
    function($locationProvider,$stateProvider, $urlRouterProvider) {
        
        
       // $locationProvider.html5Mode(true);
        
        
        $urlRouterProvider.otherwise("/");
        
        
        $stateProvider.state('studentForm',{
            
            
            url:"/studentForm",
            templateUrl: '/app/views/student.html',
            controller:"studentCtrl"
            
        }).state("studentList",{
            
            
            url:"/studentList",
            templateUrl:'/app/views/studentList.html',
            controller:"studentCtrl"
            
            
        }).state("error",{
            
            url:"/error",
            template:"<h1>page not found</h1>"
            
        }).state("waterworld",{
              url:"/waterworld",
            template:"<h1>Welcome to the jungle</h1>"
            
        }).state("ripple",{
                url:"/app/views/index.html",
              templateurl:"/app/views/text.html",
            controller:""
        });
       
    }]);