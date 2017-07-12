/* JavaScript content from js/controllers/repossCtrl.js in folder common */
FeCreditApp
    .controller(
        'repossCtrl',
        function($scope, $state, $location, $ionicPopup, $ionicLoading,
            $rootScope, $ionicNavBarDelegate, $filter, $compile, $timeout, utilFactory, $ionicScrollDelegate, $ionicHistory,$exceptionHandler ) { // The following

            var attachcounterRepos = 0;
            var listContract = document.getElementById("listContract");
            var listContractHeader = document.getElementById("listContractHeader");
            var repossessionForm = document.getElementById("repossessionForm");
            var searchID = document.getElementById("searchID");
            var bidderImage = document.getElementById("bidderImage");
            var viewbidder = document.getElementById("viewbidder");
            var statusView = document.getElementById("statusView");
            var approvedView = document.getElementById("approvedView");
            var formId = document.getElementById("formID");
            var save_reposButton = document.getElementById("button_save");
            var save_cancelButton = document.getElementById("button_repos");



            var myPopup = '';
            var timeString = '';
            var datestring = '';
            var dateTimeString = '';
            var repossessionListContract = '';
            if ($rootScope.cont != undefined) {
                repossessionListContract = $rootScope.cont;
            }
            //             $rootScope.indicesRepossLocal = '';
            if ($rootScope.indicesRepossLocal == undefined) {
                $rootScope.indicesRepossLocal = '';
            }

            var d = new Date();
            datestring = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            timeString = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            dateTimeString = "" + datestring + " " + timeString;
            //$rootScope.contractList = [];


            bidderImage.style.display = 'none';
            viewbidder.style.display = 'none';
            statusView.style.display = 'none';
            approvedView.style.display = 'none';
            save_reposButton.style.display = 'none';
            save_cancelButton.style.display = 'none';
             $("#cancelRepoMsgDiv").hide();
             $("#attachAndCheckInDiv").show();
            document.getElementById("attachmentHide").style.display = "none";

            var isVisibility = false;




            $scope.$on("$ionicView.enter", function(event, data) {
            	$rootScope.contractNotificationBool=true;
                $scope.repossessionId = "";
                $rootScope.approvedViewValue = "";
                $scope.myCurrDate = new Date();
                $('.advancels').removeClass("advancelsSelected");
                $("#distanceReposs").html("");

                if ($rootScope.reposContSelected != "" && $rootScope.reposContSelected != undefined) {
                    // 1 means it came from contract pages footer
                    repossessionForm.style.visibility = 'visible';
                       searchID.style.visibility = 'hidden';
                    listContract.style.visibility = 'hidden';
                    listContractHeader.style.visibility = 'hidden';
                    $scope.viewReposseFormList($rootScope.reposContSelected);


                } else {
                    repossessionForm.style.visibility = 'hidden';
                       searchID.style.visibility = 'visible';
                    listContract.style.visibility = 'visible';
                    listContractHeader.style.visibility = 'visible';
                }



                var attachcounterRepos = 0;
                $ionicScrollDelegate.scrollTop();
                //					    approvedView.style.display='block';
                $scope.addbidderButton = Messages.addBidder;
                $scope.viewBidderButton = Messages.viewBidder;
                $scope.addressType = Messages.addressType;

                $scope.mapButton = Messages.mapButton;
                $scope.cancelButton = Messages.cancelButton;
                $scope.checkInButton = Messages.checkIn;
                $scope.attachFileButton = Messages.attachFileButton;
                $scope.quickSearchtitle = Messages.quickSearchtitle;
                $scope.advanceSearchtitle = Messages.advanceSearchtitle;
                $scope.enterKeyTitle = Messages.enterKeyTitle;
                $scope.FilterConditiontitle = Messages.FilterConditiontitle;
                $scope.contractId = Messages.contractId;
                $scope.customerId = Messages.customerId;
                $scope.customerName = Messages.customerName;
                $scope.AddressTitile = Messages.AddressTitile;
                $scope.filterFormulaTitle = Messages.filterFormulaTitle;
                $scope.equalTitle = Messages.equalTitle;
                $scope.NotEqualTitle = Messages.NotEqualTitle;
                $scope.endWithTitle = Messages.endWithTitle;
                $scope.includeTitle = Messages.includeTitle;
                $scope.notIncludeTitle = Messages.notIncludeTitle;
                $scope.ifAnyTitle = Messages.ifAnyTitle;
                $scope.addressTypetitle = Messages.addressTypetitle;
                $scope.currentTitle = Messages.currentTitle;
                $scope.permanent = Messages.permanent;
                $scope.work = Messages.work;
                $scope.contractId = Messages.contractId;
                $scope.contCustName = Messages.contCustName;
                $scope.dateAssign = Messages.dateAssign;

                $scope.fcName = Messages.fcName;
                $scope.fcCode = Messages.fcCode;
                $scope.repossessionAddress = Messages.repossessionAddress;
                $scope.customerPhone = Messages.customerPhone;
                $scope.paidAmount = Messages.paidAmount;
                $scope.contractId = Messages.contractId;
                $scope.contCustName = Messages.contCustName;
                $scope.pricipalOutstanding = Messages.pricipalOutstanding;
                $scope.financialConditionAssessment = Messages.financialConditionAssessment;
                $scope.otherSuggestion = Messages.otherSuggestion;
                $scope.assetPhoto = Messages.assetPhoto;
                $scope.cameraButton = Messages.cameraButton;
                $scope.galleryButton = Messages.galleryButton;
                $scope.fileButton = Messages.fileButton;
                $scope.brand = Messages.brand;
                $scope.loanAmount = Messages.loanAmount;
                $scope.paidAmount = Messages.paidAmount;
                $scope.loanDpd = Messages.loanDpd;
                $scope.assetCondition = Messages.assetCondition;
                $scope.saveButton = Messages.saveButton;
                $scope.cancelButton = Messages.cancelButton;
                $scope.footerRepos = Messages.footerRepos;
                $scope.contractHeader = Messages.contractHeader;
                $scope.curruntDateRepos = Messages.curruntDateRepos;
                $scope.repossCustName = Messages.repossCustName;
                $scope.reposAprovalForm = Messages.reposAprovalForm;
                $scope.distance = Messages.distance;
                $scope.statusTitle = Messages.status;
                $scope.repossession_Savetitle = AlertMessages.repossession_Savetitle;
                $scope.loadingDialougeSearch = AlertMessages.loadingDialougeSearch;

                $scope.otherDeviceLogin = AlertMessages.otherDeviceLogin;
                $scope.alertTitile = AlertMessages.alertTitile;
                $scope.locationSelected = AlertMessages.locationSelected;
                $scope.locationNotEnabled = AlertMessages.locationNotEnabled;
                $scope.isLocatinSelected = AlertMessages.isLocatinSelected;
                $scope.nothingToShow = AlertMessages.nothingToShow;
                $scope.selectValue = AlertMessages.selectValue;
                $scope.invalidDate = AlertMessages.invalidDate;
                $scope.isAddressType = AlertMessages.isAddressType;
                $scope.serverUnrechable = AlertMessages.serverUnrechable;
                $scope.loadingDialouge = AlertMessages.loadingDialouge;
                $scope.noAttachmentFound = AlertMessages.noAttachmentFound;
                $scope.repossessionHeader = Messages.repossessionHeader;
                $scope.attachFileButton = Messages.attachFileButton;
                $scope.contractHeader = Messages.contractHeader;
                $scope.nothingToShow = AlertMessages.nothingToShow;
                $scope.address_notAvailable = AlertMessages.address_notAvailable;
                $scope.enter_Repos_Addess = AlertMessages.enter_Repos_Addess;
                $scope.enter_Repos_cusPhone = AlertMessages.enter_Repos_cusPhone;
                $scope.enter_Repos_ass_cond = AlertMessages.enter_Repos_ass_cond;
                $scope.enter_Repos_cusFCD = AlertMessages.enter_Repos_cusFCD;
                $scope.enter_Repos_cusOtherSugg = AlertMessages.enter_Repos_cusOtherSugg;
                $scope.enter_Repos_cusCalledWhowm = AlertMessages.enter_Repos_cusCalledWhowm;
                $scope.enter_Repos_cusApproval = AlertMessages.enter_Repos_cusApproval;
                $scope.isInternetMessage = AlertMessages.isInternet;
                $scope.phoneNumericOnly = utilFactory.phoneNumeric;
                $scope.cancelRepoMsg = Messages.cancelRepoMsg;


                $rootScope.reposData = {};
                $rootScope.reposData.checkIn = {};
                $rootScope.reposData.checkIn.difference = '';
                $rootScope.reposData.checkIn.addressType = '';
                $rootScope.reposData.checkIn.customersAddress = '';
                $rootScope.reposData.checkIn.checkinTime = '';
                $rootScope.reposData.checkIn.checkinAddress = '';
                $rootScope.reposData.checkIn.latLong = ''
                $rootScope.reposData.reposs_address = '';
                $rootScope.reposData.cust_phone = '';
                $rootScope.reposData.reposs_assestCondition = '';
                $rootScope.reposData.reposs_cust_financialCond = '';
                $rootScope.reposData.reposs_otherSuggestion = '';
                $rootScope.reposData.reposs_curruntDate = ''
                //                $rootScope.reposData.reposs_custNameCallWhom = '';
                //                $rootScope.reposData.reposs_approvalProcess = '';

                $rootScope.reposData.attachedFilesLinkRepos = [];
                $rootScope.reposData.fileType = [];
                $rootScope.reposData.filenamefull = [];
                $rootScope.reposData.reposs_curruntDate = dateTimeString;
                //  $rootScope.reposData.reposs_DisplaycurruntDate = $filter('date')(new Date($rootScope.reposData.reposs_curruntDate), 'dd-MM-yyyy h:mm');
                //$rootScope.repossessionList = $rootScope.repossession[0];
                //$rootScope.repossessionList=$rootScope.mainRepossessionList;
                //$rootScope.contractList = $rootScope.mainContractList[0];
                $scope.clearFilter();
                if ($rootScope.IsShow == false) {
                    isVisibility = true;


                    repossessionForm.style.visibility = 'visible';
                       searchID.style.visibility = 'hidden';
                    listContract.style.visibility = 'hidden';
                    listContractHeader.style.visibility = 'hidden';
                    bidderImage.style.display = 'flex';
                    viewbidder.style.display = 'block';
                    formId.style.marginTop = '0%'
                    statusView.style.display = 'flex';
                    approvedView.style.display = 'block';
                    save_reposButton.style.display = 'none';
                    document.getElementById("attachmentHide").style.display = "none";
                    save_cancelButton.style.display = 'none';
                     $("#cancelRepoMsgDiv").hide();
                     $("#attachAndCheckInDiv").show();
                    //save_reposButton.disabled = true;
                    /*document.getElementById("button_save").visibility = hidden;
                                                 	                                           	    document.getElementById("button_repos").visibility = visible;*/
                    setTimeout(function() {
                        $scope.showStatusFromNotificationReposs();
                    }, 200);
                    repossessionSubmitDetail(repossessionListContract);
                    $scope.timer = $timeout($scope.timerMethod, 100);
                    statusView.style.marginTop = '0%';
                    approvedView.style.marginTop = '0%';
                    $rootScope.IsShow = true;
                }

                if ($rootScope.deviceLang == 'vi') {

                    $scope.cnclButtonViet = true;
                    // document.getElementById("cancelText").style.paddingLeft == "3px";
                    // document.getElementById("recordContentTop").className += " recordContentTopCss";
                }
                $scope.addReceiverForRepos();
                try {
                    if ($rootScope.isRepoClickFromNoti == true) {
                        setTimeout(function() {
                            $scope.showStatusFromNotificationReposs();
                        }, 200);

                    }
                } catch (E) {
                	$exceptionHandler(E, " ");

                };

                                        try{
                $rootScope.searchTextBlack = false;
                                                                            					document.getElementById("mytext_reposs").value = ""+Messages.searchBtn;
                                                                            					}catch(e){
                                                                            						$exceptionHandler(e, " ");
                                                                            					}

            });


            $rootScope.fcCodeRepossession = $rootScope.fcCode;
            $rootScope.fcNameRepossession = $rootScope.fcName;




            $scope.quickview = "withclick";
            $scope.advanceview = "withoutclick";
            $scope.quickhide = false;
            $scope.advancehide = true;
            $rootScope.valueData;


            $scope.baseSearchcontract = function() {

                var myPopupSearch = $ionicPopup.show({


                    title: '<input type="password" ng-model="data.wifi">',
                    templateUrl: 'templates/search.html',
                    cssClass: 'ptppop',
                    scope: $scope,
                    rootScope: $rootScope,
                    ionicLoading: $ionicLoading




                });


                $scope.formulaSelected = function(formulaSelected, id) {
                    id = "#filt" + id;
                    if ($(id).hasClass('filterSelected')) {
                        $(id).removeClass('filterSelected');
                    } else {

                        for (var i = 5; i < 11; i++) {
                            var idd = "#filt" + i;
                            $(idd).removeClass('filterSelected');
                        }


                        $(id).addClass('filterSelected');
                    }
                    $scope.formula = formulaSelected;
                    $scope.addressdropdownview = true;
                    $scope.filterdropdownview = true;
                };
                $scope.filterSelected = function(filter, index) {
                    id = "#filt" + index;
                    if ($(id).hasClass('filterSelected')) {
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
                    $scope.formuladropdownview = true;
                };
                $scope.advanceColumn = 'firstName';
                $scope.formula = 1;


                $scope.advanceSearch = function(valueData) {

                    $ionicLoading.show({
                        template: "" + AlertMessages.loadingDialougeSearch
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
                    } else {
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

                            $ionicLoading.hide();
                            $rootScope.contractList = arrayResults;
                            $scope.closebuttonFunc();
                        })


                        .fail(function(errorObject) {

                            // alert(JSON.stringify(errorObject));
                            $ionicLoading.hide();
                            $scope.closebuttonFunc();
                        });


                };




                $scope.simpleSearch = function(valueData) {




                    $ionicLoading.show({


                        template: "" + AlertMessages.loadingDialougeSearch
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
                    $scope.arrayResults = [{
                        firstName: valueData
                    }, {
                        lastName: valueData
                    }, {
                        contractId: valueData
                    }]


                    $scope.query = {
                        customerName: valueData
                    };




                    $scope.options = {
                        exact: false,
                        limit: 100
                    };


                    WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)


                        .find($scope.arrayResults, $scope.options)


                        .then(function(arrayResults) {

                            //				            	hide map and show list

                            $ionicLoading.hide();
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


                    myPopupSearch.close();
                    //var listContract = document.getElementById("listContract");
                    //var map = document.getElementById("googleMap");
                    repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                    listContract.style.visibility = 'visible';
                    listContractHeader.style.visibility = 'visible';
                    bidderImage.style.display = 'flex';
                    viewbidder.style.display = 'none';
                    // bidderImage.style.marginTop='21%';
                    //viewbidder.style.marginTop='21%';
                    formId.style.marginTop = '3%';
                    statusView.style.display = 'none';
                    approvedView.style.display = 'none';


                };



                $scope.closebutton = function() {


                    myPopupSearch.close();
                    //listContract = document.getElementById("listContract");
                    //repossessionForm = document.getElementById("googleMap");
                    //				            repossessionForm.style.visibility='visible';
                    //				            listContract.style.visibility='hidden';
                    //				            bidderImage.style.display='block';
                    //                            viewbidder.style.display='block';
                    //                            formId.style.marginTop='0%'
                    //                            statusView.style.display='block';
                    //                            approvedView.style.display='block';
                    repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                    listContract.style.visibility = 'visible';
                    listContractHeader.style.visibility = 'visible';
                    bidderImage.style.display = 'flex';
                    viewbidder.style.display = 'none';
                    // bidderImage.style.marginTop='21%';
                    //viewbidder.style.marginTop='21%';
                    formId.style.marginTop = '3%';
                    statusView.style.display = 'none';
                    approvedView.style.display = 'none';




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



            $scope.clearFilter = function() {

                			    $rootScope.searchBtn = Messages.searchBtn;
                                $rootScope.searchTextBlack = false;
                $rootScope.contractList = $rootScope.mainContractList;
                repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                listContract.style.visibility = 'visible';
                listContractHeader.style.visibility = 'visible';
            };




            $scope.goToContractDetail = function(contractList) {
                $rootScope.reposContSelected = contractList;
                $scope.viewReposseFormList(contractList);
                //			                $rootScope.indicesReposs = contract;
                //			                repossessionForm.style.visibility='visible';
                //		                    listContract.style.visibility='hidden';


                //$state.go("fECREDIT.repossession");


            };

            //				        $scope.addrdropdownview = true;
            //			            $scope.addrclick = function() {
            //
            //			                $scope.addrdropdownview = $scope.addrdropdownview ? false : true;
            //
            //
            //			            };
            //

            $scope.chekInReposs = function() {
                if (isVisibility) {
                    return;
                }
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(

                        function(position) {


                            $rootScope.reposData.checkIn.latLong = (position.coords.latitude + "," +
                                position.coords.longitude);


                            var checkinTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                            $rootScope.reposData.checkIn.checkinTime = checkinTime;


                            getAddressFromLatLong(position.coords.latitude, position.coords.longitude);
                            // alert("from chkin "+$rootScope.recordData.checkIn.latLong+" - "+$rootScope.recordData.checkIn.latLong2);
                            if ($rootScope.reposData.checkIn.latLong2 != undefined) {
                                getDistance($rootScope.reposData.checkIn.latLong, $rootScope.reposData.checkIn.latLong2);
                            }


                            $rootScope.showAlert("" + AlertMessages.locationSelected, "" + AlertMessages.alertTitile);


                        },
                        function(error) {
                            switch (error.code) {


                                case error.POSITION_UNAVAILABLE:


                                    $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                    break;


                                case error.PERMISSION_DENIED:


                                    $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                    break;


                                case error.TIMEOUT:
                                    $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);


                                    break;


                                case error.UNKNOWN_ERROR:
                                    $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                    break;




                                default:


                                    $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                    break;




                            }
                        }, {
                            enableHighAccuracy: true,
                            timeout: 2000


                        }
                    );
                }


            }

            $scope.addressdropdownviewBidder = true;
            $scope.addresstypeclickBidder = function() {
                $scope.addressdropdownviewBidder = $scope.addressdropdownviewBidder ? false :
                    true;



            };



            $scope.attachFileReposs = function() {
                if (isVisibility) {
                    return;
                }
                if ($("#addvalueRepos li").length >= 5) {
                    $rootScope.showAlert(AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);
                    return;
                }


                if (ionic.Platform.isAndroid()) {


                    myPopup = $ionicPopup
                        .show({
                            template: '<button style="background-color:#008345" class="button button-full button-balanced" ng-click="getPhotoAndroid(1)">{{cameraButton }}</button>' +
                                '<button  style="background-color:#008345"class="button button-full button-balanced" ng-click="getPhotoAndroidGallery(2)">{{galleryButton}}</button>' +
                                '<button  style="background-color:#008345"class="button button-full button-balanced" ng-click="getFile()">{{fileButton}}</button>',
                            title: Messages.selectButton,
                            scope: $scope,
                            cssClass: 'recordbutton',


                            buttons: [{
                                text: Messages.cancelButton


                            }]


                        });


                    $scope.getPhotoAndroid = function(source) {
                        //						Camera.PictureSourceType.CAMERA
                        //						Camera.PictureSourceType.SAVEDPHOTOALBUM
                        getPhotoRepos(source);


                    }


                    $scope.getPhotoAndroidGallery = function(source) {
                        //						Camera.PictureSourceType.CAMERA
                        //						Camera.PictureSourceType.SAVEDPHOTOALBUM
                        getPhotoRepos(source);


                    }




                    var lastClickTimedisplayName = 0;
                    $scope.getFile = function() {

                        var current = new Date().getTime();
                        var delta = current - lastClickTimedisplayName;
                        lastClickTimedisplayName = current;

                        if (delta > 1000) {
                            openNativeAppAttachmentRepos();
                        }
                    }
                } else {




                    WL.App.sendActionToNative("attachfile");




                }


            };


            function getPhotoRepos(source) {


                pictureSource = navigator.camera.PictureSourceType;




                navigator.camera.getPicture(onPhotoURISuccess, onFail, {
                    allowEdit: true,
                    quality: 50,
                    targetWidth: 800,
                    targetHeight: 800,
                    destinationType: Camera.DestinationType.FILE_URI, // FILE_URI
                    // In this app, dynamically set the picture source, Camera or photo gallery
                    sourceType: source,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    correctOrientation: true //Corrects Android orientation quirks
                });


            }

            function onPhotoURISuccess(imageURI) {




                if (ionic.Platform.isIOS()) {
                    WL.App.sendActionToNative("changeimagebase64", {
                        customData: imageURI
                    });
                    return;
                }


                myPopup.close();




                var res = "";
                res = imageURI.replace("file://", "");
                /* if(imageURI.includes("file://"))
				             					{
				             			 res = imageURI.replace("file://", "");

				             					}*/
                //						$rootScope.recordData.attachedFilesLink=res;


                if (attachcounterRepos == undefined || attachcounterRepos == 'undefined') {


                    attachcounterRepos = 0;
                    $rootScope.reposData.attachedFilesLinkRepos = [];
                    $rootScope.reposData.filenamefull = [];


                    $rootScope.reposData.fileType = [];
                };


                if (true) {


                    // $rootScope.reposData.attachedFilesLinkRepos.push(res);
                    //                              $rootScope.reposData.filenamefull.push(res.substr(res.lastIndexOf("/")+1));




                    //                              getFileFromWindowRequest($rootScope.reposData.attachcounterRepos);
                    //                            $rootScope.reposData.attachcounterRepos++;




                    window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                    	 window.resolveLocalFileSystemURL("file://"+res, function(fileEntry) {

                            fileEntry.file(function(file) {
                            	if(file.size > (10*1024*1024)){
                                    $rootScope.showAlert(""+AlertMessages.fileExeeds,"" + AlertMessages.alertTitile);
                                    return;
                                }
                                $rootScope.reposData.filenamefull.push(file.name);




                                var $el = $('<li class="attachclasscss" id="cancelAttachID' + $rootScope.reposData.filenamefull.length + '">' + file.name + '<img   class="headerIconsimage" ng-click="cancelAttach(' + ($rootScope.reposData.filenamefull.length) + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalueRepos");
                                $compile($el)($scope);
                                var reader = new window.FileReader();


                                reader.onloadend = function(evt) {


                                    //                            console.log(""+evt.target.result);
                                    $rootScope.imageData1 = evt.target.result;
                                    //$rootScope.reposData.attachedFilesLinkRepos[attachcounterRepos] = evt.target.result;
                                    if (file.type === null) {
                                        $rootScope.fileType1 = "application/json";
                                        $rootScope.reposData.fileType.push("application/json");
                                    } else {
                                        $rootScope.fileType1 = file.type;
                                        $rootScope.reposData.fileType.push(file.type);


                                    }
                                    if (file.type === "image/jpeg" || file.type === "image/png") {




                                        var canvas = document.createElement("canvas");
                                        canvas.width = 250;
                                        canvas.height = 250;
                                        var context = canvas.getContext("2d");
                                        var deferred = $.Deferred();
                                        $("<img/>").attr("src", "" + $rootScope.imageData1).load(function() {
                                            context.scale(250 / file.width, 250 / file.height);




                                            context.drawImage(this, 0, 0, 250, 250);
                                            //                                 $rootScope.imageData.push(canvas.toDataURL());
                                            $rootScope.reposData.attachedFilesLinkRepos.push(canvas.toDataURL());
                                            console.log("Data: " + canvas.toDataURL());


                                            //                                 console.log(""+canvas.toDataURL());
                                            deferred.resolve($("<img/>").attr("src", $rootScope.imageData1));
                                        });


                                        /*canvasResize(file, {
				                   	          width: 250,
				                   	          height: 0,
				                   	          crop: false,
				                   	          quality: 50,
				                   	          //rotate: 90,
				                   	          callback: function(data, width, height) {
				                   	        	console.log("Data: "+data);
				                   	          $(img).attr('src', data);
				                   	          }
				                   	    });*/




                                    }




                                    //                                       var indexvalue=0;
                                    //                                       $scope.callSaveAttachment(indexvalue);


                                };
                                reader.onerror = function(evt) {


                                };
                                reader.readAsDataURL(file);




                            }, function(e) {
                                console.log(e);
                            });
                        }, function(e) {
                            console.log(e);


                        });




                    }, function(e) {
                        console.log(e);
                    });
                    attachcounterRepos++;
                } else {
                    $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);
                }




            }


            function onFail(message) {}


            openNativeAppAttachmentRepos = function() {
                WL.App.sendActionToNative("openNativeFile");


            }
            $scope.addReceiverForRepos = function() {
                WL.App.addActionReceiver("MyActionReceiverId", function actionReceiver(received) {
                    if (received.action === "doSomething") {

                        // $rootScope.reposData.attachedFilesLinkRepos = received.data.FilePath;
                        //alert(fileAttachment);
                        var path = received.data.FilePath;
                        var pathType = "" + path.substring(path.lastIndexOf(".") + 1);
                        if (pathType != "jpg" && pathType != "JPEG" && pathType != "JPG" && pathType != "jpeg" && pathType != "png" && pathType != "PNG" && pathType != "doc" && pathType != "docx" && pathType != "pdf" && pathType != "PDF" && pathType != "txt" && pathType != "xlsx" && pathType != "csv" && pathType != "CSV") {
                            $rootScope.showAlert("" + AlertMessages.notSupportFileType, "" + AlertMessages.alertTitile);
                            return;
                        }

                        myPopup.close();

                        if (attachcounterRepos == undefined || attachcounterRepos == 'undefined') {


                            attachcounterRepos = 0;
                            $rootScope.reposData.attachedFilesLinkRepos = [];
                            $rootScope.reposData.filenamefull = [];
                            $rootScope.reposData.fileType = [];
                            $rootScope.reposData.attachedFilesLinkRepos = [];
                        };
                        if (true) {

                            //
                            //					                    $rootScope.reposData.attachedFilesLinkRepos.push(received.data.FilePath);
                            //					                    //		                              $rootScope.reposData.filenamefull.push(received.data.FilePath.substr(received.data.FilePath.lastIndexOf("/")+1));
                            //					                    console.log("log: " + received.data.FilePath);




                            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                            	 window.resolveLocalFileSystemURL("file://"+received.data.FilePath, function(fileEntry) {
                               
                                    fileEntry.file(function(file) {
                                    	if(file.size > (10*1024*1024)){
                                            $rootScope.showAlert(""+AlertMessages.fileExeeds,"" + AlertMessages.alertTitile);
                                            return;
                                        }
                                        $rootScope.reposData.filenamefull.push(file.name);
                                        var $el = $('<li class="attachclasscss" id="cancelAttachID' + $rootScope.reposData.filenamefull.length + '">' + file.name + '<img   class="headerIconsimage" ng-click="cancelAttach(' + $rootScope.reposData.filenamefull.length + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalueRepos");
                                        $compile($el)($scope);
                                        var reader = new window.FileReader();


                                        reader.onloadend = function(evt) {


                                            //                            console.log(""+evt.target.result);
                                            $rootScope.imageData1 = evt.target.result;
                                            if (file.type != "image/jpeg" && file.type != "image/png") {
                                                $rootScope.reposData.attachedFilesLinkRepos.push(evt.target.result);
                                            }

                                            if (file.type === null) {
                                                $rootScope.fileType1 = "application/json";
                                                $rootScope.reposData.fileType.push("application/json");
                                            } else {
                                                $rootScope.fileType1 = file.type;
                                                console.log("fileType1: " + file.type);
                                                $rootScope.reposData.fileType.push(file.type);


                                            }


                                            if (file.type == '' || file.type == null || file.type == undefined) {


                                                $rootScope.fileType1 = (file.name).split(".")[1];
                                                $rootScope.reposData.fileType.push($rootScope.fileType1);
                                                console.log("fileType1: " + $rootScope.fileType1);
                                            }


                                            if (file.type === "image/jpeg" || file.type === "image/png") {




                                                var canvas = document.createElement("canvas");
                                                canvas.width = 250;
                                                canvas.height = 250;
                                                var context = canvas.getContext("2d");
                                                var deferred = $.Deferred();
                                                $("<img/>").attr("src", "" + $rootScope.imageData1).load(function() {
                                                    context.scale(250 / file.width, 250 / file.height);




                                                    context.drawImage(this, 0, 0, 250, 250);
                                                    //                                 $rootScope.imageData.push(canvas.toDataURL());
                                                    $rootScope.reposData.attachedFilesLinkRepos.push(canvas.toDataURL());
                                                    console.log("Data: " + canvas.toDataURL());


                                                    //                                 console.log(""+canvas.toDataURL());
                                                    deferred.resolve($("<img/>").attr("src", $rootScope.imageData1));
                                                });

                                            }

                                        };
                                        reader.onerror = function(evt) {


                                        };
                                        reader.readAsDataURL(file);

                                    }, function(e) {
                                        console.log(e);
                                    });
                                }, function(e) {
                                    console.log(e);


                                });




                            }, function(e) {
                                console.log(e);
                            });
                            attachcounterRepos++;


                        } else {
                            $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);
                        }

                    } else if (received.action === "attachfile") {
                    	 var extension =received.data.exten;
                         
                         
                         
                         if (extension =='MOV'){
                                                 
                                                 $rootScope.showAlert(""+AlertMessages.notSupportFileType, ""+AlertMessages.alertTitile);
                                                 
                                                 
                            }else{
                    	
                    	 var filesize=received.data.filenamesize;
                         
                         var bytesString = filesize.slice(-5);
                         var byte = filesize.slice(-4);
                         var kbStrings = filesize.slice(-2);
                         
                         
                         var a = parseInt(filesize);
                    
                         
                         if (a>10 && bytesString !='bytes' && kbStrings !='KB' && byte !='byte'){
                         
                         $rootScope.showAlert(""+AlertMessages.fileExeeds, ""+AlertMessages.alertTitile);
                        
                         
                         }else{
                         
                    	
                        if (attachcounterRepos <= 4) {
                            $rootScope.reposData.attachedFilesLinkRepos.push(received.data.url);
                            $rootScope.reposData.fileType.push(received.data.exten);
                            $rootScope.reposData.filenamefull.push(received.data.filename);


                            //  $("#addvalueRepos").append('<li class="attachclasscss">'+$rootScope.filenamefull[attachcounterRepos]+'<img   class="headerIconsimage"  src="img/cancelBlack.png"></li>');


                            var $el = $('<li class="attachclasscss" id="cancelAttachID' + attachcounterRepos + '">' + $rootScope.reposData.filenamefull[attachcounterRepos] + '<img   class="headerIconsimage" ng-click="cancelAttach(' + (attachcounterRepos) + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalueRepos");




                            $compile($el)($scope);

                            attachcounterRepos++




                        } else {




                            $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);




                        }

                         }

                    }
                    } else if (received.action === "camerafile") {




                        getPhotoRepos(Camera.PictureSourceType.CAMERA);




                    } else if (received.action === "changeimagebase64") {




                        if (attachcounterRepos <= 4) {
                            $rootScope.reposData.attachedFilesLinkRepos.push(received.data.url);


                            $rootScope.reposData.fileType.push(received.data.exten);
                            $rootScope.reposData.filenamefull.push(received.data.filename);


                            var $el = $('<li class="attachclasscss" id="cancelAttachID' + attachcounterRepos + '">' + $rootScope.reposData.filenamefull[attachcounterRepos] + '<img   class="headerIconsimage" ng-click="cancelAttach(' + attachcounterRepos + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalueRepos");




                            $compile($el)($scope);




                            attachcounterRepos++




                        } else {




                            $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);

                        }

                    } else if (received.action === "galeryfile") {


                        getPhotoRepos(Camera.PictureSourceType.SAVEDPHOTOALBUM)

                    }
                });
            }

            $scope.cancelAttach = function(attachcountervalue) {




                var cancelid = 'cancelAttachID' + attachcountervalue;


                $rootScope.reposData.attachedFilesLinkRepos.splice(attachcountervalue, 1);;
                $rootScope.reposData.filenamefull.splice(attachcountervalue, 1);
                $rootScope.reposData.fileType.splice(attachcountervalue, 1);

                var roor = $rootScope.reposData.filenamefull.length;


                attachcounterRepos--




                $("#addvalueRepos").html("");




                for (i = 0; i <= roor - 1; i++) {




                    var $el = $('<li class="attachclasscss" id="cancelAttachID' + i + '">' + $rootScope.reposData.filenamefull[i] + '<img   class="headerIconsimage" ng-click="cancelAttach(' + i + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalueRepos");


                    $compile($el)($scope);

                }


            }




            $scope.saveRepossionButton = function() {
                //alert("Hello");
        if($rootScope.dpdValue < 10){
         $rootScope.showAlert("" + AlertMessages.notEligibleForRepo , "" + AlertMessages.alertTitile);
         return;
        }


                var optionsRepossion = {};




                $rootScope.reposData.reposs_address = $('#reposs_address').val();
                $rootScope.reposData.cust_phone = $('#reposs_cust_phone').val();
                $rootScope.reposData.reposs_assestCondition = $('#reposs_asstsCondition').val();
                $rootScope.reposData.reposs_cust_financialCond = $('#reposs_financial_assets').val();
                $rootScope.reposData.reposs_otherSuggestion = $('#reposs_other_suggestion').val();
                //$rootScope.reposData.reposs_custNameCallWhom = $('#reposs_cust_name').val();
                // $rootScope.reposData.reposs_approvalProcess = $('#reposs_approval').val();




                if ($rootScope.reposData.reposs_address.length === 0) {
                    $rootScope.showAlert("" + AlertMessages.enter_Repos_Addess, "" + AlertMessages.alertTitile);

                } else if ($rootScope.reposData.cust_phone.length === 0) {

                    $rootScope.showAlert("" + AlertMessages.enter_Repos_cusPhone, "" + AlertMessages.alertTitile);
                } else if ($rootScope.reposData.cust_phone.length < 10) {

                    $rootScope.showAlert("" + AlertMessages.mobileLength10, "" + AlertMessages.alertTitile);

                } else if ($rootScope.reposData.reposs_assestCondition.length === 0) {
                    $rootScope.showAlert("" + AlertMessages.enter_Repos_ass_cond, "" + AlertMessages.alertTitile);


                } else if ($rootScope.reposData.reposs_cust_financialCond.length === 0) {
                    $rootScope.showAlert("" + AlertMessages.enter_Repos_cusFCD, "" + AlertMessages.alertTitile);


                }
                //                else if ($rootScope.reposData.reposs_otherSuggestion.length === 0) {
                //
                //                    $rootScope.showAlert("" + AlertMessages.enter_Repos_cusOtherSugg, "" + AlertMessages.alertTitile);
                //
                //                } 
                //                else if ($rootScope.reposData.reposs_custNameCallWhom.length === 0) {
                //
                //                    $rootScope.showAlert("" + AlertMessages.enter_Repos_cusCalledWhowm, "" + AlertMessages.alertTitile);
                //
                //
                //                } else if ($rootScope.reposData.reposs_approvalProcess.length === 0) {
                //
                //                    $rootScope.showAlert("" + AlertMessages.enter_Repos_cusApproval, "" + AlertMessages.alertTitile);
                //
                //                } 
                //                else if ($rootScope.reposData.checkIn.addressType === '') {
                //
                //                    $rootScope.showAlert("" + AlertMessages.isAddressType, "" + AlertMessages.alertTitile);
                //
                //                } else if ($rootScope.reposData.checkIn.latLong === '') {
                //
                //                    $rootScope.showAlert("" + AlertMessages.isLocatinSelected, "" + AlertMessages.alertTitile);
                //
                //                }
                else {


                    //                                                                                                                    $rootScope.reposs_contracId =$rootScope.contractList.json.contractId;
                    //                                                                                                                    $rootScope.reposs_ContractcustName =$rootScope.contractList.json.contractId;
                    //                                                                                                                    $rootScope.reposs_brand =$rootScope.contractList.json.contractId;
                    //                                                                                                                    $rootScope.reposs_loanAmount =$rootScope.contractList.json.contractId;
                    //                                                                                                                    $rootScope.reposs_paidAmount=$rootScope.contractList.json.contractId;
                    //                                                                                                                    $rootScope.reposs_dpd =$rootScope.contractList.json.dpd;
                    //                                                                                                                    $rootScope.reposs_attachment ="https://dummy.com";




                    optionsRepossion = {
                        "fCName": $rootScope.fcNameRepossession,
                        "fCCode": $rootScope.fcCodeRepossession,
                        "contractId": $rootScope.indicesRepossLocal.json.contractId,
                        "firstName": $rootScope.indicesRepossLocal.json.firstName,
                        "lastName": $rootScope.indicesRepossLocal.json.lastName,
                        "middleName": $rootScope.indicesRepossLocal.json.middleName,
                        "loanAmount": $rootScope.indicesRepossLocal.json.loanAmount,
                        "principleOutstanding": $rootScope.indicesRepossLocal.json.posAmt,
                        "dpd": $rootScope.indicesRepossLocal.json.dpd,
                        "reposessionAddress": $rootScope.reposData.reposs_address,
                        "customersPhone": $rootScope.reposData.cust_phone,
                        "assetCondition": $rootScope.reposData.reposs_assestCondition,
                        "financialConditionAssessment": $rootScope.reposData.reposs_cust_financialCond,
                        "suggestions": $rootScope.reposData.reposs_otherSuggestion,
                        "contactedDate": $rootScope.reposData.reposs_curruntDate,
                        "laaAssetMakeC": $rootScope.indicesRepossLocal.json.laaAssetMakeC,
                        "totalAmountPaid": $rootScope.indicesRepossLocal.json.totalPaidAmount,
                        "unitCode": $rootScope.indicesRepossLocal.json.unitCode1,
                        "unitDesc": $rootScope.indicesRepossLocal.json.unitCodeDesc,
                        "loanAcctNum": $rootScope.indicesRepossLocal.json.contractId,
                        "repossessionStoreId": 1,
                        "calledWhom": "",
                        "approvalForm": "",
                        "brand": $rootScope.indicesRepossLocal.json.brand,
                        "isskiptracer": $rootScope.indicesRepossLocal.json.isskiptracer,
                        "customerId": $rootScope.indicesRepossLocal.json.custId,
                        "product": $rootScope.indicesRepossLocal.json.product,
                        "status": "PENDING",
                        "mrc": $rootScope.indicesRepossLocal.json.mrc,
                        "vehicleMaker": $rootScope.indicesRepossLocal.json.vehicleMarker,
                        "bikeName": $rootScope.indicesRepossLocal.json.bikeName,
                        "bikeType": $rootScope.indicesRepossLocal.json.bikeType
                        // "datePastDue" : $rootScope.contractList.json.dpd,


                        //"financialConditionAssessment":$rootScope.indicesRepossLocal.json.contractId,


                        //                        "checkIn": {
                        //                            "addressType": $rootScope.reposData.checkIn.addressType,
                        //                            "address": $rootScope.reposData.checkIn.customersAddress,
                        //                            "latLong": $rootScope.reposData.checkIn.latLong,
                        //                            "checkinDateTime": $rootScope.reposData.checkIn.checkinTime,
                        //                            "checkinAddress": $rootScope.reposData.checkIn.checkinAddress,
                        //                            "distance": $rootScope.reposData.checkIn.difference,
                        //                            "unitCode": "" + $rootScope.indicesRepossLocal.json.unitCode1,
                        //                            "unitCodeDesc": "" + $rootScope.indicesRepossLocal.json.unitCodeDesc
                        //
                        //                        }


                    };


                    $scope.tempRepossesion = optionsRepossion;




                    $scope.saveRepossessionRequest();




                }
            };




            $scope.saveRepossessionRequest = function() {
                $scope.showLoading();
                $scope.arrayRejectRepos = [{
                    contractId: $rootScope.indicesRepossLocal.json.contractId
                }]
//                WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)
//                    .remove($scope.arrayRejectRepos, {})
//                    .then(function(numberOfDocumentsRemoved) {
                        //handle success
                        WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME).add($scope.tempRepossesion).then(function(data) {




                                //							hit server
                                var resourceRequest = new WLResourceRequest("/adapters/contractRepossessions/repossession/save", WLResourceRequest.POST);
                                resourceRequest.setHeader("Content-Type", "application/json");
                                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                               
                                if($rootScope.isInternetConnected()){
                                    resourceRequest.send([$scope.tempRepossesion]).then($scope.getSecretData_CallbackOKRepossession, $scope.getSecretData_CallbackFailRepossession);
                                }else{
                                	$scope.hideLoading();
                                	$scope.saveRepossessionDataForSync();
                                    $scope.saveRepossessionAttachDataForSync();
                                	$scope.clearFilter();
                                	$rootScope.showAlert(""+AlertMessages.isInternetSyncYourData,""+AlertMessages.alertTitile);
                                }
                                


                            })
                            .fail(function(error) {
                                $scope.hideLoading();
                                $rootScope.showAlert("Error in Saving reposession.", "Alert");
                            });
//                    })
//                    .fail(function(errorObject) {
//                        //handle failure
//                        $scope.hideLoading();
//                        $rootScope.showAlert("Error in Saving reposession.", "Alert");
//                    });


            };




            $scope.showLoading = function() {
                $ionicLoading.show({
                    template: AlertMessages.loadingDialouge
                });
            };




            $scope.hideLoading = function() {
                $ionicLoading.hide();
            };




            $scope.getSecretData_CallbackOKRepossession = function(response) {
                $scope.hideLoading();
                if (response.responseJSON[0].responseCode == "102") {
                    //							        	  sso
                    $scope.saveRepossessionDataForSync();
                    $scope.saveRepossessionAttachDataForSync();
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);

                    $scope.savAndLogout();


                    return;


                } else if (response.responseJSON[0].responseCode != "200") {
                    //							        	  fail
                    $scope.saveRepossessionDataForSync();
                    $scope.saveRepossessionAttachDataForSync();
                    $scope.hideLoading();
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                    listContract.style.visibility = 'visible';
                    listContractHeader.style.visibility = 'visible';
                    return;
                } else if (response.responseJSON[0].responseCode == "200") {
                    $rootScope.repossDataId = response.responseJSON[0].dto.repossessionId;
                    $scope.saveSyncForRepossessionId();
                    $scope.updateRepossessionDB(response.responseJSON[0].dto.repossessionId );  // it will update Repos id received from server
                    //WL.JSONStore.get(REPOSESSION_ONLINE_COLLECTION_NAME).count()


                    //.then(function (numberOfDocuments) {


                    //	WL.JSONStore.get(REPOSESSION_ONLINE_COLLECTION_NAME)
                    //	.remove({_id: numberOfDocuments}, {})
                    //	.then(function (numberOfDocumentsRemoved) {
                    //handle success


                    var isAndroid = ionic.Platform.isAndroid();

                    if (false) {



                        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                        	 window.resolveLocalFileSystemURL("file://"+$rootScope.reposData.attachedFilesLinkRepos[0], function(fileEntry) {


                                fileEntry.file(function(file) {
                                	if(file.size > (10*1024*1024)){
                                        $rootScope.showAlert(""+AlertMessages.fileExeeds,"" + AlertMessages.alertTitile);
                                        return;
                                    }
                                    var reader = new window.FileReader();


                                    reader.onloadend = function(evt) {


                                        //                                                        console.log(""+evt.target.result);
                                        $rootScope.imageData = evt.target.result;
                                        if (file.type === null) {
                                            $rootScope.fileType = "application/json";
                                        } else {
                                            $rootScope.fileType = file.type;
                                        }
                                        if (file.type === "image/jpeg" || file.type === "image/png") {




                                            var canvas = document.createElement("canvas");
                                            canvas.width = 250;
                                            canvas.height = 250;
                                            var context = canvas.getContext("2d");
                                            var deferred = $.Deferred();
                                            $("<img/>").attr("src", "" + $rootScope.imageData).load(function() {
                                                context.scale(250 / file.width, 250 / file.height);




                                                context.drawImage(this, 0, 0, 250, 250);
                                                $rootScope.imageData = canvas.toDataURL();
                                                console.log("Data: " + canvas.toDataURL());


                                                //                                                             console.log(""+canvas.toDataURL());
                                                deferred.resolve($("<img/>").attr("src", $rootScope.imageData));
                                            });


                                            /*canvasResize(file, {
				                                               	          width: 250,
				                                               	          height: 0,
				                                               	          crop: false,
				                                               	          quality: 50,
				                                               	          //rotate: 90,
				                                               	          callback: function(data, width, height) {
				                                               	        	console.log("Data: "+data);
				                                               	          $(img).attr('src', data);
				                                               	          }
				                                               	    });*/




                                        }




                                        var indexvalue = 0;
                                        $scope.callRepossessionAttachment(indexvalue);


                                    };
                                    reader.onerror = function(evt) {


                                    };
                                    reader.readAsDataURL(file);




                                }, function(e) {
                                    console.log(e);
                                });
                            }, function(e) {
                                console.log(e);


                            });




                        }, function(e) {
                            console.log(e);
                        });


                    } else {

                        var indexvalue = 0;
                        $scope.callRepossessionAttachment(indexvalue);



                    }


                    //})



                    //										.fail(function (errorObject) {
                    //										    //handle failure
                    //											 $scope.hideLoading();
                    //											//$rootScope.showAlert(""+AlertMessages.repossession_Savetitle,""+AlertMessages.alertTitile);
                    //
                    //											 $state.go('fECREDIT.repossession');
                    //										});
                    //
                    //
                    //									})
                    //									.fail(function (errorObject) {
                    //									    //handle failure
                    //										 $scope.hideLoading();
                    //										 //$rootScope.showAlert(""+AlertMessages.repossession_Savetitle,""+AlertMessages.alertTitile);
                    //
                    //
                    //
                    //										 $state.go('fECREDIT.repossession');
                    //									});
                }
            };




            $scope.callRepossessionAttachment = function(indexvalue) {
                $scope.showLoading();
                $rootScope.reposData.attachedFilesLinkRepos;
                var arrayLengthvalue = $rootScope.reposData.attachedFilesLinkRepos.length;




                var isAndroid = ionic.Platform.isAndroid();




                if (indexvalue <= arrayLengthvalue - 1) {

                    $scope.indexvaleforattachment = indexvalue;
                    if (isAndroid) {
                        $scope.optionsReposAttachment = {
                            "attachmentData": $rootScope.reposData.attachedFilesLinkRepos[indexvalue].split(",")[1],
                            "attachmentType": $rootScope.reposData.fileType[indexvalue],
                            "repossessionId": $rootScope.repossDataId,
                            "contractId": $rootScope.indicesRepossLocal.json.contractId,
                            "attachmentName": $rootScope.reposData.filenamefull[indexvalue]


                        }
                    } else {
                        $scope.optionsReposAttachment = {
                            "attachmentData": $rootScope.reposData.attachedFilesLinkRepos[indexvalue],
                            "attachmentType": $rootScope.reposData.fileType[indexvalue],
                            "repossessionId": $rootScope.repossDataId,
                            "contractId": $rootScope.indicesRepossLocal.json.contractId,
                            "attachmentName": $rootScope.reposData.filenamefull[indexvalue]


                        }
                    }
                    var resourceRequest = new WLResourceRequest("/adapters/contractRepossessions/repossession/attachment/save", WLResourceRequest.POST);
                    resourceRequest.setHeader("Content-Type", "application/json");
                    resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                    resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                    resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                    resourceRequest.send($scope.optionsReposAttachment).then($scope.getSecretData_CallbackOKRepossAttachment, $scope.getSecretData_CallbackFailRepossAttachment);
                } else {

                    $scope.hideLoading();


                    // clear locally saved drafts after syncing on server
                    //						                WL.JSONStore.get(RECORDS_COLLECTION_NAME)
                    //						                    .remove({
                    //						                        _id: $rootScope.selectedRecordDbId
                    //						                    }, {})
                    //						                    .then(function(numberOfDocumentsRemoved) {
                    //						                        $rootScope.selectedRecordDbId = '';
                    //						                        console.log("draft cleared from local db");
                    //						                    }).fail(function(errorObject) {
                    //
                    //						                        console.log("draft didn't clear from local db");
                    //
                    //						                    });

                    $rootScope.reposData.attachedFilesLinkRepos = [];
                    $rootScope.reposData.filenamefull = [];
                    $rootScope.reposData.fileType = [];
                    $rootScope.showAlert("" + AlertMessages.repossession_Savetitle, "" + AlertMessages.alertTitile);
                    repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                    listContract.style.visibility = 'visible';
                    listContractHeader.style.visibility = 'visible';
                    //$rootScope.contractList = [];
                }

            }
            $scope.getSecretData_CallbackOKRepossAttachment = function(response) {
                $scope.hideLoading();

                var succussvalueindex = $scope.indexvaleforattachment;


                succussvalueindex++;




                $scope.callRepossessionAttachment(succussvalueindex);
                //$rootScope.showAlert(""+AlertMessages.repossession_Savetitle,""+AlertMessages.alertTitile);
                //$state.go('fECREDIT.repossession');
            }


            $scope.getSecretData_CallbackFailRepossAttachment = function(response) {
                $scope.saveRepossessionAttachDataForSync();
                $scope.hideLoading();
                if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                    $rootScope.sessionTimeOutMessage();
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    return;
                }
                $rootScope.sessionTimeOutCalled = false;
                if (response == null || response.status == 404 || response.status == 0 || response.status == 500) {
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                    listContract.style.visibility = 'visible';
                    listContractHeader.style.visibility = 'visible';
                    return;
                }


            }


            $scope.getSecretData_CallbackFailRepossession = function(response) {
                $scope.hideLoading();
                $scope.saveRepossessionDataForSync();
                $scope.saveRepossessionAttachDataForSync();
                if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    $rootScope.sessionTimeOutMessage();
                    return;
                }
                if (response == null || response.status == 404 || response.status == 0 || response.status == 500) {
                    $scope.hideLoading();
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                    listContract.style.visibility = 'visible';
                    listContractHeader.style.visibility = 'visible';
                    return;
                }
                // alert("CallbackFail : " + JSON.stringify(response));
                /*if ($rootScope.sessionTimeOutCalled) {
	                                                   				        	  WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME).add(options).then(function(data) {



	                                                   						       		$scope.hideLoading();
	                                                   					            	$rootScope.showAlert("Session time out.","Alert");
	                                                   					            	 $ionicHistory.clearHistory();
	                                                   					               	$rootScope.contractSideMenuFlag = false;
	                                                   					                  $ionicHistory.nextViewOptions({
	                                                   					                      disableBack: true
	                                                   					                    });
	                                                   					                    $state.go('login');
	                                                   						            }).fail(function(error) {
	                                                   			                        	  $scope.hideLoading();
	                                                   			                        	  $state.go('login');
	                                                   			                          });
	                                                   						}else {
	                                                   							$scope.hideLoading();
	                                                   							$rootScope.showAlert(""+AlertMessages.serverUnrechable,""+AlertMessages.alertTitile);
	                                                   						} */
                $scope.hideLoading();
                $rootScope.sessionTimeOutCalled = false;



            }


            $scope.savAndLogout = function() {
                //                                                   				        	alert("Token: "+ WL.Client.getLastAccessToken());
                $scope.hideLoading();
                $rootScope.showAlert(AlertMessages.otherDeviceLogin, AlertMessages.alertTitile);
                WL.Client.logout('FeCreditAppRealm', {
                    onSuccess: $scope.goToLogin,
                    onFailure: $scope.goToLogin
                });




            };
            $scope.goToLogin = function() {
                //                                                   				        	$ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('login');
            };


            repossessionSubmitDetail = function(repossessionListContract) {


                if (repossessionListContract.json.status == "REJECT") {
                    $scope.enableInputs();
                } else {
                    $scope.disableInputs();
                }
                
                if ((repossessionListContract.json.status === "REJECT" || $scope.statusCheck === "REJECT") && $rootScope.isRepoClickFromNoti == true) {
                    
                    $scope.disableInputs();
                    $("#button_save").hide();
                    $("#attachmentHide").hide();
                  
                }

                 if ($rootScope.deviceLang == 'vi') {
                                                                  $rootScope.approvedViewValue = repossessionListContract.json.displayStatusVn;
                                                                  if($rootScope.approvedViewValue == undefined || $rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
                                                                  $rootScope.approvedViewValue=Messages.status_Pendi_descri;
                                                                  }
                                                                 }
                                                                 else{
                                                                  $rootScope.approvedViewValue = repossessionListContract.json.displayStatusEn;
                                                                  if($rootScope.approvedViewValue == undefined ||$rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
                                                                     $rootScope.approvedViewValue=Messages.status_Pendi_descri;
                                                                   }
                                                                 }




                $('#reposs_address').val(repossessionListContract.json.reposessionAddress);
                $('#reposs_cust_phone').val(repossessionListContract.json.customersPhone);
                $('#reposs_asstsCondition').val(repossessionListContract.json.assetCondition);
                $('#reposs_financial_assets').val(repossessionListContract.json.financialConditionAssessment);
                $('#reposs_other_suggestion').val(repossessionListContract.json.suggestions);
                //$('#reposs_cust_name').val(repossessionListContract.json.calledWhom);
                // $rootScope.reposs_fcName =list.json.fCName;
                // $rootScope.repossfcCode =list.json.fCCode;
                // $('#reposs_approval').val(repossessionListContract.json.approvalForm);
                $scope.timer = $timeout($scope.timerMethod, 100);
            }


            $scope.addBidder = function() {
                $rootScope.isBidderNotification = false;
                $rootScope.isBidderApproved = false;
                $rootScope.cont = repossessionListContract;
                $scope.array = [{
                    contractId: $rootScope.bidderContractList.json.contractId
                }]
                // $scope.array = [{status:"Approved"},{status:"Reject"},{status:"Pending"}]
                if (repossessionListContract.json.repossessionId == 'undefined' || repossessionListContract.json.repossessionId == undefined || repossessionListContract.json.repossessionId == 0) {
                    WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID)
                        .find($scope.array).then(function(list) {


                            $scope.local = list[0].json.repossessionId;
                            if ($scope.local != undefined) {
                                $scope.local = $scope.local.toString();
                            }
                            $scope.repossessionId = $scope.local;

                            if ($rootScope.bidderViewList == undefined || $rootScope.bidderViewList == 'undefined' || $rootScope.bidderViewList == null) {
                                $rootScope.bidderViewList = [];

                            } else {
                                $rootScope.bidderApproved = $rootScope.bidderViewList[$scope.repossessionId];
                                if ($rootScope.bidderApproved == undefined || $rootScope.bidderApproved == 'undefined') {
                                    $rootScope.bidderApproved = [];
                                }
                                for (var bidderK = 0; bidderK < $rootScope.bidderApproved.length; bidderK++) {
                                    if ($rootScope.bidderApproved[bidderK].status === "APPROVED" || $rootScope.bidderApproved[bidderK].status === "INPROGRESS") {
                                        $rootScope.isBidderApproved = true;
                                    }

                                }
                            }
                            $rootScope.viewBidderClicked = false;
                            $rootScope.repossessionListBidder = repossessionListContract.json;
                            $rootScope.bidderContractListMain = $rootScope.bidderContractList.json;
                            if ($rootScope.isBidderApproved == true) {
                                //bidderImage.style.display = 'none';
                                return;
                            }
                            $state.go('fECREDIT.bidderForm');


                        }).fail(function(error) {

                            $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                        });
                } else {
                    $scope.repossessionId = "" + repossessionListContract.json.repossessionId;

                    if ($rootScope.bidderViewList == undefined || $rootScope.bidderViewList == 'undefined' || $rootScope.bidderViewList == null) {
                        $rootScope.bidderViewList = [];

                    } else {
                        $rootScope.bidderApproved = $rootScope.bidderViewList[$scope.repossessionId];
                        if ($rootScope.bidderApproved == undefined || $rootScope.bidderApproved == 'undefined') {
                            $rootScope.bidderApproved = [];
                        }
                        for (var bidderK = 0; bidderK < $rootScope.bidderApproved.length; bidderK++) {
                            if ($rootScope.bidderApproved[bidderK].status === "APPROVED" || $rootScope.bidderApproved[bidderK].status === "INPROGRESS") {
                                $rootScope.isBidderApproved = true;
                            }

                        }
                    }
                    $rootScope.viewBidderClicked = false;
                    $rootScope.repossessionListBidder = repossessionListContract.json;
                    $rootScope.bidderContractListMain = $rootScope.bidderContractList.json;
                    if ($rootScope.isBidderApproved == true) {

                        return;
                    }
                    $state.go('fECREDIT.bidderForm');
                }

                //$rootScope.repossessionListBidder=$rootScope.bidderContractList.json;
                //$rootScope.dataValForViewBidder = [];




            };
            $scope.viewBidder = function() {
                $rootScope.isBidderNotification = false;
                $rootScope.dataValForViewBidder = [];
                $rootScope.bidderViewListLocal = [];
                var bidderViewListLocalIndex = [];

                for (var i in $rootScope.bidderViewList) {
                    bidderViewListLocalIndex.push("" + i);
                }

                for (j = 0; j < bidderViewListLocalIndex.length; j++) {
                    var data = {};
                    data.key = bidderViewListLocalIndex[j];
                    data.value = $rootScope.bidderViewList[bidderViewListLocalIndex[j]];

                    $rootScope.bidderViewListLocal.push(data);
                }




                //                                                                        $rootScope.bidderViewListLocal.push($rootScope.bidderViewList);
                $scope.array = [{
                    contractId: $rootScope.bidderContractList.json.contractId
                }]
                // $scope.array = [{status:"Approved"},{status:"Reject"},{status:"Pending"}]
                if (repossessionListContract.json.repossessionId == 'undefined' || repossessionListContract.json.repossessionId == undefined || repossessionListContract.json.repossessionId == 0) {
                    WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID)
                        .find($scope.array).then(function(list) {


                            $scope.local = list[0].json.repossessionId;
                            if ($scope.local != undefined) {
                                $scope.local = $scope.local.toString();
                            }
                            $scope.repossessionId = $scope.local;

                            for (j = 0; j < $rootScope.bidderViewListLocal.length; j++) {
                                var keyvv = $rootScope.bidderViewListLocal[j].key;
                                if (keyvv === $scope.repossessionId) {
                                    $rootScope.dataValForViewBidder = $rootScope.bidderViewListLocal[j].value.slice();
                                    $rootScope.dataValForViewBidder = $rootScope.bidderViewListLocal[j].value.concat();
                                    break;
                                }
                            }


                            $rootScope.bidderContractListMain = $rootScope.bidderContractList.json;
                            $rootScope.repossessionListBidder = repossessionListContract.json;
                            $scope.arrayBidder = [{
                                repossessionId: $scope.repossessionId
                            }]
                            // $scope.array = [{status:"Approved"},{status:"Reject"},{status:"Pending"}]
                            WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                                .find($scope.arrayBidder).then(function(listBidder) {
                                    if (listBidder.length != 0) {
                                        if ($rootScope.dataValForViewBidder == "" || $rootScope.dataValForViewBidder == undefined || $rootScope.dataValForViewBidder.length == 0) {

                                            $rootScope.dataValForViewBidder = [];
                                        }
                                        for (var i = 0; i < listBidder.length; i++) {
                                            var found = 0;

                                            for (var j = 0; j < $rootScope.dataValForViewBidder.length; j++) {
                                                if (listBidder[i].json.bidderId == $rootScope.dataValForViewBidder[j].bidderId) {
                                                    $rootScope.dataValForViewBidder[j] = listBidder[i].json;
                                                    found = 1;
                                                    break;
                                                }
                                            }

                                            if (found == 0) {

                                                $rootScope.dataValForViewBidder.push(listBidder[i].json);
                                            }



                                        }
                                        $scope.findBidderInSyncDb();
                                        // $state.go('fECREDIT.viewBidder');
                                    } else {
                                        $scope.findBidderInSyncDb();
                                        /*
                                        if ($rootScope.dataValForViewBidder != "undefined" && $rootScope.dataValForViewBidder != undefined && $rootScope.dataValForViewBidder.length != 0) {

                                            $state.go('fECREDIT.viewBidder');
                                        } else {
                                            $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);

                                        }
                                        */
                                    }
                                }).fail(function(error) {

                                    $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                                });


                        }).fail(function(error) {

                            $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                        });
                } else {
                    $scope.repossessionId = "" + repossessionListContract.json.repossessionId;

                    for (j = 0; j < $rootScope.bidderViewListLocal.length; j++) {
                        var keyvv = $rootScope.bidderViewListLocal[j].key;
                        if (keyvv === $scope.repossessionId) {
                            $rootScope.dataValForViewBidder = $rootScope.bidderViewListLocal[j].value.slice();
                            $rootScope.dataValForViewBidder = $rootScope.bidderViewListLocal[j].value.concat();
                            break;
                        }
                    }


                    $rootScope.bidderContractListMain = $rootScope.bidderContractList.json;
                    $rootScope.repossessionListBidder = repossessionListContract.json;
                    $scope.arrayBidder = [{
                        repossessionId: $scope.repossessionId
                    }]
                    // $scope.array = [{status:"Approved"},{status:"Reject"},{status:"Pending"}]
                    WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                        .find($scope.arrayBidder).then(function(listBidder) {
                            if (listBidder.length != 0) {
                                if ($rootScope.dataValForViewBidder == "" || $rootScope.dataValForViewBidder == undefined || $rootScope.dataValForViewBidder.length == 0) {

                                    $rootScope.dataValForViewBidder = [];
                                }
                                for (var i = 0; i < listBidder.length; i++) {
                                    var found = 0;

                                    for (var j = 0; j < $rootScope.dataValForViewBidder.length; j++) {
                                        if (listBidder[i].json.bidderId == $rootScope.dataValForViewBidder[j].bidderId && listBidder[i].json.bidderId != "") {
                                            $rootScope.dataValForViewBidder[j] = listBidder[i].json;
                                            found = 1;
                                            break;
                                        }
                                    }

                                    if (found == 0) {

                                        $rootScope.dataValForViewBidder.push(listBidder[i].json);
                                    }



                                }
                                $scope.findBidderInSyncDb();
                                //$state.go('fECREDIT.viewBidder');
                            } else {
                                $scope.findBidderInSyncDb();
                                /*
                                if ($rootScope.dataValForViewBidder != "undefined" && $rootScope.dataValForViewBidder != undefined && $rootScope.dataValForViewBidder.length != 0) {

                                    $state.go('fECREDIT.viewBidder');
                                } else {
                                    $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);

                                }
                                */
                            }
                        }).fail(function(error) {

                            $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                        });
                }




            };

            $scope.findBidderInSyncDb = function(){

                $scope.arrayBidder = [{
                        repossessionId: $scope.repossessionId
                    }];

                WL.JSONStore.get(BIDDER_REPOSSESSION_SYNC)
                    .find($scope.arrayBidder).then(function(listBidder) {
                        if (listBidder.length != 0) {
                            if ($rootScope.dataValForViewBidder == "" || $rootScope.dataValForViewBidder == undefined || $rootScope.dataValForViewBidder.length == 0) {

                                $rootScope.dataValForViewBidder = [];
                            }
                            for (var i = 0; i < listBidder.length; i++) {
                                var found = 0;

                                for (var j = 0; j < $rootScope.dataValForViewBidder.length; j++) {
                                    if (listBidder[i].json.bidderId == $rootScope.dataValForViewBidder[j].bidderId && listBidder[i].json.bidderId != "") {
                                        $rootScope.dataValForViewBidder[j] = listBidder[i].json;
                                        found = 1;
                                        break;
                                    }
                                }

                                if (found == 0) {

                                    $rootScope.dataValForViewBidder.push(listBidder[i].json);
                                }



                            }
                            $state.go('fECREDIT.viewBidder');

                        } else {
                            if ($rootScope.dataValForViewBidder != "undefined" && $rootScope.dataValForViewBidder != undefined && $rootScope.dataValForViewBidder.length != 0) {

                                $state.go('fECREDIT.viewBidder');
                            } else {

                                $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);

                            }
                        }
                    }).fail(function(error) {

                        if ($rootScope.dataValForViewBidder != "undefined" && $rootScope.dataValForViewBidder != undefined && $rootScope.dataValForViewBidder.length != 0) {
                        
                            $state.go('fECREDIT.viewBidder');
                        } else {

                            $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);

                        }
                    });


            }

            $scope.addressFunction = function(addressObject, event, i) {
                if (isVisibility) {
                    return;
                }
                var addrType = addressObject.address;
                $rootScope.reposData.checkIn.addressType = addrType;

                $rootScope.reposData.checkIn.addressTypeId = event.target.id;
                $('.advancels').removeClass("advancelsSelected");
                $("#" + event.target.id).addClass("advancelsSelected");




                var mapping = $rootScope.addrTypeMapping[i].mapping;
                if (mapping == "regAddress") {


                    var addr2 = $rootScope.indicesRepossLocal.json.regAddress;
                } else if (mapping == "actAddress") {


                    var addr2 = $rootScope.indicesRepossLocal.json.actAddress;
                } else if (mapping == "offAddress") {


                    var addr2 = $rootScope.indicesRepossLocal.json.offAddress;
                }
                $rootScope.reposData.checkIn.customersAddress = addr2;
                getLocationFromAddress(addr2, addrType, event.target.id);




                $scope.addressdropdownviewBidder = true;
            }

            function getAddressFromLatLong(lat, long) {


                var geocoder = new google.maps.Geocoder();
                var latLng = new google.maps.LatLng(lat, long);
                geocoder.geocode({
                        latLng: latLng
                    },
                    function(responses) {
                        if (responses && responses.length > 0) {
                            currentAddress = responses[0].formatted_address;


                        } else {
                            currentAddress = 'Not getting Any address for given latitude and longitude.';


                        }
                        $rootScope.reposData.checkIn.checkinAddress = currentAddress;
                    }
                );
            }


            function getLocationFromAddress(address, addrType, listId) {
                //var address = "H122, H Block, Sector 63, Noida, Uttar Pradesh 201301";
                var geocoder = new google.maps.Geocoder();


                geocoder.geocode({
                    'address': address
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        long = results[0].geometry.location.lng();
                        var addr2 = (lat + "," + long); // customer address latlong
                        $rootScope.reposData.checkIn.latLong2 = addr2;


                        var addr1 = $rootScope.reposData.checkIn.latLong; // check in address latlong
                        // alert(addr1+' chkin addr');
                        $rootScope.reposData.checkIn.addressType = addrType;
                        $rootScope.reposData.checkIn.customersAddress = address;
                        $("#" + listId).addClass("advancelsSelected");
                        if (addr1 != '' && addr1 != undefined && addr1 != 'undefined') {
                            getDistance(addr1, addr2);
                        }
                        // return addr2;
                    } else {
                        $rootScope.reposData.checkIn.latLong2 = undefined;
                        $rootScope.reposData.checkIn.difference = '';
                        $("#distanceReposs").html("");
                        $rootScope.showAlert("" + AlertMessages.address_notAvailable, "" + AlertMessages.alertTitile);

                        // manual address entry
                        //                        $('.advancels').removeClass("advancelsSelected");
                        //                        $rootScope.reposData.checkIn.customersAddress = '';
                        //                        $rootScope.reposData.checkIn.addressType = ''; // for validation
                        //                        var newAddr = prompt("" + AlertMessages.address_notAvailable, "" + address);
                        //
                        //                        if (newAddr != null) { // if cancel pressed then newAddr = null
                        //                            getLocationFromAddress(newAddr, addrType, listId);
                        //                        }
                    }
                });
            }

            function getDistance(addr1, addr2) {




                /*  */
                // this is a comment for git . . .
                /*  */


                var addr1Lat = addr1.substring(0, addr1.indexOf(','));
                var addr1Long = addr1.substring(addr1.indexOf(',') + 1, addr1.length);


                var addr2Lat = addr2.substring(0, addr2.indexOf(','));
                var addr2Long = addr2.substring(addr2.indexOf(',') + 1, addr2.length);
                //   var addr2Lat = 28.607251;
                //  var addr2Long = 77.350359;


                var lat1 = addr1Lat;
                var lon1 = addr1Long;


                var lat2 = addr2Lat;
                var lon2 = addr2Long;


                var R = 6371; // km (change this constant to get miles)
                var dLat = (lat2 - lat1) * Math.PI / 180;
                var dLon = (lon2 - lon1) * Math.PI / 180;
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                /*if (d>1){
                 d = Math.round(d)+"km";
                }else if (d<=1){*/
                d = Math.round(d * 1000);
                //    	}
                $rootScope.reposData.checkIn.difference = d;
                $("#distanceReposs").html(d + " m");
                return d;
            }



            $scope.$on('$ionicView.leave', function() {
                $rootScope.isRepoClickFromNoti = false;
            	$rootScope.contractNotificationBool=false;
                $rootScope.rejectReposIdNoti = "";
                $scope.repossessionId = "";
                $scope.clearDataRepos();
                $rootScope.approvedViewValue = "";

                attachcounterRepos = 0;
                $rootScope.reposData = {};
                $rootScope.reposData.checkIn = {};
                $rootScope.reposData.attachedFilesLinkRepos = [];
                $rootScope.reposData.fileType = [];
                $rootScope.reposData.filenamefull = [];
                repossessionForm.style.visibility = 'hidden';
                       searchID.style.visibility = 'visible';
                listContract.style.visibility = 'hidden';
                listContractHeader.style.visibility = 'hidden';
                bidderImage.style.display = 'flex';
                viewbidder.style.display = 'none';
                statusView.style.display = 'none';
                approvedView.style.display = 'none';
                $rootScope.reposData.checkIn.difference = '';
                $("#distanceReposs").html("");
                $rootScope.reposData.checkIn.addressType = '';
                $rootScope.reposData.checkIn.latLong = '';
                $("#addvalueRepos").html("");
                $rootScope.reposData.checkIn.customersAddress = '';
                $rootScope.reposData.checkIn.checkinTime = '';
                $rootScope.reposData.checkIn.checkinAddress = '';
               // $rootScope.reposContSelected = '';
                $('.advancels').removeClass("advancelsSelected");
                                			    $rootScope.searchBtn = Messages.searchBtn;
                                                $rootScope.searchTextBlack = false;

            });

            $scope.clearDataRepos = function() {

                $('#reposs_address').val('');
                $('#reposs_cust_phone').val('');
                $('#reposs_asstsCondition').val('');
                $('#reposs_financial_assets').val('');
                $('#reposs_other_suggestion').val('');
                //                $('#reposs_cust_name').val('');
                //                $('#reposs_approval').val('');
                $("#distanceReposs").html("");
                $('.advancels').removeClass("advancelsSelected");
            }

            $scope.disableInputs = function() {
                document.getElementById("reposs_address").disabled = true;
                document.getElementById("reposs_cust_phone").disabled = true;
                document.getElementById("reposs_asstsCondition").disabled = true;
                document.getElementById("reposs_financial_assets").disabled = true;
                document.getElementById("reposs_other_suggestion").disabled = true;
                //                document.getElementById("reposs_cust_name").disabled = true;
                //                document.getElementById("reposs_approval").disabled = true;
                $("#addvalueRepos").html("");
                if (!repossessionListContract.json.status === "PENDING") {
                    document.getElementById("button_save").disabled = true;
                }


            }

            $scope.enableInputs = function() {
                document.getElementById("reposs_address").disabled = false;
                document.getElementById("reposs_cust_phone").disabled = false;
                document.getElementById("reposs_asstsCondition").disabled = false;
                document.getElementById("reposs_financial_assets").disabled = false;
                document.getElementById("reposs_other_suggestion").disabled = false;
                //                document.getElementById("reposs_cust_name").disabled = false;
                //                document.getElementById("reposs_approval").disabled = false;
                $("#addvalueRepos").html("");


            }

            $scope.clearRepossession = function() {

                if (!$rootScope.isInternetConnected()) {
                    $rootScope.showAlert(AlertMessages.isInternet, "" + AlertMessages.alertTitile);
                    return;
                }
                $scope.arrayreos = [{
                    contractId: repossessionListContract.json.contractId
                }]
                if (repossessionListContract.json.repossessionId == 'undefined' || repossessionListContract.json.repossessionId == undefined || repossessionListContract.json.repossessionId == 0) {
                    WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID)
                        .find($scope.arrayreos).then(function(list) {

                            if (list.length == 0) {


                                $scope.showLoading();
                                WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)
                                    .remove([{
                                        contractId: repossessionListContract.json.contractId
                                    }], {})
                                    .then(function(numberOfDocumentsRemoved) {
                                        //handle success
                                        $scope.hideLoading();
                                        repossessionForm.style.visibility = 'hidden';
                                          searchID.style.visibility = 'visible';
                                        listContract.style.visibility = 'visible';
                                        listContractHeader.style.visibility = 'visible';
                                    })
                                    .fail(function(errorObject) {
                                        //handle failure
                                        $scope.hideLoading();
                                    });



                            } else {

                                $scope.local = "" + list[0].json.repossessionId;
                                if ($scope.local != undefined) {
                                    $scope.local = $scope.local.toString();
                                }
                                repossessionListContract.json.repossessionId = $scope.local;
                                var optionCancelJson = {};

                                optionCancelJson = {
                                    "repossessionId": repossessionListContract.json.repossessionId,
                                    "contractId": repossessionListContract.json.contractId,
                                };


                                $scope.tempCancelJson = optionCancelJson;

                                $scope.showLoading();
                                //                			        	 var database = WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME);
                                //                		                    database.add($scope.tempRepossesion).then(
                                //                		                        function() {
                                //
                                //                		           	        	 WL.JSONStore.get(REPOSESSION_ONLINE_COLLECTION_NAME).add($scope.tempRepossesion).then(function(data) {




                                //							hit server
                                var resourceRequest = new WLResourceRequest("/adapters/cancelRepossesion/repossesion/cancel", WLResourceRequest.POST);
                                resourceRequest.setHeader("Content-Type", "application/json");
                                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                                resourceRequest.send([$scope.tempCancelJson]).then($scope.cancelReppssesstionOK, $scope.cancelReppssesstionCancel);

                            }




                        }).fail(function(error) {

                            $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                        });
                } else {
                    var optionCancelJson = {};

                    optionCancelJson = {
                        "repossessionId": repossessionListContract.json.repossessionId,
                        "contractId": repossessionListContract.json.contractId,
                    };


                    $scope.tempCancelJson = optionCancelJson;

                    $scope.showLoading();
                    //                			        	 var database = WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME);
                    //                		                    database.add($scope.tempRepossesion).then(
                    //                		                        function() {
                    //
                    //                		           	        	 WL.JSONStore.get(REPOSESSION_ONLINE_COLLECTION_NAME).add($scope.tempRepossesion).then(function(data) {




                    //							hit server
                    var resourceRequest = new WLResourceRequest("/adapters/cancelRepossesion/repossesion/cancel", WLResourceRequest.POST);
                    resourceRequest.setHeader("Content-Type", "application/json");
                    resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                    resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                    resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                    resourceRequest.send([$scope.tempCancelJson]).then($scope.cancelReppssesstionOK, $scope.cancelReppssesstionCancel);


                }



            };

            $scope.cancelReppssesstionOK = function(response) {
                $scope.hideLoading();
                if (response.responseJSON[0].responseCode!= "200"){
                	
                    $rootScope.showAlert(AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                    return;

                }
                $rootScope.showAlert("" + AlertMessages.cancellSuccess, "" + AlertMessages.alertTitile);
                repossessionForm.style.visibility = 'hidden';
                searchID.style.visibility = 'visible';
                listContract.style.visibility = 'visible';
                listContractHeader.style.visibility = 'visible';
                $scope.arraycancel = [{
                    contractId: repossessionListContract.json.contractId
                }]


                WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)
                    .remove($scope.arraycancel, {})
                    .then(function(numberOfDocumentsRemoved) {
                        //handle success
                        $scope.hideLoading();
                    })
                    .fail(function(errorObject) {
                        //handle failure
                        $scope.hideLoading();
                    });


            }
            $scope.cancelReppssesstionCancel = function(response) {
            	$scope.hideLoading();
            	if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                    $rootScope.sessionTimeOutMessage();
                    return;
                }
                if (response.status == 404 || response.status == 0 || response.status == 500) {
                    $rootScope.showAlert(AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                    $scope.hideLoading();
                    return;
                }
                
                $rootScope.sessionTimeOutCalled = false;
            }
            $rootScope.dpdValue='';



            $scope.viewReposseFormList = function(contractList) {
            $rootScope.dpdValue=contractList.json.dpd;
                $scope.clearDataRepos();
                $rootScope.bidderContractList = contractList;
                $scope.array = [{
                    contractId: contractList.json.contractId
                }]
                // $scope.array = [{status:"Approved"},{status:"Reject"},{status:"Pending"}]
                WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)
                    .find($scope.array).then(function(list) {
                        if (list.length === 0) {
                            isVisibility = false;
                            $rootScope.indicesRepossLocal = contractList;
                            repossessionForm.style.visibility = 'visible';
                                             searchID.style.visibility = 'hidden';
                            listContract.style.visibility = 'hidden';
                            listContractHeader.style.visibility = 'hidden';
                            bidderImage.style.display = 'none';
                            viewbidder.style.display = 'none';
                            formId.style.marginTop = '3%';
                            statusView.style.display = 'none';
                            approvedView.style.display = 'none';
                            save_reposButton.style.display = 'block';
                            document.getElementById("attachmentHide").style.display = "block";
                            //save_reposButton.disabled = false;
                            save_cancelButton.style.display = 'none';
                             $("#cancelRepoMsgDiv").hide();
                             $("#attachAndCheckInDiv").show();
                            $scope.enableInputs();
                            //  cancelRepossession.style.visibility='hidden';
                            var d = new Date();
                            datestring = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                            timeString = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                            dateTimeString = "" + datestring + " " + timeString;
                            $rootScope.reposData.reposs_curruntDate = dateTimeString;
                            $scope.myCurrDate = new Date();
                            //   $rootScope.reposData.reposs_DisplaycurruntDate = $filter('date')(new Date($rootScope.reposData.reposs_curruntDate), 'dd-MM-yyyy h:mm');
                            /*document.getElementById("button_save").visibility = visible;
	                                            	 document.getElementById("button_repos").visibility = hidden;*/
                            $scope.timer = $timeout($scope.timerMethod, 100);

                            $scope.showDataIfSavedInSyncDB(contractList);

                            //$rootScope.showAlert(""+AlertMessages.noRecordDraft,""+AlertMessages.alertTitile);
                        } else {
                            $scope.statusCheck = "";
                            try {
                                $scope.statusCheck = $rootScope.statusMap[contractList.json.contractId];

                            } catch (e) {
                            	$exceptionHandler(e, " ");
                            }
                            if($rootScope.isRepoClickFromNoti && $scope.statusCheck == "REJECT"){

                               for (var i =0; i< list.length ; i++){

                                            if($rootScope.rejectReposIdNoti == list[i].json.repossessionId){
                                                        list[0] = list[i];
                                            }
                                }
                            }else{
                                  for (var i =0; i< list.length ; i++){

                                     if( list[i].json.status == "APPROVED"){
                                                 list[0] = list[i];
                                                 break;
                                     }else{
                                             list[0] = list[list.length-1];
                                      }
                                 }
                             }

                            if (list[0].json.status === "REJECT" || list[0].json.status === "PENDING" || list[0].json.status === "NOTOK" || list[0].json.status === "NOK") {
                                $rootScope.indicesRepossLocal = contractList;
                                isVisibility = true;


                                if (list[0].json.status === "PENDING") {
                                    save_reposButton.style.display = 'none';
                                    document.getElementById("attachmentHide").style.display = "none";

                                    save_cancelButton.style.display = 'block';
                                    $("#cancelRepoMsgDiv").show();
                                    $("#attachAndCheckInDiv").hide();
                                }
                                repossessionForm.style.visibility = 'visible';
                                             searchID.style.visibility = 'hidden';
                                listContract.style.visibility = 'hidden';
                                listContractHeader.style.visibility = 'hidden';
                                bidderImage.style.display = 'none';
                                viewbidder.style.display = 'none';
                                formId.style.marginTop = '2%'
                                statusView.style.display = 'flex';
                                approvedView.style.display = 'block';
                                if (list[0].json.status === "REJECT") {
                                    save_reposButton.style.display = 'block';
                                    document.getElementById("attachmentHide").style.display = "block";
                                    save_cancelButton.style.display = 'none';
                                    $("#cancelRepoMsgDiv").hide();
                                    $("#attachAndCheckInDiv").show();
                                    $scope.enableInputs();
                                    isVisibility = false;

                                }
                                //statusView.style.marginTop = '3%';
                                //approvedView.style.marginTop = '3%';
//                                 if ($rootScope.deviceLang == 'vi') {
//                                                                  $rootScope.approvedViewValue = list[0].json.displayStatusVn;
//                                                                  if($rootScope.approvedViewValue == undefined || $rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
//                                                                  $rootScope.approvedViewValue=Messages.status_Pendi_descri;
//                                                                  }
//                                                                 }
//                                                                 else{
//                                                                 $rootScope.approvedViewValue = list[0].json.displayStatusEn;
//                                                                  if($rootScope.approvedViewValue == undefined ||$rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
//                                                                     $rootScope.approvedViewValue=Messages.status_Pendi_descri;
//                                                                   }
//                                                                 }




                                setTimeout(function() {
                                    $scope.showStatusFromNotificationReposs();
                                }, 200);
                                $scope.timer = $timeout($scope.timerMethod, 100);

                            } else {
                                isVisibility = true;

                                $rootScope.indicesRepossLocal = contractList;
                                repossessionForm.style.visibility = 'visible';
                                             searchID.style.visibility = 'hidden';
                                listContract.style.visibility = 'hidden';
                                listContractHeader.style.visibility = 'hidden';
                                bidderImage.style.display = 'flex';
                                viewbidder.style.display = 'block';
                                formId.style.marginTop = '2%'
                                statusView.style.display = 'flex';
                                approvedView.style.display = 'block';
                                save_reposButton.style.display = 'none';
                                document.getElementById("attachmentHide").style.display = "none";
                                save_cancelButton.style.display = 'none';
                                 $("#cancelRepoMsgDiv").hide();
                                 $("#attachAndCheckInDiv").show();
                                //save_reposButton.disabled = true;
                                /*document.getElementById("button_save").visibility = hidden;
	                                           	    document.getElementById("button_repos").visibility = visible;*/

	                             if ($rootScope.deviceLang == 'vi') {
                                                                  $rootScope.approvedViewValue = list[0].json.displayStatusVn;
                                                                 }
                                                                 else{
                                                                 $rootScope.approvedViewValue = list[0].json.displayStatusEn;
                                                                 }



                                setTimeout(function() {
                                    $scope.showStatusFromNotificationReposs();
                                }, 200);

                                $scope.timer = $timeout($scope.timerMethod, 100);
                                statusView.style.marginTop = '0%';
                                approvedView.style.marginTop = '0%';
                            }


                            repossessionListContract = list[0];
                            if($rootScope.isRepoClickFromNoti){
                                if(repossessionListContract.json.repossessionId == null || repossessionListContract.json.repossessionId == "" || repossessionListContract.json.repossessionId == undefined) {
                                     repossessionListContract.json.repossessionId =    $rootScope.rejectReposIdNoti;
                                 }
                            }

                            if ($rootScope.ContractRepossissionIdMap != undefined) {
                                for (var contrepmapInd = 0; contrepmapInd < $rootScope.ContractRepossissionIdMap.length; contrepmapInd++) {
                                    if ($rootScope.ContractRepossissionIdMap[contrepmapInd].json.contractId === repossessionListContract.json.contractId) {
                                       if(repossessionListContract.json.repossessionId == null || repossessionListContract.json.repossessionId == "" || repossessionListContract.json.repossessionId == undefined) {
                                            repossessionListContract.json.repossessionId = $rootScope.ContractRepossissionIdMap[contrepmapInd].json.repossessionId;
                                        }
                                    }
                                }

                            }

                            $scope.statusCheck = "";
                            try {
                                $scope.statusCheck = $rootScope.statusMapRepo[repossessionListContract.json.contractId][repossessionListContract.json.repossessionId];
                                $scope.statusCheck  =$scope.statusCheck.status;
                            } catch (e) {
                            	$exceptionHandler(e, " ");
                            }

                            if ( (repossessionListContract.json.status === "REJECT" || $scope.statusCheck === "REJECT" )  && $rootScope.isRepoClickFromNoti == false )  {
                                //$rootScope.approvedViewValue = "REJECT";
                               // setTimeout(function() {
                                    //$scope.showStatusFromNotificationReposs(); // already called above
                                    $("#statusView").hide();
                               // }, 300);
                            } else {
                                repossessionSubmitDetail(repossessionListContract);
                            }
//                            if(repossessionListContract.json.status == "PENDING" && $rootScope.isRepoClickFromNoti == false && list.length > 1 ){
//
//                                statusView.style.display = 'flex';
//
//                                repossessionSubmitDetail(repossessionListContract);
//                            }
                            $scope.timer = $timeout($scope.timerMethod, 100);

                        }

                        $scope.addCustAddressToAddrTypeList();
                    }).fail(function(error) {

                        $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                    });




            }

            $scope.showDataIfSavedInSyncDB = function(contractList) {

                $scope.array = [{
                    contractId: contractList.json.contractId
                }]

                WL.JSONStore.get(REPOSSESSION_COLLECTION_SYNC)
                    .find($scope.array).then(function(list) {
                        if (list.length != 0) {

                             $scope.statusCheck = "";
                            try {
                                $scope.statusCheck = $rootScope.statusMap[contractList.json.contractId];

                            } catch (e) {
                            	$exceptionHandler(e, " ");
                            }
                            if($rootScope.isRepoClickFromNoti && $scope.statusCheck == "REJECT"){

                               for (var i =0; i< list.length ; i++){

                                            if($rootScope.rejectReposIdNoti == list[i].json.repossessionId){
                                                        list[0] = list[i];
                                            }
                                }
                            }else{
                                  for (var i =0; i< list.length ; i++){

                                     if( list[i].json.status == "APPROVED"){
                                                 list[0] = list[i];
                                                 break;
                                     }else{
                                             list[0] = list[list.length-1];
                                      }
                                 }
                             }

                            if (list[0].json.status === "REJECT" || list[0].json.status === "PENDING" || list[0].json.status === "NOTOK" || list[0].json.status === "NOK") {
                                $rootScope.indicesRepossLocal = contractList;
                                isVisibility = true;


                                if (list[0].json.status === "PENDING") {
                                    save_reposButton.style.display = 'none';
                                    document.getElementById("attachmentHide").style.display = "none";

                                    save_cancelButton.style.display = 'block';
                                    $("#cancelRepoMsgDiv").show();
                                    $("#attachAndCheckInDiv").hide();
                                }
                                repossessionForm.style.visibility = 'visible';
                                             searchID.style.visibility = 'hidden';
                                listContract.style.visibility = 'hidden';
                                listContractHeader.style.visibility = 'hidden';
                                bidderImage.style.display = 'none';
                                viewbidder.style.display = 'none';
                                formId.style.marginTop = '2%'
                                statusView.style.display = 'flex';
                                approvedView.style.display = 'block';
                                if (list[0].json.status === "REJECT") {
                                    save_reposButton.style.display = 'block';
                                    document.getElementById("attachmentHide").style.display = "block";
                                    save_cancelButton.style.display = 'none';
                                    $("#cancelRepoMsgDiv").hide();
                                    $("#attachAndCheckInDiv").show();
                                    $scope.enableInputs();
                                    isVisibility = false;

                                }
                                //statusView.style.marginTop = '3%';
                                //approvedView.style.marginTop = '3%';

 if ($rootScope.deviceLang == 'vi') {
                                  $rootScope.approvedViewValue = list[0].json.displayStatusVn;
                                  if($rootScope.approvedViewValue == undefined || $rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
                                  $rootScope.approvedViewValue=Messages.status_Pendi_descri;
                                  }
                                 }
                                 else{
                                 $rootScope.approvedViewValue = list[0].json.displayStatusEn;
                                  if($rootScope.approvedViewValue == undefined ||$rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
                                     $rootScope.approvedViewValue=Messages.status_Pendi_descri;
                                   }
                                 }


                                setTimeout(function() {
                                    $scope.showStatusFromNotificationReposs();
                                }, 200);
                                $scope.timer = $timeout($scope.timerMethod, 100);

                            } else {
                                isVisibility = true;

                                $rootScope.indicesRepossLocal = contractList;
                                repossessionForm.style.visibility = 'visible';
                                             searchID.style.visibility = 'hidden';
                                listContract.style.visibility = 'hidden';
                                listContractHeader.style.visibility = 'hidden';
                                bidderImage.style.display = 'flex';
                                viewbidder.style.display = 'block';
                                formId.style.marginTop = '2%'
                                statusView.style.display = 'flex';
                                approvedView.style.display = 'block';
                                save_reposButton.style.display = 'none';
                                document.getElementById("attachmentHide").style.display = "none";
                                save_cancelButton.style.display = 'none';
                                 $("#cancelRepoMsgDiv").hide();
                                 $("#attachAndCheckInDiv").show();
                                //save_reposButton.disabled = true;
                                /*document.getElementById("button_save").visibility = hidden;
                                                    document.getElementById("button_repos").visibility = visible;*/
                                if ($rootScope.deviceLang == 'vi') {
                                                                 $rootScope.approvedViewValue = list[0].json.displayStatusVn;
                                                                }
                                                                else{
                                                                $rootScope.approvedViewValue = list[0].json.displayStatusEn;
                                                                }


                                setTimeout(function() {
                                    $scope.showStatusFromNotificationReposs();
                                }, 200);

                                $scope.timer = $timeout($scope.timerMethod, 100);
                                statusView.style.marginTop = '0%';
                                approvedView.style.marginTop = '0%';
                            }


                            repossessionListContract = list[0];
                            if($rootScope.isRepoClickFromNoti){
                                if(repossessionListContract.json.repossessionId == null || repossessionListContract.json.repossessionId == "" || repossessionListContract.json.repossessionId == undefined) {
                                     repossessionListContract.json.repossessionId =    $rootScope.rejectReposIdNoti;
                                 }
                            }

                            if ($rootScope.ContractRepossissionIdMap != undefined) {
                                for (var contrepmapInd = 0; contrepmapInd < $rootScope.ContractRepossissionIdMap.length; contrepmapInd++) {
                                    if ($rootScope.ContractRepossissionIdMap[contrepmapInd].json.contractId === repossessionListContract.json.contractId) {
                                       if(repossessionListContract.json.repossessionId == null || repossessionListContract.json.repossessionId == "" || repossessionListContract.json.repossessionId == undefined) {
                                            repossessionListContract.json.repossessionId = $rootScope.ContractRepossissionIdMap[contrepmapInd].json.repossessionId;
                                        }
                                    }
                                }

                            }

                            $scope.statusCheck = "";
                            try {
                                $scope.statusCheck = $rootScope.statusMapRepo[repossessionListContract.json.contractId][repossessionListContract.json.repossessionId];
                                $scope.statusCheck=$scope.statusCheck.status;
                            } catch (e) {
                            	$exceptionHandler(e, " ");
                            }

                            if ( (repossessionListContract.json.status === "REJECT" || $scope.statusCheck === "REJECT" )  && $rootScope.isRepoClickFromNoti == false )  {
                                //$rootScope.approvedViewValue = "REJECT";
                               // setTimeout(function() {
                                    //$scope.showStatusFromNotificationReposs(); // already called above
                                    $("#statusView").hide();
                               // }, 300);
                            } else {
                                repossessionSubmitDetail(repossessionListContract);
                            }
//                            if(repossessionListContract.json.status == "PENDING" && $rootScope.isRepoClickFromNoti == false && list.length > 1 ){
//
//                                statusView.style.display = 'flex';
//
//                                repossessionSubmitDetail(repossessionListContract);
//                            }
                            $scope.timer = $timeout($scope.timerMethod, 100);

                        }

                        $scope.addCustAddressToAddrTypeList();
                    }).fail(function(error) {

                        $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                    });




            }



            $scope.saveRepossessionDataForSync = function() {

                WL.JSONStore.get(REPOSSESSION_COLLECTION_SYNC).add($scope.tempRepossesion).then(function(data) {
                    //
                }).fail(function(error) {

                });
            }

            $scope.saveRepossessionAttachDataForSync = function() {
                
                var isAndroid = ionic.Platform.isAndroid();
                

                for (var i = 0; i < $rootScope.reposData.attachedFilesLinkRepos.length; i++) {
                
                    if (isAndroid) {

                        $scope.attachObjForSyncRepos = {


                            "attachmentData": $rootScope.reposData.attachedFilesLinkRepos[i].split(",")[1],
                            "attachmentType": $rootScope.reposData.fileType[i],
                            "repossessionId": $rootScope.repossDataId,
                            "contractId": $rootScope.indicesRepossLocal.json.contractId,
                            "attachmentName": $rootScope.reposData.filenamefull[i]

                        }
                
                    }else{
                            $scope.attachObjForSyncRepos = {
                            
                            
                            "attachmentData": $rootScope.reposData.attachedFilesLinkRepos[i],
                            "attachmentType": $rootScope.reposData.fileType[i],
                            "repossessionId": $rootScope.repossDataId,
                            "contractId": $rootScope.indicesRepossLocal.json.contractId,
                            "attachmentName": $rootScope.reposData.filenamefull[i]
                            
                            }

                
                    }


                    WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_SYNC).add($scope.attachObjForSyncRepos).then(function(data) {
                        //
                    }).fail(function(error) {

                    });

                }
                $rootScope.reposData.attachedFilesLinkRepos = [];
                $rootScope.reposData.filenamefull = [];
                $rootScope.reposData.fileType = [];
            }


            $scope.saveSyncForRepossessionId = function() {


                $scope.attachObjForSyncId = {

                    "repossessionId": $rootScope.repossDataId,
                    "contractId": $rootScope.indicesRepossLocal.json.contractId,


                }

                WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID).findAll().then(function(data) {
                    if (data.length > 0) {
                        var isUpdateRepIdCalled = false;
                        for (var updateRepId = 0; updateRepId < data.length; updateRepId++) {
                            if (data[updateRepId].json.contractId === $rootScope.indicesRepossLocal.json.contractId) {
                                /* replace repposs id */
                                isUpdateRepIdCalled = true;
                                WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID)

                                    .replace({
                                        _id: data[updateRepId]._id,
                                        json: $scope.attachObjForSyncId
                                    })

                                    .then(function(numberOfDocumentsReplaced) {
                                        WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID).findAll().then(function(data) {
                                            $rootScope.ContractRepossissionIdMap = data;
                                        }).fail(function(error) {

                                        });
                                    }).fail(function(errorObject) {
                                        //handle failure
                                    });
                            }

                        }
                        if (isUpdateRepIdCalled == false) {

                            WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID).add($scope.attachObjForSyncId).then(function(data) {
                                WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID).findAll().then(function(data) {
                                    $rootScope.ContractRepossissionIdMap = data;
                                }).fail(function(error) {

                                });
                            }).fail(function(error) {

                            });

                        }


                    } else {


                        WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID).add($scope.attachObjForSyncId).then(function(data) {
                            WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID).findAll().then(function(data) {
                                $rootScope.ContractRepossissionIdMap = data;
                            }).fail(function(error) {

                            });
                        }).fail(function(error) {

                        });
                    }
                    //
                }).fail(function(error) {

                });




            };
            $scope.updateRepossessionDB = function(repoId) {

                $scope.array = [{
                            contractId: $rootScope.indicesRepossLocal.json.contractId,
                        }]

                WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)
                    .find($scope.array).then(function(data) {

                    if (data.length > 0) {
                          for (var i = 0; i < data.length; i++) {
                            if (data[i].json.repossessionId == undefined) {

                                var json = data[i].json;
                                json.repossessionId = repoId;

                                WL.JSONStore.get(REPOSSESSIONS_COLLECTION_NAME)

                                    .replace({
                                        _id: data[i]._id,
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

                }).fail(function(error) {

                });


            };

            $rootScope.closeRepossessionModule = function() {
            	
            	attachcounterRepos = 0;
                $rootScope.reposData.attachedFilesLinkRepos = [];
                $rootScope.reposData.fileType = [];
                $rootScope.reposData.filenamefull = [];

                if ($rootScope.ReposSelectedFromNoti == true) {
                    $state.go('fECREDIT.notification');
                    $rootScope.ReposSelectedFromNoti = false;

                } else if ($rootScope.IsContractBack == true) {
                    $state.go('fECREDIT.contractInformation');
                    $rootScope.IsContractBack = false;

                } else if (listContract.style.visibility === 'hidden') {
                    $scope.clearFilter();

                } else {

                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $state.go('fECREDIT.home');
                }
            };

            $scope.showStatusFromNotificationReposs = function() {

               // var arrName = $rootScope.repossessionStatusArr;
                //for (var j = 0; j < arrName.length; j++) {

                   // if (arrName[j].contractId == $rootScope.indicesRepossLocal.json.contractId) {
                        //                        $("#approvedView").html(arrName[j].status);
                        var statusCheck = "";
                        try {
                            statusCheck = $rootScope.statusMapRepo[repossessionListContract.json.contractId][repossessionListContract.json.repossessionId];

                        } catch (e) {
                        	$exceptionHandler(e, " ");
                        }
                           if(statusCheck != "" && statusCheck != undefined){
                           if ($rootScope.deviceLang == 'vi') {
                             $rootScope.approvedViewValue = statusCheck.notificationMessages.vi_message;
                             }
                             else{
                              $rootScope.approvedViewValue = statusCheck.notificationMessages.en_message;
                             }

                              statusCheck=statusCheck.status;
                            }else{
                                  statusCheck = repossessionListContract.json.status;
                                  if ($rootScope.deviceLang == 'vi') {
                                      $rootScope.approvedViewValue = repossessionListContract.json.displayStatusVn;
                                      if($rootScope.approvedViewValue == undefined || $rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
                                           $rootScope.approvedViewValue=Messages.status_Pendi_descri;
                                         }
                                     }
                                     else{
                                      $rootScope.approvedViewValue = repossessionListContract.json.displayStatusEn;
                                      if($rootScope.approvedViewValue == undefined || $rootScope.approvedViewValue=='' || $rootScope.approvedViewValue=='undefined' ){
                                           $rootScope.approvedViewValue=Messages.status_Pendi_descri;
                                         }

                                 }
                            }



                        if (statusCheck == "APPROVED" || statusCheck == "INPROGRESS") {
                            isVisibility = true;


                            repossessionForm.style.visibility = 'visible';
                searchID.style.visibility = 'hidden';
                            listContract.style.visibility = 'hidden';
                            listContractHeader.style.visibility = 'hidden';
                            bidderImage.style.display = 'flex';
                            viewbidder.style.display = 'block';
                            formId.style.marginTop = '2%'
                            statusView.style.display = 'flex';
                            approvedView.style.display = 'block';
                            save_reposButton.style.display = 'none';
                            document.getElementById("attachmentHide").style.display = "none";
                            save_cancelButton.style.display = 'none';
                             $("#cancelRepoMsgDiv").hide();
                             $("#attachAndCheckInDiv").show();
                            // save_reposButton.disabled = true;


                            $scope.timer = $timeout($scope.timerMethod, 100);
                            statusView.style.marginTop = '0%';
                            approvedView.style.marginTop = '0%';

                        }
                        if ( statusCheck == "REJECT" ) {
                            // $rootScope.indicesRepossLocal = contractList;
                            repossessionForm.style.visibility = 'visible';
                searchID.style.visibility = 'hidden';
                            listContract.style.visibility = 'hidden';
                            listContractHeader.style.visibility = 'hidden';
                            bidderImage.style.display = 'none';
                            viewbidder.style.display = 'none';
                            formId.style.marginTop = '2%';
                            statusView.style.display = 'flex';
                            approvedView.style.display = 'block';
                             if( !$rootScope.isRepoClickFromNoti ) {
                                    save_reposButton.style.display = 'block';
                                    document.getElementById("attachmentHide").style.display = "block";
                                    $scope.enableInputs();
                            }else{
                                   save_reposButton.style.display = 'none';
                                    document.getElementById("attachmentHide").style.display = "none";
                            }

                            save_cancelButton.style.display = 'none';
                             $("#cancelRepoMsgDiv").hide();
                             $("#attachAndCheckInDiv").show();
                            isVisibility = false;

                            //  cancelRepossession.style.visibility='hidden';
                            var d = new Date();

                            datestring = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                            timeString = "" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                            dateTimeString = "" + datestring + " " + timeString;
                            $rootScope.reposData.reposs_curruntDate = dateTimeString;
                            //   $rootScope.reposData.reposs_DisplaycurruntDate = $filter('date')(new Date($rootScope.reposData.reposs_curruntDate), 'dd-MM-yyyy h:mm');
                            /*document.getElementById("button_save").visibility = visible;
                                                	 document.getElementById("button_repos").visibility = hidden;*/
                            $scope.timer = $timeout($scope.timerMethod, 100);


                        }
                      //  break;
                    //}

               // }

            }

            $scope.timerMethod = function() {

            }
            $scope.addCustAddressToAddrTypeList = function() {

                $.each($rootScope.addressTypeList, function(i, typeItem) {
                    var mapping = '';
                    $.each($rootScope.addrTypeMapping, function(j, mapItem) {

                        if (typeItem.address == mapItem.addressType) {
                            mapping = mapItem.mapping;
                            return false;
                        }
                        if (mapping == '' && mapItem.addressType == 'OTHER') {
                            mapping = mapItem.mapping;

                        }

                    });
                    $rootScope.addressTypeList[i]["custAddr"] = $rootScope.indicesRepossLocal.json[mapping];
                });
            }


            	$('#reposs_address').on('keyup', function(e) {
            		var mEvent = e || window.event;
            		var mPressed = mEvent.keyCode || mEvent.which;
            		if (mPressed == 13) {
                // On enter, go to next input field
            			document.getElementById('reposs_cust_phone').focus();
            		}
            		return true;
            	});

 				$('#reposs_cust_phone').on('keyup', function(e) {
                    var mEvent = e || window.event;
                    var mPressed = mEvent.keyCode || mEvent.which;
                    if (mPressed == 13) {
                        // On enter, go to next input field
                        document.getElementById('reposs_asstsCondition').focus();
                    }
                    return true;
                });

        		$('#reposs_asstsCondition').on('keyup', function(e) {
                    var mEvent = e || window.event;
                    var mPressed = mEvent.keyCode || mEvent.which;
                    if (mPressed == 13) {
                        // On enter, go to next input field
                        document.getElementById('reposs_financial_assets').focus();
                    }
                    return true;
                });


  				$('#reposs_financial_assets').on('keyup', function(e) {
                    var mEvent = e || window.event;
                    var mPressed = mEvent.keyCode || mEvent.which;
                    if (mPressed == 13) {
                        // On enter, go to next input field
                        document.getElementById('reposs_other_suggestion').focus();

                    }
                    return true;
                });

                 $('#reposs_other_suggestion').on('keyup', function(e) {
                                    var mEvent = e || window.event;
                                    var mPressed = mEvent.keyCode || mEvent.which;
                                    if (mPressed == 13) {
                                    $('#reposs_other_suggestion').filter(':input:focus').blur();
                                    }
                                    return true;
                                });






        })