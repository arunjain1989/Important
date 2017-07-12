
/* JavaScript content from js/controllers/recordCtrl.js in folder common */
/* JavaScript content from js/controllers/recordCtrl.js in folder common */
FeCreditApp
		.controller(
				'recordCtrl',
				function($scope, $state, $location, $ionicPopup, $ionicLoading,
						$rootScope,$ionicNavBarDelegate,$exceptionHandler ) {// The following
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

			            
			            if ($rootScope.deviceLang == 'vi') {

			                $scope.cnclButtonViet = true;
//			                document.getElementById("recordContentTop").className += " recordContentTopCss";
			            }
			                  		try{
			                  			 $rootScope.searchTextBlack = false;

                                    					document.getElementById("mytext_record").value = ""+Messages.searchBtn;
                                    					}catch(e){
                                    						$exceptionHandler(e, " ");
                                    					}
			         /*   $scope.fieldCollector = 'fieldCollect';
			            $scope.teamLeader = 'teamLead';
			            
			            if($scope.fieldCollector === 'fieldCollector' || $scope.teamLeader==='teamLeader'){
							$scope.editRecord = true;	
						}else{
							$scope.editRecord = false;	
						}	
			            

			            alert($scope.editRecord);*/



			            
			            
			            
			        });
					
				/*	if( WL.App.getDeviceLanguage() == 'vi'){
		            	document.getElementById("recordContentTop").className += " recordContentTopCss";
		            	
		            	
		            	
		        	}
		            */
					
					
					
					$ionicNavBarDelegate.showBackButton(false);
					 $rootScope.quickview = "withclick";
					    $rootScope.advanceview = "withoutclick";
					 	$rootScope.quickhide = false;
						$rootScope.advancehide = true;
						$rootScope.valueData;
						$rootScope.selectedDraftRecord="";

				    $scope.selectedContractMap = [];
					$scope.selectedRecordElem = function (contract, indexValue) {

					    if ($scope.selectedContractMap[indexValue]) {
					        $scope.selectedContractMap[indexValue] = false;
					    } else {
					        $scope.selectedContractMap[indexValue] = true;
					    }
					    $rootScope.selectedRecordFromRecord=true;
					    $rootScope.selectedRecord = contract;
						$state.go('fECREDIT.recordUpload');
					};
					
				    $scope.$on('$ionicView.enter', function(){
				        
				    	  $rootScope.contractList = $rootScope.mainContractList;
				          
				            });
				    
				    
				    $scope.goToMap = function(contractObject) {
				    	 actAddress = contractObject.json.actAddress;
				    	 regAddress = contractObject.json.regAddress;
				    	 offAddress = contractObject.json.offAddress;
				    	$state.go("fECREDIT.map");
				    	
				    };

				    
				    $scope.$on("$ionicView.enter", function(event, data) {


				        $scope.contractId = Messages.contractId;
				        $scope.customerId = Messages.customerId;
				        $scope.customerName = Messages.customerName;
				        $scope.AddressTitile = Messages.AddressTitile;


				    });
				    
				    
				    
				    
				    $scope.$on('$ionicView.leave', function(){
				                                $rootScope.searchBtn = Messages.searchBtn;
                                                $rootScope.searchTextBlack = false;
			        	$scope.selectedContractMap=[];
			        	$scope.selectContractArr=[];
			       	});
				    
				    
				    $scope.clearFilter = function() {
                            $rootScope.searchBtn = Messages.searchBtn;
                            $rootScope.searchTextBlack = false;
			        	 $rootScope.contractList = $rootScope.mainContractList;
			        };
				    
				    
				    
				})