
/* JavaScript content from js/controllers/loanInfoCtrl.js in folder common */
/* JavaScript content from js/controllers/customerInfoCtrl.js in folder common */
FeCreditApp.controller('dueInfoCtrl', function($scope, $location, $rootScope, $ionicNavBarDelegate, $ionicLoading, $timeout, $state) {
    $ionicNavBarDelegate.showBackButton(false);

    $scope.$on("$ionicView.enter", function(event, data) {

        $scope.contDetailTitle = Messages.contDetailTitle;
        $scope.custInformation = Messages.custInformation;
        $scope.cancelButton = Messages.cancelButton;
        $scope.moreButton = Messages.moreButton;
        
        $scope.custPhoto = Messages.custPhoto;
        $scope.custName = Messages.custName;
        $scope.custGender = Messages.custGender;
        $scope.custDob = Messages.custDob;
        $scope.custIdNum = Messages.custIdNum;
        $scope.custFbNum = Messages.custFbNum;
        $scope.fbOwner = Messages.fbOwner;
        $scope.custAppId = Messages.custAppId;
        $scope.custJobDesc = Messages.custJobDesc;
        
        $scope.nextButton = Messages.nextButton;
        $scope.footerPR = Messages.footerPR;
        $scope.footerUR = Messages.footerUR;
        $scope.footerRepos = Messages.footerRepos;
        $scope.footerCT = Messages.footerCT;

        $scope.contInfoSubHeader = Messages.contInfoSubHeader;
        $scope.contInfoMobile = Messages.contInfoMobile;
        $scope.regPhone = Messages.regPhone;
        $scope.spouseNum = Messages.spouseNum;
        $scope.motherNum = Messages.motherNum;
        $scope.fatherNum = Messages.fatherNum;
        $scope.thirdPerNum = Messages.thirdPerNum;
        $scope.phoneAll = Messages.phoneAll;
        $scope.actualAddress = Messages.actualAddress;
        $scope.familyAddress = Messages.familyAddress;
        $scope.compNameAddr = Messages.compNameAddr;
        $scope.addrSkipField = Messages.addrSkipField;
        
        $scope.loanInfoSubHeader = Messages.loanInfoSubHeader;
        $scope.contractId = Messages.contractId;
        $scope.dealDate = Messages.dealDate;
        $scope.loanTerm = Messages.loanTerm;
        $scope.loanProduct = Messages.loanProduct;
        $scope.loanAmount = Messages.loanAmount;
        $scope.securityDeposit = Messages.securityDeposit;
        $scope.bikeType = Messages.bikeType;
        $scope.bikeColor = Messages.bikeColor;
        $scope.mrcNumber = Messages.mrcNumber;
        $scope.cdlDesc = Messages.cdlDesc;
        $scope.loanDueDate = Messages.loanDueDate;
        $scope.loanInstallment = Messages.loanInstallment;
        $scope.loanLastPay = Messages.loanLastPay;
        $scope.amountOverdue = Messages.amountOverdue;
        $scope.loanPos = Messages.loanPos;
        $scope.loanPenalty = Messages.loanPenalty;
        $scope.numInstDue = Messages.numInstDue;
        $scope.loanDpd = Messages.loanDpd;
        $scope.loanBucket = Messages.loanBucket;
        $scope.loanPaidTerm = Messages.loanPaidTerm;
        $scope.loanTotalPaid = Messages.loanTotalPaid;
        
        $scope.otherInfoSubHeader = Messages.otherInfoSubHeader;
        $scope.lastUnitCode = Messages.lastUnitCode;
        $scope.lastActFv = Messages.lastActFv;
        $scope.lastActPhone = Messages.lastActPhone;
        $scope.lastActSkip = Messages.lastActSkip;
        $scope.fieldUw = Messages.fieldUw;
        $scope.custMemoLine = Messages.custMemoLine;
        $scope.saleDirection = Messages.saleDirection;
        $scope.preButton = Messages.preButton;
        
    	if ($rootScope.deviceLang == 'vi') {
  		  
		    $scope.cnclButtonViet = true;
		    $scope.nextbuttonloan = true;
		    $scope.nextbuttoncontact = true;
		    

		}
        
    });
    $scope.nextPage = function() {
        //				alert("ffsdf");
        // $scope.templateURL = '/customerInformation.html';
        $location.path("page22");
    };
     $scope.goToNextInfo = function(state) {
           $state.go(state);
        };
     $scope.goBack = function() {
            $state.go('fECREDIT.contactInformation');
         };


    $scope.nextdetail = function(args) {
    	$scope.showLoading();
    	$scope.timer = $timeout($scope.hideLoading, 300);
        $rootScope.index += args;
        if ($rootScope.index >= 0 && $rootScope.index < $rootScope.localSelectedArray.length) {
//            $scope.index = $rootScope.index;
            // loadNextPage
        } else {
            $rootScope.index -= args;
        }

        
    };
    
    $scope.showLoading = function() {
        $ionicLoading.show({
            template: '<ion-spinner icon="dots"></ion-spinner>'
        });
    };


    $scope.hideLoading = function() {
        $ionicLoading.hide();
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
    
});