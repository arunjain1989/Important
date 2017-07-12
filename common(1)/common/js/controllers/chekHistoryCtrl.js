
FeCreditApp.controller('chekHistoryCtrl', ['$scope','$state', '$stateParams', '$rootScope','$ionicLoading' ,function($scope,$state, $stateParams, $rootScope, $ionicLoading) {
			
			
	$scope.$on("$ionicView.enter", function(event, data) {
	$scope.noDataFound=true;
	$scope.checkInList = false;

		$scope.checkInHistoryTitle = Messages.checkInHistoryTitle;
		$scope.feCode = Messages.feCode;
		$scope.timeAndDate = Messages.timeAndDate;
		$scope.checkInAddress = Messages.checkInAddress;
		$scope.directionText = Messages.directionText;
		$scope.cancelButton = Messages.cancelButton;
		$scope.addressType = Messages.addressType;
		$scope.noNotification = Messages.messageNoData;
		$scope.messge_cus_add = Messages.messge_cus_add;
		
		
		if ($rootScope.deviceLang == 'vi') {
		  
		    $scope.cnclButtonViet = true;

		}
		$scope.checkInDataList = [];
		$scope.fetchCheckInData();
		
	});
	$scope.$on('$ionicView.leave', function(){
    				$scope.noDataFound=true;
    				$scope.checkInList = false;
    		   	});

			$scope.fetchCheckInData = function(){
			     if ($rootScope.isInternetConnected()) {
                        $scope.tempObject = {
                            "contractId":  $rootScope.contractId,
                            "index":0
                        };

                        $scope.showLoading();
                        var resourceRequest = new WLResourceRequest("/adapters/checkIn/details/get", WLResourceRequest.POST);
                        resourceRequest.setHeader("Content-Type", "application/json");
                        resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                        resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                        resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                        resourceRequest.send($scope.tempObject).then($scope.getCheckInSuccess, $scope.getCheckInFailure);
                  }else{
                    $scope.fetchLocalSavedData();
                    $rootScope.showAlert("" + AlertMessages.isInternet, "" + AlertMessages.alertTitile);
                  }

			}

			 $scope.getCheckInSuccess = function(response) {
                     $scope.hideLoading();
                     if (response.status == 102 ) {

                         $scope.savAndLogout();
                         return;

                     } else if (response.status == 101) {
                        $scope.fetchLocalSavedData();

                         $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                         return;

                     }else if(response.status == 200){

                        var checkInArr = response.responseJSON.dto;
                        if (checkInArr.length == 0){
                             $scope.noDataFound=false;
                             $scope.checkInList = true;
                         }else{

                            for(var j=0; j< checkInArr.length; j++){

                                $.each($rootScope.addressTypeList, function(i, v) {

                                    if (checkInArr[j].addressType == v.address ) {
                                        checkInArr[j].addressType = v.value;
                                       return false;
                                    }

                                });
                                // save to local
                                /*
                                if( $rootScope.checkInDataSaved.length == 0){

                                    $rootScope.checkInDataSaved.push(checkInArr[j]);
                                }
                                  var found = 0;
                                   for (var i=0; j< $rootScope.checkInDataSaved.length ; i++) {

                                       if ($rootScope.checkInDataSaved[i].uniqueId == checkInArr[j].uniqueId) {
                                           found = 1;
                                           break;
                                       }

                                   }
                                   if(found == 0 ){
                                    $rootScope.checkInDataSaved.push(checkInArr[j]);
                                   }
                                */
                            }
                        }

                        $scope.checkInDataList = checkInArr;
                     }

                }

                $scope.getCheckInFailure = function(error) {
                    $scope.fetchLocalSavedData();
                     $scope.hideLoading();
                     if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
                         $rootScope.sessionTimeOutMessage();
                         return;
                     }
                     $rootScope.showAlert("" + AlertMessages.gettingServerData, "" + AlertMessages.alertTitile);
                   // alert("ERR-"+JSON.stringify(error));
                }

                $scope.fetchLocalSavedData = function(){

                    $scope.checkInDataList = $rootScope.checkInDataSaved;
                     if($scope.checkInDataList.length == 0){
                        $scope.noDataFound=false;
                        $scope.checkInList = true;
                      }

                }

                $scope.showLoading = function() {
                    $ionicLoading.show({
                        template: AlertMessages.loadingDialouge
                    });
                };

                $scope.hideLoading = function() {
                    $ionicLoading.hide();
                };

              $scope.goToMap = function() {
                actAddress = "Noida";
                     regAddress = "Delhi";
                     offAddress = "Gurgaon";
                  $state.go("fECREDIT.map");

              };
              $scope.savAndLogout = function() {
                  //				        	alert("Token: "+ WL.Client.getLastAccessToken());
                  $scope.hideLoading();
                  $rootScope.showAlert(AlertMessages.otherDeviceLogin, AlertMessages.alertTitile);
                  WL.Client.logout('FeCreditAppRealm', {
                      onSuccess: $scope.goToLogin,
                      onFailure: $scope.goToLogin
                  });

              };
			
	}]);