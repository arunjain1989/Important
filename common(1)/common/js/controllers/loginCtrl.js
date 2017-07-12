/* JavaScript content from js/controllers/loginCtrl.js in folder common */


FeCreditApp.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicLoading', '$rootScope', '$timeout', '$ionicPlatform', '$ionicHistory', '$ionicPopup', '$location', '$window', '$ionicSideMenuDelegate' ,'$exceptionHandler',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicLoading, $rootScope, $timeout, $ionicPlatform, $ionicHistory, $ionicPopup, $location, $window, $ionicSideMenuDelegate,$exceptionHandler ) {
        if (WL.App.getDeviceLanguage() == 'vi') {
            setVietnam();
        }
        $scope.syncTypeArr = [];
        WL.App.sendActionToNative("adjustValue", {"jsonData" : true});
        $scope.$on("$ionicView.enter", function(event, data) {
            //alert("msg obj = "+ JSON.stringify(Messages));
        	$scope.appVersionDisplay= WL.Client.getAppProperty(WL.AppProperty.APP_VERSION);
            // handle event
            $scope.syncTypeArr = [];
            if (ionic.Platform.isIOS()) {
                WL.Badge.setNumber(0);
            }
            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $scope.usernameLogin = Messages.usernameLogin;
            $scope.cancelButton = Messages.cancelButton;
            $scope.passwordLogin = Messages.passwordLogin;
            $scope.loginButton = Messages.loginButton;
            $scope.privacy = Messages.privacy;
            $scope.copyrightButton = Messages.copyrightButton;
            $scope.clear_login = Messages.clear_login;


            $scope.alertTitile = AlertMessages.alertTitile;
            $scope.loginFailedError = AlertMessages.loginFailedError;
            $scope.otherDeviceLogin = AlertMessages.otherDeviceLogin;
            $scope.lockedAccount = AlertMessages.lockedAccount;
           
            $scope.enterUserPass = AlertMessages.enterUserPass;
            $scope.isInternet = AlertMessages.isInternet;
            $scope.intializedFail = AlertMessages.intializedFail;
            $scope.failedToClearData = AlertMessages.failedToClearData;
            $scope.loginSucess = AlertMessages.loginSucess;
            $scope.loadingDialouge = AlertMessages.loadingDialouge;
            $scope.loadingDialougeSearch = AlertMessages.loadingDialougeSearch;
            $scope.offLoginFailed = AlertMessages.offLoginFailed;
            $scope.contractNotFound = AlertMessages.contractNotFound;
            $scope.synchDataToServer = AlertMessages.synchDataToServer;
            $scope.synTitle = AlertMessages.synTitle;
            $scope.gettingServerData = AlertMessages.gettingServerData;
            $scope.userNotFound = AlertMessages.userNotFound;
            $scope.exitButton = AlertMessages.exitButton;



            $scope.loginData.userName = $window.localStorage[USERNAME];

        });

        $('#usernameId').on('keyup', function(e) {
            var mEvent = e || window.event;
            var mPressed = mEvent.keyCode || mEvent.which;
            if (mPressed == 13) {
                // On enter, go to next input field
                document.getElementById('passId').focus();
            }
            return true;
        });




        $('#passId').on('keyup', function(e) {
            var mEvent = e || window.event;
            var mPressed = mEvent.keyCode || mEvent.which;
            if (mPressed == 13) {
                // On enter, go to next input field
                $scope.login();
            }
            return true;
        });


        /*$scope.keyPressed = function(keyEvent, formModel) {
             if (keyEvent.keyCode == 13) {
                 $scope.login();
             }
         };	*/




        $scope.isChallengeSuccess = false;
        $rootScope.sessionTimeOutCalled = false;
        $rootScope.hidePreviousInDetail = true;
        $rootScope.hideNextInDetail = true;
        $scope.loginData = {
            userName: '',
            password: ''
        };

        var lastClickTime = 0;
        sampleAppRealmChallengeHandler1.handleFailure = function(data) {
            $ionicLoading.hide();
            hallengeAsked = false;
            $scope.isChallengeSuccess = false;
//            if(userPassforChallenge=="1"){
//
//                        return;
//                        }
            var message = "";
            if (data.errorMessage === "100") {
                message = "" + AlertMessages.loginFailedError;
            } else if (data.errorMessage === "101") {
                message = "" + AlertMessages.loginFailedError;
            } else if (data.errorMessage === "102") {
                message = "" + AlertMessages.otherDeviceLogin;
            } else if (data.errorMessage === "103") {
                message = "" + AlertMessages.lockedAccount;
            } else if (data.errorMessage === "104") {
                message = "" + AlertMessages.userNotFound;
            } else if (data.errorMessage === "105") {
                message = "" + AlertMessages.loginFailedError;
            } else if (data.errorMessage === "106") {
                message = "" + AlertMessages.otherLoginNotAllowed;
            }
            
            var current = new Date().getTime();
            var delta = current - lastClickTime;
            lastClickTime = current;
            
            if (delta > 2000) {
               $rootScope.showAlert(message, "" + AlertMessages.loginFailedError);
             }


            //        			FAIL = "100"
            //        			INVALID_FEILD_VALUE = "101"
            //        			OTHERDEVICE_LOGIN_FAILURE = "102"
            //        			ACCOUNT_LOCK_MESSAGE = "103"
            //        			USER_NOT_FOUND_MESSAGE = "104"
            //                WRONG_USER_NAME_OR_PASSWORD_MESSAGE = '105"
            //        			SUCCESS = "200"

            //busyIndicator.hide();
            //        	 this.logger.info("handleFailure ::", data);

        }
        WL.Device.getNetworkInfo(function (networkInfo) {
            networkIPAddress = networkInfo.ipAddress;
            
            });

        $scope.connectSuccess = function() {
            //alert("Successfully connected to MobileFirst Server.");
            $scope.loginSuccess("success");

        }

        $scope.connectFailure = function() {
            //alert("Failed to connected to MobileFirst Server.");
            $ionicLoading.hide();
            $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
        }

        $scope.pushLogin = function() {
        	isSesstionTimePopUpCalled = 0;
            userNameforChallenge = $scope.loginData.userName;
            userPassforChallenge = $scope.loginData.password;

            if ($scope.loginData.userName === '' || $scope.loginData.password === '') {
                $rootScope.showAlert("" + AlertMessages.enterUserPass, "" + AlertMessages.alertTitile);
                return;
            };

            if (!$rootScope.isInternetConnected()) {

                $ionicLoading.hide();
                $rootScope.showAlert("" + AlertMessages.isInternet, "" + AlertMessages.alertTitile);
                return;
            }


            var usrName = $scope.loginData.userName;
            usrName = capitalizeFirstLetter(usrName);

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            $rootScope.UserNameToShow = usrName;
            $scope.showLoading();
            $timeout($scope.hideLoading, 3*60*1000);

          //logout and then login
            WL.Client.logout('FeCreditAppRealm', {
                onSuccess: $scope.connectAfterLogout,
                onFailure: $scope.connectAfterLogout
            });

        }
        
        $scope.connectAfterLogout = function() {
            WL.Client.connect({
                 onSuccess: $scope.connectSuccess,
                 onFailure: $scope.connectFailure
             });
 }

        $scope.login = function() {
            $scope.loginClickedOk = 0;
            $scope.isChallengeSuccess = false;
            if ($scope.loginData.userName === '' || $scope.loginData.password === '') {
                $rootScope.showAlert("" + AlertMessages.enterUserPass, "" + AlertMessages.alertTitile);
                return;
            };
            $scope.showLoading();
            //  WL.Device.getNetworkInfo(function(networkInfo) {

            //  var flag = networkInfo.isNetworkConnected;
            //       		alert("Internet: "+ flag);
            if ($rootScope.isInternetConnected()) {
                if ($rootScope.sessionTimeOutCalled) {
                    $scope.submitMyAnswer();

                    return;

                }
                var usrName = $scope.loginData.userName;
                usrName = capitalizeFirstLetter(usrName);

                function capitalizeFirstLetter(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
                $rootScope.UserNameToShow = usrName;

                var json = {
                    "username": $scope.loginData.userName,
                    "totalContract": 25
                };
                var resourceRequest = new WLResourceRequest("/adapters/authentication/user/islogin", WLResourceRequest.POST);
                resourceRequest.sendFormParameters(json).then($scope.loginSuccess, $scope.loginFail);



            } else {
                //                    $scope.loginOffline();

                $ionicLoading.hide();
                $rootScope.showAlert("" + AlertMessages.isInternet, "" + AlertMessages.alertTitile);




                /*try {
  	        		WL.JSONStore.closeAll()

  	  	        	.then(function () {

  	  	        		$scope.loginOffline();
  	  	        	})

  	  	        	.fail(function (errorObject) {

  	  	        	$scope.loginOffline();
  	  	        	});
				} catch (e) {

					$scope.loginOffline();
				}*/



            }
            // });




        };



        $scope.loginSuccess = function(response) {
            var userForStore = "";
            try {
                userForStore = $scope.loginData.userName.split("@")[0];
                userForStore = userForStore.replace(/./g, "")
            } catch (e) {
            	$exceptionHandler(e, " ");
                userForStore = userForStore.replace(/./g, "")
            }

            if (userForStore == "") {
                userForStore = $scope.loginData.userName;
            }
            userForStore = "json";

            $scope.options = {
                username: userForStore,
                password: $scope.loginData.password,
                localKeyGen: true
            };

            WL.JSONStore.init($scope.collections, $scope.options)
                .then(function() {
                    //                    return WL.JSONStore.get(CONTRACTS_COLLECTION_NAME).findAll();



                    WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)
                        .removeCollection()
                        .then(function() {
                            //handle success


                            WL.JSONStore.init($scope.collections, $scope.options)
                                .then(function() {

                                    $scope.getDataFromServer();
                                }).fail(function(error) {
                                    alert("" + AlertMessages.intializedFail);

                                });


                        })
                        .fail(function(errorObject) {
                            //handle failure
                            $scope.hideLoading();
                            alert("" + AlertMessages.intializedFail);
                        });

                    /*  remove locally saved termination data */
                    WL.JSONStore.get(TERMINATION_COLLECTION_NAME)
                        .removeCollection()
                        .then(function() {
                            //handle success

                            WL.JSONStore.init($scope.collections, $scope.options)
                                .then(function() {


                                }).fail(function(error) {
                                    alert("" + AlertMessages.intializedFail);

                                });

                        })
                        .fail(function(errorObject) {
                            //handle failure
                            $scope.hideLoading();
                            alert("" + AlertMessages.intializedFail);
                        });
                    /*  remove locally saved termination attachment data */
                    WL.JSONStore.get(TERMINATION_ATTACHMENTDB_NAME)
                        .removeCollection()
                        .then(function() {
                            //handle success
                            WL.JSONStore.init($scope.collections, $scope.options)
                                .then(function() {

                                }).fail(function(error) {
                                    alert("" + AlertMessages.intializedFail);

                                });

                        })
                        .fail(function(errorObject) {
                            //handle failure
                            $scope.hideLoading();
                            alert("" + AlertMessages.intializedFail);
                        });


                    WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)
                        .removeCollection()
                        .then(function() {
                            //handle success


                            WL.JSONStore.init($scope.collections, $scope.options)
                                .then(function() {


                                }).fail(function(error) {
                                    alert("" + AlertMessages.intializedFail);

                                });


                        })
                        .fail(function(errorObject) {
                            //handle failure
                            $scope.hideLoading();
                            alert("" + AlertMessages.intializedFail);
                        });

                    WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID)
                        .removeCollection()
                        .then(function() {
                            //handle success


                            WL.JSONStore.init($scope.collections, $scope.options)
                                .then(function() {


                                }).fail(function(error) {
                                    alert("" + AlertMessages.intializedFail);

                                });


                        })
                        .fail(function(errorObject) {
                            //handle failure
                            $scope.hideLoading();
                            alert("" + AlertMessages.intializedFail);
                        });


                    WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                        .removeCollection()
                        .then(function() {
                            //handle success


                            WL.JSONStore.init($scope.collections, $scope.options)
                                .then(function() {


                                }).fail(function(error) {
                                    alert("" + AlertMessages.intializedFail);

                                });


                        })
                        .fail(function(errorObject) {
                            //handle failure
                            $scope.hideLoading();
                            alert("" + AlertMessages.intializedFail);
                        });



                }).fail(function(error) {


                    WL.JSONStore.destroy()

                        .then(function() {
                            WL.JSONStore.init($scope.collections, $scope.options)
                                .then(function() {
                                    //                    return WL.JSONStore.get(CONTRACTS_COLLECTION_NAME).findAll();
                                    $scope.getDataFromServer();
                                }).fail(function(error) {
                                    $scope.hideLoading();
                                    alert("" + AlertMessages.intializedFail);
                                    //check for -2
                                    //call removeCollection or destroy
                                    //re-init with new search fields
                                });
                        })

                        .fail(function(errorObject) {
                            //handle failure
                            $scope.hideLoading();
                            alert("" + AlertMessages.failedToClearData);
                        });

                });




        };
        $scope.loginFail = function(response) {
            //console.log(JSON.stringify(response));
            $scope.loginData.userName = '';
            $scope.loginData.password = '';
            $scope.hideLoading();

            if ($scope.isChallengeSuccess || response.status == 0 || response.status == 500 || response.status == 404) {
                $scope.isChallengeSuccess = false;
                $rootScope.showAlert(AlertMessages.serverUnrechable, "" + AlertMessages.loginFailedError);
            }

        };

        $scope.getDataFromServer = function() {

            var resourceRequest = new WLResourceRequest("/adapters/contract/mycontract/get", WLResourceRequest.POST);
            resourceRequest.setHeader("Content-Type", "application/json; charset=utf-8");
            resourceRequest.setHeader("device-id", $rootScope.devID);
            resourceRequest.sendFormParameters().then($scope.getSecretData_CallbackOK, $scope.getSecretData_CallbackFail);
            //            $scope.loginData.userName = '';
            //            $scope.loginData.password = '';
        };




        $scope.getSecretData_CallbackOK = function(response) {

        	$rootScope.recordedList= [];
            //        	doSubscribe();
            $scope.loginClickedOk += 1;
            if ($scope.loginClickedOk > 1) {
                $scope.hideLoading();
                $scope.loginClickedOk = false;
                return;
            }
            $window.localStorage[USERNAME] = $scope.loginData.userName;
            //        	$scope.loginData.userName = '';
            $scope.loginData.password = '';
            try {
                // alert(JSON.stringify(response.responseJSON.dto.termination));
                $rootScope.addressTypeList = response.responseJSON.dto.addressType;
                $rootScope.contactMode = response.responseJSON.dto.contactMode;
                $rootScope.addrTypeMapping = response.responseJSON.dto.mapping;
                $rootScope.contactPlace = response.responseJSON.dto.contactPlace;
                $rootScope.personContact = response.responseJSON.dto.personContact;
                $rootScope.actionCode = response.responseJSON.dto.actionCode;
                $rootScope.reminidermode = response.responseJSON.dto.reminidermode;
                $rootScope.repossession = response.responseJSON.dto.repossession;
                $rootScope.terminationDto = response.responseJSON.dto.termination;
                $rootScope.fcCode = response.responseJSON.dto.fcCode;
                $rootScope.fcName = response.responseJSON.dto.fcName;
                $rootScope.bidderViewList = response.responseJSON.dto.bidder;
                $rootScope.totalpaidCaseValue = response.responseJSON.dto.cases.totalPaidCase;
                $rootScope.totalUnpaidCaseValue = response.responseJSON.dto.cases.totalUnPaidCase;


                //  alert(JSON.stringify($rootScope.terminationDto));

            } catch (e) {
            	$exceptionHandler(e, " ");
                console.log("" + "actionCode, contactPlace, personContact not found");
            }
            try {
                if (response.responseJSON.dto == null) {
                    $scope.hideLoading();
                    $rootScope.showAlert(AlertMessages.gettingServerData, "" + AlertMessages.loginFailedError);
                    return;
                }
            } catch (e) {
            	$exceptionHandler(e, " ");
                $scope.hideLoading();
                $rootScope.showAlert(AlertMessages.gettingServerData, "" + AlertMessages.loginFailedError);
                return;
            }



            WL.JSONStore.get(CONTRACTS_COLLECTION_NAME).add(response.responseJSON.dto.contract).then(function(data) {
                var data = WL.JSONStore.get(CONTRACTS_COLLECTION_NAME).findAll().then(function(findResults) {
                    $rootScope.contractList = findResults;
                    $rootScope.mainContractList = findResults;
                    $rootScope.AttachmentListData = findResults;

                    WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME)
                        .findAll()
                        .then(function(numberOfDocuments) {
                        	
                        	for (var intLooper = 0; intLooper < numberOfDocuments.length; intLooper++) {

                 				 $rootScope.recordedList.push(numberOfDocuments[intLooper].json.contractId);
         					}
                        	
                            if (numberOfDocuments.length == 0) {

                                var index = 0;
                                //                   			$scope.attachmentServiceCall(index);	//call attachment service call

                                //$rootScope.showAlert(""+AlertMessages.loginSucess, ""+AlertMessages.alertTitile);
                             //   $state.go('fECREDIT.home');
                                $scope.hideLoading();
                            } else {
                                //							Sync data to server Dialog
                                //    						$rootScope.showAlert("Synch your previous saved data to server", "Sync Data");

                                $scope.syncTypeArr.push('record');

                            }
                        })
                        .fail(function(errorObject) {

                            //$rootScope.showAlert(""+AlertMessages.loginSucess, ""+AlertMessages.alertTitile);
                            $state.go('fECREDIT.home');
                            $scope.hideLoading();
                        });


                });

            });


            WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME).add(response.responseJSON.dto.repossession).then(function(data) {
                var data = WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME).findAll().then(function(findResults) {
                    $rootScope.repossessionList = findResults;
                    //$rootScope.mainContractList = findResults;
                    //$rootScope.AttachmentListData = findResults;

                    //                    WL.JSONStore.get(REPOSESSION_ONLINE_COLLECTION_NAME)
                    //                        .count()
                    //                        .then(function(numberOfDocuments) {
                    //                            if (numberOfDocuments == 0) {
                    //
                    //                                var index = 0;
                    //                                //                   			$scope.attachmentServiceCall(index);	//call attachment service call
                    //
                    //                                //$rootScope.showAlert(""+AlertMessages.loginSucess, ""+AlertMessages.alertTitile);
                    //                                $state.go('fECREDIT.home');
                    //                                $scope.hideLoading();
                    //                            } else {
                    //                                //							Sync data to server Dialog
                    //                                //    						$rootScope.showAlert("Synch your previous saved data to server", "Sync Data");

                    //                                  $scope.syncTypeArr.push('repossession');
                    //                            }
                    //                        })
                    //                        .fail(function(errorObject) {
                    //
                    //                            //$rootScope.showAlert(""+AlertMessages.loginSucess, ""+AlertMessages.alertTitile);
                    //                            $state.go('fECREDIT.home');
                    //                            $scope.hideLoading();
                    //                        });


                });

            });

            // check & sync if termination data

            WL.JSONStore.get(TERMINATION_COLLECTION_SYNC).findAll().then(function(findResults) {


                if (findResults.length > 0) {


                    $scope.syncTypeArr.push('termination');
                }
            }).fail(function(errorObject) {

                $scope.hideLoading();
            });

            WL.JSONStore.get(REPOSSESSION_COLLECTION_SYNC).findAll().then(function(findResults) {


                if (findResults.length > 0) {


                    $scope.syncTypeArr.push('repossession');
                }
            }).fail(function(errorObject) {

                $scope.hideLoading();
            });

            WL.JSONStore.get(BIDDER_REPOSSESSION_SYNC).findAll().then(function(findResults) {


                if (findResults.length > 0) {


                    $scope.syncTypeArr.push('bidder');
                }
            }).fail(function(errorObject) {

                $scope.hideLoading();
            });

            setTimeout(function() {

                    if ($scope.syncTypeArr.length > 0) {
                        $scope.showSyncConfirm();
                    }else {
                        $scope.hideLoading();
                        $state.go('fECREDIT.home');
                    }

             }, 1000);
        }


        $scope.getSecretData_CallbackFail = function(response) {
           // $scope.loginData.userName = '';
            $scope.loginData.password = '';
            $scope.hideLoading();
            if ($scope.isChallengeSuccess || response.status == 0 || response.status == 404 || response.status == 500) {
                $rootScope.showAlert("" + AlertMessages.gettingServerData, "" + AlertMessages.alertTitile);
            }

        }



        $scope.attachmentServiceCall = function(index) {



            var arrayLengthvalue = $rootScope.AttachmentListData.length;



            if (index <= arrayLengthvalue - 1) {


                $scope.indexvale = index;

                var contactIdServer = $rootScope.AttachmentListData[index].json.contractId;

                var json = {
                    "contractId": contactIdServer,

                };


                var resourceRequest = new WLResourceRequest("/adapters/ContractAttachment/attachment/fetch", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send(json).then($scope.loginSuccessattachment, $scope.loginFailattachment);



            } else {

                $state.go('fECREDIT.home');
                $scope.hideLoading();




            }




        }


        $scope.loginSuccessattachment = function(response) {



            WL.JSONStore.get(ATTACHMENT_FETCH_COLLECTION_NAME).add(response.responseJSON.dto).then(function(data) {
                var data = WL.JSONStore.get(ATTACHMENT_FETCH_COLLECTION_NAME).findAll().then(function(findResults) {



                    $rootScope.attachmentAllContactdata = findResults;




                });

            });



            var succussvalueindex = $scope.indexvale;

            succussvalueindex++;


            $scope.attachmentServiceCall(succussvalueindex);




        }

        $scope.loginFailattachment = function(response) {




            var succussvalueindex = $scope.indexvale;

            succussvalueindex++;


            $scope.attachmentServiceCall(succussvalueindex);



        }


        $scope.showSyncConfirm = function() {
            $scope.hideLoading();


            var myPopup = $ionicPopup.show({

                subTitle: AlertMessages.synchDataToServer,
                scope: $scope,
                cssClass: 'noUnderlineSyncTitle',
                buttons: [{
                    text: Messages.cancelButton,
                    onTap: function(e) {
                        $state.go('fECREDIT.home');
                        myPopup.close();
                    }
                }, {
                    text: '<b>' + Messages.okButton + '</b>',
                    type: 'button',
                    onTap: function(e) {

                        // alert($scope.syncTypeArr);

                         $scope.showLoading();

                          if ($scope.syncTypeArr.indexOf('record') != -1) {
                              $scope.callSyncSavedData();
                          }
                          if ($scope.syncTypeArr.indexOf('termination') != -1) {
                              $rootScope.syncTerminationData();
                              $rootScope.fetchTerminationAttachments();
                              setTimeout(function() {
                                  $rootScope.syncTerminationAttachmentData(0);
                              }, 2000);
                          }

                          if ($scope.syncTypeArr.indexOf('repossession') != -1) {
                              $rootScope.syncRepossessionData();
                              $rootScope.fetchRepossessionAttachments(); 
                              setTimeout(function() { $rootScope.syncRepossessionAttachmentData(0); }, 1000);
                          }
                          if ($scope.syncTypeArr.indexOf('bidder') != -1) {
                              $rootScope.syncBidderData();

                          }
                          setTimeout(function() { $scope.hideLoading(); $state.go('fECREDIT.home');  }, 1000);


                        // $rootScope.showNothingToSync();  // no need here

                        myPopup.close();
                    }
                }]
            });


        };

                            var nilAddress = 0;
							var nilDistance = 0;
							$scope.callSyncSavedData = function() {
								$scope.showLoading();
								$scope.recordArray = [];
								$scope.idArray = [];

								var data = WL.JSONStore
										.get(RECORDS_ONLINE_COLLECTION_NAME)
										.findAll()
										.then(
												function(findResults) {

													nilAddress = 0;
													nilDistance = 0;
													for (var int = 0; int < findResults.length; int++) {
														$scope.idArray
																.push({
																	_id : findResults[int]._id
																});
														$scope.recordArray
																.push(findResults[int].json);

														if (findResults[int].json.checkIn.distance == ''
																&& findResults[int].json.checkIn.address != ''
																&& findResults[int].json.checkIn.address != undefined
																&& findResults[int].json.checkIn.address != 'null'
																&& findResults[int].json.checkIn.addressType
																		.toLowerCase() != 'other') {
															nilAddress = nilAddress + 1;
															nilDistance = int;
															$scope
																	.getCurrentAddress(int);

														}

														/* if(int == findResults.length-1){
														 alert("service");
														 }*/

														/* if(findResults[int].json.checkIn.distance == '' && findResults[int].json.checkIn.checkinAddress!='')  {
														                        nilDistance = nilDistance+1;
														        				 getLocationFromAddress(findResults[int].json.checkIn.address, findResults[int].json.checkIn.latLong, int)
														}*/
													}

													//            		 hit server

													var resourceRequest = new WLResourceRequest(
															"/adapters/contract/mycontract/record/save",
															WLResourceRequest.POST);
													resourceRequest.setHeader(
															"Content-Type",
															"application/json");
													resourceRequest
															.setHeader(
																	'Access-Control-Allow-Origin',
																	'*');
													resourceRequest
															.setHeader(
																	'Access-Control-Allow-Methods',
																	'GET, PUT, POST, DELETE, OPTIONS');
													resourceRequest
															.setHeader(
																	'Access-Control-Allow-Headers',
																	'Content-Type, Content-Range, Content-Disposition, Content-Description');
													if (nilAddress == 0) {
														resourceRequest
																.send(
																		$scope.recordArray)
																.then(
																		$scope.syncSuccess,
																		$scope.syncFail);
													}

												})
										.fail(
												function(errorObject) {

													$rootScope
															.showAlert(
																	""
																			+ AlertMessages.loginSucess,
																	""
																			+ AlertMessages.alertTitile);
													$state.go('fECREDIT.home');
													$scope.hideLoading();
												});

							};

							$scope.getCurrentAddress = function(curr_index) {
								var currentAddressForCheckIn = '';

								var geocoder = new google.maps.Geocoder();

								geocoder
										.geocode(
												{
													latLng : new google.maps.LatLng(
															$scope.recordArray[curr_index].checkIn.latLong.split[0],
															$scope.recordArray[curr_index].checkIn.latLong.split[1])
												},
												function(responses) {
													if (responses
															&& responses.length > 0) {
														currentAddressForCheckIn = responses[0].formatted_address;

													} else {
														currentAddressForCheckIn = '';

													}
													$scope.recordArray[curr_index].checkIn.checkinAddress = currentAddressForCheckIn;
													getLocationFromAddress(
															$scope.recordArray[curr_index].checkIn.address,
															$scope.recordArray[curr_index].checkIn.latLong,
															curr_index);
												});
							};

							function getLocationFromAddress(address,
									checkingLatLong, curr_index) {

								if (typeof google === 'undefined') {
									finalCallSyncService(curr_index);
								}
                               else{
								if (address != 'undefined' && address != null) {
									var geocoder = new google.maps.Geocoder();

									geocoder
											.geocode(
													{
														'address' : address
													},
													function(results, status) {
														if (status == google.maps.GeocoderStatus.OK) {
															lat = results[0].geometry.location
																	.lat();
															long = results[0].geometry.location
																	.lng();
															var selectedAddress = (lat
																	+ "," + long);
															var distanceValue = getDistance(
																	checkingLatLong,
																	selectedAddress);

															$scope.recordArray[curr_index].checkIn.distance = ""
																	+ distanceValue;

															finalCallSyncService(curr_index);

														} else {

															finalCallSyncService(curr_index);

														}
													});
								}else{
								finalCallSyncService(curr_index);	
								}
							}
									}

							function finalCallSyncService(curr_index) {

								if (nilDistance == curr_index) {
									nilAddress = 0;
									nilDistance = 0;

									//            		 hit server

									var resourceRequest = new WLResourceRequest(
											"/adapters/contract/mycontract/record/save",
											WLResourceRequest.POST);
									resourceRequest.setHeader("Content-Type",
											"application/json");
									resourceRequest.setHeader(
											'Access-Control-Allow-Origin', '*');
									resourceRequest.setHeader(
											'Access-Control-Allow-Methods',
											'GET, PUT, POST, DELETE, OPTIONS');
									resourceRequest
											.setHeader(
													'Access-Control-Allow-Headers',
													'Content-Type, Content-Range, Content-Disposition, Content-Description');

									resourceRequest.send($scope.recordArray)
											.then($scope.syncSuccess,
													$scope.syncFail);
								}

							}

							function getDistance(addr1, addr2) {
								var lat1 = addr1.substring(0, addr1
										.indexOf(','));
								var lon1 = addr1.substring(
										addr1.indexOf(',') + 1, addr1.length);

								var lat2 = addr2.substring(0, addr2
										.indexOf(','));
								var lon2 = addr2.substring(
										addr2.indexOf(',') + 1, addr2.length);

								var R = 6378137;
								var dLat = (lat2 - lat1) * Math.PI / 180;
								var dLon = (lon2 - lon1) * Math.PI / 180;
								var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
										+ Math.cos(lat1 * Math.PI / 180)
										* Math.cos(lat2 * Math.PI / 180)
										* Math.sin(dLon / 2)
										* Math.sin(dLon / 2);
								var c = 2 * Math.atan2(Math.sqrt(a), Math
										.sqrt(1 - a));
								var d = R * c;
								d = Math.round(d);

								return d;
							}


        $scope.syncSuccess = function(response) {

        	if (response.responseJSON[0].responseCode != "200") {
                
        		$scope.hideLoading();
                $state.go('fECREDIT.home');
                return;

            }
        	
            WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME)
                .remove($scope.idArray, {})
                .then(function(numberOfDocumentsRemoved) {
                    //handle success
                    //					alert("Deteted suuccessfully: "+numberOfDocumentsRemoved);
                    $scope.hideLoading();
                    $state.go('fECREDIT.home');

                })
                .fail(function(errorObject) {
                    //handle failure
                    //					alert("Detete Failed suuccessfully");
                    $scope.hideLoading();
                    $state.go('fECREDIT.home');

                });

        };

        $scope.syncFail = function(error) {
            $scope.hideLoading();
            if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
                $rootScope.sessionTimeOutMessage();
                return;
            }
            $state.go('fECREDIT.home');

        };


        var offlineLoggedIn = false;

        $scope.collections = {};
        var collectionName = 'userCredentials';

        $scope.collections[collectionName] = {

            searchFields: {
                name: 'string',
                pass: 'integer'
            }

        };
        $scope.collections[CONTRACTS_COLLECTION_NAME] = {

            searchFields: {
                regAddress: 'string',
                actAddress: 'string',
                offAddress: 'string',
                fullName: 'string',
                custId: 'string',
                contractId: 'string',
                firstName: 'string',
                idIssueDate: 'string',
                lastName: 'string',
                assignedDate: 'string',
                nextActionDate: 'string'
            },


            adapter: {
                name: 'ContractListAdapter',
                load: {
                    procedure: 'getContract',
                    params: [],
                    key: 'contractList'
                }
            }

        };

        $scope.collections[ATTACHMENT_FETCH_COLLECTION_NAME] = {

            searchFields: {
                attachment_data: 'string',
                attachment_type: 'string',
                contractId: 'string'

            }




        };




        $scope.collections[RECORDS_COLLECTION_NAME] = {

            searchFields: {
                record_name: 'string',
                contractId: 'string',
                record_id: 'integer'
            },


            adapter: {
                name: 'ContractListAdapter',
                load: {
                    procedure: 'getRecords',
                    params: [],
                    key: 'recordsList'
                }
            }
            //-- End optional adapter metadata
        };
        $scope.collections[RECORDS_ONLINE_COLLECTION_NAME] = {

            searchFields: {
                record_name: 'string',
                contractId: 'string',
                record_id: 'integer'
            }

        };

        $scope.collections[REPOSSESSIONS_COLLECTION_NAME] = {

            searchFields: {
                regAddress: 'string',
                actAddress: 'string',
                offAddress: 'string',
                fullName: 'string',
                custId: 'string',
                contractId: 'string',
                firstName: 'string',
                idIssueDate: 'string',
                lastName: 'string'
            },



        };

        $scope.collections[REPOSSESSION_ATTACHMENTDB_REPOSSESSINID] = {

            searchFields: {
                regAddress: 'string',
                actAddress: 'string',
                offAddress: 'string',
                fullName: 'string',
                custId: 'string',
                contractId: 'string',
                firstName: 'string',
                idIssueDate: 'string',
                lastName: 'string'
            },



        };

        $scope.collections[REPOSESSION_ONLINE_COLLECTION_NAME] = {

            searchFields: {
                regAddress: 'string',
                actAddress: 'string',
                offAddress: 'string',
                fullName: 'string',
                custId: 'string',
                contractId: 'string',
                firstName: 'string',
                idIssueDate: 'string',
                lastName: 'string'
            },



        };



        $scope.collections[TERMINATION_COLLECTION_NAME] = {

            searchFields: {
                contractId: 'string'
            }

        };

        $scope.collections[TERMINATION_ATTACHMENTDB_NAME] = {

            searchFields: {
                contractId: 'string'
            }

        };
        $scope.collections[TERMINATION_COLLECTION_SYNC] = {

            searchFields: {
                contractId: 'string'
            }

        };

        $scope.collections[TERMINATION_ATTACHMENTDB_SYNC] = {

            searchFields: {
                contractId: 'string'
            }

        };

        $scope.collections[REPOSSESSION_COLLECTION_SYNC] = {

            searchFields: {
                contractId: 'string'
            }

        };

        $scope.collections[REPOSSESSION_ATTACHMENTDB_SYNC] = {

            searchFields: {
                contractId: 'string'
            }

        };
        $scope.collections[BIDDER_REPOSSESSION_SYNC] = {

            searchFields: {
                contractId: 'string'
            }

        };

        $scope.collections[BIDDERLOCALDB_SAVE] = {

            searchFields: {
                contractId: 'string',
                repossessionId: 'string',
                bidderId: 'string'
            }

        };
        $scope.collections[NOTIFICATIONS_DB] = {

            searchFields: {
                uniqueId: 'string',
            }

        };
        $scope.collections[CHECK_IN_DB] = {

            searchFields: {
                contractId: 'string',
            }

        };
        $scope.collections["readUIDList"] = {

searchFields: {
                contractId: 'string',
            }

                };

        $scope.collections[IPHONE_LOGGER_DB] = {

                searchFields: {
                    record_name: 'string',
                    contractId: 'string',
                    record_id: 'integer'
                }

            };


        $scope.options = {
            username: $scope.loginData.userName,
            password: $scope.loginData.password,
            localKeyGen: true
        };
        var counter = 0;

        $scope.initStore = function() {

            $scope.showLoading();
            WL.JSONStore.init($scope.collections, $scope.options)
                .then(function() {
                    return WL.JSONStore.get(CONTRACTS_COLLECTION_NAME).findAll();
                })
                .then(function(findAllResult) {
                    if (findAllResult.length == 0) {

                        //                        $scope.getDataFromServer();
                        //                        alert("Contract not found!");
                        $rootScope.showAlert("" + AlertMessages.contractNotFound, "" + AlertMessages.alertTitile);

                        return null;




                    } else {
                        $rootScope.contractList = findAllResult;
                        $rootScope.mainContractList = findResults;
                        return findAllResult;
                    }




                })
                .then(function(data) {
                    // call Home Page
                    if (data == null) {

                        return;
                    }
                    $state.go('fECREDIT.home');
                    $scope.hideLoading();
                })


        };

        $scope.showLoading = function() {
            $ionicLoading.show({
                template: AlertMessages.loadingDialouge
            });
        };


        $scope.hideLoading = function() {
            $ionicLoading.hide();
        };



        $scope.goHome = function() {
            WL.Device.getNetworkInfo(function(networkInfo) {
                // alert(!networkInfo.isNetworkConnected);
                if (networkInfo.isNetworkConnected) { // if true, then
                    // connect to the Worklight Server or do something else...
                }
            });
            $rootScope.loginTime = new Date().getTime();
            $scope.showLoading();
            $state.go('fECREDIT.home');
            $scope.hideLoading();
            // $state.go('fECREDIT.home');

            $scope.timer = $timeout($scope.timerMethod, 10000);
            // $timeout.cancel($scope.timer);


        };

        $scope.loginOffline = function() {
            WL.JSONStore.init($scope.collections, {
                    username: $scope.loginData.userName,
                    password: $scope.loginData.password,
                    localKeyGen: true
                })
                .then(function() {
                    try {
                        $timeout.cancel($scope.timer);
                    } catch (e) {
                    	$exceptionHandler(e, " ");
                    }
                    $scope.timer = $timeout($scope.timerMethod, 2 * 60 * 60 * 1000);
                    WL.JSONStore.get(CONTRACTS_COLLECTION_NAME).findAll().then(function(findResults) {

                        $rootScope.contractList = findResults;
                        $rootScope.mainContractList = findResults;
                        $state.go('fECREDIT.home');
                        $scope.hideLoading();
                    });

                }).fail(function(error) {
                    $scope.hideLoading();

                    $rootScope.showAlert("" + AlertMessages.offLoginFailed, "" + AlertMessages.alertTitile);
                });
        };

        $scope.exitFromApp = function() {
            $scope.cancelButtonMethod();
        }

        $scope.cancelButtonMethod = function() {


            $scope.loginData.userName = '';
            $scope.loginData.password = '';
            $window.localStorage[USERNAME] = '';


            //          var isIOS = ionic.Platform.isIOS();

            /* if (isIOS){

      		$scope.loginData.userName = '';
            $scope.loginData.password = '';
            $window.localStorage[USERNAME] = '';


      	  }
      	  else{


      		 navigator.app.exitApp();


      	  }*/




        };

        $rootScope.logout = function() {
            //        	alert("Token: "+ WL.Client.getLastAccessToken());

            //        	 WL.Client.reloadApp();
            /*WL.Client.logout('FeCreditAppRealm', {
                onSuccess: WL.Client.reloadApp
            });*/

            WL.Client.logout('FeCreditAppRealm', {
                onSuccess: $scope.goToLoginAndReturn,
                onFailure: $scope.goToLoginAndReturn
            });




        };

        $scope.goToLogin = function() {
            $ionicHistory.clearHistory();

            $rootScope.contractSideMenuFlag = false;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('login');
            WL.Client.reloadApp();
        };

        $rootScope.sessionTimeOutMessage=function(){

        $ionicHistory.clearHistory();

       

        $rootScope.showAlertSession("" + AlertMessages.sessionTimeOutMessage, "" + AlertMessages.alertTitile);
        

        $state.go('login');

        }

        $scope.goToLoginAndReturn = function() {

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('login');
            //                	WL.Client.reloadApp();
        };


        $scope.timerMethod = function() {
            $rootScope.showAlert("" + AlertMessages.sessionTimeOutMessage, "" + AlertMessages.alertTitile);
            //            alert("Timeout--Called.");
            //            WL.Client.reloadApp();

            if ($rootScope.isInternetConnected() === true) {
                try {
                    WL.Client.logout('FeCreditAppRealm', {
                        onSuccess: $scope.goToLogin
                    });
                } catch (e) {
                    $scope.goToLogin();
                    $exceptionHandler(e, " ");
                }


            } else {
                //				$scope.goToLogin();
                WL.Client.reloadApp();
            }
        };
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentTime = new Date().getTime();

            if ($rootScope.currentTime >= ($rootScope.loginTime + 1 * 60 * 1000)) {
                // alert("show login screen");
            }
        });


        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //        	alert(toState+" :: "+fromState);
            //        	alert("Current State: "+$state.current.name);
            if ($state.current.name == "fECREDIT.search") {
                $rootScope.contractList = [];
            }

        });


        $ionicPlatform.registerBackButtonAction(function(event) {
            var history = $ionicHistory.viewHistory();
            if ($state.current.name == "fECREDIT.home" || $state.current.name == "login") {

                //              Exit from app or logput
                //        	  $scope.cancelButton();
                /* WL.Client.logout('FeCreditAppRealm', {
                  onSuccess: $scope.cancelButton,
                  onFailure: $scope.cancelButton
              });*/




                var myPopup = $ionicPopup.show({
                    title: "FE-Credit",
                    subTitle: AlertMessages.exitButton,
                    scope: $scope,
                    cssClass: 'noUnderlineSyncTitle',
                    buttons: [{
                        text: Messages.cancelButton
                    }, {
                        text: '<b>' + Messages.okButton + '</b>',
                        type: 'button',
                        onTap: function(e) {
                            myPopup.close();
                            var isIOS = ionic.Platform.isIOS();

                            if (isIOS) {
                                WL.App.sendActionToNative("killApp");
                            } else {
                                navigator.app.exitApp();
                            }

                        }
                    }]
                });




                return;
            }
            /*  else  if($state.current.name == "fECREDIT.termination"){
                                alert("22");
                                  $rootScope.closeTerminationModule();
                                 return;
                            }*/
            if (history.backView == null) {

                $ionicHistory.clearHistory();

                $ionicHistory.nextViewOptions({
                    historyRoot: true,
                    disableBack: true
                });
                $state.go("fECREDIT.home");
            } else {
                navigator.app.backHistory();

            }

            //           alert("Name: "+$state.current.name);

        }, 100);

        /*  added by aman - for file attachment windows phone below   *


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

                    // your application here.
                } else {

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

            // that needs to persist across suspensions here. You might use the
            // WinJS.Application.sessionState object, which is automatically
            // saved and restored across suspension. If you need to complete an
            // asynchronous operation before your application is suspended, call
            // args.setPromise().
        };

        /*  added by aman - for file attachment testing windows phone above */

        //  code for syncing termination & its attachments
        $scope.termDbIdArray = [];
        $scope.termAttachDbIdArray = [];
        $rootScope.syncTerminationData = function() {
            //$scope.showLoading();
            $scope.dataToSendArr = [];
            // alert("sync term data");
            WL.JSONStore.get(TERMINATION_COLLECTION_SYNC).findAll().then(function(findResults) {

                if (findResults.length == 0) {
                    //$scope.hideLoading();

                    //  $rootScope.showAlert("" + AlertMessages.nothing_To_sync, "" + AlertMessages.alertTitile);
                    return;
                } else {
                    $rootScope.isDataForSync = true;

                }
                for (var int = 0; int < findResults.length; int++) {
                    $scope.termDbIdArray.push({
                        _id: findResults[int]._id
                    });

                    var dataObj = findResults[int].json;
                    $scope.dataToSendArr.push(dataObj);
                }
                // alert(JSON.stringify($scope.dataToSendArr));
                // 	 hit server
                var resourceRequest = new WLResourceRequest("/adapters/ContractTermination/contract/termination/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.dataToSendArr).then($rootScope.syncTerminationSuccess, $rootScope.syncTerminationFail);


            }).fail(function(errorObject) {

                $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
                //$scope.hideLoading();
            });

        }
        $rootScope.syncTerminationSuccess = function(response) {

            // now remove this db coz all data synced
            WL.JSONStore.get(TERMINATION_COLLECTION_SYNC)
                .remove($scope.termDbIdArray, {})
                .then(function(numberOfDocumentsRemoved) {
                    //handle success
                   // $scope.hideLoading();
                    $rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);
                })
                .fail(function(errorObject) {
                    //handle failure
                   // $scope.hideLoading();
                    $rootScope.showAlert("" + AlertMessages.detelefailedButsynced, "" + AlertMessages.alertTitile);
                });

        };
        $rootScope.syncTerminationFail = function(error) {
           // $scope.hideLoading();
            $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
        };

        $scope.attachSyncCounter = 0;
        $rootScope.syncTerminationAttachmentData = function(index) {

            //   alert($scope.attachArrToSend.length + " - " + index);
            if (index < $scope.attachArrToSend.length) {

                var dataObj = $scope.attachArrToSend[index];

                var resourceRequest = new WLResourceRequest("/adapters/ContractTermination/contract/termination/attachment/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send(dataObj).then($rootScope.syncTerminationAttachSuccess, $rootScope.syncTerminationAttachFail);

            } else {

                $scope.attachSyncCounter = 0;
                // now remove this db coz all data synced
                WL.JSONStore.get(TERMINATION_ATTACHMENTDB_SYNC)
                    .remove($scope.termAttachDbIdArray, {})
                    .then(function(numberOfDocumentsRemoved) {
                        //handle success
                     //   $scope.hideLoading();
                        //$rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);
                    })
                    .fail(function(errorObject) {
                        //handle failure
                     //   $scope.hideLoading();
                        $rootScope.showAlert("" + AlertMessages.detelefailedButsynced, "" + AlertMessages.alertTitile);
                    });
            }

        }
        $rootScope.syncTerminationAttachSuccess = function(response) {
            $scope.attachSyncCounter++;
            $rootScope.syncTerminationAttachmentData($scope.attachSyncCounter);
        };
        $rootScope.syncTerminationAttachFail = function(error) {
           // $scope.hideLoading();
            $scope.attachSyncCounter = 0;
            $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
        };

        $rootScope.fetchTerminationAttachments = function() {
           // $scope.showLoading();
            $scope.attachArrToSend = [];
            // alert( "fetch attach");
            WL.JSONStore.get(TERMINATION_ATTACHMENTDB_SYNC).findAll().then(function(findResults) {
                //   alert("fetch attach " + findResults.length);
                if (findResults.length == 0) {
                   // $scope.hideLoading();
                    // $rootScope.showAlert("" + AlertMessages.nothing_To_sync, "" + AlertMessages.alertTitile);
                    return;
                }
                for (var int = 0; int < findResults.length; int++) {
                    $scope.termAttachDbIdArray.push({
                        _id: findResults[int]._id
                    });
                    var dataObj = findResults[int].json;
                    $scope.attachArrToSend.push(dataObj);
                }

            }).fail(function(errorObject) {

                $scope.hideLoading();
            });

        }

        $scope.reposDbIdArray = [];
        $scope.reposAttachDbIdArray = [];

        $rootScope.syncRepossessionData = function() {
           // $scope.showLoading();
            $scope.dataToSendArrRepos = [];
            // alert("sync term data");
            WL.JSONStore.get(REPOSSESSION_COLLECTION_SYNC).findAll().then(function(findResults) {

                if (findResults.length == 0) {
                   // $scope.hideLoading();

                    //  $rootScope.showAlert("" + AlertMessages.nothing_To_sync, "" + AlertMessages.alertTitile);
                    return;
                } else {
                    $rootScope.isDataForSync = true;

                }
                $scope.reposRepposIdArray = [];
                for (var int = 0; int < findResults.length; int++) {
                    $scope.reposDbIdArray.push({
                        _id: findResults[int]._id
                    });


                    $scope.reposRepposIdArray.push({
                        contractId: findResults[int].json.contractId
                    });

                    $scope.dataObj = findResults[int].json;
                    $scope.dataToSendArrRepos.push($scope.dataObj);
                }
                // alert(JSON.stringify($scope.dataToSendArrRepos));
                // 	 hit server
                var resourceRequest = new WLResourceRequest("/adapters/contractRepossessions/repossession/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.dataToSendArrRepos).then($rootScope.syncRepossessionSuccess, $rootScope.syncRepossessionFail);


            }).fail(function(errorObject) {

                $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
                $scope.hideLoading();
            });

        }
        $rootScope.syncRepossessionSuccess = function(response) {
                 if (response.responseJSON[0].responseCode == "102") {
                    //				        	  sso
                   // $scope.hideLoading();
                    //$scope.savAndLogout();

                    return;

                } else if (response.responseJSON[0].responseCode == "101") {
                    //				        	  fail
                  //  $scope.hideLoading();
                    //$rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                    return;
                } else if (response.responseJSON[0].responseCode == "200") {


                    // now remove this db coz all data synced
                    for (var indexofContReposs=0; indexofContReposs < response.responseJSON.length; indexofContReposs++) {
                        $scope.reposRepposIdArray[indexofContReposs].repossessionId = response.responseJSON[indexofContReposs].dto.repossessionId;
                    }


                    $scope.saveSyncForRepossessionIdLogin();
                    $scope.updateRepossessionDB(response.responseJSON);

                    WL.JSONStore.get(REPOSSESSION_COLLECTION_SYNC)
                        .remove($scope.reposDbIdArray, {})
                        .then(function(numberOfDocumentsRemoved) {
                            //handle success
                          //  $scope.hideLoading();
                            $rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);
                        })
                        .fail(function(errorObject) {
                            //handle failure
                           // $scope.hideLoading();
                            $rootScope.showAlert("" + AlertMessages.detelefailedButsynced, "" + AlertMessages.alertTitile);
                        });

            }

        };
        $rootScope.syncRepossessionFail = function(error) {
            //$scope.hideLoading();
        	if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
                //$rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
                $rootScope.sessionTimeOutMessage();
                return;
            }
            $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
        };

        $scope.updateRepossessionDB = function(responseJSON) {

           // var arrToSearch = [];
            for (var j = 0; j < $scope.dataToSendArrRepos.length; j++) {

               // arrToSearch.push( { contractId: $scope.dataToSendArrRepos[j].contractId  } );
                $scope.dataToSendArrRepos[j].repossessionId = responseJSON[j].dto.repossessionId;

            }

                WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)
                    .findAll().then(function(data) {

                    if (data.length > 0) {

                            for (var j = 0; j < $scope.dataToSendArrRepos.length; j++) {
                                var found = 0;
                                for (var k = 0; k < data.length; k++) {

                                    if ($scope.dataToSendArrRepos[j].contractId == data[k].json.contractId ) {
                                         var found = 1;
                                        if( data[k].json.repossessionId == undefined){

                                            var json = $scope.dataToSendArrRepos[j];

                                            WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)

                                                .replace({
                                                    _id: data[k]._id,
                                                    json: json
                                                })
                                                .then(function() {

                                                   //handle success
                                                }).fail(function(errorObject) {
                                                    //handle failure

                                                });
                                        }
                                    }

                                }
                                if(found == 0){
                                     var json = $scope.dataToSendArrRepos[j];
                                    WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME).add(json).then(function(data) {
                                         //
                                     }).fail(function(error) {

                                     });
                                }
                            }

                    }else{

                             WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME).add($scope.dataToSendArrRepos).then(function(data) {
                                 //
                             }).fail(function(error) {

                             });


                     }

                }).fail(function(error) {

                });


        };

        $scope.saveSyncForRepossessionIdLogin = function() {




            WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID).add($scope.reposRepposIdArray).then(function(data) {
                //
            }).fail(function(error) {

            });




        };

        $scope.attachSyncCounterRepos = 0;
        $rootScope.syncRepossessionAttachmentData = function(index) {

            //   alert($scope.attachArrToSend.length + " - " + index);
            if (index < $scope.attachArrToSendRepos.length) {

                var dataObj = $scope.attachArrToSendRepos[index];
                for (var j = 0; j < $scope.dataToSendArrRepos.length; j++) {

                      if(dataObj.contractId == $scope.dataToSendArrRepos[j].contractId)
                      {
                          dataObj.repossessionId = ""+$scope.dataToSendArrRepos[j].repossessionId;
                      }


                 }

                var resourceRequest = new WLResourceRequest("/adapters/contractRepossessions/repossession/attachment/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send(dataObj).then($rootScope.syncRepossessionAttachSuccess, $rootScope.syncRepossessionAttachFail);

            } else {

                $scope.attachSyncCounterRepos = 0;
                // now remove this db coz all data synced
                WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_SYNC)
                    .remove($scope.reposAttachDbIdArray, {})
                    .then(function(numberOfDocumentsRemoved) {
                        //handle success
                       // $scope.hideLoading();
                        //$rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);
                    })
                    .fail(function(errorObject) {
                        //handle failure
                       // $scope.hideLoading();
                        $rootScope.showAlert("" + AlertMessages.detelefailedButsynced, "" + AlertMessages.alertTitile);
                    });
            }

        }
        $rootScope.syncRepossessionAttachSuccess = function(response) {
            $scope.attachSyncCounterRepos++;
            $rootScope.syncRepossessionAttachmentData($scope.attachSyncCounterRepos);
        };
        $rootScope.syncRepossessionAttachFail = function(error) {
           // $scope.hideLoading();
        	if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
                $rootScope.sessionTimeOutMessage();
                return;
            }
            $scope.attachSyncCounterRepos = 0;
        };

        $rootScope.fetchRepossessionAttachments = function() {
           // $scope.showLoading();
            $scope.attachArrToSendRepos = [];
            // alert( "fetch attach");
            WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_SYNC).findAll().then(function(findResults) {
                //   alert("fetch attach " + findResults.length);
                if (findResults.length == 0) {
                   // $scope.hideLoading();

                    //                         $rootScope.showNothingToSync();
                    // $rootScope.showAlert("" + AlertMessages.nothing_To_sync, "" + AlertMessages.alertTitile);
                    return;
                } else {
                    $rootScope.isDataForSync = true;

                }
                for (var int = 0; int < findResults.length; int++) {
                    $scope.reposAttachDbIdArray.push({
                        _id: findResults[int]._id
                    });
                    var dataObj = findResults[int].json;
                    $scope.attachArrToSendRepos.push(dataObj);
                }

            }).fail(function(errorObject) {

                //$scope.hideLoading();
            });

        }

        $scope.bidderDbIdArray = [];

        $rootScope.syncBidderData = function() {
           // $scope.showLoading();
            $scope.dataToSendArrBidder = [];
            // alert("sync term data");
            WL.JSONStore.get(BIDDER_REPOSSESSION_SYNC).findAll().then(function(findResults) {

                if (findResults.length == 0) {
                   // $scope.hideLoading();

                    //  $rootScope.showAlert("" + AlertMessages.nothing_To_sync, "" + AlertMessages.alertTitile);
                    return;
                } else {
                    $rootScope.isDataForSync = true;

                }
                for (var int = 0; int < findResults.length; int++) {
                    $scope.bidderDbIdArray.push({
                        _id: findResults[int]._id
                    });

                    var dataObj = findResults[int].json;
                    if(dataObj.amount == "NaN" ){

                           dataObj.amount = 0;
                    }
                    $scope.dataToSendArrBidder.push(dataObj);
                }
                // alert(JSON.stringify($scope.dataToSendArrRepos));
                // 	 hit server
                var resourceRequest = new WLResourceRequest("/adapters/repossessionBidder/bidder/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.dataToSendArrBidder).then($rootScope.syncBidderSuccess, $rootScope.syncBidderFail);


            }).fail(function(errorObject) {

                $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
                //$scope.hideLoading();
            });

        }
        $rootScope.syncBidderSuccess = function(response) {
        	for(var i=0;i<response.responseJSON.length;i++)
            {
            if (response.responseJSON[i].responseCode == "102") {
                //				        	  sso
                //$scope.hideLoading();
               // $scope.savAndLogout();
                return;
              } else if (response.responseJSON[i].responseCode == "120") {
                   $rootScope.showAlert("" + AlertMessages.bidderInProgress, "" + AlertMessages.alertTitile);
                                     //return;
              }else if (response.responseJSON[i].responseCode == "101") {
                //				        	  fail
               // $scope.hideLoading();
                $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                return;
            } else if (response.responseJSON[i].responseCode == "200") {


            console.log("syncList: " + response.responseJSON[i].dto);
           // for (var bidIndex = 0; bidIndex < response.responseJSON[i].dto.length; bidIndex++) {
                if ($rootScope.bidderViewListNotification == 'undefined' || $rootScope.bidderViewListNotification == undefined) {
                    $rootScope.bidderViewListNotification = [];
                }
                var tempval1 = response.responseJSON[i].dto.repossessionId;
                var array1 = $rootScope.bidderViewListNotification[tempval1];
                if (array1 == undefined) {
                    $rootScope.bidderViewListNotification[tempval1] = [];
                }
                $rootScope.bidderViewListNotification[tempval1].push(response.responseJSON[i].dto);
                if($rootScope.bidderViewList[tempval1] == undefined){
                    $rootScope.bidderViewList[tempval1] = [];
                }
                    $rootScope.bidderViewList[tempval1].push(response.responseJSON[i].dto);


            }



            // now remove this db coz all data synced
            WL.JSONStore.get(BIDDER_REPOSSESSION_SYNC)
                .remove($scope.bidderDbIdArray, {})
                .then(function(numberOfDocumentsRemoved) {

                    //alert("numberOfDocumentsRemoved: "+numberOfDocumentsRemoved);
                    var iddd = {};

                    iddd.bidderId = '';
                    $scope.arrayBidderToDeleteinReject = [];
                    $scope.arrayBidderToDeleteinReject.push(iddd);

                    WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                        .remove($scope.arrayBidderToDeleteinReject, {})
                        .then(function(numberOfDocumentsRemoved) {
                            //handle success


                            WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                                .add(response.responseJSON[i].dto, {})
                                .then(function(numberOfDocumentsAdded) {
                                    //handle success




                                   // $scope.hideLoading();
                                    $rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);

                                }).fail(function(errorObject) {
                                    //handle failure
                                  //  $scope.hideLoading();
                                    $rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);
                                });


                        }).fail(function(errorObject) {
                            //handle failure
                           // $scope.hideLoading();
                            $rootScope.showAlert("" + AlertMessages.syncSuccessfullycmpltd, "" + AlertMessages.alertTitile);
                        });


                    //handle success


                })
                .fail(function(errorObject) {
                    //handle failure
                    //$scope.hideLoading();
                    $rootScope.showAlert("" + AlertMessages.detelefailedButsynced, "" + AlertMessages.alertTitile);
                });

             }
            };
        
        $rootScope.syncBidderFail = function(error) {
        	if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
               // $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
                $rootScope.sessionTimeOutMessage();
                return;
            }
            $rootScope.showAlert(""+AlertMessages.failed_To_sync, "" + AlertMessages.alertTitile);
            //$scope.hideLoading();
        };


        $rootScope.showNothingToSync = function() {
            if (!$rootScope.isDataForSync) {

                $rootScope.showAlert("" + AlertMessages.nothing_To_sync, "" + AlertMessages.alertTitile);

            } else {
                $rootScope.isDataForSync = false;
            }


        };


        if (WL.Client.Push) {
            WL.Client.Push.onReadyToSubscribe = function() {

                /*WL.SimpleDialog.show("Push Notifications", "onReadyToSubscribe", [ {
                    text : 'Close',
                    handler : function() {}
                  }
                  ]);*/


                WL.Client.Push.registerEventSourceCallback(
                    "myPush",
                    "PushAdapter",
                    "PushEventSource",
                    pushNotificationReceived);


                doSubscribe();
            };
        }
        //--------------------------------- Subscribe ------------------------------------
        function doSubscribe() {
            WL.Client.Push.subscribe("myPush", {
                onSuccess: doSubscribeSuccess,
                onFailure: doSubscribeFailure
            });
        }

        function doSubscribeSuccess() {
            /*WL.SimpleDialog.show("Push Notifications", "doSubscribeSuccess", [ {
                text : 'Close',
                handler : function() {}
              }
              ]);*/

        }

        function doSubscribeFailure() {
            /*WL.SimpleDialog.show("Push Notifications", "doSubscribeFailure", [ {
                text : 'Close',
                handler : function() {}
              }
              ]);*/
        }

