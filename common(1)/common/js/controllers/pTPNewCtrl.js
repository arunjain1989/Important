/* JavaScript content from js/controllers/pTPCtrl.js in folder common */
FeCreditApp.controller('pTPNewCtrl', [ '$scope', '$stateParams', '$ionicPopup','$rootScope','$filter','$state','$ionicLoading', '$ionicScrollDelegate','$exceptionHandler',// The following is
															// the constructor
															// function for this
															// page's
															// controller. See
															// https://docs.angularjs.org/guide/controller
		// You can include any angular dependencies as parameters for this
		// function
		// TIP: Access Route Parameters for your page via
		// $stateParams.parameterName
		function($scope, $stateParams,$ionicPopup,$rootScope,$filter,$state,$ionicLoading, $ionicScrollDelegate,$exceptionHandler ) {
	
	
	 $scope.selectContractArr = [];
	
	$scope.$on("$ionicView.enter", function(event, data) {

		

		
	$ionicScrollDelegate.scrollTop();
	       $scope.contCustName = Messages.customerName;
           $scope.contractId = Messages.contractId;
            $scope.dateAssign = Messages.dateAssign;
            $scope.directionText = Messages.directionText;
		$scope.cancelButton = Messages.cancelButton;
		$scope.allocatedDate = Messages.allocatedDate;
     	$scope.contractId = Messages.contractId;
		$scope.customerName = Messages.customerName;
    	$scope.ptpAmountText = Messages.ptpAmountText;
    	$scope.ptpDateText = Messages.ptpDateText; 
    	$scope.contactAddressTitle = Messages.contactAddressTitle;
    	$scope.contactNumberTitle = Messages.contactNumberTitle; 
    	$scope.installmentTitle = Messages.installmentTitle;
    	$scope.serviceText = Messages.serviceText;
    	$scope.ptpDateText = Messages.ptpDateText;
     	$scope.allocateDate = Messages.allocateDate;
     	$scope.ptpChannel = Messages.ptpChannel;
    	$scope.sortpTPtitle = Messages.sortpTPtitle;
    	$scope.ptpHeader = Messages.ptpHeader;

        $scope.contractId = Messages.contractId;
        $scope.customerId = Messages.customerId;
        $scope.customerName = Messages.customerName;


    	$scope.nextButton = Messages.nextButton;
    	$scope.preButton = Messages.preButton;
    	$scope.ptpGoButton = Messages.ptpGoButton;
    	$scope.noResultsFound = AlertMessages.noResultsFound;
    	$scope.loadingDialougeSearch = AlertMessages.loadingDialougeSearch;
        
        for (var int = 0; int < $scope.selectContractArr.length; int++) {
         	
         	  var contractData = $rootScope.contractList[$scope.selectContractArr[int]];
         	  contract.selected = !contract.selected;
			}
        $rootScope.contractList = $rootScope.mainContractList;
        
        if ($rootScope.deviceLang == 'vi') {

            $scope.cnclButtonViet = true;

        }

//               try{
//        	 					$rootScope.searchTextBlack = false;
//               document.getElementById("mytext_ptp").value = ""+Messages.searchBtn;
//               }catch(e){
//               $exceptionHandler(e, " ");
//               }

    });
	
                                      $scope.listcardview=true;
                                      $scope.key = 'json.assignedDate';
	
	$scope.paidnextscreen = function (contract, indexValue) {
        $rootScope.ptpContract = contract;
        $state.go("fECREDIT.pTP");
    };
	

			
			




                                      //sort ptp open and close funcation//
                                      
                                      $rootScope.IsHidden = true;
                                      $scope.sortPtp1 = function() {
                                      
                                      $scope.xvz=false;
                                      $rootScope.IsHidden = $rootScope.IsHidden ? false : true;
                                      $("#ptpSort1").removeClass('liSortActive');
                                      $("#ptpSort2").removeClass('liSortActive');
                                      $("#check1").attr('src','images/unCheckedBox.png');
                                      $("#check2").attr('src','images/unCheckedBox.png');
                                      };
                                      
                                      
                                      
                                      $scope.checkVal = 0;
                                      $scope.Ptp=function(val){
                                      
                                      $scope.checkVal = val;
                                      if( val== 1 ){
                                      
                                      if( $("#ptpSort1").hasClass('liSortActive') ){
                                      $("#ptpSort1").removeClass('liSortActive');
                                      $("#check1").attr('src','images/unCheckedBox.png');
                                      }else{
                                      $("#ptpSort1").addClass('liSortActive');
                                      $("#check1").attr('src','images/checkbox.png');
                                      }
                                      $("#ptpSort2").removeClass('liSortActive');
                                      $("#check2").attr('src','images/unCheckedBox.png');
                                      
                                      } else if( val== 2 ){
                                      
                                      if( $("#ptpSort2").hasClass('liSortActive') ){
                                      $("#ptpSort2").removeClass('liSortActive');
                                      $("#check2").attr('src','images/unCheckedBox.png');
                                      }else{
                                      $("#ptpSort2").addClass('liSortActive');
                                      $("#check2").attr('src','images/checkbox.png');
                                      }
                                      $("#ptpSort1").removeClass('liSortActive');
                                      $("#check1").attr('src','images/unCheckedBox.png');
                                      }
                                      
                                      }


                                      //sort done button click funcation//
                                      
                                      $scope.sortbuttonclick=function(){
                                      if($scope.checkVal == 1){
                                      $scope.checkVal = 0;
                                      $rootScope.ptpIndex = 0;
                                      $rootScope.nextDiv = true;
                                      $rootScope.previousDiv = false;
                                      $rootScope.contractList = $rootScope.mainContractList;
                                      
                                      
                                      $scope.key = 'json.idIssueDate';
                                      
                                      
                                      }else if($scope.checkVal == 2){
                                      $scope.checkVal = 0;
                                      $rootScope.ptpIndex = 0;
                                      $rootScope.nextDiv = true;
                                      $rootScope.previousDiv = false;
                                      $rootScope.contractList = $rootScope.mainContractList;
                                      $scope.key = 'json.assignedDate';
                                      }
                                      
                                      
                                      $rootScope.IsHidden = true;
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
			    	$rootScope.ptpIndex = 0;
			    	$rootScope.nextDiv = true;
			    	$rootScope.previousDiv = false;
			  	  $rootScope.contractList = $rootScope.mainContractList;
			        
			          });
			    
			    $scope.$on('$ionicView.leave', function(){
			    $rootScope.searchBtn = Messages.searchBtn;
                $rootScope.searchTextBlack = false;
			    	$rootScope.ptpIndex = 0;
//			    	  $rootScope.contractList = $rootScope.mainContractList;
			   	});
			    
			    $scope.clearFilter = function() {
                    $rootScope.searchBtn = Messages.searchBtn;
                     $rootScope.searchTextBlack = false;
		        	 $rootScope.contractList = $rootScope.mainContractList;
		        	 $rootScope.ptpIndex = 0;
		        	$rootScope.previousDiv = false;
		        };
			

		} ]);