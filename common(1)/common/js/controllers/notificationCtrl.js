/* JavaScript content from js/controllers/notificationCtrl.js in folder common */
FeCreditApp.controller('notificationCtrl', ['$scope', '$stateParams', '$ionicNavBarDelegate', '$ionicLoading', '$rootScope', '$state', '$ionicScrollDelegate', '$ionicPopup', '$filter', '$timeout', 'utilFactory','$exceptionHandler',// The following is

    // the constructor
    // function for this
    // page's
    // controller. See
    // https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this
    // function
    // TIP: Access Route Parameters for your page via
    // $stateParams.parameterName
    function($scope, $stateParams, $ionicNavBarDelegate, $ionicLoading, $rootScope, $state, $ionicScrollDelegate, $ionicPopup, $filter, $timeout, utilFactory,$exceptionHandler ) {
        $ionicNavBarDelegate.showBackButton(false);




        $scope.$on("$ionicView.enter", function(event, data) {
            $scope.readUIDList = [];
            $scope.noDataFound = true;
            $scope.cancelButton = Messages.cancelButton;
            $scope.footerCT = Messages.footerCT;
            $scope.notification_approved = Messages.notification_approved;
            $scope.notification_message = Messages.notification_message;
            $scope.notification_DON = Messages.notification_DON;
            $scope.title_message = Messages.title_message;
            $scope.notification_SenderName = Messages.notification_SenderName;
            $scope.notification_Email = Messages.notification_Email;
            $scope.contractIdStr = Messages.contractId;
            $scope.notification_Title = Messages.notification_Title;
            $scope.information = Messages.information;
            $scope.document = Messages.document;
            $scope.searchBtnNoti = Messages.searchBtn;
            $scope.searchTextBlack = false;
            $scope.statusTitle = Messages.status;
            
            $scope.contractHeader = Messages.contractHeader;
            $scope.noNotification = Messages.noNotification;
            $scope.isSearchSelected = false;

            $scope.notificationList = [];
            $ionicScrollDelegate.scrollTop();
            clearDataType();

            $rootScope.notificationPopUpDropDownMessageHide = false;
            $rootScope.notificationPopUpDropDownContractHide = true;

            if ($rootScope.deviceLang == 'vi') {

                $scope.cnclButtonViet = true;

            }


            if ($rootScope.informationTypeNotificationBool == true || $rootScope.informationNotificationBool == true) {
                $scope.notificationType = "INFORMATION";
                            $rootScope.notificationPopUpDropDownMessageHide = false;
                            $rootScope.notificationPopUpDropDownContractHide = true;
                clearDataType();

                $scope.showcontract = true;
                $scope.showmessage = false;
                $scope.btnOneSelected = false;
                $scope.btnThreeSelected = true;
                $scope.btnFourSelected = false;

                $scope.getNotificationsFromServer();

            } else if ($rootScope.contractTypeNotificationBool == true || $rootScope.contractNotificationBool == true) {

                $scope.notificationType = "CONTRACT";
                            $rootScope.notificationPopUpDropDownMessageHide = true;
                            $rootScope.notificationPopUpDropDownContractHide = false;
                clearDataType();
                $scope.showcontract = false;
                $scope.showmessage = true;
                $scope.btnOneSelected = false;
                $scope.btnThreeSelected = false;
                $scope.btnFourSelected = true;
                $scope.getNotificationsFromServer();

            } else {
                $scope.notificationType = "DOCUMENT";
                            $rootScope.notificationPopUpDropDownMessageHide = false;
                            $rootScope.notificationPopUpDropDownContractHide = true;
                clearDataType();
                $scope.showcontract = true;
                $scope.showmessage = false;
                $scope.btnOneSelected = true;
                $scope.btnThreeSelected = false;
                $scope.btnFourSelected = false;
                $scope.getNotificationsFromServer();

            }

            $timeout($scope.saveForofflinecont, 2000);


        });

        var ctrl = this;


        $scope.saveForofflinecont = function() {

            try {

                WL.JSONStore.get("readUIDList").findAll().then(
                    function(readUIDList) {
                        // handle success
//                        console.log("readUIDList-length: " + readUIDList.length);
//                        console.log("readUIDList-All: " + JSON.stringify(readUIDList));
                        $scope.readUIDList = [];
                        if (readUIDList.length > 0) {

                        for(var roller=0; roller < readUIDList.length; roller++){
                        var singleObjList = readUIDList[roller].json.list;


                        for(var rollerChild=0; singleObjList != undefined && rollerChild < singleObjList.length; rollerChild++){
                        $scope.readUIDList.push(singleObjList[rollerChild]);
                        }


                        }
                        if ($scope.readUIDList.length > 0) {
                                                                                $scope.readService($scope.readUIDList);
                                                                            }

                        }

                    // console.log("$scope.readUIDList-All: " + JSON.stringify($scope.readUIDList));

                    }).fail(function(error) {
                    // handle failure
                    $scope.readUIDList = [];
                    console.log("readUIDList-findAll failed");
                });
            } catch (e) {
            	$exceptionHandler(e, " ");
                //                                                 console.log("readUIDList-findAll Exception: "+JSON.stringify(e));
            }




        }


        $rootScope.docCount = '0';
        $rootScope.informationCount = '0';
        $rootScope.ContractCount = '0';
        $scope.readUIDList = [];
        //        $rootScope.document='Document';
        //        $rootScope.information='Information';
        //        $rootScope.contract='Contract';




        ctrl.handleScrollToTop = function() {
            //alert("TOP!");
        };

        ctrl.handleScrollToBottom = function() {
           // console.log("BOTTOM!");
        };

        $rootScope.topScrolled = function() {

            //        								alert("toppyyyyyyyyyyyyyyppp");

        };




        $scope.setCurrentPage = function(currentPage) {
            $scope.currentPage = currentPage;
        }

        $scope.getNumberAsArray = function(num) {
            return new Array(num);
        };

        $scope.numberOfPages = function() {
            return Math.ceil($scope.notificationsData.length / $scope.pageSize);
        };




        $scope.notificationChanged = function(opt) {

            $scope.searchBtnNoti = Messages.searchBtn;
            $scope.searchTextBlack = false;
            $scope.isSearchSelected = false;

            $scope.isSearchSelected = false;
            if (opt == 1) {
                clearDataType();
                $scope.btnOneSelected = true;
                $scope.btnTwoSelected = false;
                $scope.btnThreeSelected = false;
                $scope.btnFourSelected = false;
                $scope.showcontract = true;
                $scope.showmessage = false;
                $rootScope.notificationPopUpDropDownContractHide = true;
                $rootScope.notificationPopUpDropDownMessageHide = false;
                $scope.notificationType = "DOCUMENT";
                $scope.getNotificationsFromServer();

            } else if (opt == 2) {
                clearDataType();
                $scope.btnOneSelected = false;
                $scope.btnTwoSelected = true;
                $scope.btnThreeSelected = false;
                $scope.btnFourSelected = false;
                $rootScope.notificationPopUpDropDownContractHide = true;
                $rootScope.notificationPopUpDropDownMessageHide = false;
                $scope.notificationType = "TEMPLATE";
                $scope.getNotificationsFromServer();
            } else if (opt == 3) {
                clearDataType();
                $scope.btnOneSelected = false;
                $scope.btnTwoSelected = false;
                $scope.btnThreeSelected = true;
                $scope.btnFourSelected = false;
                $scope.showcontract = true;
                $scope.showmessage = false;
                $rootScope.notificationPopUpDropDownContractHide = true;
                $rootScope.notificationPopUpDropDownMessageHide = false;
                $scope.notificationType = "INFORMATION";
                $scope.getNotificationsFromServer();
            } else if (opt == 4) {
                clearDataType();
                $scope.btnOneSelected = false;
                $scope.btnTwoSelected = false;
                $scope.btnThreeSelected = false;
                $scope.btnFourSelected = true;
                $scope.showcontract = false;
                $scope.showmessage = true;
                $rootScope.notificationPopUpDropDownMessageHide = true;
                $rootScope.notificationPopUpDropDownContractHide = false;
                $scope.notificationType = "CONTRACT";
                $scope.getNotificationsFromServer();

            }




        };


        $rootScope.bottomScrolled = function() {
            //             $scope.showLoading();
            //			if ($scope.serviceCalled) {

            //                 setTimeout(function() { $scope.hideLoading(); }, 2000);
            if ($scope.isSearchSelected) {

                $scope.totalCount = $scope.searchTotalCount;
            } else {

                if ($scope.notificationType === "DOCUMENT") {
                    $scope.totalCount = $scope.totalCount_Attach;
                } else if ($scope.notificationType === "TEMPLATE") {
                    $scope.totalCount = $scope.totalCount_Temp;
                } else if ($scope.notificationType === "INFORMATION") {
                    $scope.totalCount = $scope.totalCount_Info;
                } else if ($scope.notificationType === "CONTRACT") {
                    $scope.totalCount = $scope.totalCount_Cont;
                }
            }


            if($scope.notificationList == undefined || $scope.notificationList == null){
            	$scope.notificationList = [];
            	}

            if ($scope.totalItemToShow < $scope.notificationList.length) {
                $scope.currentPage = $scope.currentPage + 1;
                $scope.totalItemToShow = ($scope.pageSize) * ($scope.currentPage);
            } else if ($scope.notificationList.length < $scope.totalCount) {
                //				service call
                //                alert("Service call");
                $scope.currentPage = $scope.currentPage + 1;
                $scope.totalItemToShow = ($scope.pageSize) * ($scope.currentPage);
                if ($scope.isSearchSelected && $rootScope.isInternetConnected()) {
                    //                call searcg service pagination.
                    $scope.searchPageIndex = $scope.notificationList.length / 10 + 1;
                    if ($scope.notificationList.length < $scope.searchTotalCount && $scope.notificationList.length >= 10) {
                        $scope.search_ServiceCall(true, '', ''); // isPaginated: true if called from search pagination
                    }


                } else if ($scope.isSearchSelected != true) {
                    $scope.getNotificationsFromServer(true, (($scope.notificationList.length / 10) + 1));


                }

            }
            //			}

        };




        function clearDataType() {
            $scope.startIndex = null;
            $scope.fromDate = null;
            $scope.toDate = null;
            $scope.contractId = null;
            $scope.customerName = null;
            $scope.title = null;
            $scope.message = null;
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.totalItemToShow = 10;
            $scope.serviceCalled = true;
            $scope.switchValue = 0;
            $scope.filterTapped = false
        }




        $scope.$on('$ionicView.leave', function() {
            $scope.noDataFound = true;

            $rootScope.contractTypeNotificationBool = false;
            $rootScope.informationTypeNotificationBool = false;



            var rUidListObj = {
                    list: $scope.readUIDList
                };

            if($scope.readUIDList.length > 0){
            WL.JSONStore.get("readUIDList").add(rUidListObj).then(
                function(rr) {
                    // handle success
                   // console.log("readUIDList-added successfully: " + JSON.stringify(rUidListObj));

                }).fail(function(error) {
                // handle failure
              //  console.log("readUIDList-added failed: " + JSON.stringify(error));
                //                                    console.log("readUIDList-added failed"+JSON.stringify($scope.readUIDList));
            });}

        });



        $rootScope.searchNotification = function() {


            var myPopupNotification = $ionicPopup.show({

                title: '<input type="password" ng-model="data.wifi">',
                templateUrl: 'templates/notificationPopUp.html',
                cssClass: 'Notificationpop',
                /*scope: $rootScope,*/


            });




            $rootScope.closebuttonNotification = function() {

                myPopupNotification.close();


            }



            $rootScope.NotificationSearchClick = function() {

                $scope.customerName=null;
                $scope.title=null;
                $scope.message=null;
                $scope.contractId=null;

                var d1 = $("#Fromdatetimepicker").val();
                var d2 = $("#TOdatetimepicker").val();
                var searchKeyNoti = $("#notiSearch").val();



                if (d2 < d1) {

                    $rootScope.showAlert(""+AlertMessages.messge_ToDate);

                    return;

                } else {
                $scope.customerName=null;
                $scope.title=null;
                $scope.message=null;
                $scope.contractId=null;

                    if (true) { /*$rootScope.isInternetConnected()*/
                        if (searchKeyNoti != '' &&
                            $scope.filterTapped) {
                            switch ($scope.switchValue) {
                                case 1:

                                    $scope.contractId = searchKeyNoti;
                                    break;
                                case 2:

                                    $scope.customerName = searchKeyNoti;
                                    break;
                                case 3:

                                    $scope.message = searchKeyNoti;
                                    break;
                                case 4:
                                    $scope.title = searchKeyNoti;
                                    break;
                                default:

                            }
                        }


                                        if($scope.title==null && $scope.message == null && $scope.contractId == null && $scope.customerName == null){
                                        $rootScope.showAlert(AlertMessages.searchKey+"", "" + AlertMessages.alertTitile);
                                        return;
                                        }else{
                                        $scope.search_ServiceCall(false, d1, d2); // isPaginated: false if called from search click
                                        }


                    } else {
                        //                                                    checkyour Internet connection
                        $rootScope.showAlert("" + AlertMessages.networkReq, "" + AlertMessages.alertTitile);
                    }

                    //                                                $scope.getNotificationsFromServer();
                    myPopupNotification.close();
                }

                // $scope.getNotificationsFromServer();


                //  myPopupNotification.close();


            }



            $rootScope.NotificationformulaSelected = function(formulaSelected, id) {
                $scope.switchValue = id;

                id = "#filt" + id;


                $(".Notificationadvancels").removeClass('filterSelected');

                if ($(id).hasClass('filterSelected')) {
                    $(id).removeClass('filterSelected');
                    $scope.filterTapped = false;
                } else {
                    $(id).addClass('filterSelected');
                    $scope.filterTapped = true;

                }



            }



            $rootScope.noticationSerachHideShow = function() {


                $rootScope.notificationdropdownview = $rootScope.notificationdropdownview ? false : true;



            }




        }




        $scope.readService = function(uId) {

            $scope.readUnreadReqObject = {

                "readId": uId


            };




            if ($rootScope.isInternetConnected()) {


                var resourceRequest = new WLResourceRequest("/adapters/dsaNotification/dsa-notification/update", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.readUnreadReqObject).then($scope.readSuccess, $scope.readFailure);



            }

        };


        $scope.readSuccess = function(response) {
                        //console.log("Response-readSucc: "+JSON.stringify(response));
            if (response.status == 200 && response.responseJSON.responseCode == '200') {

                //update unread count

                $rootScope.docCount = response.responseJSON.body.unreadCount.document;
                $rootScope.informationCount = response.responseJSON.body.unreadCount.information;
                $rootScope.ContractCount = response.responseJSON.body.unreadCount.bidder + response.responseJSON.body.unreadCount.repossession + response.responseJSON.body.unreadCount.termination;

                try {


                var idQuerryList = [];


                for(var loopCounter=0; loopCounter < $scope.readUIDList.length; loopCounter++){
                var delNotiIdQuery = {
                    _id: 0
                };
                delNotiIdQuery._id = loopCounter+1;
                    idQuerryList.push(delNotiIdQuery);
                }


                $scope.readUIDList = [];

                    WL.JSONStore.get('readUIDList')
                        .remove(idQuerryList)
                        .then(function(numberOfDocumentsRemoved) {
                            //handle success

                        }).fail(function(errorObject) {
                            //handle failure
                            console.log("numberOfDocumentsRemoved-error: "+JSON.stringify(errorObject));
                        });
                } catch (w) {
                	$exceptionHandler(w, " ");
                }

            } else {
                //Handle failure
            }

        }

        $scope.readFailure = function(responseError) {
            console.log("Response-readFail: " + JSON.stringify(responseError));
            if(responseError.errorCode != undefined && responseError.errorCode==="SESSIONTIMEOUT"){
                $rootScope.sessionTimeOutMessage();
                return;
            }

        }


        $rootScope.search_ServiceCall = function(isPaginated, fromDate, toDate) {

            $scope.isSearchSelected = true;
            $scope.searchBtnNoti = "";
            $scope.searchTextBlack = true;

            if (isPaginated) {
                if ($scope.notificationList.length >= 10 && $scope.searchPageIndex >= 1) {
                    $scope.searchReqObject.startIndex = $scope.searchPageIndex;



                }
            } else {
                $scope.searchReqObject = {
                    "startIndex": null,
                    "fromDate": $filter('date')(fromDate, 'yyyy-MM-dd'),
                    "toDate": $filter('date')(toDate, 'yyyy-MM-dd'),
                    "notificationType": "" + $scope.notificationType,
                    "contractId": null,
                    "customerName": null,
                    "title": null,
                    "message": null

                };


                if ($scope.btnFourSelected == true) {
                    if ($scope.contractId != null) {
                        $scope.searchReqObject.contractId = "" + $scope.contractId;
                        $scope.searchBtnNoti = "" + $scope.contractId;
                    }
                    if ($scope.customerName != null) {
                        $scope.searchReqObject.customerName = "" + (""+utilFactory.removeDiacritics(""+$scope.customerName)).toLowerCase();
                        $scope.searchBtnNoti = "" + $scope.customerName;
                    }
                } else {

                    if ($scope.title != null) {
                        $scope.searchReqObject.title = "" + (""+utilFactory.removeDiacritics(""+$scope.title)).toLowerCase();
                        $scope.searchBtnNoti = "" + $scope.title;
                    }
                    if ($scope.message != null) {

                        $scope.searchReqObject.message = "" + (""+utilFactory.removeDiacritics(""+$scope.message)).toLowerCase();
                        $scope.searchBtnNoti = "" + $scope.message;
                    }

                }
            }


            if ($rootScope.isInternetConnected()) {
                $scope.showLoading();

                if($scope.readUIDList != undefined && $scope.readUIDList.length > 0){
                                $scope.searchReqObject.readId = $scope.readUIDList;
                                }else{
                                 $scope.searchReqObject.readId = [];
                                }

                var resourceRequest = new WLResourceRequest("/adapters/dsaNotification/dsa-notification/get", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.searchReqObject).then($scope.getNotificationSearchSuccess, $scope.getNotificationSearchFailure);
            } else if (isPaginated != true) {

                //                                                search from offline data
                $scope.searchOffline('' + $scope.searchBtnNoti);
            }


        };

        $scope.getNotificationSearchSuccess = function(response) {
            $scope.hideLoading();


            if (response.status == 102) {

                $scope.savAndLogout();
                return;

            } else if (response.status == 101) {

                $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                return;

            } else if (response.status == 200  && response.responseJSON.responseCode == '200') {


            try{
                            $rootScope.docCount = response.responseJSON.dto.unreadCount.document;
                            $rootScope.informationCount = response.responseJSON.dto.unreadCount.information;
                            $rootScope.ContractCount = response.responseJSON.dto.unreadCount.bidder + response.responseJSON.dto.unreadCount.repossession + response.responseJSON.dto.unreadCount.termination;
            }catch(e){
            	$exceptionHandler(e, " ");
            console.log(JSON.stringify(e));
            }

                if ($scope.searchReqObject.startIndex == null) {
                    $scope.notificationList = [];

                    $scope.notificationList = response.responseJSON.dto.notifications;
                    for (var i = 0; i < ($scope.notificationList).length; i++) {
                    try{
                        $scope.notificationList[i].collectionDescription = JSON.parse($scope.notificationList[i].collectionDescription); // parsing description to make object
                    }catch(e){
                    console.log("e"+e);
                    }
                    }

                } else {
                    $scope.notificaTempList = response.responseJSON.dto.notifications;
                    for (var i = 0; i < ($scope.notificaTempList).length; i++) {
                    try{
                                            $scope.notificaTempList[i].collectionDescription = JSON.parse($scope.notificaTempList[i].collectionDescription); // parsing description to make object

                    }catch(e){
                        console.log("e"+e)
                    }
                    }

                    $scope.notificationList = $scope.notificationList.concat($scope.notificaTempList);
                }


                $scope.searchTotalCount = response.responseJSON.dto.count;
                if ($scope.notificationList.length == 0) {
                    $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);
                    $scope.noDataFound = false;
                    $rootScope.totalItemToShow = 0;
                } else {



                    $scope.noDataFound = true;
                    //             $rootScope.totalItemToShow = $scope.notificationList.length;
                    $rootScope.totalItemToShow = $scope.searchTotalCount;
                }
                $ionicScrollDelegate.scrollTop();

            }
        };

        $scope.getNotificationSearchFailure = function(errorResponse) {
            $scope.hideLoading();
            
            if(errorResponse.errorCode != undefined && errorResponse.errorCode==="SESSIONTIMEOUT"){
                $rootScope.sessionTimeOutMessage();
                return;
            }
            //                                                search from offline data
            $scope.searchOffline('' + $scope.searchBtnNoti);
            $ionicScrollDelegate.scrollTop();
            //            $rootScope.showAlert("" + AlertMessages.gettingServerData, "" + AlertMessages.alertTitile);
        };




        $scope.getNotificationsFromServer = function(isPagination, startIndex) {



            if (isPagination === true) {
                $scope.isCopy = true;
                //called for paging, so change the request and other parameters
                $scope.tempObject = {
                    "notificationType": $scope.notificationType,
                    "startIndex": startIndex
                };
            } else {
                $scope.isCopy = false;
                $scope.noDataFound = true;
                $scope.tempObject = {
                    "notificationType": $scope.notificationType
                };

            }




            if ($rootScope.isInternetConnected()) {
                $scope.showLoading();

                if($scope.readUIDList != undefined && $scope.readUIDList.length > 0){
                $scope.tempObject.readId = $scope.readUIDList;
                }else{
                                                  $scope.tempObject.readId = [];
                                                 }

                var resourceRequest = new WLResourceRequest("/adapters/dsaNotification/dsa-notification/get", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.tempObject).then($scope.getNotificationSuccess, $scope.getNotificationFailure);
            } else {
                //$rootScope.showAlert("" + AlertMessages.isInternet, "" + AlertMessages.alertTitile);
                // load from offline saved data
                $scope.fetchSavedNotifications();
            }
        };




        $scope.getNotificationSuccess = function(response) {


            $scope.hideLoading();

            if (response.status == 200 && response.responseJSON.responseCode === '102') {

                $scope.savAndLogout();
                return;

            } else if (response.status == 200 && response.responseJSON.responseCode != '200') {
                $scope.fetchSavedNotifications();
                $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                return;

            } else if (response.status == 200 && response.responseJSON.responseCode == '200') {
                //console.log("responseJSON: "+JSON.stringify(response.responseJSON));

                $rootScope.docCount = response.responseJSON.dto.unreadCount.document;
                $rootScope.informationCount = response.responseJSON.dto.unreadCount.information;
                $rootScope.ContractCount = response.responseJSON.dto.unreadCount.bidder + response.responseJSON.dto.unreadCount.repossession + response.responseJSON.dto.unreadCount.termination;


                //        $rootScope.document = $rootScope.document+""+$rootScope.docCount;
                //        $rootScope.information = $rootScope.information + "" + $rootScope.informationCount;
                //        $rootScope.contract = $rootScope.contract + "" + $rootScope.ContractCount;

                if ($scope.notificationType === "DOCUMENT") {
                    $scope.totalCount_Attach = response.responseJSON.dto.count;
                } else if ($scope.notificationType === "TEMPLATE") {
                    $scope.totalCount_Temp = response.responseJSON.dto.count;
                } else if ($scope.notificationType === "INFORMATION") {
                    $scope.totalCount_Info = response.responseJSON.dto.count;
                } else if ($scope.notificationType === "CONTRACT") {
                    $scope.totalCount_Cont = response.responseJSON.dto.count;
                }




                var notiData = response.responseJSON.dto.notifications;
                
                for (var i = 0; i < notiData.length; i++) {
                try{
                    notiData[i].collectionDescription = JSON.parse(notiData[i].collectionDescription);
                    }catch(e){


                    }
// for type
                    if(notiData[i].collectionDescription.type == "CONTRACT TERMINATION"){
                         notiData[i].collectionDescription.typeViet = ""+Messages.statusTermination;
                    }else if(notiData[i].collectionDescription.type == "CONTRACT REPOSSESSION"){
                        notiData[i].collectionDescription.typeViet = ""+Messages.statusRepossession;
                    }else if(notiData[i].collectionDescription.type == "BIDDER"){
                         notiData[i].collectionDescription.typeViet= ""+Messages.bidderStatus;
                    }else if (notiData[i].collectionDescription.type == "INFORMATION"){
                       notiData[i].collectionDescription.typeViet =""+Messages.statusINFO;
                    }else if (notiData[i].collectionDescription.type == "DOCUMENT"){
                      notiData[i].collectionDescription.typeViet= ""+Messages.statusDoc;
                    }else{
                       notiData[i].collectionDescription.typeViet = notiData[i].collectionDescription.type;
                    }



// for status
                     if(notiData[i].collectionDescription.status == "APPROVED"){
                            notiData[i].collectionDescription.statusViet = ""+Messages.statusApproved;
                    }else if(notiData[i].collectionDescription.status == "INPROGRESS"){
                          notiData[i].collectionDescription.statusViet = ""+Messages.statusInprogress;
                      }else if(notiData[i].collectionDescription.status == "REJECTED"){
                             notiData[i].collectionDescription.statusViet= ""+Messages.statusRejected;
                     }else if(notiData[i].collectionDescription.status == "REJECT"){
                       notiData[i].collectionDescription.statusViet = ""+Messages.statusReject;
                    }
                    else{
                         notiData[i].collectionDescription.statusViet = notiData[i].collectionDescription.status;
                     }


            }

                if (response.responseJSON.dto.notifications.length < 10) {
                    $scope.serviceCalled = false;
                }

                if (notiData.length == 0) {

                    if ($scope.isCopy != true) {
                        $scope.notificationList = [];
                        $scope.noDataFound = false;
                    }
                } else {
                    // for saving offline
                    $scope.saveListForOfflineMode(notiData);

                    if ($scope.isCopy == true) {
                        for (var i1 = 0; i1 < notiData.length; i1++) {
                            $scope.notificationList.push(notiData[i1]);
                        }

                    } else {
                        $scope.notificationList = [];
                        $scope.notificationList = notiData;
                    }

                    if ($scope.totalItemToShow > $scope.notificationList.length) {
                        $scope.totalItemToShow = $scope.notificationList.length;
                    }


                }

                $scope.notificationMainList = $scope.notificationList;
            }

        }

        $scope.getNotificationFailure = function(error) {
            $scope.hideLoading();
            if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
                $rootScope.sessionTimeOutMessage();
                return;
            }

            $scope.fetchSavedNotifications();
            $rootScope.showAlert("" + AlertMessages.gettingServerData, "" + AlertMessages.alertTitile);
        }

        $scope.saveListForOfflineMode = function(notiData) {
            if ($scope.notificationType === "DOCUMENT") {
                for (var i = 0; i < notiData.length; i++) {
                    //notiData[i].collectionDescription = JSON.parse(notiData[i].collectionDescription); // parsing collectionDescription to make object



                    if ($rootScope.notificationSaved.length == 0) {

                        $rootScope.notificationSaved.push(notiData[i]);
                    }
                    var found = 0;
                    for (var j = 0; j < $rootScope.notificationSaved.length; j++) {
                        if ($rootScope.notificationSaved[j].uniqueId == notiData[i].uniqueId) {
                            $rootScope.notificationSaved[j].collectionDescription.status = notiData[i].collectionDescription.status;
                            found = 1;
                            break;
                        }

                    }
                    if (found == 0) {
                        $rootScope.notificationSaved.push(notiData[i]);
                    }


                }
            } else if ($scope.notificationType === "TEMPLATE") {

                for (var i = 0; i < notiData.length; i++) {
                   // notiData[i].collectionDescription = JSON.parse(notiData[i].collectionDescription); // parsing description to make object



                    if ($rootScope.notificationSaved2.length == 0) {

                        $rootScope.notificationSaved2.push(notiData[i]);
                    }
                    var found = 0;
                    for (var j = 0; j < $rootScope.notificationSaved2.length; j++) {
                        if ($rootScope.notificationSaved2[j].uniqueId == notiData[i].uniqueId) {
                            $rootScope.notificationSaved2[j].collectionDescription.status = notiData[i].collectionDescription.status;
                            found = 1;
                            break;
                        }

                    }
                    if (found == 0) {
                        $rootScope.notificationSaved2.push(notiData[i]);
                    }


                }
            } else if ($scope.notificationType === "INFORMATION") {
                for (var i = 0; i < notiData.length; i++) {
                  //  notiData[i].collectionDescription = JSON.parse(notiData[i].collectionDescription); // parsing description to make object



                    if ($rootScope.notificationSaved3.length == 0) {

                        $rootScope.notificationSaved3.push(notiData[i]);
                    }
                    var found = 0;
                    for (var j = 0; j < $rootScope.notificationSaved3.length; j++) {
                        if ($rootScope.notificationSaved3[j].uniqueId == notiData[i].uniqueId) {
                            $rootScope.notificationSaved3[j].collectionDescription.status = notiData[i].collectionDescription.status;
                            found = 1;
                            break;
                        }

                    }
                    if (found == 0) {
                        $rootScope.notificationSaved3.push(notiData[i]);
                    }


                }
            } else if ($scope.notificationType === "CONTRACT") {
                for (var i = 0; i < notiData.length; i++) {
                   // notiData[i].collectionDescription = JSON.parse(notiData[i].collectionDescription); // parsing description to make object



                    if ($rootScope.notificationSaved4.length == 0) {

                        $rootScope.notificationSaved4.push(notiData[i]);
                    }
                    var found = 0;
                    for (var j = 0; j < $rootScope.notificationSaved4.length; j++) {
                        if ($rootScope.notificationSaved4[j].uniqueId == notiData[i].uniqueId) {
                            $rootScope.notificationSaved4[j].collectionDescription.status = notiData[i].collectionDescription.status;
                            found = 1;
                            break;
                        }

                    }
                    if (found == 0) {
                        $rootScope.notificationSaved4.push(notiData[i]);
                    }


                }
            }

        }


        $scope.fetchSavedNotifications = function() {

            if ($scope.notificationType === "DOCUMENT") {
                $scope.notificationList = $rootScope.notificationSaved;
            } else if ($scope.notificationType === "TEMPLATE") {
                $scope.notificationList = $rootScope.notificationSaved2;
            } else if ($scope.notificationType === "INFORMATION") {
                $scope.notificationList = $rootScope.notificationSaved3;
            } else if ($scope.notificationType === "CONTRACT") {
                $scope.notificationList = $rootScope.notificationSaved4;
            }

            $scope.notificationMainList = $scope.notificationList;
            if ($scope.notificationList.length == 0) {
                $scope.noDataFound = false;
            }

        }
        $rootScope.statusMap = {};




        $scope.goToTermOrRepos = function(index) {




            if ($scope.notificationList[index].readStatus == false) {

                $scope.notificationList[index].readStatus = true;
                $scope.readUIDList.push($scope.notificationList[index].uniqueId);

                if ($scope.notificationType == "CONTRACT" && $rootScope.ContractCount > 0) {

                    $rootScope.ContractCount = $rootScope.ContractCount - 1;
                    try {
                        $rootScope.notificationSaved4[index].readStatus = true;
                    } catch (e) {
                    	$exceptionHandler(e, " ");
                    }
                } else if ($scope.notificationType == "DOCUMENT" && $rootScope.docCount > 0) {

                    $rootScope.docCount = $rootScope.docCount - 1;
                    try {
                        $rootScope.notificationSaved[index].readStatus = true;
                    } catch (e) {
                    	$exceptionHandler(e, " ");
                    }
                } else if ($scope.notificationType == "INFORMATION" && $rootScope.informationCount > 0) {
                    $rootScope.informationCount = $rootScope.informationCount - 1;
                    try {
                        $rootScope.notificationSaved3[index].readStatus = true;
                    } catch (e) {
                    	$exceptionHandler(e, " ");
                    }
                }

            }
            $scope.readService($scope.readUIDList);


            if ($scope.btnThreeSelected == true) {

                $rootScope.notificationInformation = $scope.notificationList[index];

                //		 $scope.readService($rootScope.notificationInformation.uniqueId);

                $state.go("fECREDIT.notificationDetails");
                return;

            }

            if ($scope.btnOneSelected == true) {
                $rootScope.attachmentAllContactdata = $scope.notificationList[index].attachmentMap;
                $state.go("fECREDIT.openattach");
                $rootScope.comingContractList = false;

                return;

            }




            /* code starts for other notification click*/
            if ($scope.notificationType != "CONTRACT") {


                //$scope.readService();
                return;
            }
            /* code ends for other notification click*/

            var contId = $scope.notificationList[index].collectionDescription.contractId;
            $rootScope.notiContractId = $scope.notificationList[index].collectionDescription.contractId;
            var notiType = $scope.notificationList[index].type;


            $rootScope.terminationSelected = "";
            $rootScope.reposContSelected = "";

            $.each($rootScope.contractList, function(i, v) {

                if (contId == v.json.contractId) {
                    $rootScope.terminationSelected = v.json;
                    $rootScope.reposContSelected = v;
                    return false;
                }

            });
            $rootScope.isRepoClickFromNoti = false;
            $rootScope.isBidderNotification = false;
            $rootScope.terminationSelectedFrom = false;



            if ((notiType == "Contract Termination" || notiType == "CONTRACT TERMINATION") && $rootScope.terminationSelected != "") {
            	$rootScope.comingFromNotification = true;
            	$rootScope.termSelectedFromNoti = true;
                $rootScope.termIdFromNoti = $scope.notificationList[index].collectionDescription.id;
                $state.go('fECREDIT.termination');
            } else if ((notiType == "Contract Repossession" || notiType == "CONTRACT REPOSSESSION") && $rootScope.reposContSelected != "") {
                $rootScope.isRepoClickFromNoti = true;
                $rootScope.ReposSelectedFromNoti = true;
                $rootScope.rejectReposIdNoti = $scope.notificationList[index].collectionDescription.id;
                $rootScope.statusMap[$scope.notificationList[index].collectionDescription.contractId] = $scope.notificationList[index].collectionDescription.status;

                var contId = $scope.notificationList[index].collectionDescription.contractId;
                var reposId = $scope.notificationList[index].collectionDescription.id
                if ($rootScope.statusMapRepo[contId] == undefined) {
                    $rootScope.statusMapRepo[contId] = {};
                }
                $rootScope.statusMapRepo[contId][reposId] = $scope.notificationList[index].collectionDescription;


                $state.go('fECREDIT.repossession');
            } else if ((notiType == "BIDDER" || notiType == "Bidder")) {

                $rootScope.bidderSelectedFromNoti = true;

                $rootScope.bidderStatusFromNoti = $scope.notificationList[index].collectionDescription;


                if ($scope.notificationList[index].collectionDescription.status === "REJECT") {

                    /*delete this bidder from list*/

                    if ($rootScope.bidderViewList != undefined) {
                        $scope.bidderList = $rootScope.bidderViewList[$scope.notificationList[index].collectionDescription.other.repossession];
                    } else {
                        $scope.bidderList = [];
                    }



                    if ($scope.bidderList == undefined || $scope.bidderList == 'undefined' || $scope.bidderList == null) {
                        $scope.bidderList = [];
                    }
                    $scope.tempBidderList = [];

                    for (var bidlistInd = 0; bidlistInd < $scope.bidderList.length; bidlistInd++) {

                        if (("" + $scope.bidderList[bidlistInd].bidderId) != ("" + $scope.notificationList[index].collectionDescription.id)) {
                            $scope.tempBidderList.push($scope.bidderList[bidlistInd]);
                        }
                    }
                    $rootScope.bidderViewList[$scope.notificationList[index].collectionDescription.other.repossession] = $scope.tempBidderList;
                    var iddd = {};

                    iddd.bidderId = $scope.notificationList[index].collectionDescription.id;
                    $scope.arrayBidderToDeleteinReject = [];
                    $scope.arrayBidderToDeleteinReject.push(iddd);

                    WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                        .remove($scope.arrayBidderToDeleteinReject, {})
                        .then(function(numberOfDocumentsRemoved) {
                            //handle success




                            $scope.hideLoading();
                            $state.go('fECREDIT.repossession');
                        }).fail(function(errorObject) {
                            //handle failure
                            $state.go('fECREDIT.repossession');
                        });


                } else if ($scope.notificationList[index].collectionDescription.status == "APPROVED" || $scope.notificationList[index].collectionDescription.status == "INPROGRESS") {

                    /*delete other bidders from list and local database*/

                    if ($rootScope.bidderViewList != undefined) {
                        $scope.bidderList = $rootScope.bidderViewList[$scope.notificationList[index].collectionDescription.other.repossession];
                    } else {
                        $scope.bidderList = [];
                    }



                    if ($scope.bidderList == undefined || $scope.bidderList == 'undefined' || $scope.bidderList == null) {
                        $scope.bidderList = [];
                    }
                    $scope.tempBidderList = [];

                    for (var bidlistInd = 0; bidlistInd < $scope.bidderList.length; bidlistInd++) {

                        if ($scope.bidderList[bidlistInd].bidderId == $scope.notificationList[index].collectionDescription.id) {
                            $scope.tempBidderList.push($scope.bidderList[bidlistInd]);
                        }
                    }
                    $rootScope.bidderViewList[$scope.notificationList[index].collectionDescription.other.repossession] = $scope.tempBidderList;


                    $scope.arrayBidderToDelete = [{
                        repossessionId: $scope.notificationList[index].collectionDescription.other.repossession
                    }]


                    var repossId = $scope.notificationList[index].collectionDescription.other.repossession;

                    /*;----------------------------------------------------------------;*/
                    var dataToAdd;
                    var list = [];
                    WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                        .find($scope.arrayBidderToDelete).then(function(res) {




                            for (var tempInd = 0; tempInd < res.length; tempInd++) {
                                if ("" + res[tempInd].json.bidderId == "" + $scope.notificationList[index].collectionDescription.id) {
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
                                    var bidderId = $scope.notificationList[index].collectionDescription.id;

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
                                    $state.go('fECREDIT.bidderForm');

                                    $scope.hideLoading();




                                    //handle success


                                })
                                .fail(function(errorObject) {
                                    //handle failure
                                    $rootScope.isBidderNotification = true;
                                    var repossId = $scope.notificationList[index].collectionDescription.other.repossession;
                                    $rootScope.newRepossessionId = repossId;
                                    var bidderId = $scope.notificationList[index].collectionDescription.id;

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
                                    $state.go('fECREDIT.bidderForm');
                                    $scope.hideLoading();
                                });

                        })
                        .fail(function(errobject) {
                            WL.Logger.debug(errobject.toString());
                        });
                    /*::-------------------------------------------------------------:*/


                } else {

                    /* if bidder is inprogress*/

                    $rootScope.isBidderNotification = true;
                    var repossId = $scope.notificationList[index].collectionDescription.other.repossession;
                    $rootScope.newRepossessionId = repossId;
                    var bidderId = $scope.notificationList[index].collectionDescription.id;

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
                    $state.go('fECREDIT.bidderForm');

                }




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
        $scope.savAndLogout = function() {
            //				        	alert("Token: "+ WL.Client.getLastAccessToken());
            $scope.hideLoading();
            $rootScope.showAlert(AlertMessages.otherDeviceLogin, AlertMessages.alertTitile);
            WL.Client.logout('FeCreditAppRealm', {
                onSuccess: $scope.goToLogin,
                onFailure: $scope.goToLogin
            });

        };

        $scope.clearFilter = function() {
            $scope.searchBtnNoti = Messages.searchBtn;
            $scope.searchTextBlack = false;

            if ($scope.notificationType === "DOCUMENT") {

                $scope.notificationChanged(1);
            } else if ($scope.notificationType === "INFORMATION") {

                $scope.notificationChanged(3);
            } else if ($scope.notificationType === "CONTRACT") {

                $scope.notificationChanged(4);
            }


        };

        $scope.searchOffline = function(valueData) {

        valueData = (""+utilFactory.removeDiacritics(""+valueData)).toLowerCase();


            $scope.frmObj = null;
            $scope.toObj = null;

            if ($scope.searchReqObject.fromDate != '' && $scope.searchReqObject.fromDate != null && $scope.searchReqObject.fromDate != undefined && $scope.searchReqObject.toDate != '' && $scope.searchReqObject.toDate != null && $scope.searchReqObject.toDate != undefined) {
                $scope.frmObj = new Date("" + $scope.searchReqObject.fromDate);
                $scope.toObj = new Date("" + $scope.searchReqObject.toDate);
            }

            $scope.notificationList = [];


            if ($scope.btnFourSelected == true) {
                if ($scope.contractId != null) {

                    if ($scope.frmObj != null && $scope.toObj != null) {
                        $.each($scope.notificationMainList, function(i, cont) {

                        try{

                        var ccc= cont.notificationTime.split(" ")[0];

                            $scope.notidate = new Date(""+ccc.split("-")[1]+"-"+ccc.split("-")[0]+"-"+ccc.split("-")[2]);// from dd-MM-yyy to MM-dd-yyyy

                            ($scope.notidate).setHours(0, 0, 0, 0);
                             ($scope.frmObj).setHours(0, 0, 0, 0);
                              ($scope.toObj).setHours(0, 0, 0, 0);
                            }catch(e){
                            	$exceptionHandler(e, " ");
                            console.log(e);
                            }
                            if ((utilFactory.removeDiacritics(cont.collectionDescription.contractId + "").toLowerCase()+"").toLowerCase().indexOf(valueData.toLowerCase()) != -1 && ($scope.notidate <= $scope.toObj) && ($scope.notidate >= $scope.frmObj)) {
                                $scope.notificationList.push(cont);


                            }



                        });
                    } else {
                        $.each($scope.notificationMainList, function(i, cont) {

                            if ((utilFactory.removeDiacritics(cont.collectionDescription.contractId + "").toLowerCase()+"").toLowerCase().indexOf(valueData.toLowerCase()) != -1) {
                                $scope.notificationList.push(cont);
                            }



                        });
                    }



                }
                if ($scope.customerName != null) {


                    /*$.each($scope.notificationMainList, function(i, cont) {

                        if ((cont.firstName + "").toLowerCase().includes(valueData.toLowerCase())) {
                            $scope.notificationList.push(cont);
                        }



                    });*/

                                                                                if ($scope.frmObj != null && $scope.toObj != null) {
                                                                                    $.each($scope.notificationMainList, function(i, cont) {

                                                                                        try{

                                                                                                                var ccc= cont.notificationTime.split(" ")[0];

                                                                                                                    $scope.notidate = new Date(""+ccc.split("-")[1]+"-"+ccc.split("-")[0]+"-"+ccc.split("-")[2]);// from dd-MM-yyy to MM-dd-yyyy

                                                                                                                    ($scope.notidate).setHours(0, 0, 0, 0);
                                                                                                                     ($scope.frmObj).setHours(0, 0, 0, 0);
                                                                                                                      ($scope.toObj).setHours(0, 0, 0, 0);
                                                                                                                    }catch(e){
                                                                                                                    	$exceptionHandler(e, " ");
                                                                                                                    console.log(e);
                                                                                                                    }
                                                                                        if ((utilFactory.removeDiacritics(cont.param2 + "").toLowerCase()+"").toLowerCase().indexOf(valueData.toLowerCase()) !=-1 && ($scope.notidate <= $scope.toObj) && ($scope.notidate >= $scope.frmObj)) {
                                                                                            $scope.notificationList.push(cont);
                                                                                        }



                                                                                    });
                                                                                } else {
                                                                                    $.each($scope.notificationMainList, function(i, cont) {

                                                                                        if ((utilFactory.removeDiacritics(cont.param2 + "").toLowerCase()+"").toLowerCase().indexOf(valueData.toLowerCase()) !=-1) {
                                                                                            $scope.notificationList.push(cont);
                                                                                        }



                                                                                    });
                                                                                }
                }

            } else {

                if ($scope.title != null) {


                   /* $.each($scope.notificationMainList, function(i, cont) {

                        if ((cont.description.title + "").toLowerCase().includes(valueData.toLowerCase())) {
                            $scope.notificationList.push(cont);
                        }


                    });*/

                                                            if ($scope.frmObj != null && $scope.toObj != null) {
                                                            $scope.notidate = new Date();
                                                                $.each($scope.notificationMainList, function(i, cont) {

                                                                    try{

                                                                                            var ccc= cont.notificationTime.split(" ")[0];

                                                                                                $scope.notidate = new Date(""+ccc.split("-")[1]+"-"+ccc.split("-")[0]+"-"+ccc.split("-")[2]);// from dd-MM-yyy to MM-dd-yyyy

                                                                                                ($scope.notidate).setHours(0, 0, 0, 0);
                                                                                                 ($scope.frmObj).setHours(0, 0, 0, 0);
                                                                                                  ($scope.toObj).setHours(0, 0, 0, 0);
                                                                                                }catch(e){
                                                                                                	$exceptionHandler(e, " ");
                                                                                                console.log(e);
                                                                                                }


                                                                    if ((utilFactory.removeDiacritics(cont.collectionDescription.title + "")+"").toLowerCase().indexOf(valueData.toLowerCase())!= -1 && ($scope.notidate <= $scope.toObj) && ($scope.notidate >= $scope.frmObj)) {
                                                                        $scope.notificationList.push(cont);
                                                                    }



                                                                });
                                                            } else {
                                                                $.each($scope.notificationMainList, function(i, cont) {



                                                                    if ((utilFactory.removeDiacritics(cont.collectionDescription.title+"") + "").toLowerCase().indexOf(valueData.toLowerCase()) != -1) {
                                                                        $scope.notificationList.push(cont);
                                                                    }



                                                                });
                                                            }






                }
                if ($scope.message != null) {

                    /*$.each($scope.notificationMainList, function(i, cont) {

                        if ((cont.description.message + "").toLowerCase().includes(valueData.toLowerCase())) {
                            $scope.notificationList.push(cont);
                        }


                    });*/


                                                                                if ($scope.frmObj != null && $scope.toObj != null) {
                                                                                    $.each($scope.notificationMainList, function(i, cont) {

                                                                                        try{

                                                                                                                var ccc= cont.notificationTime.split(" ")[0];

                                                                                                                    $scope.notidate = new Date(""+ccc.split("-")[1]+"-"+ccc.split("-")[0]+"-"+ccc.split("-")[2]);// from dd-MM-yyy to MM-dd-yyyy

                                                                                                                    ($scope.notidate).setHours(0, 0, 0, 0);
                                                                                                                     ($scope.frmObj).setHours(0, 0, 0, 0);
                                                                                                                      ($scope.toObj).setHours(0, 0, 0, 0);
                                                                                                                    }catch(e){
                                                                                                                    	$exceptionHandler(e, " ");
                                                                                                                    console.log(e);
                                                                                                                    }
                                                                                        if ((utilFactory.removeDiacritics(cont.collectionDescription.message + "")+"").toLowerCase().indexOf(valueData.toLowerCase()) != -1 && ($scope.notidate <= $scope.toObj) && ($scope.notidate >= $scope.frmObj)) {
                                                                                            $scope.notificationList.push(cont);
                                                                                        }



                                                                                    });
                                                                                } else {
                                                                                    $.each($scope.notificationMainList, function(i, cont) {

                                                                                        if ((utilFactory.removeDiacritics(cont.collectionDescription.message + "")+"").toLowerCase().indexOf(valueData.toLowerCase()) != -1) {
                                                                                            $scope.notificationList.push(cont);
                                                                                        }



                                                                                    });
                                                                                }
                }

            }


            $scope.searchTotalCount = $scope.notificationList.length;
            if ($scope.notificationList.length == 0) {
                $scope.noDataFound = false;
                $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);
            }else{
             $scope.noDataFound = true;
            }


        };
    }
])