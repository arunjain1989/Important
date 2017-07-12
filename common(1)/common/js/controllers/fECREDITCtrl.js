
/* JavaScript content from js/controllers/fECREDITCtrl.js in folder common */

/* JavaScript content from js/controllers/fECREDITCtrl.js in folder common */

/* JavaScript content from js/controllers/fECREDITCtrl.js in folder common */


FeCreditApp.controller('fECREDITCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$rootScope', '$ionicLoading', '$rootScope', '$filter', '$timeout','$exceptionHandler',
    function($scope, $stateParams, $ionicPopup, $state, $rootScope, $ionicLoading, $rootScope, $filter ,$timeout, $exceptionHandler ) {

	 	WL.App.sendActionToNative("adjustValue", {"jsonData" : false});
        $scope.$on("$ionicView.enter", function(event, data) {
            //alert("msg obj = "+ JSON.stringify(Messages));
            // handle event
            
            $scope.contractTitle = Messages.contractHeader;
            $scope.homeButton = Messages.homeButton;
            $scope.searchBtn = Messages.searchBtn;
            $scope.recordButton = Messages.record;
            $scope.mapButton = Messages.mapButton;
            $scope.paidCaseTitle = Messages.paidCaseTitle;
            $scope.unPaidCaseTitle = Messages.unPaidCaseTitle;
            $scope.footerPR = Messages.footerPR;
            $scope.ptpHeader = Messages.ptpHeader;
            $scope.recieptManagemHeader = Messages.recieptManagemHeader;
            $scope.syncronizationTitle = Messages.syncronizationTitle;
            $scope.inboxTitle = Messages.inboxTitle;
            $scope.nothing_To_sync = AlertMessages.nothing_To_sync;



        });


        $scope.sendSyncWithServer = function() {

            var database = WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME);
            database.push().then(function(response) {
                // "response" is remaining data to send on server.
            }).fail(function(error) {
                // handle failure
            });

        };

        $scope.baseSearch = function() {

            $rootScope.contractList = [];
            $state.go("fECREDIT.search");


        };
        $scope.paidCaseOpen = function() {


            $state.go("fECREDIT.paidNewCtrl", {}, {
                reload: true
            });


        };
        $scope.unPaidCaseOpen = function() {


            $state.go("fECREDIT.unPaidNewCases", {}, {
                reload: true
            });


        };
        
               
                $scope.recordListOpen = function() {


            $state.go("fECREDIT.record", {}, {
                reload: true
            });


        };
        
        $scope.pTPCaseOpen = function() {


            $state.go("fECREDIT.pTPNew", {}, {
                reload: true
            });


        };
        var lastTapped=0, currentTapped=0;
        $scope.sync = function() {
            var myPopup = $ionicPopup.show({

                subTitle: Messages.syncLocalDBTitle,
                scope: $scope,
                cssClass: 'noUnderlineSyncTitle',
                buttons: [{
                    text: Messages.cancelButton
                }, {
                    text: '<b>' + Messages.okButton + '</b>',
                    type: 'button',
                    onTap: function(e) {
                        currentTapped = new Date().getTime();

                        if(lastTapped==0){
                        lastTapped = currentTapped - 6000;
                        }
                        if(currentTapped-lastTapped < 5000){
                         lastTapped = 0;
                          return;
                          }

                           lastTapped = currentTapped;

                         if ($rootScope.isInternetConnected()) {
                                $scope.showLoading();
                                $scope.callSyncSavedData();

                               // $rootScope.syncTerminationData();
                               // $rootScope.fetchTerminationAttachments();
                               // setTimeout(function() { $rootScope.syncTerminationAttachmentData(0); }, 2000);

                                $rootScope.syncRepossessionData();
                                $rootScope.fetchRepossessionAttachments();
                                setTimeout(function() { $rootScope.syncRepossessionAttachmentData(0); }, 1000);
                                $rootScope.syncBidderData();

                                setTimeout(function() { $scope.hideLoading(); $rootScope.showNothingToSync(); }, 1000);

                                myPopup.close();
                         }else{
                                $rootScope.showAlert("" + AlertMessages.isInternet, "" + AlertMessages.alertTitile);
                                myPopup.close();
                         }
                            
                            
                    }
                }]
            });

            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });

        };



        var nilAddressCounter=0;
        $scope.callSyncSavedData = function() {

            $scope.fileLinksArray = [];
            $scope.filetypeArray = [];
            $scope.recordArray = [];
            $scope.idArray = [];
            $scope.recordIdArray = [];
            $scope.recordIndivisualIdArray = [];
            $scope.attachmentNameArrayInRupload = [];


            WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME).findAll().then(function(findResults) {
            	lastTapped = currentTapped;
                if (findResults.length == 0) {
                	
                    //$scope.hideLoading();
                    
                   // $rootScope.showAlert("" + AlertMessages.nothing_To_sync, "" + AlertMessages.alertTitile);

                    return;
                }else{
                	$rootScope.isDataForSync = true;
                	
                }
                nilAddressCounter=0;
                for (var int = 0; int < findResults.length; int++) {
                    $scope.idArray.push({
                        _id: findResults[int]._id
                    });

                    var dataObj = findResults[int].json;

                    if (dataObj.attachedFilesLink != undefined && dataObj.attachedFilesLink != 'undefined') {
                        $scope.recordIdArray.push(dataObj.attachedFilesLink.length);

                        for (var indexxx = 0; indexxx < dataObj.attachedFilesLink.length; indexxx++) {

                            $scope.fileLinksArray.push(dataObj.attachedFilesLink[indexxx]);

                            $scope.filetypeArray.push(dataObj.fileType[indexxx]);
                            $scope.attachmentNameArrayInRupload.push(dataObj.filenamefull[indexxx]);


                        }
                    }
                    //               			$scope.filelinkarra=$scope.fileLinksArray.push(dataObj.attachedFilesLink);

                    var str = "" + dataObj.ptpAmount;

                    var regex = new RegExp(',', 'g');

                    str = str.replace(regex, '');
                    str = parseFloat(str);

                    if (isNaN(str)) {
                        str = 0;
                    }

                    var actionDate = $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');
                    // var distance = dataObj.checkIn.difference.replace("m", "");

                    options = {
                        "contactDateTime": dataObj.contactDateTime,
                        "customerId": dataObj.customerId,
                        "personContacted": dataObj.personContacted,
                        "actionCode": dataObj.actionCode,
                        "placeContacted": dataObj.placeContacted,
                        "contactMode": dataObj.contactMode,
                        "reminderMode": dataObj.reminderMode,
                        "nextActionDateTime": dataObj.nextActionDateTime,
                        "ptpAmount": str,
                        "remarks": dataObj.remarks,
                        "contractId": dataObj.contractId,
                        "storeId": "" + int,
                        "isskiptracer": dataObj.isskiptracer,
                        "actAddress":dataObj.actAddress,
                        "offAddress":dataObj.offAddress,
                        "regAddress":dataObj.regAddress,
                        "product":dataObj.product,
                        "bucket":dataObj.bucket,
                        "dpd":dataObj.dpd,
                        "customerName":dataObj.firstName,
                        "checkIn": {
                            "addressType": dataObj.checkIn.addressType,
                            "address": dataObj.checkIn.address,
                            "latLong": "" + dataObj.checkIn.latLong,
                            "checkinDateTime": dataObj.checkIn.checkinDateTime,
                            "checkinAddress": dataObj.checkIn.checkinAddress,
                            "distance": dataObj.checkIn.distance,
                            "unitCode": "" + dataObj.checkIn.unitCode,
                            "unitCodeDesc": "" + dataObj.checkIn.unitCodeDesc
                        }

                    };
                    /*options = {
                            "contactDate" : dataObj.contactDate,
                            "contactTime" : dataObj.contactTime,
                            "personContacted" : dataObj.personContacted ,
                            "contactedWith" : dataObj.contactedWith ,
                            "contactMode": dataObj.contactMode ,
                            "contactPlace" : dataObj.contactPlace ,
                            "nextActionDate": dataObj.nextActionDate,
                            "ptpAmount" : dataObj.ptpAmount,
                            "remark" : dataObj.remark,
                            "attachedFilesLink" :  dataObj.attachedFilesLink,
                            "contractId": dataObj.contractId,
                            "storeId":""+int,
                            "checkIn": {
                                "addressType": dataObj.checkIn.addressType,
                                "address": dataObj.checkIn.address,
                                "latLong": ""+dataObj.checkIn.latLong
                            }

                        };
                        */
                    $scope.recordArray.push(options);
                    if(options.checkIn.checkinAddress==''){
                        nilAddressCounter = nilAddressCounter+1;
                                       $scope.getCurrentAddress($scope.recordArray.length);
                        }
                }

                //            		 hit server
                var resourceRequest = new WLResourceRequest("/adapters/contract/mycontract/record/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                if(nilAddressCounter==0 || window.google == undefined){
                resourceRequest.send($scope.recordArray).then($scope.syncSuccess, $scope.syncFail);
                }

            }).fail(function(errorObject) {
            	lastTapped = currentTapped;
                $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
                //       						$state.go('fECREDIT.home');
                $scope.hideLoading();
            });


        };
        
        
        $scope.getCurrentAddress = function(curr_index){
            var currentAddressForCheckIn = '';

             var geocoder = new google.maps.Geocoder();

                                                          geocoder.geocode({
                                                                  latLng: new google.maps.LatLng($scope.recordArray[curr_index].checkIn.latLong.split[0], $scope.recordArray[curr_index].checkIn.latLong.split[1])
                                                              },
                                                              function(responses) {
                                                                  if (responses && responses.length > 0) {
                                                                      currentAddressForCheckIn = responses[0].formatted_address;

                                                                  } else {
                                                                      currentAddressForCheckIn = '';

                                                                  }
                                                                  $scope.recordArray[curr_index].checkIn.checkinAddress = currentAddressForCheckIn;
                                                                  nilAddressCounter = nilAddressCounter-1;
                                                                                if(nilAddressCounter == 0){
                      //               hit server
                                                                                	 //            		 hit server
                                                                                    var resourceRequest = new WLResourceRequest("/adapters/contract/mycontract/record/save", WLResourceRequest.POST);
                                                                                    resourceRequest.setHeader("Content-Type", "application/json");
                                                                                    resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                                                                                    resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                                                                                    resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                                                                                    resourceRequest.send($scope.recordArray).then($scope.syncSuccess, $scope.syncFail);
                                                                                    

                                                                                }
                                                              }
                                                          );
            };

        $scope.syncSuccess = function(response) {
           // $scope.hideLoading();


            if (response.responseJSON[0].responseCode == "102") {
                //				        	  sso
                $scope.savAndLogout();

                return;

            } else if (response.responseJSON[0].responseCode != "200") {
                $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                return;
            }

            $scope.length = response.responseJSON.length;
            $scope.length = $scope.length - 1;
            $scope.response = response;
            $scope.recordDataId = response.responseJSON[$scope.length].dto.recordId;

            for (var i = 0; i < $scope.recordIdArray.length; i++) {

                for (var j = 0; j < $scope.recordIdArray[i]; j++) {
                    $scope.recordIndivisualIdArray.push(response.responseJSON[i].dto.recordId)

                }
            }




            var isIOS = ionic.Platform.isIOS();

            //                						if (isIOS) {


            $scope.callSaveAttachment($rootScope.fileType, $scope.recordDataId);




            //                						}
            /*  else{


                							window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                                                fileSystem.root.getFile($scope.fileLinksArray[$scope.length],
                                                    {create: false, exclusive: false}, function(fileEntry) {
                                                        fileEntry.file(function(file) {
                                                            var reader = new window.FileReader();

                                                             reader.onloadend = function(evt) {

                                                            console.log(""+evt.target.result);






//                                                             "recordId" server will send this recordId

                                                             $scope.callSaveAttachment( evt.target.result.split(",")[1], file.type, $scope.recordDataId);

                                                            };
                                                                               reader.onerror = function(evt) {

                                                                               };
                                                          reader.readAsDataURL(file);



                                                        }, function(e){console.log(e);
                                                         });
                                                    }, function(e){console.log(e);

                                                    });
                                            }, function(e) {console.log(e);
                                             });




                						}  */



            /*	WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME)
            	.remove($scope.idArray, {})
            	.then(function (numberOfDocumentsRemoved) {
            	    //handle success
            	    $scope.hideLoading();
            	    	$rootScope.showAlert("Synch Successfully completed.", ""+AlertMessages.alertTitile);


            	})
            	.fail(function (errorObject) {
            	    //handle failure
            	    $scope.hideLoading();
            	    $rootScope.showAlert("Detete Failed, but synched successfully.", ""+AlertMessages.alertTitile);


            	});*/

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
        $scope.goToLogin = function() {

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('login');
            $ionicHistory.clearHistory();
        };

        $scope.syncFail = function(error) {
            $scope.hideLoading();
            if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
                //$rootScope.showAlert("" + AlertMessages.syncFailed, "" + AlertMessages.alertTitile);
                $rootScope.sessionTimeOutMessage();
                return;
            }
            $rootScope.showAlert("" + AlertMessages.syncFailed, "" + AlertMessages.alertTitile);

        };


        $scope.showLoading = function() {
            $ionicLoading.show({
                template: "" + AlertMessages.syncing
            });
        };


        $scope.hideLoading = function() {
            $ionicLoading.hide();
        };




        $scope.callSaveAttachment = function(fileType, recordDataId) {

            $scope.length = $scope.fileLinksArray.length;


            var isAndroid = ionic.Platform.isAndroid();

            if (isAndroid) {


                var indexData11 = $scope.fileLinksArray.length - 1;
                $rootScope.base64Data11 = $scope.fileLinksArray[indexData11];
                $rootScope.base64Data112 = ("" + $rootScope.base64Data11).split(",")[1];


                $scope.optionsAttachment = {
                    "attachmentData": $rootScope.base64Data112,
                    "attachmentType": $scope.filetypeArray[$scope.length - 1],
                    "recordId": $scope.recordIndivisualIdArray[$scope.length - 1],
                    "attachmentName": $scope.attachmentNameArrayInRupload[$scope.length - 1]

                }


            } else {



                $scope.optionsAttachment = {
                    "attachmentData": $scope.fileLinksArray[$scope.length - 1],
                    "attachmentType": $scope.filetypeArray[$scope.length - 1],
                    "recordId": $scope.recordIndivisualIdArray[$scope.length - 1],
                    "attachmentName": $scope.attachmentNameArrayInRupload[$scope.length - 1]

                }

            }

            var resourceRequest = new WLResourceRequest("adapters/contract/mycontract/recordAttachment/save", WLResourceRequest.POST);
            resourceRequest.setHeader("Content-Type", "application/json");
            resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
            resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
            resourceRequest.send($scope.optionsAttachment).then($scope.getSecretData_CallbackOKRecordAttachment, $scope.getSecretData_CallbackFailRecordAttachment);


        }


        $scope.getSecretData_CallbackOKRecordAttachment = function(response) {


            $scope.fileLinksArray.pop();
            $scope.filetypeArray.pop();
            //                                        $scope.length = $scope.filelinkarra.length;
            $scope.length = $scope.fileLinksArray.length;

            if ($scope.length > 0) {
                $scope.length = $scope.length - 1;

                //                                        $scope.recordDataId=$scope.response.responseJSON[$scope.length].dto.recordId;

                var isIOS = ionic.Platform.isIOS();




                $scope.callSaveAttachment($rootScope.fileType, $scope.recordDataId);




            } else {
                //                    			         $scope.hideLoading();
                //                                         $rootScope.showAlert(""+AlertMessages.recordSaved,""+AlertMessages.alertTitile);



                WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME)
                    .remove($scope.idArray, {})
                    .then(function(numberOfDocumentsRemoved) {
                        //handle success
                        $scope.hideLoading();
                        $rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);


                    })
                    .fail(function(errorObject) {
                        //handle failure
                        $scope.hideLoading();
                        $rootScope.showAlert("" + AlertMessages.detelefailedButsynced, "" + AlertMessages.alertTitile);


                    });

            }



        };

        $scope.getSecretData_CallbackFailRecordAttachment = function(response) {
        	$scope.hideLoading();
        	  if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                  $rootScope.sessionTimeOutMessage();
                  return;
              }
            if (response.status == 404 || response.status == 0 || response.status == 500) {
                $rootScope.showAlert(AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                return;
            }

            
            $rootScope.sessionTimeOutCalled = false;
        };




        $scope.openEmptyMap = function() {
            mapCalledFromSideMenu = true;

            try {
                makr1.setMap(null);
            } catch (e) {
            	$exceptionHandler(e, " ");

            }
            try {

                makr2.setMap(null);

            } catch (e) {
            	$exceptionHandler(e, " ");

            }
            try {

                makr3.setMap(null);
            } catch (e) {
            	$exceptionHandler(e, " ");

            }
            actAddress = '';
            regAddress = '';
            offAddress = '';
            try {
                getFirstPositionAndTrack(false);
            } catch (e) {
            	$exceptionHandler(e, " ");

            }

            $state.go("fECREDIT.map");


        };


    }
]);
