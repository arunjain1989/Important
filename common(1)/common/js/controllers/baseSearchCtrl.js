
/* JavaScript content from js/controllers/baseSearchCtrl.js in folder common */

/* JavaScript content from js/controllers/baseSearchCtrl.js in folder common */

/* JavaScript content from js/controllers/recordCtrl.js in folder common */

/* JavaScript content from js/controllers/recordCtrl.js in folder common */
FeCreditApp
		.controller(
				'baseSearchCtrl',
				function($scope, $state, $location, $ionicPopup, $ionicLoading,
						$rootScope,$ionicNavBarDelegate,$exceptionHandler) {// The following
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
//					$scope.$on("$ionicView.beforeEnter", function(event, data){
//			        	//alert("msg obj = "+ JSON.stringify(Messages));
//			        	  // handle event
//			        	$scope.recordTitle = Messages.record;
//			        	$scope.cancelButton = Messages.cancelButton;
//			        	$scope.searchBtn = Messages.searchBtn;
//
//			        	$scope.customerId = Messages.customerId;
//			        	$scope.custName = Messages.custName;
//			        	$scope.dateAssign = Messages.dateAssign;
//			        	$scope.directionText = Messages.directionText;
					
					$scope.$on("$ionicView.enter", function(event, data) {
						
						 $rootScope.contractList = [];
				    	 $scope.selectContractArr=[];


				        $scope.contractId = Messages.contractId;
				        $scope.customerId = Messages.customerId;
				        $scope.customerName = Messages.customerName;
				        $scope.AddressTitile = Messages.AddressTitile;

				        $scope.recordTitle = Messages.record;
			        	$scope.cancelButton = Messages.cancelButton;

			        	
			        	$scope.customerId = Messages.customerId;
			        	$scope.custName = Messages.custName;
			        	$scope.dateAssign = Messages.dateAssign;
			        	$scope.directionText = Messages.directionText;
			        	$scope.searching = Messages.searching;

			        	        $rootScope.searchBtn = Messages.searchBtn;
                                $rootScope.searchTextBlack = false;
			        	
			        	
			        	   if ($rootScope.deviceLang == 'vi') {

			                   $scope.cnclButtonViet = true;
			                  // document.getElementById("recordContentTop").className += " recordContentTopCss";
			               }

			               try{
                                        $rootScope.searchTextBlack = false;
                           					document.getElementById("mytext_search").value = ""+Messages.searchBtn;

                           					}catch(e){
                           						$exceptionHandler(e, " ");
                           					}

				    });
					
//			        });
					
					
					
					$ionicNavBarDelegate.showBackButton(false);
					 $rootScope.quickview = "withclick";
					    $rootScope.advanceview = "withoutclick";
					 	$rootScope.quickhide = false;
						$rootScope.advancehide = true;
						$rootScope.valueData;
						$rootScope.selectedDraftRecord="";



						     $scope.selectContractArr = [];
                                 
					

				    
				    
			        $scope.$on('$ionicView.leave', function(){
			                $rootScope.searchBtn = Messages.searchBtn;
                            $rootScope.searchTextBlack = false;
			        	$scope.selectedContractMap=[];
			        	$scope.selectContractArr=[];
			       	});


				    $scope.goToMap = function(contractObject) {
			        	actAddress = contractObject.json.actAddress;
				    	 regAddress = contractObject.json.regAddress;
				    	 offAddress = contractObject.json.offAddress;
			            $state.go("fECREDIT.map");

			        };
				    
				    
			        $scope.goToContractDetail = function(indexValue) {
			        	 $rootScope.index = 0;
			           
			               
			                    $rootScope.hidePreviousInDetail = true;
			                    $rootScope.hideNextInDetail = true;
			                    $scope.selectContractArr=[];
			                    $scope.selectContractArr.push(indexValue);
			                
			                $rootScope.indices = $scope.selectContractArr;
			                $rootScope.localSelectedArray = $scope.selectContractArr;
			                
			                $state.go("fECREDIT.contractInformation", {
			                    indices: $scope.selectContractArr
			                });
			                 
			             
			        };
			        
			        $scope.clearFilter = function() {
			                $rootScope.searchBtn = Messages.searchBtn;
                            $rootScope.searchTextBlack = false;
			        	 $rootScope.contractList = $rootScope.mainContractList;
			        };
			      

				})