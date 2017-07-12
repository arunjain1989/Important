
/* JavaScript content from js/app.js in folder common */

/* JavaScript content from js/app.js in folder common */
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular
    .module(
        'app', ['ionic', 'ngCordova', 'app.controllers', 'app.routes',
            'app.directives', 'app.services', 'collectRepeat'
        ])

    .run(
        function($ionicPlatform, $rootScope) {
            $rootScope.isDataForSync = false;
            $rootScope.notificationSaved = [];

            $rootScope.notificationSaved2 = [];
            $rootScope.notificationSaved3 = [];
            $rootScope.notificationSaved4 = [];

            $rootScope.checkInDataSaved = [];
            $rootScope.terminationStatusArr = [];
            $rootScope.repossessionStatusArr = [];
            $rootScope.bidderStatusArr = [];
            $rootScope.statusMap = {};
            $rootScope.statusMapRepo = {};

            $rootScope.termIdFromNoti = '';
            $rootScope.devID = null;
            $rootScope.deviceLang = "";
            $rootScope.deviceOS = "";

            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to
                // show the accessory bar above the keyboard
                // for form inputs)

                WL.Device.getID({
                    onSuccess: function(o) {
                        // console.log("getID: " + o);
                        $rootScope.devID = o.deviceID;
                        // alert(devID);
                    },
                    onFailure: function(e) {
                        // console.log("Error getting ID: " + e);
                        // alert(e);
                    }
                });
                $rootScope.deviceLang = WL.App.getDeviceLanguage();
                if (ionic.Platform.isIOS()) {
                    $rootScope.deviceOS = "iOS";
                    ionic.Platform.fullScreen();
                } else if (ionic.Platform.isAndroid()) {
                    $rootScope.deviceOS = "Android";
                } else if (ionic.Platform.isWindowsPhone()) {
                    $rootScope.deviceOS = "Windows";
                }


                if (window.cordova && window.cordova.plugins &&
                    window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard
                        .hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.show();
                    StatusBar.styleDefault();
                }
            });
        })
    .run(
        function($rootScope, $ionicHistory, $state, $timeout, $ionicPopup, $ionicLoading, utilFactory, $exceptionHandler, $ionicScrollDelegate) {
            //

            if (WL.App.getDeviceLanguage() == 'vi') {
                setVietnam();
            }
            var searchException = 0;
            var userInput = '';
            $rootScope.assignedDateStr = Messages.assignedDate;
            $rootScope.actionDateStr = Messages.actionDate;

            $rootScope.contInformation = Messages.contInformation;
            $rootScope.custInformation = Messages.custInformation;
            $rootScope.contInfoSubHeader = Messages.contInfoSubHeader;
            $rootScope.loanInfoSubHeader = Messages.loanInfoSubHeader;
            $rootScope.otherInfoSubHeader = Messages.otherInfoSubHeader;
            $rootScope.dueInformation = Messages.dueInformation;
            $rootScope.contractIdStringInSearch = Messages.contractId;
            $rootScope.APP_ACCOUNTNO = Messages.APP_ACCOUNTNO;
            $rootScope.APPL_ID = Messages.APPL_ID;
            $rootScope.BROTHER_IN_LAW_NO = Messages.BROTHER_IN_LAW_NO;
            $rootScope.BROTHER_NO = Messages.BROTHER_NO;
            $rootScope.CLOSE_RELATIVE = Messages.CLOSE_RELATIVE;
            $rootScope.DAUGHTER_NO = Messages.DAUGHTER_NO;
            $rootScope.Field_UW = Messages.Field_UW;
            $rootScope.FRIEND_NO = Messages.FRIEND_NO;
            $rootScope.INST_PAID_NUM = Messages.INST_PAID_NUM;
            $rootScope.ISSKIPTRACER = Messages.ISSKIPTRACER;
            $rootScope.LAST_PAYMENT_AMOUNT = Messages.LAST_PAYMENT_AMOUNT;
            $rootScope.LAST_PAYMENT_DATE = Messages.LAST_PAYMENT_DATE;
            $rootScope.OFF_DISTRICT = Messages.OFF_DISTRICT;
            $rootScope.OTHER_RELATIVE_NO = Messages.OTHER_RELATIVE_NO;
            $rootScope.SISTER_NO = Messages.SISTER_NO;
            $rootScope.SON_NO = Messages.SON_NO;
            $rootScope.STATUS = Messages.STATUS;
            $rootScope.TOTAL_CHARGES_OVERDUE = Messages.TOTAL_CHARGES_OVERDUE;
            $rootScope.TOTAL_PAID_AMOUNT = Messages.TOTAL_PAID_AMOUNT;
            $rootScope.UNCLE_NO = Messages.UNCLE_NO;
            $rootScope.custContId = Messages.custContId;
            $rootScope.custFullName = Messages.custFullName;
            $rootScope.idCardNum = Messages.idCardNum
            $rootScope.title_message = Messages.title_message;
            $rootScope.notification_message = Messages.notification_message;
            $rootScope.fromdate = Messages.fromdate;
            $rootScope.todate = Messages.todate;

            $rootScope.quickSearchtitle = Messages.quickSearchtitle;
            $rootScope.advanceSearchtitle = Messages.advanceSearchtitle;
            $rootScope.enterKeyTitle = Messages.enterKeyTitle;
            $rootScope.FilterConditiontitle = Messages.FilterConditiontitle;
            $rootScope.contractId = Messages.contractId;
            $rootScope.customerId = Messages.customerId;
            $rootScope.customerName = Messages.customerName;
            $rootScope.AddressTitile = Messages.AddressTitile;
            $rootScope.filterFormulaTitle = Messages.filterFormulaTitle;
            $rootScope.equalTitle = Messages.equalTitle;
            $rootScope.NotEqualTitle = Messages.NotEqualTitle;
            $rootScope.endWithTitle = Messages.endWithTitle;
            $rootScope.includeTitle = Messages.includeTitle;
            $rootScope.notIncludeTitle = Messages.notIncludeTitle;
            $rootScope.ifAnyTitle = Messages.ifAnyTitle;
            $rootScope.addressTypetitle = Messages.addressTypetitle;
            $rootScope.currentTitle = Messages.currentTitle;
            $rootScope.permanent = Messages.permanent;
            $rootScope.work = Messages.work;

            $rootScope.searchBtn = Messages.searchBtn;
            $rootScope.searchTextBlack = false;


            $rootScope.sideMenuEnableClass = "sideMenuShown";
            $rootScope.locationAccess = function() {


            	if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function(position) {

                          latitudeAuth=position.coords.latitude.toString();
                              longitudeAuth=position.coords.longitude.toString();

                        },
                        function(error) {
                            switch (error.code) {

                                case error.POSITION_UNAVAILABLE:
                                   
                                    
                                    break;

                                case error.PERMISSION_DENIED:

                                 
                                    break;

                                case error.TIMEOUT:

                                  
                                   

                                    break;

                                case error.UNKNOWN_ERROR:

                                   
                                    break;


                                default:

                                    
                                    break;



                            }
                        }, {
                            enableHighAccuracy: false,
                            timeout: 30000,
                            maximumAge: 180000

                        }
                    );
                }


            }

            $rootScope.locationAccess();



            $rootScope.closeContractModule = function() {
                // alert("I'm global function!");
                $rootScope.recordData = {};
                $rootScope.recordData.checkIn = {};
                $rootScope.recordData.attachcounter = 0;
                $rootScope.recordData.attachedFilesLink = [];
                $rootScope.recordData.fileType = [];
                $rootScope.recordData.filenamefull = [];
                $("#addvalue").html("");
                $("#addvalueRepos").html("");
                $rootScope.recordData.attachcounterRepos = 0;
                $rootScope.reposData = {};
                $rootScope.reposData.checkIn = {};
                $rootScope.reposData.attachedFilesLinkRepos = [];
                $rootScope.reposData.fileType = [];
                $rootScope.reposData.filenamefull = [];
                $rootScope.recordData.contactDate = '';
                $rootScope.recordData.contactTime = '';
                $rootScope.recordData.personContacted = Messages.selectButton;
                $rootScope.recordData.actionCode = Messages.selectButton;
                $rootScope.recordData.placeContacted = Messages.selectButton;
                $rootScope.recordData.contactMode = Messages.selectButton;
                $rootScope.recordData.reminderMode = Messages.selectButton;
                $rootScope.recordData.nextActionDate = '';
                $rootScope.recordData.ptpAmount = '';
                $rootScope.recordData.remark = '';
                $rootScope.recordData.checkIn.addressType = '';
                $rootScope.recordData.checkIn.latLong = '';
                $rootScope.reposData.checkIn.addressType = '';
                $rootScope.reposData.checkIn.latLong = '';
                $rootScope.contractSideMenuFlag = false;
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                // $ionicHistory.clearHistory();
                $rootScope.stackCursorPosition = 0;

                $state.go('fECREDIT.home');
            };


            $rootScope.closeContractSidePanel = function() {
                $rootScope.contractSideMenuFlag = false;
                $state.go('fECREDIT.contract');
            }

            $rootScope.toggleContractSidePanel = function() {




                if ($rootScope.contractSideMenuFlag) { // to hide

                    $rootScope.contractSideMenuFlag = false;
                } else { // to show

                    $rootScope.contractSideMenuFlag = true;
                }
            };
            // hideSidePanelOnClick()
            $rootScope.hideSidePanelOnClick = function(link) {

                if ($rootScope.contractSideMenuFlag) { // to hide
                    $rootScope.contractSideMenuFlag = false;
                } else { // to show
                    $rootScope.contractSideMenuFlag = true;
                }

                switch (link) {
                    case 1:
                        link = 'fECREDIT.contractInformation';
                        break;
                    case 2:
                        link = 'fECREDIT.customerInformation';
                        break;
                    case 3:
                        link = 'fECREDIT.contactInformation';
                        break;
                    case 4:
                        link = 'fECREDIT.loanInformation';
                        break;
                    case 5:
                        link = 'fECREDIT.otherInformation';
                        break;
                    case 6:
                        link = 'fECREDIT.dueInformation';

                }

                $state.go(link);
            };




            $rootScope.isInternetConnected = function() {
                if ((navigator.network.connection.type).toUpperCase() != "NONE" &&
                    (navigator.network.connection.type)
                    .toUpperCase() != "UNKNOWN") {
                    // alert("online");
                    return true;
                } else { // alert("offline");
                    return false;
                }
            }

            $rootScope.showAlert = function(message, title) {
                if(doublePopUp==1){
                return;
                }
                doublePopUp=1;
                    navigator.notification.alert(message, // message
                        alertDismissed, // callback
                        title, // title
                        Messages.okButton // buttonName
                    );

                    function alertDismissed() {
                        doublePopUp=0;
                    }
                };

                  $rootScope.showAlertSession = function(message, title) {

                  if(isSesstionTimePopUpCalled > 1){
                  return;
                  }
                                navigator.notification.alert(message, // message
                                    alertDismissedSession, // callback
                                    title, // title
                                    Messages.okButton // buttonName
                                );

                                function alertDismissedSession() {

                                }
                            };
                


            $rootScope.Searchunpaid = function() {
                $rootScope.IsHidden = true;
                $rootScope.quickhide = false;
                $rootScope.advancehide = true;
                $rootScope.quickview = "withclick";
                $rootScope.advanceview = "withoutclick";

                var myPopup = $ionicPopup.show({

                    title: '<input type="password" ng-model="data.wifi">',
                    templateUrl: 'templates/search.html',
                    cssClass: 'ptppop',
                    /*scope: $rootScope,*/


                });


                $rootScope.closebuttonRepossFunc = function() {

                    try {
                        repossessionForm.style.visibility = 'hidden';
                        listContract.style.visibility = 'visible';
                        listContractHeader.style.visibility = 'visible';
                        bidderImage.style.display = 'flex';
                        viewbidder.style.display = 'none';
                        formId.style.marginTop = '3%';
                        statusView.style.display = 'none';
                        approvedView.style.display = 'none';
                    } catch (e) {
                    	$exceptionHandler(e, " close button repossession ");
                    }

                };


                $rootScope.formulaSelected = function(formulaSelected, id) {
                    id = "#filt" + id;
                    if ($(id).hasClass('filterSelected')) {
                        $(id).removeClass('filterSelected');
                    } else {

                        for (var i = 7; i < 13; i++) {
                            var idd = "#filt" + i;
                            $(idd).removeClass('filterSelected');
                        }

                        $(id).addClass('filterSelected');
                    }
                    $rootScope.formula = formulaSelected;
                    $rootScope.addressdropdownview = true;
                    $rootScope.filterdropdownview = true;
                };
                $rootScope.filterSelected = function(filter, index) {
                    id = "#filt" + index;
                    if ($(id).hasClass('filterSelected')) {
                        $(id).removeClass('filterSelected');
                    } else {
                        if (index <= 6) {
                            for (var i = 1; i < 7; i++) {
                                var idd = "#filt" + i;
                                $(idd).removeClass('filterSelected');
                            }
                        } else if (index >= 13) {
                            for (var i = 13; i < 16; i++) {
                                var idd = "#filt" + i;
                                $(idd).removeClass('filterSelected');
                            }
                        }

                        $(id).addClass('filterSelected');
                    }
                    $rootScope.advanceColumn = filter;
                    $rootScope.formuladropdownview = true;
                };




                $rootScope.closebutton = function() {
                    $rootScope.closebuttonRepossFunc();
                    myPopup.close();


                }


                $rootScope.quickbuttonclick = function() {


                    $rootScope.quickhide = false;
                    $rootScope.advancehide = true;
                    $rootScope.quickview = "withclick";
                    $rootScope.advanceview = "withoutclick";


                }

                $rootScope.advancebuttonclick = function() {

                    $rootScope.formula = 6;
                    $rootScope.quickview = "withoutclick";
                    $rootScope.advanceview = "withclick";


                    $rootScope.quickhide = true;

                    $rootScope.advancehide = false;



                }
                $rootScope.formuladropdownview = true;
                $rootScope.addressdropdownview = true;
                $rootScope.filterdropdownview = true;

                $rootScope.filterconditionclick = function() {

                    $rootScope.filterdropdownview = $rootScope.filterdropdownview ? false : true;


                };



                $rootScope.filterformulaclick = function() {

                    $rootScope.formuladropdownview = $rootScope.formuladropdownview ? false : true;

                };



                $rootScope.addresstypeclick = function() {

                    $rootScope.addressdropdownview = $rootScope.addressdropdownview ? false : true;

                };

                $rootScope.closebuttonFunc = function() {

                    myPopup.close();
                    var listContract = document.getElementById("listContractmap");
                    var map = document.getElementById("googleMap");
                    map.style.visibility = 'hidden';
                    listContract.style.visibility = 'visible';


                };


                $rootScope.advanceColumn = 'firstName';
                $rootScope.formula = 6;
                $rootScope.advanceSearch = function(valueData) {
                    $ionicLoading.show({
                        template: AlertMessages.loadingDialougeSearch
                    });
                    if ($rootScope.formula === 1) {
                        $rootScope.advanceQuery = [WL.JSONStore.QueryPart().equal($rootScope.advanceColumn, valueData)];
                    } else if ($rootScope.formula === 2) {
                        $rootScope.advanceQuery = [WL.JSONStore.QueryPart().notEqual($rootScope.advanceColumn, valueData)];
                    } else if ($rootScope.formula === 3) {
                        $rootScope.advanceQuery = [WL.JSONStore.QueryPart().rightLike($rootScope.advanceColumn, valueData)];
                    } else if ($rootScope.formula === 4) {
                        $rootScope.advanceQuery = [WL.JSONStore.QueryPart().like($rootScope.advanceColumn, valueData)];
                    } else if ($rootScope.formula === 5) {
                        $rootScope.advanceQuery = [WL.JSONStore.QueryPart().notLike($rootScope.advanceColumn, valueData)];
                    } else {
                        $rootScope.advanceQuery = [WL.JSONStore.QueryPart().like('firstName', valueData),
                            WL.JSONStore.QueryPart().like('contractId', valueData),
                            WL.JSONStore.QueryPart().like('idIssueDate', valueData),
                            WL.JSONStore.QueryPart().like('lastName', valueData)
                        ];
                    }




                    $rootScope.options = {
                        exact: false,
                        // limit: 10
                    };


                    /*  WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)
                      .advancedFind($rootScope.advanceQuery, $rootScope.options)

                      .then(function (arrayResults) {
                      	 $rootScope.formula= 6;
                      	$ionicLoading.hide();
                      	   if (arrayResults.length==0) {
                          		 $rootScope.nextDiv = false;
                          		 $rootScope.previousDiv = false;
                          		 $rootScope.showAlert(""+AlertMessages.noResultsFound, ""+AlertMessages.alertTitile);

                          	}else if(arrayResults.length == 1){
                                                                           	 $rootScope.nextDiv = false;
                                                                              $rootScope.previousDiv = false;
                               }else{
                                                                           		 $rootScope.nextDiv = true;
                                                                                 $rootScope.previousDiv = false;
                                }

                          	 $rootScope.contractList = arrayResults;
                          	   $rootScope.unpaidIndex = 0;
                          	    $rootScope.paidIndex = 0;
                          	    $rootScope.ptpIndex=0;



                          	    try{

                          	     $rootScope.termFormPart1 = false;
                                                          $rootScope.listContract = true;
                                                          $rootScope.termListHeader = true;
                                                          $rootScope.termFormPart2 = false;

                          	    }catch(e){

                          	    }


                          	 $rootScope.closebutton();
                          	 try{
                          	 $rootScope.closebuttonFunc();
                          	 }catch(e){

                          	 }
                      })*/

                    /* javascript search starts */
                    userInput = valueData;
                    $rootScope.contractList = [];
                    var key = $rootScope.advanceColumn;

                    $.each($rootScope.mainContractList, function(i, cont) {
                        searchException = 0;

                        try {
                            var valueToBeSearched = utilFactory.removeDiacritics(cont.json[key] + "");

                            valueToBeSearched = valueToBeSearched.toLowerCase();
                            if(key=="assignedDate" || key=="nextActionDate"){
                                                valueToBeSearched = valueToBeSearched.split("-").reverse().join("-");
                                                }

                            valueData = utilFactory.removeDiacritics(valueData + "");
                            valueData = valueData.toLowerCase();

                            if ($rootScope.formula === 1) {
                                //$scope.advanceQuery = [WL.JSONStore.QueryPart().equal($scope.advanceColumn, valueData)];

                                if (valueToBeSearched === valueData)
                                    $rootScope.contractList.push(cont);

                            } else if ($rootScope.formula === 2) {
                                //$scope.advanceQuery = [WL.JSONStore.QueryPart().notEqual($scope.advanceColumn, valueData)];

                                if (valueToBeSearched !== valueData)
                                    $rootScope.contractList.push(cont);

                            } else if ($rootScope.formula === 3) {
                                //$scope.advanceQuery = [WL.JSONStore.QueryPart().rightLike($scope.advanceColumn, valueData)];

                                //if( valueToBeSearched.endsWith( valueData  ) )  // not wokring on all devices
                                if (valueToBeSearched.match(valueData + "$") == valueData)
                                    $rootScope.contractList.push(cont);

                            } else if ($rootScope.formula === 4) {
                                //$scope.advanceQuery = [WL.JSONStore.QueryPart().like($scope.advanceColumn, valueData)];
                                if ((valueToBeSearched.indexOf(valueData) != -1))
                                    $rootScope.contractList.push(cont);

                            } else if ($rootScope.formula === 5) {
                                //$scope.advanceQuery = [WL.JSONStore.QueryPart().notLike($scope.advanceColumn, valueData)];
                                if ((valueToBeSearched.indexOf(valueData) == -1))
                                    $rootScope.contractList.push(cont);
                            } else {

                                var firstName = utilFactory.removeDiacritics(cont.json.firstName + "");
                                firstName = firstName.toLowerCase();
                                var contractId = (cont.json.contractId + "").toLowerCase();

                                var assignedDateAdvanceNew = (cont.json.assignedDate + "").toLowerCase();
                                var assignedDateAdvance= assignedDateAdvanceNew.split("-").reverse().join("-");   //dd-mm-yyyy
                                var idIssueDateNew = (cont.json.nextActionDate + "").toLowerCase();
                                var idIssueDate= idIssueDateNew.split("-").reverse().join("-");  //dd-mm-yyyy



                                var custId = (cont.json.custId + "").toLowerCase();

                                if ((firstName.indexOf(valueData) != -1) || (contractId.indexOf(valueData) != -1) ||
                                    (idIssueDate.indexOf(valueData) != -1) || (custId.indexOf(valueData) != -1) || (assignedDateAdvance.indexOf(valueData) != -1))
                                    $rootScope.contractList.push(cont);

                            }

                        } catch (err) {
                        	$exceptionHandler(err, " Advanced Search ");
                            console.log(err.message);
                            searchException = 1;
                            $rootScope.showAlert("Some Error Occurred.", "" + AlertMessages.alertTitile);
                            return false;

                        }


                    });

                    $ionicLoading.hide();
                    /*common code for all screen added here*/

                    $rootScope.formula = 6;
                    $ionicLoading.hide();
                    if ($rootScope.contractList.length == 0) {
                        $rootScope.nextDiv = false;
                        $rootScope.previousDiv = false;
                        if (searchException != 1) {
                            $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);
                        }

                    } else if ($rootScope.contractList.length == 1) {
                        $rootScope.nextDiv = false;
                        $rootScope.previousDiv = false;
                    } else {
                        $rootScope.nextDiv = true;
                        $rootScope.previousDiv = false;
                    }


                    $rootScope.unpaidIndex = 0;
                    $rootScope.paidIndex = 0;
                    $rootScope.ptpIndex = 0;



                    try {

                        $rootScope.termFormPart1 = false;
                        $rootScope.listContract = true;
                        $rootScope.termListHeader = true;
                        $rootScope.termFormPart2 = false;

                    } catch (e) {
                    	$exceptionHandler(e, " ");

                    }


                    $rootScope.closebutton();
                    try {
                        $rootScope.closebuttonFunc();
                    } catch (e) {
                    	$exceptionHandler(e, " ");

                    }
                    $rootScope.searchBtn = userInput;
                    $rootScope.searchTextBlack = true;
                    try {
                        if (document.getElementById("mytext") != null && document.getElementById("mytext") != undefined) {
                            document.getElementById("mytext").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_search") != null && document.getElementById("mytext_search") != undefined) {
                            document.getElementById("mytext_search").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_map") != null && document.getElementById("mytext_map") != undefined) {
                            document.getElementById("mytext_map").value = "" + userInput;

                            try {
                                var listContract = document.getElementById("listContractmap");
                                var map = document.getElementById("googleMap");
                                map.style.visibility = 'hidden';
                                listContract.style.visibility = 'visible';
                            } catch (e) {
                            	$exceptionHandler(e, " ");
                            }

                        }
                        if (document.getElementById("mytext_record") != null && document.getElementById("mytext_record") != undefined) {
                            document.getElementById("mytext_record").value = "" + userInput;
                        }

                        if (document.getElementById("mytext_ptp") != null && document.getElementById("mytext_ptp") != undefined) {
                            document.getElementById("mytext_ptp").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_paid") != null && document.getElementById("mytext_paid") != undefined) {
                            document.getElementById("mytext_paid").value = "" + userInput;
                        }

                        if (document.getElementById("mytext_unpaid") != null && document.getElementById("mytext_unpaid") != undefined) {
                            document.getElementById("mytext_unpaid").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_termination") != null && document.getElementById("mytext_termination") != undefined) {
                            document.getElementById("mytext_termination").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_reposs") != null && document.getElementById("mytext_reposs") != undefined) {
                            document.getElementById("mytext_reposs").value = "" + userInput;
                        }




                    } catch (e) {
                    	$exceptionHandler(e, " ");
                    }
                    /* javascript search ends */
                    $ionicScrollDelegate.scrollTop();
                };




                $rootScope.simpleSearch = function(valueData) {

                    $ionicLoading.show({
                        template: AlertMessages.loadingDialougeSearch
                    });

                    $rootScope.arrayResults = [{
                        firstName: valueData
                    }, {
                        lastName: valueData
                    }, {
                        contractId: valueData
                    }, {
                        assignedDate: valueData
                    }, {
                        nextActionDate: valueData
                    }]

                    $rootScope.options = {
                        exact: false,
                        // limit: 10
                    };

                    /* WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)

                     .find($rootScope.arrayResults, $rootScope.options)

                     .then(function(arrayResults) {
                         $ionicLoading.hide();
                         if (arrayResults.length == 0) {
                    		 $rootScope.nextDiv = false;
                    		 $rootScope.previousDiv = false;
                    		 $rootScope.showAlert(""+AlertMessages.noResultsFound, ""+AlertMessages.alertTitile);

                    	}else if(arrayResults.length == 1){
                                      	 $rootScope.nextDiv = false;
                                         $rootScope.previousDiv = false;
                                      	}else{
                                      		 $rootScope.nextDiv = true;
                                            $rootScope.previousDiv = false;
                                      	}
                         $rootScope.contractList = arrayResults;
                         $rootScope.unpaidIndex = 0;
                         $rootScope.paidIndex = 0;
                         $rootScope.ptpIndex=0;

                          try{

                                                 	     $rootScope.termFormPart1 = false;
                                                                                 $rootScope.listContract = true;
                                                                                 $rootScope.termListHeader = true;
                                                                                 $rootScope.termFormPart2 = false;

                                                 	    }catch(e){

                                                 	    }

                         $rootScope.closebutton();
                         try{
                                                 	 $rootScope.closebuttonFunc();
                                                 	 }catch(e){

                                                 	 }
                         //arrayResults = [{_id: 1, json: {name: 'carlos', age: 99}}]
                     })

                     .fail(function(errorObject) {
                         $ionicLoading.hide();
                         $rootScope.closebutton();
                         try{
                                                 	 $rootScope.closebuttonFunc();
                                                 	 }catch(e){

                                                 	 }
                     });*/

                    /* javascript search starts */
                    userInput = valueData;
                    $rootScope.contractList = [];
                    $.each($rootScope.mainContractList, function(i, cont) {
                        searchException = 0;

                        try {

                            var firstName = utilFactory.removeDiacritics(cont.json.firstName + "");
                            firstName = firstName.toLowerCase();
                            var contractId = (cont.json.contractId + "").toLowerCase();
                            var newdate = (cont.json.assignedDate + "").toLowerCase();  //yyyy-mm-dd
                            var assignedDate = newdate.split("-").reverse().join("-");   //dd-mm-yyyy
                            var newdateAction = (cont.json.nextActionDate + "").toLowerCase();  //yyyy-mm-dd
                            var nextActionDate = newdateAction.split("-").reverse().join("-");  //dd-mm-yyyy
                            var custId = (cont.json.custId + "").toLowerCase();


                            valueData = utilFactory.removeDiacritics(valueData + "");
                            valueData = valueData.toLowerCase();


                            if ((firstName.indexOf(valueData) != -1) || (contractId.indexOf(valueData) != -1) || (assignedDate.indexOf(valueData) != -1) || (nextActionDate.indexOf(valueData) != -1) || (custId.indexOf(valueData) != -1) ) {
                                $rootScope.contractList.push(cont);
                            }

                        } catch (err) {
                        	$exceptionHandler(err, " Simple Search ");
                            console.log(err.message);
                            searchException = 1;
                            $rootScope.showAlert("Some Error Occurred.", "" + AlertMessages.alertTitile);
                            return false;
                        }


                    });
                    $ionicLoading.hide();


                    /* new line code added */


                    if ($rootScope.contractList.length == 0) {
                        $rootScope.nextDiv = false;
                        $rootScope.previousDiv = false;
                        if (searchException != 1) {
                            $rootScope.showAlert("" + AlertMessages.noResultsFound, "" + AlertMessages.alertTitile);
                        }

                    } else if ($rootScope.contractList.length == 1) {
                        $rootScope.nextDiv = false;
                        $rootScope.previousDiv = false;
                    } else {
                        $rootScope.nextDiv = true;
                        $rootScope.previousDiv = false;
                    }

                    $rootScope.unpaidIndex = 0;
                    $rootScope.paidIndex = 0;
                    $rootScope.ptpIndex = 0;

                    try {

                        $rootScope.termFormPart1 = false;
                        $rootScope.listContract = true;
                        $rootScope.termListHeader = true;
                        $rootScope.termFormPart2 = false;

                    } catch (e) {
                    	$exceptionHandler(e, " ");

                    }

                    $rootScope.closebutton();
                    try {
                        $rootScope.closebuttonFunc();
                    } catch (e) {
                    	$exceptionHandler(e, " ");
                    }

                    $rootScope.searchBtn = userInput;
                    $rootScope.searchTextBlack = true;
                    try {
                        if (document.getElementById("mytext") != null && document.getElementById("mytext") != undefined) {
                            document.getElementById("mytext").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_search") != null && document.getElementById("mytext_search") != undefined) {
                            document.getElementById("mytext_search").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_map") != null && document.getElementById("mytext_map") != undefined) {
                            document.getElementById("mytext_map").value = "" + userInput;
                            try {
                                var listContract = document.getElementById("listContractmap");
                                var map = document.getElementById("googleMap");
                                map.style.visibility = 'hidden';
                                listContract.style.visibility = 'visible';
                            } catch (e) {
                            	$exceptionHandler(e, " ");
                            }
                        }
                        if (document.getElementById("mytext_record") != null && document.getElementById("mytext_record") != undefined) {
                            document.getElementById("mytext_record").value = "" + userInput;
                        }

                        if (document.getElementById("mytext_ptp") != null && document.getElementById("mytext_ptp") != undefined) {
                            document.getElementById("mytext_ptp").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_paid") != null && document.getElementById("mytext_paid") != undefined) {
                            document.getElementById("mytext_paid").value = "" + userInput;
                        }

                        if (document.getElementById("mytext_unpaid") != null && document.getElementById("mytext_unpaid") != undefined) {
                            document.getElementById("mytext_unpaid").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_termination") != null && document.getElementById("mytext_termination") != undefined) {
                            document.getElementById("mytext_termination").value = "" + userInput;
                        }
                        if (document.getElementById("mytext_reposs") != null && document.getElementById("mytext_reposs") != undefined) {
                            document.getElementById("mytext_reposs").value = "" + userInput;
                        }




                    } catch (e) {
                    	$exceptionHandler(e, " ");
                    }


                    /* javascript search ends */
                    $ionicScrollDelegate.scrollTop();

                };

            };




        })
        .config(
                    function($provide) {
                     $provide
                       .decorator(
                         '$exceptionHandler',
                         function($delegate) {
                          return function(exception, cause) {
                           $delegate(exception, cause);
                           var formatted = '';
                           var properties = '';
                           formatted += 'Exception: "'
                             + exception.toString()
                             + '"\n';
                           formatted += 'Caused by: ' + cause
                             + '\n';

                           properties += (exception.message) ? 'Message: '
                             + exception.message + '\n'
                             : ''
                           properties += (exception.fileName) ? 'File Name: '
                             + exception.fileName + '\n'
                             : ''
                           properties += (exception.lineNumber) ? 'Line Number: '
                             + exception.lineNumber
                             + '\n'
                             : ''
                           properties += (exception.stack) ? 'Stack Trace: '
                             + exception.stack + '\n'
                             : ''

                           if (properties) {
                            formatted += properties;
                           }

                           WL.Analytics.log("FECOL crash/exception:- "
                             + formatted);

                           WL.Analytics.send();



                    // code for writing logs to txt file  - start
                   
                    	if(ionic.Platform.isAndroid()){

                           window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

                               console.log('file system open: ' + fs.name);
                              // if(ionic.Platform.isAndroid()){

                                   fs.root.getDirectory("OnMove", {create: true}, function (dirEntry){

                                        dirEntry.getFile("crash_logs_wv.txt", { create: true, exclusive: false }, function (fileEntry) {

                                          console.log("fileEntry is file?" + fileEntry.isFile.toString());
                                          // fileEntry.name == 'someFile.txt'
                                          // fileEntry.fullPath == '/someFile.txt'
                                          writeFile(fileEntry, " "+formatted  + " [" + (new Date()) + "]\n" );

                                      }, onErrorCreateFile);

                                   },onErrorCreateDir);
                            	   
                              /* }else{
		                               fs.root.getFile("crash_logs_wv.txt", {create: true}, function (fileEntry){
				                            
		                                   console.log("fileEntry is file?" + fileEntry.isFile.toString());
		                                   // fileEntry.name == 'someFile.txt'
		                                   // fileEntry.fullPath == '/someFile.txt'
		                                   writeFile(fileEntry, " "+formatted  + " [" + (new Date()) + "]\n" );                               
		
		                              },onErrorCreateDir);
                              } */

                           }, onErrorLoadFileSystem);


                           function writeFile(fileEntry, dataObj) {
                               // Create a FileWriter object for our FileEntry (log.txt)
                               fileEntry.createWriter(function (fileWriter) {

                                   fileWriter.onwriteend = function() {
                                       console.log("Successful file write...");
                                      // readFile(fileEntry);
                                   };

                                   fileWriter.onerror = function (e) {
                                       console.log("Failed file write: " + e.toString());
                                   };

                                   // If data object is not passed in,
                                   // create a new Blob instead.
                                   if (!dataObj) {
                                       dataObj = new Blob(['some file data'], { type: 'text/plain' });
                                   }

                                   fileWriter.write(dataObj);
                               });
                           }

                           function onErrorLoadFileSystem(evt) {
                               console.log(evt.target.error.code);
                           }
                            function onErrorCreateDir(evt) {
                              console.log(evt.target.error.code);
                            }
                            function onErrorCreateFile(evt) {
                              console.log(evt.target.error.code);
                            }
                      }else{
                        // for iphone we will save to db and send logs on server if offline
                        function chkInternet(){
                            if ((navigator.network.connection.type).toUpperCase() != "NONE"
                                    && (navigator.network.connection.type)
                                            .toUpperCase() != "UNKNOWN") {

                                return true;
                            } else {
                                return false;
                            }
                        }
                        if(!chkInternet()){

                            tempObject = {
                                "crashData" : "FECOL iOS Offline crash/exception:- " +formatted  + " [" + (new Date()) + "]\n"
                            }
                             WL.JSONStore.get(IPHONE_LOGGER_DB).add(tempObject).then(function(data) {
                                    // saved

                            }).fail(function(error) {
                                //alert(JSON.stringify(error));
                                    // fail
                            });


                        }

                      }
                     
                     // code for writing logs to txt file  - ends


                          };
                         });
                    });