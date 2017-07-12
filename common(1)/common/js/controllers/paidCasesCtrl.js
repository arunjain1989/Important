
/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/paidCasesCtrl.js in folder common */
FeCreditApp.controller('paidCasesCtrl', [ '$scope', '$stateParams',  '$rootScope', '$state','$ionicPopup','$ionicLoading', '$ionicScrollDelegate','$exceptionHandler',// The
																	// following
																	// is the
																	// constructor
																	// function
																	// for this
																	// page's
																	// controller.
																	// See
																	// https://docs.angularjs.org/guide/controller
		// You can include any angular dependencies as parameters for this
		// function
		// TIP: Access Route Parameters for your page via
		// $stateParams.parameterName
		function($scope, $stateParams, $rootScope, $state,$ionicPopup,$ionicLoading, $ionicScrollDelegate,$exceptionHandler ) {
			
	
	$scope.$on("$ionicView.enter", function(event, data) {


$ionicScrollDelegate.scrollTop();

		$scope.paidCaseTitle = Messages.paidCaseTitle;

		$scope.cancelButton = Messages.cancelButton;
		
    	$scope.allocatedDatesT = Messages.allocatedDate;
    	$scope.customerConNumber = Messages.customerConNumber; 
    	$scope.ptpAmountText = Messages.LAST_PAYMENT_AMOUNT;
    	$scope.contractId = Messages.contractId;
    	$scope.contCustName = Messages.contCustName;
    	$scope.ptpDateText = Messages.LAST_PAYMENT_DATE;
    	$scope.installmentText = Messages.installmentText;
    	$scope.serviceText = Messages.serviceText;
    	$scope.ptpChannel = Messages.ptpChannel;
    	$scope.nextButton = Messages.nextButton;
    	$scope.preButton = Messages.preButton;
    	$scope.totalCaseCountText = Messages.totalCaseCountText;
    	$scope.totalCaseAmountText = Messages.totalCaseAmountText;
    	$scope.noResultsFound = AlertMessages.noResultsFound;
    	$scope.alertTitile = AlertMessages.alertTitile;
    	$scope.loadingDialougeSearch = AlertMessages.loadingDialougeSearch;
		
    	
    	
		
		

        $scope.contractId = Messages.contractId;
        $scope.customerId = Messages.customerId;
        $scope.customerName = Messages.customerName;
        $scope.AddressTitile = Messages.AddressTitile;

        
        
        if ($rootScope.deviceLang == 'vi') {

            $scope.cnclButtonViet = true;

        }
$rootScope.paidIndex = 0;

//try{
//	 $rootScope.searchTextBlack = false;
//                                            					document.getElementById("mytext_paid").value = ""+Messages.searchBtn;
//                                            					}catch(e){
//                                            						$exceptionHandler(e, " ");
//                                            					}

    });
	
	
	
	
	
	

	$rootScope.advancehide=true;
	$rootScope.quickhide = false;
$rootScope.quickview = "withclick";
$rootScope.advanceview = "withoutclick";
$rootScope.paidIndex = 0;
 $rootScope.nextDiv = true;
 $rootScope.previousDiv = false;
 
                                         
              
                                         
                                         
                                         $scope.paidBack = function() {
                                         
                                         
                                         $state.go("fECREDIT.paidNewCtrl");
                                         
                                         
                                         }
                                         
                                         
$scope.nextCase = function(args, paidContractList) {
  $rootScope.paidIndex =  $rootScope.paidIndex+args;
  if ($rootScope.paidIndex < 0 || $rootScope.paidIndex >= paidContractList.length) {
  	 $rootScope.paidIndex =  $rootScope.paidIndex-args;
//  	 return;
  }
  
  if ($rootScope.paidIndex==0) {
  	// hide previous button
  	 $rootScope.previousDiv = false;
       
  }
  if ($rootScope.paidIndex > 0) {
	  	// hide previous button
	  	 $rootScope.previousDiv = true;
	       
	  }
  if($rootScope.paidIndex < paidContractList.length-1){
	  	// show previous button
	  	 $rootScope.nextDiv = true;
//	  	 $scope.previousDiv = true;
	  }
  
  if($rootScope.paidIndex == paidContractList.length-1){
  	// show previous button
  	 $rootScope.nextDiv = false;
//  	 $scope.previousDiv = true;
  }

  
  

  if($rootScope.paidIndex > 0 && $rootScope.paidIndex < (paidContractList.length-1)){
  	$rootScope.nextDiv = true;
  	$rootScope.previousDiv = true;
  };
  
  if (paidContractList.length == 1) {
	  	 
	  	 $rootScope.previousDiv = false;
	 	$rootScope.nextDiv = false;
	  	 
	       
	  }
};



$scope.openDetail = function(docId) {
	$rootScope.hidePreviousInDetail=true;
	$rootScope.hideNextInDetail=true;
    	//alert("contId="+contId+" "+$rootScope.contractList[0]);
    	$rootScope.index=0;
    	$scope.selectContractArr = [];
    	for(var i = 0; i < $rootScope.contractList.length; i++){
            if (docId === $rootScope.contractList[i]._id) {
            		$scope.selectContractArr.push(i);
            		// go to Detail page
            		$rootScope.indices = $scope.selectContractArr;
            		 $rootScope.localSelectedArray = $scope.selectContractArr;
    		return $state.go("fECREDIT.contractInformation", {indices : $scope.selectContractArr});
            		
            };
            
           
             
        }
    	 
    };
    
    $scope.$on('$ionicView.enter', function(){
    	$rootScope.paidIndex = 0;
    	$rootScope.nextDiv = true;
    	$rootScope.previousDiv = false;
  	  $rootScope.contractList = $rootScope.mainContractList;
        
          });
    
    
    $scope.$on('$ionicView.leave', function(){
        $rootScope.searchBtn = Messages.searchBtn;
                             $rootScope.searchTextBlack = false;
    	$rootScope.paidIndex = 0;
  	  $rootScope.quickhide = false;
	  $rootScope.advancehide=true;
	  $rootScope.quickview = "withclick";
		$rootScope.advanceview = "withoutclick";
//    	$scope.quickbuttonclick();
//    	$rootScope.contractList = $rootScope.mainContractList;
   	});
    
    
    $scope.clearFilter = function() {
        $rootScope.searchBtn = Messages.searchBtn;
                             $rootScope.searchTextBlack = false;

   	 $rootScope.contractList = $rootScope.mainContractList;
   	$rootScope.paidIndex = 0;
   	$rootScope.previousDiv = false;
	$rootScope.nextDiv = true;
   };
    
		} ]);