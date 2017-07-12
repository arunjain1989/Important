
/* JavaScript content from js/controllers/recordDraftCtrl.js in folder common */

/* JavaScript content from js/controllers/recordDraftCtrl.js in folder common */
FeCreditApp
		.controller(
				'recordDraftCtrl',
				function($scope, $state,
						$rootScope) {// The following
					// is the
					// constructor
					// function for
					// this page's
					// controller.
					// See
					// https://docs.angularjs.org/guide/controller
					// You can include any angular dependencies as parameters
					// for this
					// function
					// TIP: Access Route Parameters for your page via
					// $stateParams.parameterName
					$scope.$on("$ionicView.enter", function(event, data){
			        	//alert("msg obj = "+ JSON.stringify(Messages));
			        	  // handle event
			        	$scope.recordTitle = Messages.record;
			        	$scope.cancelButton = Messages.cancelButton;
			        	$scope.searchBtn = Messages.searchBtn;
			        	
			        	$scope.contractId = Messages.contractId;
			        	$scope.custName = Messages.custName;
			        	$scope.dateAssign = Messages.dateAssign;
			        	$scope.directionText = Messages.directionText;
			        	$scope.draftRecordButton = Messages.draftRecordButton;
			        	$scope.contactedPerson = Messages.contactedPerson;
			        	$scope.contactDateButton = Messages.contactDateButton;
			        	
			        	 
			        });
					
					if ($rootScope.deviceLang == 'vi') {

		                   $scope.cnclButtonViet = true;

		               }

				

					
					$scope.selectedRecordDraftElem = function(record) {
						$rootScope.selectedDraftRecord = record;
						$rootScope.recordData = record.json;
						$rootScope.selectedRecordDbId = record._id;
						$state.go('fECREDIT.recordUpload');
					};

				})