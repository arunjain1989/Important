/* JavaScript content from js/controllers/bidderCtrl.js in folder common */

FeCreditApp
    .controller(
        'bidderCtrl',
        function($scope, $state, $location, $ionicPopup, $ionicLoading,
            $rootScope, $ionicNavBarDelegate, $filter, utilFactory, $timeout,$exceptionHandler ) { // The following


            var isVisibility;
                var statusViewBidd;
                var approvedViewBidd ;
                var save_BidderButton;
                var greenBackground;

            if($rootScope.isBidderNotification===false){
             $scope.listBidderLocal = $rootScope.repossessionListBidder;
             $scope.listBidderContarct = $rootScope.bidderContractListMain;
            $scope.array = [{
                contractId: $scope.listBidderContarct.contractId
            }]
            if ($scope.listBidderLocal.repossessionId == 'undefined' || $scope.listBidderLocal.repossessionId == undefined || $scope.listBidderLocal.repossessionId == 0) {
                WL.JSONStore.get(REPOSSESSION_ATTACHMENTDB_REPOSSESSINID)
                    .find($scope.array).then(function(list) {


                        $scope.local = list[0].json.repossessionId;
                        $scope.listBidderLocal.repossessionId = $scope.local.toString();

                    }).fail(function(error) {

                        $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                    });
            }
            }
            else{
            if ($scope.listBidderLocal== 'undefined' || $scope.listBidderLocal == undefined ){
                    $scope.listBidderLocal={};
                    $scope.listBidderLocal.repossessionId=$rootScope.newRepossessionId;
                    for(var m=0;m<$rootScope.mainContractList.length;m++){
                 	   if($rootScope.mainContractList[m].json.contractId==$rootScope.notiContractId){
                 		   $scope.listBidderContarct=$rootScope.mainContractList[m].json;

                 	   }


                    }
            }else{

                $scope.listBidderLocal.repossessionId=$rootScope.newRepossessionId;
             // mainContractList
               for(var m=0;m<$rootScope.mainContractList.length;m++){
            	   if($rootScope.mainContractList[m].json.contractId==$rootScope.notiContractId){
            		   $scope.listBidderContarct=$rootScope.mainContractList[m].json;

            	   }


               }
             //getcontract Id from notification

                }
            }

            $scope.$on("$ionicView.enter", function(event, data) {
            	$rootScope.contractNotificationBool=true;
            	
             if(isVisibility){
                        isVisibility = true;
               }else{
                        isVisibility = false;
                }


            	$rootScope.isBidderApproved=false;
                 statusViewBidd = document.getElementById("statusViewBidder");
                 approvedViewBidd = document.getElementById("approvedViewBidder");
                 save_BidderButton = document.getElementById("saveBidderId");
                 greenBackground=document.getElementById("greenColorBack");
                 $("#saveBidderId").show();

                $scope.currencyFormat = utilFactory.currencyFormat;
                $scope.phoneNumericOnly = utilFactory.phoneNumeric;
                $scope.numericOnly = utilFactory.numericOnly;
                $scope.bidderName = Messages.bidderName;
                $scope.idNumber = Messages.idNumber;
                $scope.phoneNumber = Messages.phoneNumber;
                $scope.amount = Messages.amount;
                $scope.cancelButton = Messages.cancelButton;
                $scope.saveButton = Messages.saveButton;
                $scope.bidderHeader = Messages.bidderHeader;
                $scope.addressType = Messages.addressType;
                $scope.checkInButton = Messages.checkIn;
                $scope.viewBidderHeader = Messages.viewBidder;
                $scope.distance = Messages.distance;
                $scope.alertTitile = AlertMessages.alertTitile;
                $scope.enter_bidder_cusName = AlertMessages.enter_bidder_cusName;
                $scope.enter_bidder_cusId = AlertMessages.enter_bidder_cusId;
                $scope.enter_bidder_cusNumber = AlertMessages.enter_bidder_cusNumber;
                $scope.enter_bidder_cusAmount = AlertMessages.enter_bidder_cusAmount;
                $scope.bidder_SaveTitle = AlertMessages.bidder_SaveTitle;
                $scope.statusTitle = Messages.status;

                if($rootScope.isBidderNotification==false){

                    var uniqueArray = [];
                    if($rootScope.dataValForViewBidder != undefined ){
                    	
	                    for(var i = 0; i < $rootScope.dataValForViewBidder.length; i++){
	                          var found = 0;
	                          for(var j = 0; j < uniqueArray.length; j++){
	                                if( uniqueArray[j].bidderId == $rootScope.dataValForViewBidder[i].bidderId && $rootScope.dataValForViewBidder[i].bidderId != "" )
	                                {
	                                         found = 1;
	                                 }
	                          }
	                           if(found == 0){
	                                uniqueArray.push($rootScope.dataValForViewBidder[i]);
	
	                            }
	                    }
	                    
                    }

                    $rootScope.dataValForViewBidderLocal = uniqueArray;


                //$rootScope.dataValForViewBidderLocal = $rootScope.dataValForViewBidder;
                $timeout($scope.timerMethodLocal, 200);
                }


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
                $scope.isInternetMessage = AlertMessages.isInternet;
                $scope.unableFindAddr = AlertMessages.address_notAvailable;
                $scope.addrPromptMsgOnline = AlertMessages.addrPromptMsgOnline;
                $scope.addrPromptMsgOffline = AlertMessages.addrPromptMsg;
                $scope.searchBtn =  Messages.searchBtn;
                $scope.proceedBtn = Messages.proceedBtn;
                //                                                    document.getElementById("bidderId").disabled = false;
                $rootScope.bidderData = {};

                $rootScope.bidderData.checkIn = {};
                $rootScope.bidderData.checkIn.difference = '';
                $rootScope.bidderData.checkIn.addressType = '';
                $rootScope.bidderData.checkIn.customersAddress = '';
                $rootScope.bidderData.checkIn.checkinTime = '';
                $rootScope.bidderData.checkIn.checkinAddress = '';
                $rootScope.bidderData.checkIn.latLong = ''

                	if ($rootScope.deviceLang == 'vi') {

                        $scope.cnclButtonViet = true;
                        // document.getElementById("recordContentTop").className += " recordContentTopCss";
                    }
                 $scope.addCustAddressToAddrTypeList();

                 if ($rootScope.isBidderNotification==true) {
                                                    $('#bidder_name').val($rootScope.selectedViewBidder.bidderName);
                                                    $('#bidderId').val($rootScope.selectedViewBidder.idNumber);
                                                    $('#bidder_number').val($rootScope.selectedViewBidder.phoneNumber);
                                                    $('#bidder_amount').val($scope.currencyFormat($rootScope.selectedViewBidder.amount));
                                                    $rootScope.selectedViewBidder = $rootScope.bidderStatusFromNoti;
                                                    $scope.showStatusFromNotificationBidder();



                                                }

                if (!$rootScope.viewBidderClicked) {
                 if ($rootScope.isBidderNotification==true) {
                      $rootScope.isBidderNotification = false;
                        return;
                 }

                    $rootScope.viewBidderClicked = false;
                    isVisibility = false;

                    statusViewBidd.style.display = 'none';
                    approvedViewBidd.style.display = 'none';
                    greenBackground.style.display = 'none';
                    //document.getElementById("saveBidderId").style.display = "block";
                    document.getElementById("bidderId").disabled = false;
                    document.getElementById("saveBidderId").disabled = false;
                    document.getElementById("bidder_name").disabled = false;
                    document.getElementById("bidder_number").disabled = false;
                    document.getElementById("bidder_amount").disabled = false;

                    $rootScope.bidderIdView = "";
                    $rootScope.bidderData.bidder_Name = '';
                    $rootScope.bidderData.bidder_Id = '';
                    $rootScope.bidderData.bidder_Phone = '';
                    $rootScope.bidderData.bidder_Amount = '';
                    $('#bidder_name').val('');
                    $('#bidderId').val('');
                    $('#bidder_number').val('');
                    $('#bidder_amount').val('');

                }

                if($rootScope.showBidderClicked){
                    $rootScope.showBidderClicked = false;
                      $scope.timerMethod();
                }


            });




            $scope.moneyFormat = function(id) {
                var idd = "#" + id;

                $rootScope.bidderData.bidder_Amount = $scope.currencyFormat($(idd).val());
                if ( /* $rootScope.bidderData.bidder_Amount == 0 || */ $rootScope.bidderData.bidder_Amount === null) {
                    $rootScope.bidderData.bidder_Amount = '';
                }

                $(idd).val($rootScope.bidderData.bidder_Amount);

            }


            $scope.chekInBidder = function() {
                if (isVisibility) {
                    return;
                }
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function(position) {


                            $rootScope.bidderData.checkIn.latLong = (position.coords.latitude + "," +
                                position.coords.longitude);


                            var checkinTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                            $rootScope.bidderData.checkIn.checkinTime = checkinTime;


                            getAddressFromLatLong(position.coords.latitude, position.coords.longitude);
                            // alert("from chkin "+$rootScope.recordData.checkIn.latLong+" - "+$rootScope.recordData.checkIn.latLong2);
                            if ($rootScope.bidderData.checkIn.latLong2 != undefined) {
                                getDistance($rootScope.bidderData.checkIn.latLong, $rootScope.bidderData.checkIn.latLong2);
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
                            enableHighAccuracy: false,
                            timeout: 20000


                        }
                    );
                }


            }

            $scope.addressdropdownviewBidderView = true;
            $scope.addresstypeclickViewBidder = function() {

                $scope.addressdropdownviewBidderView = $scope.addressdropdownviewBidderView ? false :
                    true;



            };

            $scope.addressFunction = function(addressObject, event, i) {
                if (isVisibility) {
                    return;
                }
                var addrType = addressObject.address;
                $rootScope.bidderData.checkIn.addressType =addrType;

                $rootScope.bidderData.checkIn.addressTypeId = event.target.id;
                $('.advancels').removeClass("advancelsSelected");
                $("#" + event.target.id).addClass("advancelsSelected");



                var mapping = '';
                $.each($rootScope.addrTypeMapping, function(i, v) {

                    if (v.addressType == addrType) {
                        mapping = v.mapping;
                       return false;
                    }
                    if(mapping == '' && v.addressType == 'OTHER' ){
                        mapping = v.mapping;

                    }

                });
//                var mapping = $rootScope.addrTypeMapping[i].mapping;
//                if (mapping == "regAddress") {
//
//
//                    var addr2 = $scope.listBidderContarct.regAddress;
//                } else if (mapping == "actAddress") {
//
//
//                    var addr2 = $scope.listBidderContarct.actAddress;
//                } else if (mapping == "offAddress") {
//
//
//                    var addr2 = $scope.listBidderContarct.offAddress;
//                }
                var addr2 = $scope.listBidderLocal[mapping];
                $rootScope.bidderData.checkIn.customersAddress = addr2;
                getLocationFromAddress(addr2,addrType,event.target.id);




                $scope.addressdropdownviewBidderView = true;
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
                        $rootScope.bidderData.checkIn.checkinAddress = currentAddress;
                    }
                );
            }

            var globalAddrType = '';
            var globalAddrListId = '';
            function getLocationFromAddress(address,addrType,listId) {
                 //var address = "H122, H Block, Sector 63, Noida, Uttar Pradesh 201301";
                   globalAddrType = addrType;
                   globalAddrListId = listId;
                var geocoder = new google.maps.Geocoder();

                geocoder.geocode({
                    'address': address
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        lat = results[0].geometry.location.lat();
                        long = results[0].geometry.location.lng();
                        var addr2 = (lat + "," + long); // customer address latlong
                        $rootScope.bidderData.checkIn.latLong2 = addr2;

                        var addr1 = $rootScope.bidderData.checkIn.latLong; // check in address latlong

                        $rootScope.bidderData.checkIn.addressType = addrType;
                        $rootScope.bidderData.checkIn.customersAddress = address;
                         $("#" + listId).addClass("advancelsSelected");

                        if (addr1 != '' && addr1 != undefined && addr1 != 'undefined') {
                            getDistance(addr1, addr2);
                        }
                        // return addr2;
                    } else {
                        $rootScope.bidderData.checkIn.latLong2 = undefined;
                        $rootScope.bidderData.checkIn.difference = '';
                        $("#distanceBidder").html("");
                        $rootScope.showAlert("" + AlertMessages.address_notAvailable, "" + AlertMessages.alertTitile);


                        // manual address entry
//                           if ($rootScope.isInternetConnected()) {
//                                 //if online
//                                $("#addrTextAreaBidder").val(address);
//                                $("#addrPromptPopUpBidder").show();
//
//                           }else{ //if offline
//                                navigator.notification.confirm( AlertMessages.addrPromptMsg, // message
//                                    onConfirm, // callback
//                                   AlertMessages.address_notAvailable, // title
//                                    ['Proceed','Cancel'] // buttonName
//                                    );
//                                function onConfirm(btnIndex) {
//                                   if(btnIndex == 1){       // proceed button
//                                       // do nothing
//                                  }else if(btnIndex == 2){ // cancel button
//
//                                        $('.advancels').removeClass("advancelsSelected");
//                                        $rootScope.bidderData.checkIn.customersAddress = '';
//                                        $rootScope.bidderData.checkIn.addressType = '';  // for validation
//
//                                  }
//                                }
//
//                           }

                    } // if addr not found else ends
                });
            }
            $scope.onAddrPromptBidder = function(buttonIndex) {
                $("#addrPromptPopUpBidder").hide();
              if(buttonIndex == 1){       // proceed button
                   // do nothing
              }else if(buttonIndex == 2){ // cancel button

                    $('.advancels').removeClass("advancelsSelected");
                    $rootScope.bidderData.checkIn.customersAddress = '';
                    $rootScope.bidderData.checkIn.addressType = '';  // for validation

              }else if(buttonIndex == 3){ // search button

                    var enteredAddr =   $("#addrTextAreaBidder").val();
                    getLocationFromAddress(enteredAddr,globalAddrType,globalAddrListId);
              }

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
                $rootScope.bidderData.checkIn.difference = d;
                $("#distanceBidder").html(d + " m");
                return d;
            }




            $scope.saveBidder = function() {

                if (!$rootScope.isInternetConnected() && ($rootScope.viewBidderClicked)) {
                    $rootScope.showAlert(AlertMessages.isInternet, "" + AlertMessages.alertTitile);
                    return;
                }


                // $scope.array = [{status:"Approved"},{status:"Reject"},{status:"Pending"}]

                $rootScope.bidderData.bidder_Name = $('#bidder_name').val();
                $rootScope.bidderData.bidder_Id = $('#bidderId').val();
                $rootScope.bidderData.bidder_Phone = $('#bidder_number').val();
                var str = $('#bidder_amount').val();

                var regex = new RegExp(',', 'g')
                str = str.replace(regex, '');
                $rootScope.bidderData.bidder_Amount = str;



                if ($rootScope.bidderData.bidder_Name.length === 0) {
                    $rootScope.showAlert("" + AlertMessages.enter_bidder_cusName, "" + AlertMessages.alertTitile);


                } else if ($rootScope.bidderData.bidder_Amount.length === 0) {
                  $rootScope.showAlert("" + AlertMessages.enter_bidder_cusAmount, "" + AlertMessages.alertTitile);

                } else if ($rootScope.bidderData.bidder_Amount.length > 10) {
                  $rootScope.showAlert("" + AlertMessages.bidderAmtLen, "" + AlertMessages.alertTitile);

                } else if ($rootScope.bidderData.bidder_Id.length === 0) {

                    $rootScope.showAlert("" + AlertMessages.enter_bidder_cusId, "" + AlertMessages.alertTitile);
                } else if ($rootScope.bidderData.bidder_Phone.length === 0) {
                    $rootScope.showAlert("" + AlertMessages.enter_bidder_cusNumber, "" + AlertMessages.alertTitile);


                } else if ($rootScope.bidderData.bidder_Phone.length < 10) {

                    $rootScope.showAlert("" + AlertMessages.mobileLength10, "" + AlertMessages.alertTitile);

                }
//                else if ($rootScope.bidderData.checkIn.addressType === '') {
//
//                    $rootScope.showAlert("" + AlertMessages.isAddressType, "" + AlertMessages.alertTitile);
//
//                } else if ($rootScope.bidderData.checkIn.latLong === '') {
//
//                    $rootScope.showAlert("" + AlertMessages.isLocatinSelected, "" + AlertMessages.alertTitile);
//
//                }
                else {
                	if($rootScope.bidderData.bidder_Amount == "."){
                        $rootScope.bidderData.bidder_Amount = "0.0";
                    }
                	var entryDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                    optionsBidderJson = {
                        "bidderName": $rootScope.bidderData.bidder_Name,
                        "idNumber": $rootScope.bidderData.bidder_Id,
                        "phoneNumber": $rootScope.bidderData.bidder_Phone,
                        "amount": $rootScope.bidderData.bidder_Amount,
                        "contractId": $scope.listBidderLocal.contractId,
                        "repossessionId": $scope.listBidderLocal.repossessionId,
                        "isskiptracer": $scope.listBidderContarct.isskiptracer,
                        "entryDate": entryDate,
                        "bidderId": $rootScope.bidderIdView
//                        "checkIn": {
//                            "addressType": $rootScope.bidderData.checkIn.addressType,
//                            "address": $rootScope.bidderData.checkIn.customersAddress,
//                            "latLong": $rootScope.bidderData.checkIn.latLong,
//                            "checkinDateTime": $rootScope.bidderData.checkIn.checkinTime,
//                            "checkinAddress": $rootScope.bidderData.checkIn.checkinAddress,
//                            "distance": $rootScope.bidderData.checkIn.difference,
//                            "unitCode": $scope.listBidderLocal.unitCode1,
//                            "unitCodeDesc": $scope.listBidderLocal.unitCodeDesc
//
//                        }


                    };


                    $scope.tempBidder = optionsBidderJson;
                    $scope.showLoading();
                    WL.JSONStore.get(BIDDERLOCALDB_SAVE).add($scope.tempBidder).then(function(data) {


                        var resourceRequest = new WLResourceRequest("/adapters/repossessionBidder/bidder/save", WLResourceRequest.POST);
                        resourceRequest.setHeader("Content-Type", "application/json");
                        resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                        resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                        resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                        
                        if($rootScope.isInternetConnected()){
                            resourceRequest.send([$scope.tempBidder]).then($scope.getSecretData_BidderOK, $scope.getSecretData_BidderFail);
                        }else{
                        	$scope.hideLoading();
                        	$scope.saveBidderDataForSync();
                        	$state.go('fECREDIT.repossession');
                        	$rootScope.showAlert(""+AlertMessages.isInternetSyncYourData,""+AlertMessages.alertTitile);
                        }

                    }).fail(function(error) {
                        $scope.hideLoading();
                        $rootScope.showAlert("Error in Bidder Contract", "" + AlertMessages.alertTitile);
                    });
                }

            }

            $scope.getSecretData_BidderOK = function(response) {
                $scope.hideLoading();
                //				        	if(response.responseJSON[0].responseCode == "200"){
                //				        		$rootScope.bidderViewList.add(tempBidder)
                //
                //				        	}

                for(var i=0;i<response.responseJSON.length;i++){
                if (response.responseJSON[i].responseCode == "102") {
                    //							        	  sso
                    $scope.saveBidderDataForSync();
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    $scope.savAndLogout();
                    
                    return;
                } else if (response.responseJSON[i].responseCode == "120") {
                $rootScope.showAlert("" + AlertMessages.bidderInProgress, "" + AlertMessages.alertTitile);
                //return;
                }else if (response.responseJSON[i].responseCode!= "200") {
                    //							        	  fail
                    $scope.saveBidderDataForSync();

                    $scope.hideLoading();
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);

                    return;
                } else if (response.responseJSON[i].responseCode == "200") {

                /* start of code replace on success*/

                optionsBidderJson.bidderId = response.responseJSON[i].dto.bidderId;
WL.JSONStore.get(BIDDERLOCALDB_SAVE)
                    .findAll().then(function (res) {


                    var idForBidder = 0;
                    if( res.length != 0){
                    idForBidder = res[res.length-1]._id;

                    }

                  WL.JSONStore.get(BIDDERLOCALDB_SAVE)

                .replace({_id: idForBidder, json: optionsBidderJson})

                .then(function (numberOfDocumentsReplaced) {

                }).fail(function (errorObject) {
                  //handle failure
                });
})
.fail(function (errobject) {
WL.Logger.debug(errobject.toString());
});


                /* end of code replace on success */


                    var values = response.responseJSON[i].dto;
                        var obj = {
                            "bidderId":values.bidderId,
                            "bidderName":values.bidderName,
                            "idNumber":values.idNumber,
                            "phoneNumber":values.phoneNumber,
                            "amount":values.amount,

                        }
                        if($rootScope.bidderViewListNotification=='undefined' || $rootScope.bidderViewListNotification==undefined ){
                        $rootScope.bidderViewListNotification=[];
                        }
                        var tempval = values.repossessionId;
                        var array = $rootScope.bidderViewListNotification[tempval];
                        if( array == undefined){
                         $rootScope.bidderViewListNotification[tempval] = [];
                        }
                     $rootScope.bidderViewListNotification[tempval].push(obj);
                     if($rootScope.bidderViewList[tempval] == undefined ){
                            $rootScope.bidderViewList[tempval] = [];
                     }

                        $rootScope.bidderViewList[tempval].push(obj);

                    $rootScope.showAlert("" + AlertMessages.bidder_SaveTitle, "" + AlertMessages.alertTitile);
                    $state.go('fECREDIT.repossession');
                }
                }
            };

            $scope.getSecretData_BidderFail = function(response) {
                $scope.saveBidderDataForSync();
                $scope.hideLoading();
                if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                    
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    $rootScope.sessionTimeOutMessage();
                    return;
                }
                
                $rootScope.sessionTimeOutCalled = false;
                if (response== null || response.status == 404 || response.status == 0 || response.status == 500) {
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                    $state.go('fECREDIT.repossession');
                    return;
                }

            }

            $scope.saveBidderDataForSync = function() {

                WL.JSONStore.get(BIDDER_REPOSSESSION_SYNC).add($scope.tempBidder).then(function(data) {
                    //
                }).fail(function(error) {

                });
            }

            $scope.$on('$ionicView.leave', function() {
            	$rootScope.contractNotificationBool=false;
                $rootScope.bidderData = {};
                $rootScope.bidderData.checkIn = {};
                $rootScope.bidderData.bidder_Name = '';
                $rootScope.bidderData.bidder_Id = '';
                $rootScope.bidderData.bidder_Phone = '';
                $rootScope.bidderData.bidder_Amount = '';
                $rootScope.bidderData.checkIn.difference = '';
                $("#distanceBidder").html("");
                $rootScope.bidderData.checkIn.addressType = '';
                $rootScope.bidderData.checkIn.latLong = '';
                $('.advancels').removeClass("advancelsSelected");



            });


            $scope.goToviewBidder = function(value) {
            	$rootScope.statusBidderView=false;
                $rootScope.viewBidderClicked = true;

                var arrName = $rootScope.bidderStatusArr;
                for (var j = 0; j < arrName.length; j++) {

                    if (arrName[j].bidderId == $rootScope.dataValForViewBidderLocal[value].bidderId && $rootScope.dataValForViewBidderLocal[value].status == undefined ) {
                        $rootScope.dataValForViewBidderLocal[value].status = arrName[j].status;
                        $rootScope.dataValForViewBidderLocal[value].displayStatusVn = arrName[j].notificationMessages.vi_message;
                        $rootScope.dataValForViewBidderLocal[value].displayStatusEn= arrName[j].notificationMessages.en_message;


                        break;
                    }

                }
                //for(var statusIndex=0; statusIndex<$rootScope.dataValForViewBidderLocal.length;statusIndex++){
                	if($rootScope.dataValForViewBidderLocal[value].status==="APPROVED" || $rootScope.dataValForViewBidderLocal[value].status==="INPROGRESS"){
                		$rootScope.statusBidderView=true;
                		 isVisibility = true;
//                		  if ($rootScope.deviceLang == 'vi') {
//                		                                                 if($rootScope.bidderStatusFromNoti!=undefined){
//                                                                        $rootScope.dataValForViewBidderLocal[value].displayStatusVn=  $rootScope.bidderStatusFromNoti.notificationMessages.vi_message;
//                                                                                         }
//                                                                                         }
//                                                                                         else{
//                                                                                         if($rootScope.bidderStatusFromNoti!=undefined){
//                                                                        $rootScope.dataValForViewBidderLocal[value].displayStatusEn= $rootScope.bidderStatusFromNoti.notificationMessages.en_message;
//                                                                         }
//                                                                         }

                	}

                //}
                $rootScope.selectedViewBidder = $rootScope.dataValForViewBidderLocal[value];
                $rootScope.showBidderClicked = true;
                $state.go('fECREDIT.bidderForm');

            };

            $scope.timerMethodLocal = function() {}

            $scope.timerMethod = function() {
                isVisibility = true;
                //document.getElementById("saveBidderId").style.display = "block";
                document.getElementById("saveBidderId").disabled = false;
                document.getElementById("bidder_name").disabled = false;
                document.getElementById("bidder_number").disabled = false;
                document.getElementById("bidder_amount").disabled = false;
                $('#bidder_name').val($rootScope.selectedViewBidder.bidderName);
                $('#bidderId').val($rootScope.selectedViewBidder.idNumber);
                $('#bidder_number').val($rootScope.selectedViewBidder.phoneNumber);

                $('#bidder_amount').val($scope.currencyFormat($rootScope.selectedViewBidder.amount));
                $rootScope.bidderData.bidder_Amount = $rootScope.selectedViewBidder.amount;
                try {
                    $scope.listBidderLocal.contractId = $rootScope.selectedViewBidder.contractId;
                    $scope.listBidderLocal.repossessionId = $rootScope.selectedViewBidder.repossessionId;
                } catch (err) {
                	$exceptionHandler(err, " ");
                    $scope.listBidderLocal = {
                        repossessionId: ''
                    };
                    $scope.listBidderLocal = {
                        contractId: ''
                    };
                }
                $scope.listBidderLocal.repossessionId = $rootScope.selectedViewBidder.repossessionId;
                $rootScope.bidderIdView = $rootScope.selectedViewBidder.bidderId;
                $rootScope.bidderData.checkIn.checkinTime = $rootScope.selectedViewBidder.entryDate;
                statusViewBidd.style.display = 'block';
                approvedViewBidd.style.display = 'block';
                greenBackground.style.display = 'inline-flex';
                if ($rootScope.deviceLang == 'vi') {
                   $rootScope.approvedViewValueBidd = $rootScope.selectedViewBidder.displayStatusVn;
                 }
                 else{
                  $rootScope.approvedViewValueBidd = $rootScope.selectedViewBidder.displayStatusEn;
                 }


                document.getElementById("bidderId").disabled = true;
                if($rootScope.selectedViewBidder.status==="REJECT"){
                		document.getElementById("saveBidderId").style.display = "none";
                        document.getElementById("saveBidderId").disabled = true;
                        document.getElementById("bidder_name").disabled = true;
                        document.getElementById("bidder_number").disabled = true;
                        document.getElementById("bidder_amount").disabled = true;
                        isVisibility = true;
                }else if($rootScope.selectedViewBidder.status==="PENDING"){
                	 document.getElementById("saveBidderId").style.display = "block";
                     document.getElementById("saveBidderId").disabled = false;
                     document.getElementById("bidder_name").disabled = false;
                     document.getElementById("bidder_number").disabled = false;
                     document.getElementById("bidder_amount").disabled = false;
                     isVisibility = false;

                }

                if ($rootScope.statusBidderView==true) {

                	document.getElementById("saveBidderId").style.display = "none";
                    document.getElementById("bidder_name").disabled = true;
                    document.getElementById("bidder_number").disabled = true;
                    document.getElementById("bidder_amount").disabled = true;
                    isVisibility = false;

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




            $scope.showStatusFromNotificationBidder = function() {



                    if ($rootScope.selectedViewBidder.status == "APPROVED" || $rootScope.selectedViewBidder.status == "INPROGRESS" || $rootScope.selectedViewBidder == "REJECT") {


                        isVisibility = true;
                        $rootScope.isBidderApproved=true;
                        document.getElementById("saveBidderId").style.display = "none";
                        document.getElementById("bidder_name").disabled = true;
                        document.getElementById("bidder_number").disabled = true;
                        document.getElementById("bidder_amount").disabled = true;
                        document.getElementById("bidderId").disabled = true;
                      if ($rootScope.deviceLang == 'vi') {
                       $rootScope.approvedViewValueBidd = $rootScope.selectedViewBidder.notificationMessages.vi_message;
                                        }
                                        else{
                        $rootScope.approvedViewValueBidd = $rootScope.selectedViewBidder.notificationMessages.en_message;
                        }
                        $timeout($scope.timerMethodLocal, 200);



                    }
                    if($rootScope.selectedViewBidder.status == "PENDING"){
                                            isVisibility = false;
                                            document.getElementById("saveBidderId").style.display = "block";
                                            $rootScope.isBidderApproved=false;
                                            document.getElementById("saveBidderId").disabled = false;
                                            document.getElementById("bidder_name").disabled = false;
                                            document.getElementById("bidder_number").disabled = false;
                                            document.getElementById("bidder_amount").disabled = false;
                                            document.getElementById("bidderId").disabled = true;


                                             if ($rootScope.deviceLang == 'vi') {
                                                   $rootScope.approvedViewValueBidd = $rootScope.selectedViewBidder.notificationMessages.vi_message;
                                                    }
                                                   else{
                                               $rootScope.approvedViewValueBidd = $rootScope.selectedViewBidder.notificationMessages.en_message;
                                            }

                                            $timeout($scope.timerMethodLocal, 200);


                    }





            }

            $scope.$on('$ionicView.leave', function() {


               // $rootScope.dataValForViewBidderLocal = [];

            });

            $scope.bidderBack=function(){
                
                if ( $rootScope.bidderSelectedFromNoti ) {

               	                $rootScope.bidderSelectedFromNoti = false;
               	                $state.go('fECREDIT.notification');

                               }else if( $rootScope.viewBidderClicked ){

               	                $rootScope.viewBidderClicked=false;
               	                $state.go('fECREDIT.viewBidder');

                               }else{

               	                $rootScope.IsShow=false;
               	                $state.go('fECREDIT.repossession');

                               }
            	
            }
                
             $scope.bidderClose=function(){
                
                if ( $rootScope.bidderSelectedFromNoti ) {
                
	                $rootScope.bidderSelectedFromNoti = false;
	                $state.go('fECREDIT.notification');
                
                }else if( $rootScope.viewBidderClicked ){
                
	                $rootScope.viewBidderClicked=false;
	                $state.go('fECREDIT.viewBidder');
                
                }else{
                
	                $rootScope.IsShow=false;
	                $state.go('fECREDIT.repossession');
                
                }
                
             }
            
       	 $scope.addCustAddressToAddrTypeList = function(){

             $.each($rootScope.addressTypeList, function(i, typeItem) {
                  var mapping = '';
                 $.each($rootScope.addrTypeMapping, function(j, mapItem) {

                         if (typeItem.address == mapItem.addressType) {
                             mapping = mapItem.mapping;
                            return false;
                         }
                         if(mapping == '' && mapItem.addressType == 'OTHER' ){
                             mapping = mapItem.mapping;

                         }

                  });
                 $rootScope.addressTypeList[i]["custAddr"] =  $scope.listBidderContarct[mapping];
             });
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
         
         var lastClickTime = 0;
         $scope.makeCallBidder = function(phoneNum) {
             var current = new Date().getTime();
             var delta = current - lastClickTime;
             lastClickTime = current;
             
             if (delta > 1000) {
                 window.open("tel:"+phoneNum);
             }
                  
         };

            $('#bidder_name').on('keyup', function(e) {
                    var mEvent = e || window.event;
                    var mPressed = mEvent.keyCode || mEvent.which;
                    if (mPressed == 13) {
                        // On enter, go to next input field
                        document.getElementById('bidder_amount').focus();
                    }
                    return true;
                });

        $('#bidder_amount').on('keyup', function(e) {
                    var mEvent = e || window.event;
                    var mPressed = mEvent.keyCode || mEvent.which;
                    if (mPressed == 13) {
                        // On enter, go to next input field
                        document.getElementById('bidderId').focus();
                    }
                    return true;
                });


        $('#bidderId').on('keyup', function(e) {
                    var mEvent = e || window.event;
                    var mPressed = mEvent.keyCode || mEvent.which;
                    if (mPressed == 13) {
                        // On enter, go to next input field
                        document.getElementById('bidder_number').focus();

                    }
                    return true;
                });

                 $('#bidder_number').on('keyup', function(e) {
                                    var mEvent = e || window.event;
                                    var mPressed = mEvent.keyCode || mEvent.which;
                                    if (mPressed == 13) {
                                    $('#bidder_number').filter(':input:focus').blur();
                                    }
                                    return true;
                                });



        })