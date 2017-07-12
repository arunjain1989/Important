
/* JavaScript content from js/controllers/paidNewScreen.js in folder common */

/* JavaScript content from js/controllers/paidNewScreen.js in folder common */

/* JavaScript content from js/controllers/unpaidNewScreen.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */
FeCreditApp.controller('paidNewCtrl', [ '$scope', '$stateParams', '$rootScope', '$state','$ionicPopup','$ionicLoading', '$ionicScrollDelegate','$exceptionHandler',// The
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
                                                  $scope.recordTitle = Messages.record;
                                                  $scope.cancelButton = Messages.cancelButton;
                                                  
                                                  $scope.customerId = Messages.customerId;
                                                  $scope.custName = Messages.custName;
                                                  $scope.lastActionDate = Messages.lastActionDate;
                                                  $scope.dateAssign = Messages.dateAssign;
                                                  $scope.directionText = Messages.directionText;
                                                  $scope.loadingDialougeSearch = AlertMessages.loadingDialougeSearch;
                                                  
                                                  
                                                  $scope.contractId = Messages.contractId;
                                                  $scope.customerId = Messages.customerId;
                                                  $scope.contCustName = Messages.contCustName;
                                                  $scope.AddressTitile = Messages.AddressTitile;
                                                  
                                                  
                                                  
                                                  
                                                  try{
                                                  $rootScope.searchTextBlack = false;
                                                  
                                                  document.getElementById("mytext_record").value = ""+Messages.searchBtn;
                                                  }catch(e){
                                                  $exceptionHandler(e, " ");
                                                  }
                                                  
                                                  
                             
                                                  
                                                  
                                                  
             });
                     
                             
                                       $scope.$on('$ionicView.leave', function(){
                                                  $rootScope.searchBtn = Messages.searchBtn;
                                                  $rootScope.searchTextBlack = false;
                                                  $rootScope.contractList = $rootScope.mainContractList;
                                                  });
                                       
                                         
                     $scope.clearFilter = function() {
                                       $rootScope.searchBtn = Messages.searchBtn;
                                       $rootScope.searchTextBlack = false;
                                       
                                       $rootScope.contractList = $rootScope.mainContractList;
                               };
                                       
                                         
                      
                                       
                                       
                                       
                                       
                                       $scope.paidnextscreen = function (contract, indexValue) {
                                       
                                       
                                       $rootScope.paiddata=contract;
                                      
                                       
                                       $scope.lengthvalue1 = $rootScope.paiddata.json.mobilePhone.length;
                                     
                                      
                                       
                                       if ($scope.lengthvalue1>0){
                                       $rootScope.phoneNumberpaid=true;
                                       
                                       
                                       }else{
                                       $rootScope.phoneNumberpaid=false;
                                       
                                       }
                                       
                                       
                                       
                                       
                                       $state.go("fECREDIT.paidCases");
                                       
                                       
                                       
                                       
                                       };
                                       
                                       
	
		} ]);
