
/* JavaScript content from js/controllers/searchCtrl.js in folder common */
FeCreditApp.controller('searchCtrl', [ '$scope', '$stateParams', // The following
																// is the
																// constructor
																// function for
																// this page's
																// controller.
																// See
																// https://docs.angularjs.org/guide/controller
		// You can include any angular dependencies as parameters for this
		// function
		// TIP: Access Route Parameters for your page via
		// $stateParams.parameterName
		function($scope, $stateParams) {

	
	$scope.$on("$ionicView.enter", function(event, data) {

        $scope.quickSearchtitle = Messages.quickSearchtitle;
        $scope.advanceSearchtitle = Messages.advanceSearchtitle;
        $scope.enterKeyTitle = Messages.enterKeyTitle;
        $scope.FilterConditiontitle = Messages.FilterConditiontitle;
        $scope.contractId = Messages.contractId;
        $scope.customerId = Messages.customerId;
        $scope.customerName = Messages.customerName;
        $scope.AddressTitile = Messages.AddressTitile;
        $scope.filterFormulaTitle = Messages.filterFormulaTitle;
        $scope.equalTitle = Messages.equalTitle;
        $scope.NotEqualTitle = Messages.NotEqualTitle;
        $scope.endWithTitle = Messages.endWithTitle;
        $scope.includeTitle = Messages.includeTitle;
        $scope.notIncludeTitle = Messages.notIncludeTitle;
        $scope.ifAnyTitle = Messages.ifAnyTitle;
        $scope.addressTypetitle = Messages.addressTypetitle;
        $scope.currentTitle = Messages.currentTitle;
        $scope.permanent = Messages.permanent;
        $scope.work = Messages.work;

    });
	
	
	
	
	
	
	
	
	$scope.quickview = "withclick";
	$scope.advanceview = "withoutclick";
	
	$scope.quickbuttonclick= function() {
		   
		  
		  $scope.quickhide = false;
		  $scope.advancehide=true;
		  $scope.quickview = "withclick";
		  $scope.advanceview = "withoutclick";
	     
	     
	  }
	     
	  $scope.advancebuttonclick = function() {
			
		  
		  $scope.quickview = "withoutclick";
			$scope.advanceview = "withclick";
		  
			
		  $scope.quickhide = true;
			
		  $scope.advancehide=false;

			

		}
	
		} ]);