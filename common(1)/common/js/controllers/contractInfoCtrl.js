
/* JavaScript content from js/controllers/contractInfoCtrl.js in folder common */
/* JavaScript content from js/controllers/contractInfoCtrl.js in folder common */
FeCreditApp.controller('contractInfoCtrl', ['$scope', '$state', '$stateParams', '$rootScope', '$ionicLoading', '$timeout','$ionicScrollDelegate', function($scope, $state, $stateParams, $rootScope, $ionicLoading, $timeout,$ionicScrollDelegate) {

    $scope.$on("$ionicView.enter", function(event, data) {
        $rootScope.nextButtonClicked = false;
    	$ionicScrollDelegate.scrollTop();
        $scope.contDetailTitle = Messages.contDetailTitle;
        $scope.contInformation = Messages.contInformation;
        $scope.cancelButton = Messages.cancelButton;
        $scope.moreButton = Messages.moreButton;
        $scope.customerId = Messages.customerId;
        $scope.custFullName = Messages.custFullName;
        $scope.custContId = Messages.custContId;
        $scope.unitCode = Messages.unitCode;
        $scope.regionTeam = Messages.regionTeam;
        $scope.dateAssign = Messages.dateAssign;
        $scope.directionText = Messages.directionText;
        $scope.checkIn = Messages.checkInHistoryTitle;
        $scope.nextButton = Messages.nextButton;
        $scope.footerPR = Messages.footerPR;
        $scope.footerUR = Messages.footerUR;
        $scope.footerRepos = Messages.footerRepos;
        $scope.footerCT = Messages.footerCT;
        $scope.preButton = Messages.preButton;
        $scope.fieldUw = Messages.fieldUw;
        $scope.STATUS = Messages.STATUS;


        
        if ($rootScope.deviceLang == 'vi') {
  		  
		    $scope.cnclButtonViet = true;
		    $scope.nextbuttonViet = true;
		    $scope.nextbuttoncontact = true;
		}
        
        
     /*   $scope.field="fieldCollector";
        $scope.recordUploadEnabled = ($scope.field === "fieldCollector") ? true
				: false;
        

     if($scope.recordUploadEnabled== false){

    	    document.getElementById("printReciept").style.width = "33.3%";
        	document.getElementById("repossession").style.width = "33.3%";
        	document.getElementById("ct").style.width = "33.3%";
       }*/
       
       

});

    $scope.checkInPopUpFlag = false;
    $scope.toggleCheckInPopUp = function() {

        if ($scope.checkInPopUpFlag) {
            $scope.checkInPopUpFlag = false;
        } else {
            $scope.checkInPopUpFlag = true;
        }
    };

    $scope.checkIns = function(contract) {
        $rootScope.contractId  = contract.json.contractId;
        $state.go("fECREDIT.checkInHistory");
    }


//    $scope.localSelectedArray = $rootScope.indices;
//
//    $scope.index = $rootScope.index;

    $scope.nextdetail = function(args) {
    	$scope.showLoading();
    	 $scope.timer = $timeout($scope.hideLoading, 300);
    	
        $rootScope.index += args;
        if ($rootScope.index >= 0 && $rootScope.index < $rootScope.localSelectedArray.length) {
                                            
//            $scope.index = $rootScope.index;
            // loadNextPage
//        	 $rootScope.hidePreviousInDetail = false;
//             $rootScope.hideNextInDetail = false;
        } else {
            $rootScope.index -= args;
                                           
//            $rootScope.hidePreviousInDetail = true;
//            $rootScope.hideNextInDetail = false;
        }
        
       
//        $scope.hideLoading();

    };
         $scope.goToNextInfo = function(state) {
               $state.go(state);
            };
      
            $scope.goBack = function() {
           	 navigator.app.backHistory();
                };
    
    
    $scope.showLoading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="dots"></ion-spinner>'
        });
    };


    $scope.hideLoading = function() {
        $ionicLoading.hide();
    };


    $scope.goToMap = function(contractObject) {
    	
    	
    	actAddress = contractObject.json.actAddress;
   	 	regAddress = contractObject.json.regAddress;
   	 	offAddress = contractObject.json.offAddress;
        $state.go("fECREDIT.map");

    };
    $scope.goToRecordUpload = function(contract) {
		$rootScope.selectedRecord = contract;
		$rootScope.selectedDraftRecord="";
		$state.go('fECREDIT.recordUpload');
		
	};
	$scope.goToContTerm = function(contract) {
    	
    	$rootScope.terminationSelected  = contract.json;
		$state.go('fECREDIT.termination');
	 };
	 
	 $scope.goToContRepos=function(contract) {
	    	
		 if(contract != undefined && (contract.json.product == 'FC_CDL' || contract.json.product == 'FC_TW')) {
			 $rootScope.IsContractBack=true;
	            $rootScope.reposContSelected  = contract;
             			$state.go('fECREDIT.repossession');
	        }else{
	            $rootScope.showAlert("" + AlertMessages.notEligibleForRepo , "" + AlertMessages.alertTitile);
	            
	        }
		 };
                                            $scope.nextBtnClickedForImage = function(contract)
                                            {
                                              $rootScope.selectedCcustomerID = contract.json.custId;
                                              $state.go('fECREDIT.customerInformation');
                                            
                                            };	 

}]);