
/* JavaScript content from js/controllers/mapCtrl.js in folder common */

/* JavaScript content from js/controllers/mapCtrl.js in folder common */

/* JavaScript content from js/controllers/mapCtrl.js in folder common */

/* JavaScript content from js/controllers/mapCtrl.js in folder common */

/* JavaScript content from js/controllers/mapCtrl.js in folder common */

/* JavaScript content from js/controllers/mapCtrl.js in folder common */

/* JavaScript content from js/controllers/mapCtrl.js in folder common */
FeCreditApp.controller('mapCtrl', ['$scope','$state','$location','$ionicPopup','$ionicLoading','$rootScope','$ionicNavBarDelegate','$exceptionHandler', // The following is
															// the constructor
															// function for this
															// page's
															// controller. See
															// https://docs.angularjs.org/guide/controller
		// You can include any angular dependencies as parameters for this
		// function
		// TIP: Access Route Parameters for your page via
		// $stateParams.parameterName
          
                                  
                                   
                                   
 function($scope,$state,$location,$ionicPopup,$ionicLoading,$rootScope,$ionicNavBarDelegate,$exceptionHandler ){
	  $scope.$on("$ionicView.enter", function(event, data){
      	//alert("msg obj = "+ JSON.stringify(Messages));
      	  // handle event


        	$scope.mapButton = Messages.mapButton;
        	$scope.cancelButton = Messages.cancelButton;
      	
        	
        	$scope.contCustName = Messages.contCustName;
        	$scope.dateAssign = Messages.dateAssign;
        	$scope.directionText = Messages.directionText;
          $scope.contractId = Messages.contractId;
          $scope.customerId = Messages.customerId;
          $scope.customerName = Messages.customerName;
          $scope.AddressTitile = Messages.AddressTitile;

          
          if( $rootScope.deviceLang == 'vi'){
         
          	 $scope.cnclButtonViet = true;
          	
      		}

      		try{

            					document.getElementById("mytext_map").value = ""+Messages.searchBtn;
            					}catch(e){
            						$exceptionHandler(e, " ");
            					}

      });
	
	
	$ionicNavBarDelegate.showBackButton(false);
	$scope.selectContractArr = [];
	$rootScope.quickview = "withclick";
	$rootScope.advanceview = "withoutclick";
	$rootScope.quickhide = false;
    $rootScope.advancehide = true;

	$rootScope.valueData;
	$rootScope.selectedContractList=[];      
	
	$scope.map=function() {
         initMap();
	};                           
                                    
 
    $scope.selectContractArr = [];
    
    $scope.$on('$ionicView.enter', function() {
             $rootScope.searchBtn = Messages.searchBtn;
             $rootScope.searchTextBlack = false;
//    	$scope.map();
   	 if (actAddress!=='' && regAddress!=='' && offAddress!=='') {

   	  var listContract = document.getElementById("listContractmap");
      var map = document.getElementById("googleMap");
      map.style.visibility='visible'; 
      listContract.style.visibility='hidden'; 
	  
      google.maps.event.trigger(map, 'resize');
    
    	    getLocation1();
    	  	getLocation2();
    	  	getLocation3();
   		 
	}else{
		try{
			 makr1.setMap(null);
	                              makr2.setMap(null);
	                              makr3.setMap(null);
		}catch(e){
			$exceptionHandler(e, " ");
			
		}

		}

   });
    $scope.$on('$ionicView.leave', function(){
    mapCalledFromSideMenu=false;
    	 actAddress = '';
    	 regAddress = '';
    	 offAddress = '';
    	 try{
    	  makr1.setMap(null);
                                        makr2.setMap(null);
                                        makr3.setMap(null);
    	 }catch(e){
    		 $exceptionHandler(e, " ");
    	 }


    	 
    	 
//    	 google.maps.event.trigger(map, 'resize');
    	 
    	});
    	$scope.$on("$ionicView.beforeLeave", function(event, data){
           // handle event
           actAddress = '';
              	 regAddress = '';
              	 offAddress = '';

              	 try{
                      makr1.setMap(null);
                      makr2.setMap(null);
                      makr3.setMap(null);
    	}catch(e){
    		$exceptionHandler(e, " ");
   	    }

        });
    
    $scope.selectContractListItems = function(index) {
    	var i = index;
        //alert("contId="+i+" "+$rootScope.contractList[i]);
       // for (var i = 0; i < $rootScope.contractList.length; i++) {
        //    var customerId = $rootScope.contractList[i].json.customerId;
         //   var contract = $rootScope.contractList[i];
            //  alert(customerId+" "+contract);
          //  if (customerId == contId) {
                //alert(contract.selected+" status");
             //   contract.selected = !contract.selected;
                //alert(contract.selected+" status 1");
           //     if (contract.selected) {
                	
    	actAddress = $rootScope.contractList[i].json.actAddress;
    	regAddress = $rootScope.contractList[i].json.regAddress;
    	offAddress = $rootScope.contractList[i].json.offAddress;
                	
                	 
                	  
                	  var listContract = document.getElementById("listContractmap");
                      var map = document.getElementById("googleMap");
                      map.style.visibility='visible'; 
                      listContract.style.visibility='hidden'; 
                	  
                         
                    
                    	    getLocation1();
                    	  	getLocation2();
                    	  	getLocation3();



                	
//                    $scope.selectContractArr.push(contId);
               /* } else {

                    var index = $scope.selectContractArr.indexOf(contId);
                    $scope.selectContractArr.splice(index, 1);
                }*/
                //	alert("Arr= "+$scope.selectContractArr);
        //    }
      //  }
        //alert("Arr= "+$scope.selectContractArr);
        //$scope.contListChecked = "contListChecked";
        //alert("contId="+contId);
    }

    $scope.selectAllContract = function(checkBoxValue) {

        if (!checkBoxValue) {
            for (var i = 0; i < $rootScope.contractList.length; i++) {
                var contract = $rootScope.contractList[i];
                contract.selected = false;
            }
            $scope.selectAllFlag = false;
            $scope.selectContractArr = [];
        } else {
            $scope.selectContractArr = []; // initialize again to clear previos single values
            for (var i = 0; i < $rootScope.contractList.length; i++) {
                var contract = $rootScope.contractList[i];
                contract.selected = true;
                var customerId = $rootScope.contractList[i].json.customerId;
                $scope.selectContractArr.push(customerId);
            }

            $scope.selectAllFlag = true;

        }
        //alert("Arr= "+$scope.selectContractArr);
    };
    $scope.clearFilter = function() {
                            $rootScope.searchBtn = Messages.searchBtn;
                            $rootScope.searchTextBlack = false;
   	 $rootScope.contractList = $rootScope.mainContractList;
   };


} ]);