
/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */
FeCreditApp.controller('unpaidCasesCtrl', [ '$scope', '$stateParams', '$rootScope', '$state','$ionicPopup','$ionicLoading', '$ionicScrollDelegate','$exceptionHandler',// The
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
		$rootScope.unPaidCaseTitle = Messages.unPaidCaseTitle;
		$rootScope.cancelButton = Messages.cancelButton;

    	$rootScope.allocatedDatesT = Messages.allocatedDate;
    	$rootScope.customerConNumber = Messages.customerConNumber;
    	$rootScope.ptpAmountText = Messages.ptpAmountText;
    	$rootScope.contractId = Messages.contractId;
    	$rootScope.contCustName = Messages.contCustName;
    	$rootScope.ptpDateText = Messages.ptpDateText;
    	$rootScope.installmentText = Messages.installmentText;
    	$rootScope.serviceText = Messages.serviceText;
    	$rootScope.ptpChannel = Messages.ptpChannel;
    	$rootScope.nextButton = Messages.nextButton;
    	$rootScope.preButton = Messages.preButton;
    	$rootScope.caseCountText = Messages.caseCountText;
    	$rootScope.noResultsFound = AlertMessages.noResultsFound;
    	$rootScope.alertTitile = AlertMessages.alertTitile;
    	$rootScope.loadingDialougeSearch = AlertMessages.loadingDialougeSearch;
    	
    	

        
        if ($rootScope.deviceLang == 'vi') {

            $scope.cnclButtonViet = true;

        }
$rootScope.unpaidIndex = 0;
$rootScope.nextDiv = true;
$rootScope.previousDiv = false;

//                                                                try{
//                                                                	 $rootScope.searchTextBlack = false;
//                                            					document.getElementById("mytext_unpaid").value = ""+Messages.searchBtn;
//                                            					}catch(e){
//                                            						$exceptionHandler(e, " ");
//                                            					}
    });
	
	

 
$scope.nextCase = function(args, upPaidContractList) {
  $rootScope.unpaidIndex =  $rootScope.unpaidIndex+args;
  if ($rootScope.unpaidIndex < 0 || $rootScope.unpaidIndex >= upPaidContractList.length) {
  	 $rootScope.unpaidIndex =  $rootScope.unpaidIndex-args;
  	 
  };
  
  if ($rootScope.unpaidIndex==0) {
  	// hide previous button
  	 $rootScope.previousDiv = false;
       
  }
  if ($rootScope.unpaidIndex > 0) {
	  	// hide previous button
	  	 $rootScope.previousDiv = true;
	       
	  }
  if($rootScope.unpaidIndex < upPaidContractList.length-1){
	  	// show previous button
	  	 $rootScope.nextDiv = true;
//	  	 $scope.previousDiv = true;
	  }
  
  if($rootScope.unpaidIndex == upPaidContractList.length-1){
  	// show previous button
  	 $rootScope.nextDiv = false;
//  	 $scope.previousDiv = true;
  }

  
  

  if($rootScope.unpaidIndex > 0 && $rootScope.unpaidIndex < (upPaidContractList.length-1)){
  	$rootScope.nextDiv = true;
  	$rootScope.previousDiv = true;
  };
  
  if (upPaidContractList.length == 1) {
	  	 
	  	 $rootScope.previousDiv = false;
	 	$rootScope.nextDiv = false;
	  	 
	       
	  }
};















$scope.openDetail = function(docId) {
	$rootScope.hidePreviousInDetail=true;
	$rootScope.hideNextInDetail=true;
    	//alert("contId="+contId+" "+$rootScope.contractList[0]);
    	$rootScope.unpaidIndex=0;
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
    	$rootScope.unpaidIndex = 0;
    	$rootScope.nextDiv = true;
    	$rootScope.previousDiv = false;
  	  $rootScope.contractList = $rootScope.mainContractList;
        
          });
    
    $scope.$on('$ionicView.leave', function(){
    $rootScope.searchBtn = Messages.searchBtn;
                         $rootScope.searchTextBlack = false;
    	$rootScope.unpaidIndex = 0;
//    	$scope.quickbuttonclick();
//    	  $rootScope.contractList = $rootScope.mainContractList;
  	  $rootScope.quickhide = false;
	  $rootScope.advancehide=true;
	  $rootScope.quickview = "withclick";
		$rootScope.advanceview = "withoutclick";
   	});
                                           
                                           
                                           
                                           
                                           

    $scope.clearFilter = function() {

    $rootScope.searchBtn = Messages.searchBtn;
                         $rootScope.searchTextBlack = false;

   	 $rootScope.contractList = $rootScope.mainContractList;
   	$scope.unpaidIndex = 0;
   	$scope.previousDiv = false;
	$scope.nextDiv = true;
   	
   };
                                           
                                           
                                           $scope.unpaidBack = function () {
                                           
                                           
                                           
                                           
                                           $state.go("fECREDIT.unPaidNewCases");
                                           
                                           
                                           
                                           
                                           };
                                           
                                           
                                           

		} ]);
