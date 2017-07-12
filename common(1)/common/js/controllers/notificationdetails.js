
/* JavaScript content from js/controllers/notificationdetails.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */

/* JavaScript content from js/controllers/unpaidCasesCtrl.js in folder common */
FeCreditApp.controller('notificationDetailsCtrl', [ '$scope', '$stateParams', '$rootScope', '$state','$ionicPopup','$ionicLoading', '$ionicScrollDelegate','$ionicHistory',// The
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
function($scope, $stateParams, $rootScope, $state,$ionicPopup,$ionicLoading, $ionicScrollDelegate,$ionicHistory) {
	
$scope.$on("$ionicView.enter", function(event, data) {
	     $rootScope.informationNotificationBool=true;
		$scope.cancelButton = Messages.cancelButton;
		$scope.notification_message = Messages.notification_message;
		$scope.notification_DON = Messages.notification_DON;
		$scope.notification_SenderName = Messages.notification_SenderName;
		 $scope.notification_Email = Messages.notification_Email;
		 $scope.notification_Title = Messages.notification_Title;
		 $scope.title_message = Messages.title_message;
		 $rootScope.notificationInformation.type=Messages.statusINFO;
		
		 if ($rootScope.deviceLang == 'vi') {

             $scope.cnclButtonViet = true;
            
         }
	  });
	
$scope.$on('$ionicView.leave', function() {
	
	$rootScope.informationNotificationBool=false;
	
	
});


	$scope.myBack = function() {
	    $ionicHistory.goBack();
	    
	  
	    
	  };	
	
	
	
} ]);