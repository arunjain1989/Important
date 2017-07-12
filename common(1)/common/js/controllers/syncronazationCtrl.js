
/* JavaScript content from js/controllers/syncronazationCtrl.js in folder common */
FeCreditApp.controller('syncronazationCtrl', [ '$scope', '$stateParams','$ionicPopup', '$ionicLoading', '$rootScope', // The following
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
		function($scope, $stateParams,$ionicPopup, $ionicLoading, $rootScope) {
	$scope.recordArr=[];
	$scope.sync = function() {
		var myPopup = $ionicPopup.show({
	        
			subTitle: 'Sync Local Database to the Server',
	         scope: $scope,
				
	         buttons: [
	            { text: 'Cancel' }, {
	               text: '<b>OK</b>',
	               type: 'button',
	                  onTap: function(e) {
	                	  
//	                	  $scope.synchData();

	                  }
	            }
	         ]
	      });

	      myPopup.then(function(res) {
	         console.log('Tapped!', res);
	      });    
	   };

	
	
	   
	   
	   
       $scope.sync_CallbackOKRecord= function(response) {


    	   WL.JSONStore.get(RECORDS_COLLECTION_NAME)

    	   .clear()

    	   .then(function () {
    		   $scope.hideLoading();
    		   $rootScope.showAlert("Sync Successful.","Alert");
    	   })

    	   .fail(function (errorObject) {
    		  
    		   
    		   WL.JSONStore.get(RECORDS_COLLECTION_NAME)

        	   .clear()

        	   .then(function () {
        		   $scope.hideLoading();
        	   })

        	   .fail(function (errorObject) {
        		   $scope.hideLoading();
        	   });
    	   });

    	   
    	//	$scope.hideLoading();
    		
    		
    		
    		 
 



    }

    $scope.sync_CallbackFailRecord = function(response) {
        $scope.hideLoading();
        // alert("CallbackFail : " + JSON.stringify(response));
       
        $rootScope.showAlert("Server Unreachable","Alert");
    };
    
    $scope.showLoading = function() {
        $ionicLoading.show({
            template: 'Syncing...'
        });
    };


    $scope.hideLoading = function() {
        $ionicLoading.hide();
    };
    
    
    
    $scope.synchData = function() {

  	  
  	  
  	  var count = WL.JSONStore.get(RECORDS_COLLECTION_NAME).countAllDirty();
  	  if (count>0) {
//			push Data to server
  		  alert("Count: "+count);
  		  
  		  $scope.showLoading();
  		  WL.JSONStore.get(RECORDS_COLLECTION_NAME)

  		  .getAllDirty()

  		  .then(function (arrayOfDirtyDocuments) {
  		    // Handle getAllDirty success.

  			  for (var int = 0; int < arrayOfDirtyDocuments.length; int++) {
					
				      $scope.recordArr.push(arrayOfDirtyDocuments[int].json);
					
				}
  		  

  			  var resourceRequest = new WLResourceRequest("/adapters/contract/mycontract/record/save", WLResourceRequest.POST);
	            resourceRequest.setHeader("Content-Type","application/json");
	            resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
	            resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	            resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
	            resourceRequest.send($scope.recordArr).then($scope.sync_CallbackOKRecord, $scope.sync_CallbackFailRecord);


  		   
  		  });

		}else{
			alert("Nothing to sync");
		}
  	  
	};

	   
	   
	   
	   


		} ]);