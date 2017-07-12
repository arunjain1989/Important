FeCreditApp.controller('homeCtrl', [ '$scope', '$stateParams', '$rootScope','$ionicHistory', '$state', '$ionicPopup', '$window',// The following is
															// the constructor
															// function for this
															// page's
															// controller. See
															// https://docs.angularjs.org/guide/controller
		// You can include any angular dependencies as parameters for this
		// function
		// TIP: Access Route Parameters for your page via
		// $stateParams.parameterName
		function($scope, $stateParams, $rootScope, $ionicHistory, $state, $ionicPopup, $window) {
	
	 
    $scope.$on("$ionicView.enter", function(event, data){
    	//alert("msg obj = "+ JSON.stringify(Messages));
    	  // handle event
    	   $rootScope.reposContSelected = '';
    	$scope.contractTitle = Messages.contractHeader;
    	$scope.searchBtn = Messages.searchBtn;
    	$scope.modeTitle = Messages.modeTitle;
    	$scope.onlineTitle = Messages.onlineTitle; 
    	$scope.offlineTitle = Messages.offlineTitle;
    	$scope.mapButton = Messages.mapButton;
    	$scope.logoutTitile = Messages.logoutTitile;
    	$scope.welcometitle = Messages.welcometitle;
    	$scope.footerRepos = Messages.footerRepos;
    	$scope.notificationTitle = Messages.notificationTitle;
    	$scope.footerCT = Messages.footerCT;
    	$scope.recordButton = Messages.record;
    	$scope.areyousreLogout = AlertMessages.areyousreLogout; 
    	$scope.yesTitle = AlertMessages.yesTitle;
    	$scope.noTitle = AlertMessages.noTitle;
    	$rootScope.isBidderNotification = false;
    	$rootScope.isRepoClickFromNoti = false;
    	
    	$scope.iOSLogIdArray = [];
    	$scope.syncIPhoneCrashLogs();


    });
    
    $scope.syncIPhoneCrashLogs = function(){

        if( $rootScope.isInternetConnected() && ionic.Platform.isIOS() ){

            WL.JSONStore.get(IPHONE_LOGGER_DB).findAll().then(function(findResults) {


                    for (var i = 0; i < findResults.length; i++) {

                         $scope.iOSLogIdArray.push({
                                                _id: findResults[i]._id
                                            });

                        var data  = findResults[i].json.crashData;
                         WL.Analytics.log(data);
                         WL.Analytics.send();
                         console.log("sent logs");
                   }
                   if(findResults.length > 0){
                    $scope.clearLoggerDB();
                   }

              }).fail(function (errorObject) {

                    //
              });

        }
    }
    $scope.clearLoggerDB = function(){
         // now remove this db coz all data synced
            WL.JSONStore.get(IPHONE_LOGGER_DB)
                .remove($scope.iOSLogIdArray, {})
                .then(function(numberOfDocumentsRemoved) {
                    //handle success

                })
                .fail(function(errorObject) {
                    //handle failure

                });
    }
    

	
	$scope.goToLogin = function() {

			  
			  
		 $ionicHistory.nextViewOptions({
             disableBack: true
           });
           $ionicHistory.clearHistory();
           $state.go('login');
	};


	$scope.logoutEventHandler = function(){


    				  var myPopupHome = $ionicPopup.show({

                          subTitle: AlertMessages.areyousreLogout,
                                 scope: $scope,
                                 cssClass: 'noUnderlineSyncTitle',
                                 buttons: [
                                    { text: AlertMessages.noTitle,
                                     onTap: function(e) {

                                   myPopupHome.close();
                                    }
                                     }, {
                                       text: AlertMessages.yesTitle,
                                       type: 'button',
                                          onTap: function(e) {
                                        	  $window.localStorage[USERNAME] = '';
                                        	  if ($rootScope.isInternetConnected()===true) {
                                        		  myPopupHome.close();
                            					  WL.Client.logout('FeCreditAppRealm', {
                            			                onSuccess: $scope.goToLogin
                            			            });

                        					}else {
                        						 myPopupHome.close();
                        						$scope.goToLogin();
                        					}
myPopupHome.close();
                                          }
                                    }
                                 ]
                              });

	};
	



$scope.$on('$ionicView.leave', function(){
	 $ionicHistory.clearHistory();
	});


$scope.baseSearch = function () {
	
	 $rootScope.contractList = [];
	 $state.go("fECREDIT.search");
	
	
};

$scope.goToMapFromHome = function () {
	mapCalledFromSideMenu=true;
	 $rootScope.contractList = [];
	 $state.go("fECREDIT.map");


};

$scope.goToRepossFromHome = function () {
	 $state.go("fECREDIT.repossession",{reload:true});


};


/*$scope.fieldSupport = 'fieldSupport';
$scope.fieldSupervisor = 'fieldSupervisor';
$scope.unitHead='unitHead';
$scope.csa='cs&a';


if($scope.fieldSupport === 'fieldSupport' || $scope.fieldSupervisor==='fieldSupervisor' || $scope.unitHead==='unitHead'){
		$rootScope.mapDisabled = true;	
	}else{
		$rootScope.mapDisabled = false;	
	}	


if($scope.csa === 'cs&a'){
	$rootScope.notificationDisabled = true;	
}else{
	$rootScope.notificationDisabled = false;	
}*/




	
}])
 
		
		
	