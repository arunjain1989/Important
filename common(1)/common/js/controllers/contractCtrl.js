/* JavaScript content from js/controllers/contractCtrl.js in folder common */
FeCreditApp.controller('contractCtrl', function($scope, $state, $location, $ionicPopup, $ionicLoading, $rootScope, $ionicNavBarDelegate, $timeout,$exceptionHandler ) {
        $ionicNavBarDelegate.showBackButton(false);
        $scope.selectContractArr = [];
        $rootScope.quickview = "withclick";
        $rootScope.advanceview = "withoutclick";
        $rootScope.quickhide = false;
        $rootScope.advancehide = true;

        $rootScope.valueData;
        $rootScope.selectedContractList = [];
        
        $scope.$on("$ionicView.enter", function(event, data){
        	
        	$scope.selectedContractMap=[];
            $rootScope.contractList = $rootScope.mainContractList;
        	
        	$scope.checkBoxValue = false;
        	

        	$scope.contractTitle = Messages.contractHeader;
        	$scope.cancelButton = Messages.cancelButton;
        	$scope.selectAll = Messages.selectAll; 
        	$scope.openButton = Messages.openButton;
        	$scope.contractId = Messages.contractId;
        	$scope.contCustName = Messages.contCustName;
        	$scope.dateAssign = Messages.dateAssign;
        	$scope.directionText = Messages.directionText;
        	$scope.noResultsFound = AlertMessages.noResultsFound;
        	$scope.loadingDialougeSearch = AlertMessages.loadingDialougeSearch;
        	$scope.selectContractToView = AlertMessages.selectContractToView;
        	$scope.alertTitile = AlertMessages.alertTitile;


            $scope.contractId = Messages.contractId;
            $scope.customerId = Messages.customerId;
            $scope.customerName = Messages.customerName;



            
            if( $rootScope.deviceLang == 'vi'){
            	document.getElementById("contentTop").className += " contactContentTop";
            	document.getElementById("selectAllCheckBox").className += " selectalltext";
            	$scope.cnclButtonViet = true;
            	
        	}
            
            
            
            
            
            try{
            	 $rootScope.searchTextBlack = false;
            					document.getElementById("mytext").value = ""+Messages.searchBtn;

            					}catch(e){
            						$exceptionHandler(e, " ");
            					}
            
        });

        
        $scope.selectedContractMap = [];


$scope.numberOfItemsToDisplay=50;
              $scope.addMoreItem = function() {
                 $ionicLoading.show({
                                  template: '<ion-spinner></ion-spinner>'

                              });
//              alert("load more");
console.log("onMore Called: ");
                if ($rootScope.contractList.length > $scope.numberOfItemsToDisplay)
                   // load 5 more items
//                done(); // need to call this when finish loading more data
$scope.$broadcast('scroll.infiniteScrollComplete');
$scope.numberOfItemsToDisplay += 50;

    $timeout(function() {

    $ionicLoading.hide();

//    $scope.$broadcast('scroll.infiniteScrollComplete');
    }, 2000);
//  $ionicLoading.hide();

              }

        $scope.selectContractArr = [];
        
        
        
        $scope.selectContractListItems = function(indexValue) {
            //alert("contId="+contId+" "+$rootScope.contractList[0]);
           // for (var i = 0; i < $rootScope.contractList.length; i++) {
                var customerId = $rootScope.contractList[indexValue].json.custId;
                var contract = $rootScope.contractList[indexValue];
                //  alert(customerId+" "+contract);

               
               
//                contract.selected = !contract.selected;
                
                if ($scope.selectedContractMap[indexValue] == true)
                	{
                	$scope.selectedContractMap[indexValue] = false;
                	}else {
                		$scope.selectedContractMap[indexValue] = true;
					}

                if ( $scope.selectedContractMap[indexValue] == true) {
                    $scope.selectContractArr.push(indexValue);
                    
                } else {

                    var index = $scope.selectContractArr.indexOf(indexValue);
                    $scope.selectContractArr.splice(index, 1);

                }
                //	alert("Arr= "+$scope.selectContractArr);

           // }
            //alert("Arr= "+$scope.selectContractArr);
            //$scope.contListChecked = "contListChecked";
            //alert("contId="+contId);
        };

        $scope.selectAllContract = function(checkBoxValue) {

            if (!checkBoxValue) {
                for (var i = 0; i < $rootScope.contractList.length; i++) {
                  
                   
                    
                    
                    $scope.selectedContractMap[i] = false;
                }
                $scope.selectAllFlag = false;
                $scope.selectContractArr = [];
            } else {
                $scope.selectContractArr = []; // initialize again to clear previos single values
                for (var i = 0; i < $rootScope.contractList.length; i++) {
                    var contract = $rootScope.contractList[i];
                    $scope.selectedContractMap[i] = true;
                    var customerId = $rootScope.contractList[i].json.custId;
                    $scope.selectContractArr.push(i);
                }

                $scope.selectAllFlag = true;

            }
            //alert("Arr= "+$scope.selectContractArr);
        };

        $rootScope.index = 0;
        
          $scope.goToContractDetail = function() {
            $rootScope.index = 0;
            if ($scope.selectContractArr.length == 0) {
                $rootScope.showAlert(""+AlertMessages.selectContractToView, ""+AlertMessages.alertTitile);

            } else {
                if ($scope.selectContractArr.length > 1) {
                    $rootScope.hidePreviousInDetail = false;
                    $rootScope.hideNextInDetail = false;
                } else {
                    $rootScope.hidePreviousInDetail = true;
                    $rootScope.hideNextInDetail = true;
                }

                //alert("opn/details button pressed");
                $rootScope.indices = $scope.selectContractArr;
                $rootScope.localSelectedArray = $scope.selectContractArr;
                $state.go("fECREDIT.contractInformation", {
                    indices: $scope.selectContractArr
                });
                $scope.selectedContractMap=[];
                $scope.selectContractArr=[];
            }
        };
        
        $scope.doubleClickContact = function(indexValue){
        	 $scope.selectContractArr = [];
             
         	$scope.selectContractArr.push(indexValue);
         	 
                        $rootScope.index = 0;
               $rootScope.hidePreviousInDetail = true;
                $rootScope.hideNextInDetail = true;
                  

                  //alert("opn/details button pressed");
                  $rootScope.indices = $scope.selectContractArr;
                  $rootScope.localSelectedArray = $scope.selectContractArr;
                  $state.go("fECREDIT.contractInformation", {
                      indices: $scope.selectContractArr
                  });
                  $scope.selectedContractMap=[];
                  $scope.selectContractArr=[];

          
        
        
        }
        
        
        
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
        
        $scope.clearFilter = function() {
             $rootScope.searchBtn = Messages.searchBtn;
             $rootScope.searchTextBlack = false;

        	 $rootScope.contractList = $rootScope.mainContractList;
        };

 });
