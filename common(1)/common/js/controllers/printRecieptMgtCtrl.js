
/* JavaScript content from js/controllers/printRecieptMgtCtrl.js in folder common */
FeCreditApp.controller('printRecieptMgtCtrl', ['$scope','$stateParams', '$ionicPopup', '$timeout', '$ionicPlatform' , function($scope, $stateParams, $ionicPopup, $timeout , $ionicPlatform) {

   
//        $('#startdatepicker').click(
//            function() {
//                printRecieptstartDatepicker();
//            });
//
//        $('#enddatepicker')
//            .click(
//                function() {
//                    printRecieptendDatepicker();
//                });

	$scope.attachCash= function() {
                    var myPopup = $ionicPopup
                        .show({
                            template: '<button style="background-color:#008345" class="button button-full button-balanced" onclick="getPhoto(Camera.PictureSourceType.CAMERA)">Camera</button>' +
                                '<button  style="background-color:#008345"class="button button-full button-balanced" onclick="getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM)">Gallary</button>' +
                                '<button  style="background-color:#008345"class="button button-full button-balanced" ng-click="getFile()">File</button>',
                            title: '<b>Select</b>',
                            scope: $scope,
                            cssClass: 'recordbutton',

                            buttons: [{
                                text: 'Cancel'

                            }]

                        });
                    $scope.getFile = function (){
                    	alert("Hello");
                    	
                    	
                     if (ionic.Platform.isAndroid()){
							
							openNativeApp();
							
						}

                    };



                }

      // doc.ready ends here
    
  
  
  openNativeApp = function() {
		WL.App.sendActionToNative("openNativeFileCash");
			
		
	}
  
  WL.App.addActionReceiver ("MyActionReceiverId", function actionReceiver(received) {
	    if (received.action === "doSomething"){ 
	        
	        $rootScope.showAlert(+received,"Alert");
	        
	    }
	});
  
  
  
  
  
  $scope.Searchcontract = function() {
  var myPopup = $ionicPopup.show({

          title: '<input type="password" ng-model="data.wifi">',
          templateUrl: 'templates/search.html',
          cssClass: 'ptppop',
          scope: $scope,
          rootScope: $rootScope,
          ionicLoading: $ionicLoading


      });

  $scope.formulaSelected = function(formulaSelected,id) {
  	id="#filt"+id;
  	if($(id).hasClass('filterSelected')){
  		$(id).removeClass('filterSelected');
  	}else{
  	    
  	    for (var i = 5; i < 11; i++) {
  	        var idd = "#filt" + i;
  	        $(idd).removeClass('filterSelected');
  	    }

  	    $(id).addClass('filterSelected');
  	}
      $scope.formula = formulaSelected;
      $scope.addressdropdownview=true;
      $scope.filterdropdownview=true;
  };
  $scope.filterSelected = function(filter,index) {
      id = "#filt" + index;
  	if($(id).hasClass('filterSelected')){
  		$(id).removeClass('filterSelected');
  	} else {
  	    if (index <= 4) {
  	        for (var i = 1; i < 5; i++) {
  	            var idd = "#filt" + i;
  	            $(idd).removeClass('filterSelected');
  	        }
  	    } else if (index >= 11) {
  	        for (var i = 11; i < 14; i++) {
  	            var idd = "#filt" + i;
  	            $(idd).removeClass('filterSelected');
  	        }
  	    }

  		$(id).addClass('filterSelected');
  	}
      $scope.advanceColumn = filter;
      $scope.formuladropdownview =true;
  };
      $scope.advanceColumn = 'firstName';
      $scope.formula = 6;

      $scope.advanceSearch = function(valueData) {
      	
          $ionicLoading.show({
              template: AlertMessages.loadingDialougeSearch
          });
          if ($scope.formula === 1) {
              $scope.advanceQuery = [WL.JSONStore.QueryPart().equal($scope.advanceColumn, valueData)];
          } else if ($scope.formula === 2) {
              $scope.advanceQuery = [WL.JSONStore.QueryPart().notEqual($scope.advanceColumn, valueData)];
          } else if ($scope.formula === 3) {
              $scope.advanceQuery = [WL.JSONStore.QueryPart().rightLike($scope.advanceColumn, valueData)];
          } else if ($scope.formula === 4) {
              $scope.advanceQuery = [WL.JSONStore.QueryPart().like($scope.advanceColumn, valueData)];
          } else if ($scope.formula === 5) {
              $scope.advanceQuery = [WL.JSONStore.QueryPart().notLike($scope.advanceColumn, valueData)];
          } else if($scope.formula === 6){
              $scope.advanceQuery = [WL.JSONStore.QueryPart().like('firstName', valueData),
                  WL.JSONStore.QueryPart().like('custId', valueData),
                  WL.JSONStore.QueryPart().like('idIssueDate', valueData),
                  WL.JSONStore.QueryPart().like('contractId', valueData)
              ];
          }


        $scope.options = {
              exact: false,
              limit: 10
          };


          WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)
              .advancedFind($scope.advanceQuery)

          .then(function(arrayResults) {
          	 $scope.formula = 6;
              $ionicLoading.hide();
              
              
              if (arrayResults.length == 0) {
                  $rootScope.showAlert(""+AlertMessages.noResultsFound, ""+AlertMessages.alertTitile);
              }
              
              $rootScope.contractList = arrayResults;
              $scope.closebuttonFunc();
          })

          .fail(function(errorObject) {
          	 $scope.formula = 6;
             // alert(JSON.stringify(errorObject));
              $ionicLoading.hide();
              $scope.closebuttonFunc();
          });

      };


      $scope.simpleSearch = function(valueData) {

      	
      	
          $ionicLoading.show({
              template: AlertMessages.loadingDialougeSearch
          });


          $scope.query1 = WL.JSONStore.QueryPart()
              .equal('customerName', valueData);
          $scope.query2 = WL.JSONStore.QueryPart()
              .equal('customerId', valueData);
          $scope.query3 = WL.JSONStore.QueryPart() 
              .equal('contractId', valueData);
          $scope.query4 = WL.JSONStore.QueryPart()
              .equal('idIssueDate', valueData);
          $scope.query5 = WL.JSONStore.QueryPart()
              .equal('firstName', valueData);
          $scope.query6 = WL.JSONStore.QueryPart()
              .equal('lastName', valueData);



			 $scope.arrayResults = [{firstName: valueData}, {lastName: valueData}, {contractId:valueData}]


          $scope.options = {
              exact: false,
              limit: 100
          };

          WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)

          .find($scope.arrayResults, $scope.options)

          .then(function(arrayResults) {
          	
//          	hide map and show list
          	
              $ionicLoading.hide();
              if (arrayResults.length == 0) {
                  $rootScope.showAlert(""+AlertMessages.noResultsFound, ""+AlertMessages.alertTitile);
              }
              $rootScope.contractList = arrayResults;
              $scope.closebuttonFunc();
              //arrayResults = [{_id: 1, json: {name: 'carlos', age: 99}}]
          })

          .fail(function(errorObject) {
              $ionicLoading.hide();
              $scope.closebuttonFunc();
          });




      };


      $scope.closebuttonFunc = function() {

          myPopup.close();
          var listContract = document.getElementById("listContract");
          var map = document.getElementById("googleMap");
          map.style.visibility='hidden'; 
          listContract.style.visibility='visible'; 


      };
      
      
      
      $scope.closebutton = function() {

          myPopup.close();
          var listContract = document.getElementById("listContract");
          var map = document.getElementById("googleMap");
          map.style.visibility='visible'; 
          listContract.style.visibility='hidden'; 


      };


      $scope.quickbuttonclick = function() {


          $scope.quickhide = false;
          $scope.advancehide = true;
          $scope.quickview = "withclick";
          $scope.advanceview = "withoutclick";


      }

      $scope.advancebuttonclick = function() {


          $scope.quickview = "withoutclick";
          $scope.advanceview = "withclick";


          $scope.quickhide = true;

          $scope.advancehide = false;



      }


      $scope.filterconditionclick = function() {

          $scope.filterdropdownview = $scope.filterdropdownview ? false : true;


      };



      $scope.filterformulaclick = function() {

          $scope.formuladropdownview = $scope.formuladropdownview ? false : true;

      };



      $scope.addresstypeclick = function() {

          $scope.addressdropdownview = $scope.addressdropdownview ? false : true;

      };

     $scope.quickbuttonclick();
  }
  
  
    
  /*  added by aman - for file attachment   *
  

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;
  var origFile = null;

  $scope.pickPhoto = function() {
  	
      var picker = new Windows.Storage.Pickers.FileOpenPicker();
     /* var enumerator = Windows.Graphics.Imaging.BitmapDecoder.getDecoderInformationEnumerator();
      enumerator.forEach(function (decoderInfo) {
          decoderInfo.fileExtensions.forEach(function (fileExtension) {
              picker.fileTypeFilter.append(fileExtension);
          });
      });*
      picker.fileTypeFilter.replaceAll(["*"]);
      picker.pickSingleFileAndContinue();
  }

  function loadPhoto(file) {
      origFile = file;
      var msg = new Windows.UI.Popups.MessageDialog("got data!" + origFile);
       msg.showAsync();
  }

  $scope.savePhotoPicker = function (file) {
  	
      var picker = new Windows.Storage.Pickers.FileSavePicker();
      picker.fileTypeChoices.insert("JPEG file", [".jpg"]);
      picker.pickSaveFileAndContinue();
  }

  function savePhoto(src, dest) {
      src.copyAndReplaceAsync(dest).done(function () {
          console.log("success");
      })
  }

  app.onactivated = function (args) {
      if (args.detail.kind === activation.ActivationKind.launch) {
          if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
              // TODO: This application has been newly launched. Initialize
              // your application here.
          } else {
              // TODO: This application has been reactivated from suspension.
              // Restore application state here.
          }
          args.setPromise(WinJS.UI.processAll());

        //  document.getElementById("choose").addEventListener("click", pickPhoto);
        //  document.getElementById("save").addEventListener("click", savePhotoPicker);
      }
      if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.pickFileContinuation) {
          loadPhoto(args.detail.files[0]);
      }
      if (args.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.pickSaveFileContinuation) {
          savePhoto(origFile, args.detail.file);
      }
  };

  app.oncheckpoint = function (args) {
      // TODO: This application is about to be suspended. Save any state
      // that needs to persist across suspensions here. You might use the
      // WinJS.Application.sessionState object, which is automatically
      // saved and restored across suspension. If you need to complete an
      // asynchronous operation before your application is suspended, call
      // args.setPromise().
  };
  
  /*  added by aman - for file attachment testing */
  
    
    

}])