var pushNotiCountRec=0;
var myPopupPushNotiShow;
        //------------------------------- Handle received notification ---------------------------------------
        function pushNotificationReceived(props, payload) {
/*pushNotiCountRec = pushNotiCountRec + 1;
if(pushNotiCountRec > 1){
return;
}*/
                                     
            var userLang = WL.App.getDeviceLanguage();
            var isIOS = ionic.Platform.isIOS();

            if (isIOS) {
                WL.Badge.setNumber(0);
                var messageShow = props.alert.body;

            } else {

                var messageShow = props.alert;

            }
              //messageShowPrs = JSON.parse(messageShow)
                                      var payloadMsg = JSON.parse(payload.custom);
                                     if(userLang == "en"){
                                     messageShow = payloadMsg.notificationMessages.en_message
                                     }else{
                                     messageShow = payloadMsg.notificationMessages.vi_message
                                     }
            // FOR updating status of termination & repossesion - starts
           
                                     
            var statusObj = {
                "contractId": payloadMsg.contractId,
                "status": payloadMsg.status,
            }
            var type = payloadMsg.type;
            var arrName = '';

            $rootScope.contractTypeNotificationBool = false;
            $rootScope.informationTypeNotificationBool = false;

            if (type == "INFORMATION"){
            	$rootScope.informationTypeNotificationBool = true;
                $rootScope.contractTypeNotificationBool = false;

            	
            }else if (type == "CONTRACT REPOSSESSION"){
            	
            	 $rootScope.contractTypeNotificationBool = true;
                 $rootScope.informationTypeNotificationBool = false;
            }
            
            
            
            if (type == "CONTRACT TERMINATION") {
            	$rootScope.contractTypeNotificationBool = true;

                arrName = $rootScope.terminationStatusArr;

            } else if (type == "BIDDER") {
            	$rootScope.contractTypeNotificationBool = true;
            if(userLang == "en"){
                statusObj = {
                    "bidderId": payloadMsg.id,
                    "status": payloadMsg.status,
                    "notificationMessages": payloadMsg.notificationMessages.en_message,
                  }
                }else{
                        statusObj = {
                                     "bidderId": payloadMsg.id,
                                     "status": payloadMsg.status,
                                     "notificationMessages": payloadMsg.notificationMessages.vi_message,
                               }
                }

                arrName = $rootScope.bidderStatusArr;


                var arr = $rootScope.bidderViewList[payloadMsg.other.repossession];
                for (var k= 0; k< arr.length; k++){
                    if(arr[k].bidderId  == payloadMsg.id){
                        arr[k].status = payloadMsg.status;
                    }
                }
                $rootScope.bidderViewList[payloadMsg.other.repossession] = arr;

                deleteBidders(payloadMsg.other.repossession, payloadMsg.id, payloadMsg.status);
            } else {
            	
                arrName = $rootScope.repossessionStatusArr;
                if($rootScope.statusMapRepo[payloadMsg.contractId] == undefined){

                     $rootScope.statusMapRepo[payloadMsg.contractId] = {};
                }
                $rootScope.statusMapRepo[payloadMsg.contractId][payloadMsg.id] = payloadMsg;

            }
            if (arrName.length == 0) {
                arrName.push(statusObj);
            }
            var found = 0;
            for (var j = 0; j < arrName.length; j++) {

                if (type == "CONTRACT TERMINATION" || type == "CONTRACT REPOSSESSION" ) {

                    if (arrName[j].contractId == statusObj.contractId) {
                        found = 1;
                        arrName[j].status = statusObj.status;
                        break;
                    }
                } else if (type == "BIDDER") {

                    if (arrName[j].bidderId == statusObj.bidderId) {
                        found = 1;
                        arrName[j].status = statusObj.status;
                        arrName[j].notificationMessages = statusObj.notificationMessages;


                        break;
                    }
                }

            }
            if (found == 0) {
                arrName.push(statusObj);
            }

            // FOR updating status of termination & repossesion  - ends




           /* navigator.notification.confirm(messageShow, // message
                alertDismissedNoti, // callback
                "OnMove", // title
                Messages.okButton // buttonName
            );*/
            // start of popup code

            try{
             myPopupPushNotiShow.close();
            }catch(e){
            	$exceptionHandler(e, " ");
            }

            myPopupPushNotiShow = $ionicPopup.show({
                                             title: 'OnMove',
                                             subTitle: messageShow,
                                             scope: $scope,
                                             cssClass: 'pushTitle pushSubTitle',
                                             buttons: [
                                             { text: $scope.cancelButton,
                                                                                  onTap: function(e) {

                                                                                myPopupPushNotiShow.close();
                                                                                 }
                                                                                  },
                                                 {
                                                   text: Messages.okButton,
                                                   type: 'button',
                                                      onTap: function(e) {
                                                            myPopupPushNotiShow.close();
                                                                $scope.alertDismissedNoti(1);
                                                      }
                                                }
                                             ]
                                          });
                                          // end of popup code

            $scope.alertDismissedNoti = function(param) {

            pushNotiCountRec=0;
            	 if ( $ionicSideMenuDelegate.isOpenLeft() ) {
                     $ionicSideMenuDelegate.toggleLeft();
                   }
            	 
                if (ionic.Platform.isIOS()) {
                    WL.Badge.setNumber(0);
                }
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });

                if (WL.Client.isUserAuthenticated('FeCreditAppRealm') === true) {
                	if(param == 1){
                		$state.go('fECREDIT.notification');

                	}
                } else {
                    $state.go('login');
                }
                myPopupPushNotiShow.close();
            }
        }

        function deleteBidders(repossId, bidderId, status) {

            if (status === "REJECT") {

                /*delete this bidder from list*/

                if ($rootScope.bidderViewList != undefined) {
                    $scope.bidderList = $rootScope.bidderViewList[repossId];
                } else {
                    $scope.bidderList = [];
                }



                if ($scope.bidderList == undefined || $scope.bidderList == 'undefined' || $scope.bidderList == null) {
                    $scope.bidderList = [];
                }
                $scope.tempBidderList = [];

                for (var bidlistInd = 0; bidlistInd < $scope.bidderList.length; bidlistInd++) {

                    if (("" + $scope.bidderList[bidlistInd].bidderId) != ("" + bidderId)) {
                        $scope.tempBidderList.push($scope.bidderList[bidlistInd]);
                    }
                }
                $rootScope.bidderViewList[repossId] = $scope.tempBidderList;
                var iddd = {};

                iddd.bidderId = bidderId;
                $scope.arrayBidderToDeleteinReject = [];
                $scope.arrayBidderToDeleteinReject.push(iddd);

                WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                    .remove($scope.arrayBidderToDeleteinReject, {})
                    .then(function(numberOfDocumentsRemoved) {
                        //handle success




                        //$scope.hideLoading();
                        // $state.go('fECREDIT.repossession');
                    }).fail(function(errorObject) {
                        //handle failure
                        //$state.go('fECREDIT.repossession');
                    });


            } else if (status == "APPROVED" || status == "INPROGRESS") {

                /*delete other bidders from list and local database*/

                if ($rootScope.bidderViewList != undefined) {
                    $scope.bidderList = $rootScope.bidderViewList[repossId];
                } else {
                    $scope.bidderList = [];
                }



                if ($scope.bidderList == undefined || $scope.bidderList == 'undefined' || $scope.bidderList == null) {
                    $scope.bidderList = [];
                }
                $scope.tempBidderList = [];

                for (var bidlistInd = 0; bidlistInd < $scope.bidderList.length; bidlistInd++) {

                    if ($scope.bidderList[bidlistInd].bidderId == bidderId) {
                        $scope.tempBidderList.push($scope.bidderList[bidlistInd]);
                    }
                }
                $rootScope.bidderViewList[repossId] = $scope.tempBidderList;


                $scope.arrayBidderToDelete = [{
                    repossessionId: repossId
                }]


                var repossId = repossId;

                /*;----------------------------------------------------------------;*/
                var dataToAdd;
                var list = [];
                WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                    .find($scope.arrayBidderToDelete).then(function(res) {




                        for (var tempInd = 0; tempInd < res.length; tempInd++) {
                            if ("" + res[tempInd].json.bidderId == "" + bidderId) {
                                dataToAdd = res[tempInd];
                            } else {
                                var ooobforid = {};
                                ooobforid._id = res[tempInd]._id;
                                list.push(ooobforid);
                            }

                        }
                        WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                            .remove(list, {})
                            .then(function(numberOfDocumentsRemoved) {

                                /* added data here to show only approved*/



                                $rootScope.isBidderNotification = true;
                                $rootScope.newRepossessionId = repossId;
                                var bidderId = bidderId;

                                if ($rootScope.bidderViewList != undefined) {
                                    $rootScope.bidderViewListNotification = $rootScope.bidderViewList;
                                }

                                var dataLocal = $rootScope.bidderViewListNotification[repossId];
                                for (var i = 0; i < dataLocal.length; i++) {
                                    if (bidderId == dataLocal[i].bidderId) {
                                        $rootScope.selectedViewBidder = dataLocal[i];
                                        break;
                                    }

                                }
                                //$state.go('fECREDIT.bidderForm');

                                //$scope.hideLoading();




                                //handle success


                            })
                            .fail(function(errorObject) {
                                //handle failure
                                $rootScope.isBidderNotification = true;
                                var repossId = repossId;
                                $rootScope.newRepossessionId = repossId;
                                var bidderId = bidderId;

                                if ($rootScope.bidderViewList != undefined) {
                                    $rootScope.bidderViewListNotification = $rootScope.bidderViewList;
                                }
                                var dataLocal = $rootScope.bidderViewListNotification[repossId];
                                for (var i = 0; i < dataLocal.length; i++) {
                                    if (bidderId == dataLocal[i].bidderId) {
                                        $rootScope.selectedViewBidder = dataLocal[i];
                                        break;
                                    }

                                }
                                // $state.go('fECREDIT.bidderForm');
                                //$scope.hideLoading();
                            });

                    })
                    .fail(function(errobject) {
                        WL.Logger.debug(errobject.toString());
                    });
                /*::-------------------------------------------------------------:*/


            }
        }
    }
]);