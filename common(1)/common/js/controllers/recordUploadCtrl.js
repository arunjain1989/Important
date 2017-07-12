/* JavaScript content from js/controllers/recordUploadCtrl.js in folder common */
FeCreditApp.controller('recordUploadCtrl',
    function($scope, $state, $location, $ionicPopup, $ionicLoading, $rootScope, $ionicHistory, $ionicPlatform, $filter, $compile, $exceptionHandler ) {

        $scope.dateTimeOpenFlag = false;
        $ionicPlatform.ready(function() {
            /*   
                $ionicPlatform.onHardwareBackButton(function (event) {
                 /*  if($scope.dateTimeOpenFlag){
                	   return false;
                   }*
                });
				    
            	$ionicPlatform.registerBackButtonAction(function () {
            		$state.go("fECREDIT.record");
            		}, 100);
            	*/
        });
        var myPopup = '';
        var timeString = '';
        var datestring = '';
        var dateTimeString = '';


        $scope.ptpAndroid = false;
        $scope.ptpIos = false;
        var ptpAmountId = '';
        if (ionic.Platform.isIOS()) {
            $scope.ptpIos = true;
            ptpAmountId = '#ptpAmount';
            datestring = $filter('date')(new Date(), 'MMM dd yyyy');
            timeString = $filter('date')(new Date(), 'h:mm a');
            dateTimeString = "" + datestring + ", " + timeString;


        } else {
            $scope.ptpAndroid = true;
            ptpAmountId = '#ptpAmount1';
            datestring = $filter('date')(new Date(), 'MM/dd/yyyy');
            timeString = $filter('date')(new Date(), 'h:mm a');
            dateTimeString = "" + datestring + ", " + timeString;
        }
        $scope.$on("$ionicView.beforeEnter", function(event, data){
            $("#contDetailSubHeader").hide();    			// hiding open & save draft button for now
            $("#recoUpldContent").css('margin-top','0px');   // due to sub header hiding
          });
        $scope.$on("$ionicView.enter", function(event, data) {
            //alert("msg obj = "+ JSON.stringify(Messages));
            // handle event



            $scope.recordTitle = Messages.record;
            $scope.cancelButton = Messages.cancelButton;
            $scope.addressType = Messages.addressType;
            $scope.clearButton = Messages.clearButton;
            $scope.ptpAmount = Messages.ptpAmount;
            $scope.remark = Messages.remark;
            $scope.saveButton = Messages.saveButton;
            $scope.checkInButton = Messages.checkIn;
            $scope.attachFileButton = Messages.attachFileButton;
            $scope.curruntText = Messages.currentTitle;
            $scope.permanentText = Messages.permanent;
            $scope.workText = Messages.work;
            $scope.saveDraftButton = Messages.saveDraftButton;
            $scope.distance = Messages.distance;

            $scope.openButton = Messages.openButton;
            $scope.saveDraftButton = Messages.saveDraftButton;
            $scope.actionDateTimeButton = Messages.actionDateTimeButton;
            $scope.actionCodeButton = Messages.actionCode;
            $scope.contactedByButton = Messages.contactedByButton;
            $scope.contactedwithButton = Messages.contactedwithButton;
            $scope.placeContactedButton = Messages.placeContactedButton;
            $scope.nextActionDateTimeButton = Messages.nextActionDateTimeButton;
            $scope.selectButton = Messages.selectButton;
            $scope.phonebutton = Messages.phonebutton;
            $scope.smsButton = Messages.smsButton;
            $scope.brother = Messages.brother;
            $scope.clientButton = Messages.clientButton;
            $scope.father = Messages.father;
            $scope.husband = Messages.husband;
            $scope.wife = Messages.wife;
            $scope.mother = Messages.mother;
            $scope.sister = Messages.sister;
            $scope.relative = Messages.relative;
            $scope.nobody = Messages.nobody;
            $scope.office = Messages.office;
            $scope.other = Messages.other;
            $scope.child = Messages.child;

            $scope.cameraButton = Messages.cameraButton;
            $scope.galleryButton = Messages.galleryButton;
            $scope.fileButton = Messages.fileButton;




            $scope.alertTitile = AlertMessages.alertTitile;
            $scope.locationSelected = AlertMessages.locationSelected;
            $scope.locationNotEnabled = AlertMessages.locationNotEnabled;
            $scope.isLocatinSelected = AlertMessages.isLocatinSelected;
            $scope.noRecordDraft = AlertMessages.noRecordDraft;
            $scope.nothingToShow = AlertMessages.nothingToShow;
            $scope.selectValue = AlertMessages.selectValue;
            $scope.invalidDate = AlertMessages.invalidDate;
            $scope.isAddressType = AlertMessages.isAddressType;
            $scope.recordSaved = AlertMessages.recordSaved;
            $scope.serverUnrechable = AlertMessages.serverUnrechable;
            $scope.loadingDialouge = AlertMessages.loadingDialouge;
            $scope.noAttachmentFound = AlertMessages.noAttachmentFound;
            $scope.contact_mode = Messages.contact_mode;
            
            $scope.unableFindAddr = AlertMessages.address_notAvailable;
            $scope.addrPromptMsgOnline = AlertMessages.addrPromptMsgOnline;
            $scope.addrPromptMsgOffline = AlertMessages.addrPromptMsg;
            $scope.searchBtn =  Messages.searchBtn;
            $scope.proceedBtn = Messages.proceedBtn;

            $scope.addReceiverCallRecord();

            if ($rootScope.deviceLang == 'vi') {

                $scope.cnclButtonViet = true;

            }



            if (ionic.Platform.isIOS()) {

                datestring = $filter('date')(new Date(), 'MMM dd yyyy');
                timeString = $filter('date')(new Date(), 'h:mm a');
                dateTimeString = "" + datestring + ", " + timeString;

            } else {

                datestring = $filter('date')(new Date(), 'MM/dd/yyyy');
                timeString = $filter('date')(new Date(), 'h:mm a');
                dateTimeString = "" + datestring + ", " + timeString;


            }




            $scope.initData();
            $scope.contModeModel = "FV";
            document.getElementById("contactchangeValue").innerHTML = "FIELD VISIT";
            $scope.addCustAddressToAddrTypeList();
        });

        $rootScope.recordData = {};
        $rootScope.recordData.checkIn = {};
        $rootScope.recordData.contactDate = datestring;
        $rootScope.recordData.contactTime = timeString;
        $rootScope.recordData.personContacted = Messages.selectButton;
        $rootScope.recordData.contactedWith = Messages.selectButton;
        $rootScope.recordData.contactMode = Messages.selectButton;
        $rootScope.recordData.contactPlace = Messages.selectButton;
        
        $rootScope.recordData.actionCode = Messages.selectButton;
        $rootScope.recordData.placeContacted = Messages.selectButton;
        $rootScope.recordData.reminderMode = Messages.selectButton;
        
        $rootScope.recordData.nextActionDate = '';

        $rootScope.recordData.ptpAmount = '';
        $rootScope.recordData.remark = '';
        var attachcounter = 0;
        $rootScope.recordData.attachedFilesLink = [];
        $rootScope.recordData.fileType = [];
        $rootScope.recordData.filenamefull = [];
        $rootScope.recordData.contractId = $rootScope.selectedRecord.json.contractId;;
        $rootScope.recordData.checkIn.addressType = '';
        $rootScope.recordData.checkIn.customersAddress = '';
        $rootScope.recordData.checkIn.latLong = '';
        $rootScope.recordData.checkIn.difference = '';
        $rootScope.recordData.checkIn.checkinTime = '';

        $rootScope.recordData.checkIn.checkinAddress = '';


        $rootScope.recordData.personContactedCode = '';
        $rootScope.recordData.contactedWithCode = '';
        $rootScope.recordData.contactModeCode = '';
        $rootScope.recordData.contactPlaceCode = '';
        $rootScope.recordData.contactCodemode = '';
        $rootScope.recordData.reminderCodemode = '';




        var nextActionDateDiv = '';
        var actionDateDiv = '';
        var actionNextDate = '';
        var select, date, time;


        select = Messages.selectButton;

        var remendervalue = '';
        var contactcodevalue = '';
        var contactBy = '';
        var contactWith = '';
        var actionCode = '';
        var contactplace = '';
        var remarkValue = '';
        var ptpAmountValue = '';




        var contactedByArray = ['Email', Messages.phonebutton, Messages.smsButton, 'FV',
            'LET', 'VB'
        ];
        var contactedWithArray = [Messages.brother, Messages.child, Messages.clientButton,
            Messages.father, Messages.husband, Messages.wife, Messages.mother, Messages.sister,
            Messages.relative, Messages.nobody, Messages.other
        ];
        var actionCodeArray = ['Bed', 'BRP', 'CSO', 'DIF',
            'F_HOS', 'F_NAH', 'F_NAH', 'F_SOB'
        ];
        var placeContactedArray = ['Office', 'TEMPADD', 'PRADD',
            'REL', Messages.other
        ];

        $(".advancels").click(function() {
            $('.advancels').removeClass('background_selected');
            $(this).addClass('background_selected');

        });



        if (!($rootScope.selectedDraftRecord === "")) {
            if ($rootScope.selectedDraftRecord.json.remark.length > 0) {
                $('#calender_actiondate').val($rootScope.selectedDraftRecord.json.contactDate + ", " + $rootScope.selectedDraftRecord.json.contactTime);
                $('#calender_nextactiondate').val($rootScope.selectedDraftRecord.json.nextActionDate.replace(" ", "T"));
                $(ptpAmountId).val($rootScope.selectedDraftRecord.json.ptpAmount);
                $('#remark').val($rootScope.selectedDraftRecord.json.remark);




                //							$('.'+$rootScope.selectedDraftRecord.json.checkIn.addressType).addClass('background_selected');
            }
        }

        /*		
          WL.App.addActionReceiver ("nativeDateReceiver", function actionReceiver(received) {
        	    if (received.action === "getDateFromNative"){ 
        	        
        	        $rootScope.showAlert(+received,"Alert");
        	        
        	    }
        	});
        	*/

        $scope.closeKeypad = function() {

            cordova.plugins.Keyboard.close();

        }


        $scope.recordactioncalender = function() {
            //WL.App.sendActionToNative("openDatePicker");

            if (ionic.Platform.isWindowsPhone()) {

                // $event.preventDefault();
                // $event.stopPropagation();

                //$('#calender_actiondate').datetimepicker({  format: 'DD-MMM-YYYY' });
                $('#calender_actiondate').datetimepicker({
                    format: 'm/d/Y h:m:s',
                    step: 1,
                    datepickerScrollbar: true,
                    timepickerScrollbar: true,
                    onSelectTime: function(date) {



                    },

                });
            }

        }

        $scope.recordnextactioncalender = function() {
            if (ionic.Platform.isWindowsPhone()) {

                // $event.preventDefault();
                // $event.stopPropagation();
                $('#calender_nextactiondate').datetimepicker({
                    format: 'm/d/Y h:m:s',
                    step: 1,
                    datepickerScrollbar: true,
                    timepickerScrollbar: true,
                    onSelectTime: function(date) {




                    },

                });
            }
        }




        $("#ptpAmount").on("keypress keyup", function(event) {

        	   if (event.which == 13){
                   
                    $("#ptpAmount1").blur();
                   $("#ptpAmount").blur();
                   
                   }
        	
        	
        	
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }




        });

        $("#remark").on("keypress keyup", function(event) {
            
            var keypa=event.keypress;
                                           
               if (event.which == 13){
                $("#remark").blur();
                                           
              }
                                           
                              
                                           
        });


        $scope.chekIn = function() {
        	$scope.showLoading();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {

                        $rootScope.recordData.checkIn.latLong = (position.coords.latitude + "," +
                            position.coords.longitude);

                        var checkinTime = $filter('date')(new Date(), 'yyyy-MM-dd H:mm:ss');
                        $rootScope.recordData.checkIn.checkinTime = checkinTime;

                        getAddressFromLatLong(position.coords.latitude, position.coords.longitude);
                        // alert("from chkin "+$rootScope.recordData.checkIn.latLong+" - "+$rootScope.recordData.checkIn.latLong2);
                        if ($rootScope.recordData.checkIn.latLong2 != undefined) {
                            getDistance($rootScope.recordData.checkIn.latLong, $rootScope.recordData.checkIn.latLong2);
                        }
                        $scope.hideLoading();
                        $rootScope.showAlert("" + AlertMessages.locationSelected, "" + AlertMessages.alertTitile);

                    },
                    function(error) {
                        switch (error.code) {

                            case error.POSITION_UNAVAILABLE:
                            	$scope.hideLoading();
                                $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                break;

                            case error.PERMISSION_DENIED:
                            	$scope.hideLoading();
                                $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                break;

                            case error.TIMEOUT:
                            	$scope.hideLoading();
                                $rootScope.showAlert("" + AlertMessages.locationTimedOut, "" + AlertMessages.alertTitile);

                                break;

                            case error.UNKNOWN_ERROR:
                            	$scope.hideLoading();
                                $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                break;


                            default:
                            	$scope.hideLoading();
                                $rootScope.showAlert("" + AlertMessages.locationNotEnabled, "" + AlertMessages.alertTitile);
                                break;



                        }
                    }, {
                        enableHighAccuracy: false,
                        timeout: 30000,
                        maximumAge: 180000

                    }
                );
            }
            //					WL.Device.Geo.acquirePosition(function(res) {
            //		                alert(JSON.stringify(res.coords.latitude));
            //		                alert(JSON.stringify(res.coords.longitude));
            //		            }, function(err) {
            //		                alert(JSON.stringify(err));
            //
            //		            }, {timeout : 30000});
            //						if (navigator.geolocation) {
            //						navigator.geolocation.getCurrentPosition(function(p) {
            //								
            //							 $rootScope.recordData.checkIn.latLong = new google.maps.LatLng(p.coords.latitude,
            //										p.coords.longitude);
            //							 $rootScope.showAlert(""+AlertMessages.locationSelected,""+AlertMessages.alertTitile);
            //								
            //			});
            //						} else {
            //							
            //						
            //						$rootScope.showAlert(""+AlertMessages.locationNotEnabled,""+AlertMessages.alertTitile);
            //						}

        }

        $scope.attachFile = function() {
            if ($rootScope.recordData.attachedFilesLink.length >= 5) {
                $rootScope.showAlert(AlertMessages.cannotAttach5files, ""+AlertMessages.alertTitile);
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
                    getPhoto(source);

                }

                $scope.getPhotoAndroidGallery = function(source) {
                    //						Camera.PictureSourceType.CAMERA
                    //						Camera.PictureSourceType.SAVEDPHOTOALBUM
                    getPhoto(source);

                }



                var lastClickTimedisplayName = 0;
                $scope.getFile = function() {
                	
                 var current = new Date().getTime();
                 var delta = current - lastClickTimedisplayName;
                 lastClickTimedisplayName = current;
                 
	                 if (delta > 1000) {
	                  openNativeAppAttachment();
	                 }
                 }
            } else {


                WL.App.sendActionToNative("attachfile");



            }



        };



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

            if ( attachcounter == 0 ||attachcounter == undefined || attachcounter == 'undefined') {

                attachcounter = 0;
                $rootScope.recordData.attachedFilesLink = [];
                $rootScope.recordData.filenamefull = [];

                $rootScope.recordData.fileType = [];
                $rootScope.recordData.attachedFilesLink = [];
            };



             try{
                            if($rootScope.recordData.attachedFilesLink.length < attachcounter){
                            attachcounter = $rootScope.recordData.attachedFilesLink.length;
                            }
                            }catch(e){
                            }
                            if ( attachcounter == 0 ||attachcounter == undefined || attachcounter == 'undefined') {

                                            attachcounter = 0;
                                            $rootScope.recordData.attachedFilesLink = [];
                                            $rootScope.recordData.filenamefull = [];

                                            $rootScope.recordData.fileType = [];
                                            $rootScope.recordData.attachedFilesLink = [];
                                        };

            if (true) {

//                $rootScope.recordData.attachedFilesLink.push(res);
                //                              $rootScope.recordData.filenamefull.push(res.substr(res.lastIndexOf("/")+1));



                //                              getFileFromWindowRequest($rootScope.recordData.attachcounter);
                //                            $rootScope.recordData.attachcounter++;



                window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                	window.resolveLocalFileSystemURL("file://"+res, function(fileEntry) {

                   
                        fileEntry.file(function(file) {
                        	 if(file.size > (10*1024*1024)){
                                 $rootScope.showAlert(""+AlertMessages.fileExeeds,"" + AlertMessages.alertTitile);
                                 return;
                             }
                            $rootScope.recordData.filenamefull.push(file.name);



                            var $el = $('<li class="attachclasscss" id="cancelAttachID' + $rootScope.recordData.filenamefull.length + '">' + file.name + '<img   class="headerIconsimage" ng-click="cancelAttach(' + ($rootScope.recordData.filenamefull.length) + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalue");
                            $compile($el)($scope);
                            var reader = new window.FileReader();

                            reader.onloadend = function(evt) {

                                //                            console.log(""+evt.target.result);
                                $rootScope.imageData1 = evt.target.result;
                                $rootScope.recordData.attachedFilesLink[attachcounter] = evt.target.result;
                                attachcounter++;
                                if (file.type === null) {
                                    $rootScope.fileType1 = "application/json";
                                    $rootScope.recordData.fileType.push("application/json");
                                } else {
                                    $rootScope.fileType1 = file.type;
                                    $rootScope.recordData.fileType.push(file.type);

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
                                        $rootScope.recordData.attachedFilesLink[attachcounter-1] = canvas.toDataURL();
//                                        attachcounter++;
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
//                attachcounter++;
            } else {
                $rootScope.showAlert(""+AlertMessages.cannotAttach5files, ""+AlertMessages.alertTitile);
            }

            //						window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,onFileSystemSuccess, rfail);
            //
            //						window.resolveLocalFileSystemURI(imageURI, onResolveSuccess, fail);

        }

        function rfail(e) {
            alert(e);
        }

        function onFileSystemSuccess(fileSystem) {
            console.log(fileSystem.name);
        }
        //function bytesToSize(bytes) {
        //						var sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB' ];
        //						if (bytes == 0)
        //							return 'n/a';
        //						var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        //						return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        //};
        function onResolveSuccess(fileEntry) {

            filenameofajax = fileEntry.name;

            var efail = function(evt) {
                console.log("File entry error  " + error.code);
            };
            var win = function(file) {
                console.log(file);
                myPopup.close();
                $rootScope.recordData.attachedFilesLink = file;


                //alert(file);

                //alert(bytesToSize(file.size));

            };
            fileEntry.file(win, efail);
        }

        function efail(e) {
            //alert("esa")
        }

        function fail(e) {
           // alert("sa")
        }

        // Called if something bad happens.
        // 
        function onFail(message) {
            //alert('Failed because: ' + message);
        }

        function onFail(message) {
           // alert('Failed because: ' + message);
        }

        /*  */
        // this is a comment for git . . . 
        /*  */



        $scope.initData = function() {
            if ($rootScope.recordData.contactDate == '' || $rootScope.recordData.contactTime == '') {

                if (ionic.Platform.isIOS()) {
                    datestring = $filter('date')(new Date(), 'MMM dd yyyy');
                    timeString = $filter('date')(new Date(), 'h:mm a');
                    dateTimeString = "" + datestring + ", " + timeString;


                    $rootScope.recordData.contactDate = datestring;
                    $rootScope.recordData.contactTime = timeString;


                } else {

                    datestring = $filter('date')(new Date(), 'MM/dd/yyyy');
                    timeString = $filter('date')(new Date(), 'h:mm a');
                    dateTimeString = "" + datestring + ", " + timeString;


                    $rootScope.recordData.contactDate = datestring;
                    $rootScope.recordData.contactTime = timeString;



                }




            }
            if ($rootScope.recordData.actionDateDiv != undefined && $rootScope.recordData.actionDateDiv != 'undefined') {
                $('#calender_actiondate').val("" + $rootScope.recordData.actionDateDiv);
            } else {
                $('#calender_actiondate').val("" + $rootScope.recordData.contactDate + ", " + $rootScope.recordData.contactTime);
            }
            //$('#calender_nextactiondate').val(""+$rootScope.recordData.nextActionDate.replace(" ","T"));
            var d = $rootScope.recordData.nextActionDate.replace(" ", "T");
            d = d.substr(0, 16);
            $('#calender_nextactiondate').val("" + d);
            // $('#conBychangeValue').text($rootScope.recordData.personContacted);
            $('#remenderchangeValue').text($rootScope.recordData.reminderMode);
            $('#contactchangeValue').text($rootScope.recordData.contactMode);
            $('#conwithchangeValue').text($rootScope.recordData.personContacted);
            $('#actionchangeValue').text($rootScope.recordData.actionCode);
            $('#placechangeValue').text($rootScope.recordData.placeContacted);
            $(ptpAmountId).val($rootScope.recordData.ptpAmount);
            if (ionic.Platform.isIOS()) {

                var ptpValue = $rootScope.recordData.ptpAmount;
                ptpValue = currencyFormat(ptpValue);
                if (ptpValue == 0 || ptpValue == '0') {
                    ptpValue = "";

                }

                $("#ptpHidden").val(ptpValue);
                $(ptpAmountId).hide();
                $("#ptpHidden").show();


            }
            $('#remark').val($rootScope.recordData.remark);
            if ($rootScope.recordData.checkIn.difference != '' && $rootScope.recordData.checkIn.difference != undefined && $rootScope.recordData.checkIn.difference != 'undefined') {
                $('#distance').html($rootScope.recordData.checkIn.difference + " m");
            }

            var addrListId = "#" + $rootScope.recordData.checkIn.addressTypeId;
            $('.advancels').removeClass("advancelsSelected");
            $(addrListId).addClass("advancelsSelected");

            $scope.contByModel = $rootScope.recordData.contByModel;
            $scope.contWithModel = $rootScope.recordData.contWithModel;
            $scope.actionCodeModel = $rootScope.recordData.actionCodeModel;
            $scope.placeContModel = $rootScope.recordData.placeContModel;
            $scope.contModeModel = $rootScope.recordData.contModeModel;




            if ($rootScope.recordData.filenamefull == undefined) {

                attachcounter = 0;
                $rootScope.recordData.attachedFilesLink = [];
                $rootScope.recordData.fileType = [];
                $rootScope.recordData.filenamefull = [];

            } else {


                attachcounter = $rootScope.recordData.filenamefull.length;


            }



            for (i = 0; i <= attachcounter - 1; i++) {


                var $el = $('<li class="attachclasscss" id="cancelAttachID' + i + '">' + $rootScope.recordData.filenamefull[i] + '<img   class="headerIconsimage" ng-click="cancelAttach(' + i + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalue");

                $compile($el)($scope);


            }




        };


        /*$scope.$on('$ionicView.enter', function(){
                    $scope.initData();
                        });*/


        openNativeAppAttachment = function() {
            WL.App.sendActionToNative("openNativeFile");


        }

        
        $scope.addReceiverCallRecord= function(){
        
        WL.App.addActionReceiver("MyActionReceiverId", function actionReceiver(received) {
            if (received.action === "doSomething") {
               
                // $rootScope.recordData.attachedFilesLink = received.data.FilePath;
                //alert(fileAttachment);
            	var path=received.data.FilePath;
                var pathType= ""+path.substring(path.lastIndexOf(".")+1);
                if(pathType!="jpg" && pathType!="JPEG" && pathType!="JPG" && pathType!="jpeg" &&  pathType!= "png" &&  pathType!= "PNG" && pathType!="doc" && pathType!="docx" && pathType!="pdf" && pathType!="PDF" && pathType!="txt" && pathType!="xlsx" && pathType!="xls"  && pathType!="csv" && pathType!="CSV"){
                $rootScope.showAlert(""+AlertMessages.notSupportFileType,"" + AlertMessages.alertTitile);
                return;
                }

               myPopup.close();
                if (attachcounter == 0 ||attachcounter == undefined || attachcounter == 'undefined') {

                    attachcounter = 0;
                    $rootScope.recordData.attachedFilesLink = [];
                    $rootScope.recordData.filenamefull = [];
                    $rootScope.recordData.fileType = [];
                    $rootScope.recordData.attachedFilesLink = [];
                };

                try{
                if($rootScope.recordData.attachedFilesLink.length < attachcounter){
                attachcounter = $rootScope.recordData.attachedFilesLink.length;
                }
                }catch(e){
                }
                 if (attachcounter == 0 ||attachcounter == undefined || attachcounter == 'undefined') {

                                    attachcounter = 0;
                                    $rootScope.recordData.attachedFilesLink = [];
                                    $rootScope.recordData.filenamefull = [];
                                    $rootScope.recordData.fileType = [];
                                    $rootScope.recordData.attachedFilesLink = [];
                                };

                if (true) {

//                    $rootScope.recordData.attachedFilesLink.push(received.data.FilePath);
                    //		                              $rootScope.recordData.filenamefull.push(received.data.FilePath.substr(received.data.FilePath.lastIndexOf("/")+1));
                    console.log("log: " + received.data.FilePath);


                    window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                    	
                    	window.resolveLocalFileSystemURL("file://"+received.data.FilePath, function(fileEntry) {
                    	
                        
                            fileEntry.file(function(file) {
                            	 if(file.size > (10*1024*1024)){
                                     $rootScope.showAlert(""+AlertMessages.fileExeeds,"" + AlertMessages.alertTitile);
                                     return;
                                 }
                                $rootScope.recordData.filenamefull.push(file.name);
                                var $el = $('<li class="attachclasscss" id="cancelAttachID' + $rootScope.recordData.filenamefull.length + '">' + file.name + '<img   class="headerIconsimage" ng-click="cancelAttach(' + $rootScope.recordData.filenamefull.length + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalue");
                                $compile($el)($scope);
                                var reader = new window.FileReader();

                                reader.onloadend = function(evt) {

                                    //                            console.log(""+evt.target.result);
                                    $rootScope.imageData1 = evt.target.result;
                                    $rootScope.recordData.attachedFilesLink[attachcounter] = evt.target.result;
                                    attachcounter++;
                                    if (file.type === null) {
                                        $rootScope.fileType1 = "application/json";
                                        $rootScope.recordData.fileType.push("application/json");
                                    } else {
                                        $rootScope.fileType1 = file.type;
                                        console.log("fileType1: " + file.type);
                                        $rootScope.recordData.fileType.push(file.type);

                                    }

                                    if (file.type == '' || file.type == null || file.type == undefined) {

                                        $rootScope.fileType1 = (file.name).split(".")[1];
                                        $rootScope.recordData.fileType.push($rootScope.fileType1);
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
                                            $rootScope.recordData.attachedFilesLink[attachcounter-1] = canvas.toDataURL();
//                                            attachcounter++;
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
//                    attachcounter++;




                } else {
                    $rootScope.showAlert(""+AlertMessages.cannotAttach5files, ""+AlertMessages.alertTitile);
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
                                 
                                 if (attachcounter <= 4) {
                                 $rootScope.recordData.attachedFilesLink.push(received.data.url);
                                 $rootScope.recordData.fileType.push(received.data.exten);
                                 $rootScope.recordData.filenamefull.push(received.data.filename);
                                 
                                 //  $("#addvalue").append('<li class="attachclasscss">'+$rootScope.filenamefull[attachcounter]+'<img   class="headerIconsimage"  src="img/cancelBlack.png"></li>');
                                 
                                 var $el = $('<li class="attachclasscss" id="cancelAttachID' + attachcounter + '">' + $rootScope.recordData.filenamefull[attachcounter] + '<img   class="headerIconsimage" ng-click="cancelAttach(' + (attachcounter) + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalue");
                                 
                                 
                                 $compile($el)($scope);
                                 
                                 
                                 
                                 attachcounter++
                                 
                                 
                                 } else {
                                 
                                 
                                 $rootScope.showAlert(""+AlertMessages.cannotAttach5files, ""+AlertMessages.alertTitile);
                                 
                                 
                                 }
                                 
                                 
                                 }
                                 

                                 
                                 
                                 }
                                 
                
                                




} else if (received.action === "camerafile") {


                getPhoto(Camera.PictureSourceType.CAMERA);


            } else if (received.action === "changeimagebase64") {


                                 var extension =received.data.exten;
                                 
                                 
                                 
                                 if (extension =='MOV'){
                                 
                                 
                                  $rootScope.showAlert(""+AlertMessages.notSupportFileType, ""+AlertMessages.alertTitile);
                                 
                                 
                                 }else{
                                 
                                 

                if (attachcounter <= 4) {
                    $rootScope.recordData.attachedFilesLink.push(received.data.url);

                    $rootScope.recordData.fileType.push(received.data.exten);
                    $rootScope.recordData.filenamefull.push(received.data.filename);

                    var $el = $('<li class="attachclasscss" id="cancelAttachID' + attachcounter + '">' + $rootScope.recordData.filenamefull[attachcounter] + '<img   class="headerIconsimage" ng-click="cancelAttach(' + attachcounter + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalue");


                    $compile($el)($scope);


                    attachcounter++




                } else {


                    $rootScope.showAlert(""+AlertMessages.cannotAttach5files, ""+AlertMessages.alertTitile);


                }


                                 }

            } else if (received.action === "galeryfile") {


                getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM)


            }
        });

        }


        $scope.cancelAttach = function(attachcountervalue) {


            var cancelid = 'cancelAttachID' + attachcountervalue;



            $rootScope.recordData.attachedFilesLink.splice(attachcountervalue, 1);;
            $rootScope.recordData.filenamefull.splice(attachcountervalue, 1);

            var roor = $rootScope.recordData.filenamefull.length;

            attachcounter--



            $("#addvalue").html("");


            for (i = 0; i <= roor - 1; i++) {


                var $el = $('<li class="attachclasscss" id="cancelAttachID' + i + '">' + $rootScope.recordData.filenamefull[i] + '<img   class="headerIconsimage" ng-click="cancelAttach(' + i + ')" src="img/cancelBlack.png"></li>').appendTo("#addvalue");

                $compile($el)($scope);


            }




        }


        //					$scope.remarkinput=function(){
        //						
        //						if( $('#remark').val().length === 0 ){
        //							
        //							
        //							//$rootScope.showAlert("Please Enter Remark","Alert");
        //						}
        //					}
        //					
        //					$scope.ptpinput=function(){
        //						
        //						if( $(ptpAmountId).val().length === 0 ){
        //							
        //							
        //							//$rootScope.showAlert("Please Enter Amount","Alert");
        //						}
        //					}


        /*$scope.recordData = {
        	contactDate : date,
        	contactTime :time,
        	personContacted : contactBy,
        	contactedWith : contactWith,
        	contactMode: actionCode,
        	contactPlace : contactplace,
        	nextActionDate:nextActionDateDiv,
        	ptpAmount : ptpAmountValue,
        	remark : remarkValue,
        	attachedFilesLink : fileAttachment,
        	contractId: $rootScope.selectedRecord.json.contractId,
        	checkIn: {
        		addressType:address,
        		address: $rootScope.selectedRecord.json.regAddress,
        		latLong:latLng,
        	}
        };*/




        $scope.open = function() {
            $scope.array = [{
                contractId: $rootScope.selectedRecord.json.contractId
            }]
            WL.JSONStore.get(RECORDS_COLLECTION_NAME)
                .find($scope.array).then(function(list) {
                    if (list.length === 0) {

                        $rootScope.showAlert("" + AlertMessages.noRecordDraft, "" + AlertMessages.alertTitile);
                    } else {
                        $rootScope.recordsList = list;
                        $state.go('fECREDIT.draftRecord');
                    }
                }).fail(function(error) {


                    $rootScope.showAlert("" + AlertMessages.nothingToShow, "" + AlertMessages.alertTitile);
                });

        };
        /*	$scope.saveDraft = function() {
						
						actionDateDiv = $('#calender_actiondate').val();
						actionNextDate=$('#calender_nextactiondate').val();
						
						
						if(ionic.Platform.isIOS()){
		                       
		                       var d = new Date(actionDateDiv);
		                       var month = '' + (d.getMonth() + 1);
		                       var day = '' + d.getDate();
		                       var year = d.getFullYear();
		                       var predatetimeFormat=year+"-"+month+"-"+day;
		                     
		                       var preDate1=predatetimeFormat;
		                       
		                       
		                       var d = new Date(actionNextDate);
		                       var month = '' + (d.getMonth() + 1);
		                       var day = '' + d.getDate();
		                       var year = d.getFullYear();
		                       var postdatetimeFormat=year+"-"+month+"-"+day;
		                       
		                       var postDate1=postdatetimeFormat;
		                       
		                       
		                       
		                       
		                       }else{
		                       
		                       
								var preDate1 = $filter('date')(new Date(), 'dd/MM/yyyy h:mm a');
								 var postDate1 = $filter('date')(new Date(), 'dd/MM/yyyy h:mm a');
							try{
							preDate1 = $filter('date')(new Date(actionDateDiv.replace(" ", "")), 'dd/MM/yyyy h:mm a');
							preDate1 = new Date(preDate1).getMilliseconds();;
							}catch(e){
		                  	preDate1 = new Date().getMilliseconds();
							}
		                       try{
		                       					postDate1 = $filter('date')(new Date(actionNextDate), 'dd/MM/yyyy h:mm a');
		                       					postDate1 = new Date(postDate1).getMilliseconds();
		                       					}catch(e){
		                                       postDate1 = new Date().getMilliseconds();
		                       					}
		                       
		                       
		                       }
						
						$rootScope.recordData.personContacted  = $('#conBychangeValue').text();
					    $rootScope.recordData.contactedWith  = $('#conwithchangeValue').text();
                       $rootScope.recordData.remendervalue  = $('#remenderchangeValue').text();
                       $rootScope.recordData.contactcodevalue  = $('#contactchangeValue').text();
						$rootScope.recordData.contactMode  = $('#actionchangeValue').text();
						$rootScope.recordData.contactPlace  = $('#placechangeValue').text();
						
						if(ionic.Platform.isWindowsPhone()){
							$rootScope.recordData.contactDate=actionDateDiv.split(" ")[0];
							$rootScope.recordData.contactTime=actionDateDiv.split(" ")[1];
							$rootScope.recordData.nextActionDate = actionNextDate;
						}else if (ionic.Platform.isIOS()){
		                       
		                       
		                       
		                       
		                       //var newDatetime =  $filter('datetime')(actionDateDiv,'dd/MM/yyyy h:mm a');
		                       
		                       $rootScope.recordData.nextActionDate = actionNextDate.replace("T"," ")+":"+"00";
		                       $rootScope.recordData.contactDate=actionDateDiv.split(",")[0];
		                       $rootScope.recordData.contactTime=actionDateDiv.split(",")[1];
		                       var d = new Date($rootScope.recordData.contactDate);
		                       var month = '' + (d.getMonth() + 1);
		                       var day = '' + d.getDate();
		                       var year = d.getFullYear();
		                       var datetimeFormat=year+"-"+month+"-"+day;
		                       $rootScope.recordData.contactDate=datetimeFormat;
		                       
		                      var datestrings = $filter('date')(datetimeFormat, 'MMM dd yyyy');
		                      var  timeStrings = $filter('date')(new Date(), 'h:mm a');
		                     var  dateTimeStrings = ""+datestring+", "+timeString;
		                       $rootScope.recordData.contactDate=dateTimeStrings;
		                       
		                       
		                       //var newDate =  $filter('date')($rootScope.recordData.contactDate,'dd/MM/yyyy');
		                       }
						
						else{
							$rootScope.recordData.nextActionDate = actionNextDate.replace("T"," ")+":"+"00";
							$rootScope.recordData.contactDate=actionDateDiv.split(",")[0];
                                                        $rootScope.recordData.contactTime=actionDateDiv.split(",")[1];
						}
						$rootScope.recordData.ptpAmount =	$(ptpAmountId).val();
						$rootScope.recordData.remark	=	$('#remark').val();
						
						
						//alert("date"+date +" :" +time);
						//actionDateDiv.text(actionDateDiv.substring(0, 8) + '<br />'+x.substring(3));
//						alert(""+actionDateDiv.split(" ")[0]);
//						alert(""+actionDateDiv.split(" ")[1]);
						//alert("gg"+nextActionDateDiv);
						
						if($rootScope.recordData.personContacted.trim()==select ){
							
							$rootScope.showAlert(""+AlertMessages.selectContBy,""+AlertMessages.alertTitile);
						}else if( $rootScope.recordData.contactedWith.trim()==select ){
                           $rootScope.showAlert(""+AlertMessages.selectContWith,""+AlertMessages.alertTitile);
                        }else if( $rootScope.recordData.contactMode.trim()==select ){
                               $rootScope.showAlert(""+AlertMessages.selectActCode,""+AlertMessages.alertTitile);
                        }else if( $rootScope.recordData.contactPlace.trim()==select  ){
                              $rootScope.showAlert(""+AlertMessages.selectPlaceCont,""+AlertMessages.alertTitile);
                         }
                        /* else if(actionNextDate.length ===0 ){
                              $rootScope.showAlert(""+AlertMessages.invalidDate,""+AlertMessages.alertTitile);
                        }
						
						else if(preDate1>postDate1){
							$rootScope.showAlert(""+AlertMessages.invalidDate,""+AlertMessages.alertTitile);
						}
						else if ( $rootScope.recordData.ptpAmount.length === 0){
                            $rootScope.showAlert(""+AlertMessages.enterPtpAmount,""+AlertMessages.alertTitile);
                        }
                        else if ($rootScope.recordData.remark.length === 0){
                            $rootScope.showAlert(""+AlertMessages.enterRemark,""+AlertMessages.alertTitile);
                         }
						else if ( $rootScope.recordData.attachedFilesLink === '' ){
							$rootScope.showAlert(""+AlertMessages.noAttachmentFound,""+AlertMessages.alertTitile);
						
						}
						*
						else if ($rootScope.recordData.checkIn.latLong === '' ){
						
							$rootScope.showAlert(""+AlertMessages.isLocatinSelected,""+AlertMessages.alertTitile);
						}
						else if ($rootScope.recordData.checkIn.addressType=== ''){
							
							$rootScope.showAlert(""+AlertMessages.isAddressType,""+AlertMessages.alertTitile);
						}
						else{
					/*	$scope.recordData = {
                        						contactDate : date,
                        						contactTime :time,
                        						personContacted : contactBy,
                        						contactedWith : contactWith,
                        						contactMode:actionCode,
                        						contactPlace : contactplace,
                        						nextActionDate:nextActionDateDiv,
                        						ptpAmount : ptpAmountValue,
                        						remark : remarkValue,
                        						attachedFilesLink : fileAttachment,
                        						contractId: $rootScope.selectedRecord.json.contractId,
                        						checkIn: {
                        							addressType:address,
                        							address: $rootScope.selectedRecord.json.regAddress,
                        							latLong:""+latLng,
                        						}
                        					};*
                        					 if($scope.recordData ==="" || $scope.recordData ==="undefined"){
                                            $scope.tempObject = $rootScope.selectedRecord.contractId;
                                            						 }
//alert(JSON.stringify($rootScope.recordData));
						// save data in database and sync if online
						var database = WL.JSONStore
								.get(RECORDS_COLLECTION_NAME);
						database.add($rootScope.recordData).then(
								function() {
									// handle success
									//alert("Record Saved"+JSON.stringify($scope.recordData));
									
									$rootScope.showAlert(""+AlertMessages.recordSaved,""+AlertMessages.alertTitile);
									
									$state.go('fECREDIT.record');
								}).fail(function(error) {
							// handle failure
						});
						}
//						database.push().then(function(response) {
//							// "response" is remaining data to send on server.
//						}).fail(function(error) {
//							// handle failure
//						});
					};
					
					
					
				*/
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


                $rootScope.addressTypeList[i]["custAddr"] = $rootScope.selectedRecord.json[mapping];




            });

             $scope.addressTypeTempList=[];
                                            //$rootScope.addressTypeList = $rootScope.addressTypeList.sort(Comparator);
                                            for(var j =0 ; j<$rootScope.addressTypeList.length;j++){
                                             if($rootScope.addressTypeList[j]["custAddr"] !=undefined && $rootScope.addressTypeList[j]["custAddr"] !=''){
                                                 $scope.addressTypeTempList.push($rootScope.addressTypeList[j]);

                                                                            }
                                            }
                                            for(var j =0 ; j<$rootScope.addressTypeList.length;j++){
                                             if($rootScope.addressTypeList[j]["custAddr"]==undefined || $rootScope.addressTypeList[j]["custAddr"]==''){
                                                 $scope.addressTypeTempList.push($rootScope.addressTypeList[j]);

                                                                            }
                                            }
                                            $rootScope.addressTypeList = $scope.addressTypeTempList;

        }

        $scope.addressFunction = function(addressObject, event, i) {
        	var addrType = addressObject.address;
            $rootScope.recordData.checkIn.addressType = addrType;
            $rootScope.recordData.checkIn.addressTypeId = "addrTypeLi"+i;
            $('.advancels').removeClass("advancelsSelected");
            $("#addrTypeLi"+i).addClass("advancelsSelected");


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
            /*
            var mapping = $rootScope.addrTypeMapping[i].mapping;
            if (mapping == "regAddress") {
                var addr2 = $rootScope.selectedRecord.json.regAddress;
            } else if (mapping == "actAddress") {
                var addr2 = $rootScope.selectedRecord.json.actAddress;
            } else if (mapping == "offAddress") {
                var addr2 = $rootScope.selectedRecord.json.offAddress;
            }
            */
            var addr2 = $rootScope.selectedRecord.json[mapping];
            $rootScope.recordData.checkIn.customersAddress = addr2;
            getLocationFromAddress(addr2,addrType,"addrTypeLi"+i);


            $scope.addressdropdownview = true;
        }
        $scope.clearData = function() {

            //						$('#calender_actiondate').val('');
            $('#calender_nextactiondate').val('');
            $('#conBychangeValue').text(Messages.selectButton);
            $('#conwithchangeValue').text(Messages.selectButton);

            $('#remenderchangeValue').text(Messages.selectButton);
            $('#contactchangeValue').text(Messages.selectButton);
            $('#actionchangeValue').text(Messages.selectButton);
            $('#placechangeValue').text(Messages.selectButton);
            $(ptpAmountId).val('');
            $('#remark').val('');
            $('#distance').html('');
            $scope.contModeModel = "FV";
            document.getElementById("contactchangeValue").innerHTML = "FIELD VISIT";
        }

        $scope.save = function(saveType) {
            // saveType 2 for server , 1 for Local Draft
            var preDate2;
            var postDate2;

            var options = {};


            actionDateDiv = $('#calender_actiondate').val();
            actionNextDate = $('#calender_nextactiondate').val();


            if (ionic.Platform.isIOS()) {

                var d = new Date(actionDateDiv);
                var month = '' + (d.getMonth() + 1);
                var day = '' + d.getDate();
                var year = d.getFullYear();
                var predatetimeFormat = year + "-" + month + "-" + day;

                var preDate2 = predatetimeFormat;

                var d = new Date(actionNextDate);
                var month = '' + (d.getMonth() + 1);
                var day = '' + d.getDate();
                var year = d.getFullYear();
                var postdatetimeFormat = year + "-" + month + "-" + day;

                var postDate2 = postdatetimeFormat;

            } else {


                var preDate2 = $filter('date')(new Date(), 'dd/MM/yyyy h:mm a');
                var postDate2 = $filter('date')(new Date(), 'dd/MM/yyyy h:mm a');
                try {
                    preDate2 = $filter('date')(new Date(actionDateDiv.replace(" ", "")), 'dd/MM/yyyy h:mm a');
                    preDate2 = new Date(preDate2).getMilliseconds();;
                } catch (e) {
                	$exceptionHandler(e, " ");
                    preDate2 = new Date().getMilliseconds();


                }

                try {
                    postDate2 = $filter('date')(new Date(actionNextDate), 'dd/MM/yyyy h:mm a');
                    postDate2 = new Date(postDate2).getMilliseconds();
                } catch (e) {
                	$exceptionHandler(e, " ");
                    postDate2 = new Date().getMilliseconds();


                }


            }

            // used for saving to draft and showing (description)
            $rootScope.recordData.personContacted = $('#conwithchangeValue').text(); // =contacted with
            $rootScope.recordData.actionCode = $('#actionchangeValue').text();
            $rootScope.recordData.placeContacted = $('#placechangeValue').text();
            $rootScope.recordData.contactMode = $('#contactchangeValue').text();
            $rootScope.recordData.reminderMode = $('#remenderchangeValue').text();

            // used for sending to server below  (value)
            $rootScope.recordData.contByModel = $scope.contByModel;
            $rootScope.recordData.contWithModel = $scope.contWithModel;
            $rootScope.recordData.actionCodeModel = $scope.actionCodeModel;
            $rootScope.recordData.placeContModel = $scope.placeContModel;
            $rootScope.recordData.contModeModel = $scope.contModeModel;
            if ($rootScope.recordData.contModeModel == undefined) {
                $rootScope.recordData.contModeModel = '';
            }
            var actCodeVal = $rootScope.recordData.actionCodeModel; // for validation of ptp amount

            if (ionic.Platform.isWindowsPhone()) {
                $rootScope.recordData.actionDateDiv = actionDateDiv.replace(",", "") + ":" + "00";
                $rootScope.recordData.nextActionDate = actionNextDate;
            } else if (ionic.Platform.isIOS()) {


                //var newDatetime =  $filter('datetime')(actionDateDiv,'dd/MM/yyyy h:mm a');
        if (actionNextDate != ''){
                $rootScope.recordData.nextActionDate = actionNextDate.replace("T", " ") + ":" + "00";
              }
                $rootScope.recordData.actionDateDiv = actionDateDiv.replace(",", "") + ":" + "00";
                var d = new Date($rootScope.recordData.contactDate);
                var month = '' + (d.getMonth() + 1);
                var day = '' + d.getDate();
                var year = d.getFullYear();
                var datetimeFormat = year + "-" + month + "-" + day;
                $rootScope.recordData.contactDate = datetimeFormat;
                //var newDate =  $filter('date')($rootScope.recordData.contactDate,'dd/MM/yyyy');
            } else {
            	 if(actionNextDate != ''){
                     $rootScope.recordData.nextActionDate = actionNextDate.replace("T", " ") + ":" + "00";
                 }
                $rootScope.recordData.actionDateDiv = actionDateDiv; /*.replace(",", "") + ":" + "00";*/
            }
            //  $rootScope.recordData.ptpAmount = $(ptpAmountId).val();  // due to iOS
            $rootScope.recordData.remark = $('#remark').val();
            var actionDate = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            // validation starts here:
            if ($rootScope.recordData.reminderMode.trim() == select) {

                $rootScope.showAlert("" + AlertMessages.selectContBy, "" + AlertMessages.alertTitile);
            } else if ($rootScope.recordData.personContacted.trim() == select) {

                $rootScope.showAlert("" + AlertMessages.selectContWith, "" + AlertMessages.alertTitile);

            }
             else if ($rootScope.recordData.actionCode.trim() == select && $rootScope.recordData.contWithModel != 'OWNER') {
                            $rootScope.showAlert("" + AlertMessages.selectActCode, "" + AlertMessages.alertTitile);
                        } 
            else if ($rootScope.recordData.placeContacted.trim() == select) {

                $rootScope.showAlert("" + AlertMessages.selectPlaceCont, "" + AlertMessages.alertTitile);

            }
            /* else if( actionNextDate.length != 0 && preDate2>postDate2){		
                $rootScope.showAlert(""+AlertMessages.invalidDate,""+AlertMessages.alertTitile);
                }*/
            else if ((actCodeVal == "PTP" || actCodeVal == "IGN3" || actCodeVal == "WFP" || actCodeVal == "IGN5") && ($rootScope.recordData.ptpAmount.length === 0)) {

                $rootScope.showAlert("" + AlertMessages.enterPtpAmount, "" + AlertMessages.alertTitile);
            }
            /*
                                                        else if ($rootScope.recordData.remark.length === 0){
                                                            $rootScope.showAlert(""+AlertMessages.enterRemark,""+AlertMessages.alertTitile);
                                                         }
                                						else if ( $rootScope.recordData.attachedFilesLink === '' ){
                                							$rootScope.showAlert(""+AlertMessages.noAttachmentFound,""+AlertMessages.alertTitile);
                                						}*/
            else if ($rootScope.recordData.checkIn.addressType === '') {

                $rootScope.showAlert("" + AlertMessages.isAddressType, "" + AlertMessages.alertTitile);

            } else if ($rootScope.recordData.checkIn.latLong === '') {

                $rootScope.showAlert("" + AlertMessages.isLocatinSelected, "" + AlertMessages.alertTitile);

            } else {
                //$rootScope.recordData.contactDate = $rootScope.recordData.contactDate.replace("," , "");
                //$rootScope.recordData.contactDate = $filter('date')(new Date($rootScope.recordData.contactDate), 'yyyy-MM-dd');




                var str = $rootScope.recordData.ptpAmount;

                var regex = new RegExp(',', 'g')
                str = str.replace(regex, '');
                str = parseFloat(str);




                //  var actionDate = $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss');


                //   var distance = $rootScope.recordData.checkIn.difference.replace("m", "");


                options = {
                    "contactDateTime": actionDate,
                    "customerId": $rootScope.selectedRecord.json.custId,
                    "personContacted": $rootScope.recordData.contWithModel,
                    "actionCode": $rootScope.recordData.actionCodeModel,
                    "placeContacted": $rootScope.recordData.placeContModel,
                    "contactMode": $rootScope.recordData.contModeModel,
                    "reminderMode": $rootScope.recordData.contByModel,
                    "nextActionDateTime": $rootScope.recordData.nextActionDate,
                    "ptpAmount": str,
                    "remarks": $rootScope.recordData.remark,
                    "contractId": $rootScope.selectedRecord.json.contractId,
                    "storeId": "1",
                    "isskiptracer": $rootScope.selectedRecord.json.isskiptracer,
                    "actAddress":$rootScope.selectedRecord.json.actAddress,
                    "offAddress":$rootScope.selectedRecord.json.offAddress,
                    "regAddress":$rootScope.selectedRecord.json.regAddress,
                    "product":$rootScope.selectedRecord.json.product,
                    "bucket":$rootScope.selectedRecord.json.bucket,
                    "dpd":$rootScope.selectedRecord.json.dpd,
                    "customerName":$rootScope.selectedRecord.json.firstName,
                    "checkIn": {
                        "addressType": $rootScope.recordData.checkIn.addressType,
                        "address": $rootScope.recordData.checkIn.customersAddress,
                        "latLong": "" + $rootScope.recordData.checkIn.latLong,
                        "checkinDateTime": $rootScope.recordData.checkIn.checkinTime,
                        "checkinAddress": $rootScope.recordData.checkIn.checkinAddress,
                        "distance": $rootScope.recordData.checkIn.difference,
                        "unitCode": "" + $rootScope.selectedRecord.json.unitCode1,
                        "unitCodeDesc": "" + $rootScope.selectedRecord.json.unitCodeDesc
                    }

                };

                $rootScope.recordedList.push(""+$rootScope.selectedRecord.json.contractId);
                
                $rootScope.recordData.custId = $rootScope.selectedRecord.json.custId;
                $rootScope.recordData.unitCode1 = $rootScope.selectedRecord.json.unitCode1;
                $rootScope.recordData.unitCodeDesc = $rootScope.selectedRecord.json.unitCodeDesc;
                $rootScope.recordData.isskiptracer = $rootScope.selectedRecord.json.isskiptracer;
                $rootScope.recordData.contractId = $rootScope.selectedRecord.json.contractId; // not saving draft again bug resolved
                $scope.tempObject = options;

                //  alert(JSON.stringify(options));


                if ($scope.tempObject === "" || $scope.tempObject === "undefined") {
                    $scope.tempObject = $rootScope.selectedRecord.contractId;

                }


                if (saveType == 1) {




                    //  alert(JSON.stringify($rootScope.recordData));//return;
                    var database = WL.JSONStore.get(RECORDS_COLLECTION_NAME);
                    database.add($rootScope.recordData).then(
                        function() {
                            // handle success
                            //alert("Record Saved"+JSON.stringify($scope.recordData));

                            $rootScope.showAlert("" + AlertMessages.recordSaved, "" + AlertMessages.alertTitile);

                            $state.go('fECREDIT.record');
                        }).fail(function(error) {
                        // handle failure
                    });
                } else {
                    //  alert(JSON.stringify($rootScope.recordData));//return;
                    $scope.saveLocalAndHitRequest();
                }
            } // last else
        }

        $scope.saveLocalAndHitRequest = function() {
            $scope.showLoading();



            WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME).add($scope.tempObject).then(function(data) {


                //							hit server
                var resourceRequest = new WLResourceRequest("/adapters/contract/mycontract/record/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                
                if($rootScope.isInternetConnected()){
                	resourceRequest.send([$scope.tempObject]).then($scope.getSecretData_CallbackOKRecord, $scope.getSecretData_CallbackFailRecord);
                }else{
                	$scope.hideLoading();
                	$state.go('fECREDIT.record');
                	$rootScope.showAlert(""+AlertMessages.isInternetSyncYourData,""+AlertMessages.alertTitile);
                }



            }).fail(function(error) {
                $scope.hideLoading();
                $rootScope.showAlert("Error in Saving record.", ""+AlertMessages.alertTitile);
            });


        };




        $scope.showLoading = function() {
            $ionicLoading.show({
                template: AlertMessages.loadingDialouge
            });
        };

        $scope.hideLoading = function() {
            $ionicLoading.hide();
        };



        $scope.getSecretData_CallbackOKRecord = function(response) {


            if (response.responseJSON[0].responseCode == "102") {
                //				        	  sso
                $scope.hideLoading();
                $scope.savAndLogout();

                return;

            } else if (response.responseJSON[0].responseCode != "200") {
                //				        	  fail
                $scope.hideLoading();
                $state.go('fECREDIT.record');
                $rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);
                
                return;
            } else if (response.responseJSON[0].responseCode == "200") {

            	 $rootScope.recordDataId = response.responseJSON[0].dto.recordId;
                 //								it delete local saved record from online db object not from draft saved

                 WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME).findAll().then(function(numberOfDocuments) {
                         $scope.toBeRemoved = [];
                         $scope.toBeRemoved.push({
                                                 _id: numberOfDocuments[numberOfDocuments.length-1]._id
                                             });

                         WL.JSONStore.get(RECORDS_ONLINE_COLLECTION_NAME)
                             .remove($scope.toBeRemoved, {})
                             .then(function(numberOfDocumentsRemoved) {
                                 //handle success

                                 $scope.callSaveAttachment(0);


                         }).fail(function(errorObject) {
                             //handle failure
                             $scope.hideLoading();
                             $rootScope.showAlert("" + AlertMessages.recordSaved, "" + AlertMessages.alertTitile);
                             $state.go('fECREDIT.record');
                         });


                 }).fail(function(errorObject) {
                     //handle failure
                     $scope.hideLoading();
                     $rootScope.showAlert("" + AlertMessages.recordSaved, "" + AlertMessages.alertTitile);
                     $state.go('fECREDIT.record');
                 });


            }

        };


        $scope.callSaveAttachment = function(indexvalue) {



            $rootScope.recordData.attachedFilesLink;

            var arrayLengthvalue = $rootScope.recordData.attachedFilesLink.length;




            if (indexvalue <= arrayLengthvalue - 1)

            {

                $scope.indexvaleforattachment = indexvalue;


                var isAndroid = ionic.Platform.isAndroid();

                if (isAndroid) {

                    $scope.optionsAttachment = {
                        "attachmentData": $rootScope.recordData.attachedFilesLink[indexvalue].split(",")[1],
                        "attachmentType": $rootScope.recordData.fileType[indexvalue],
                        "recordId": $rootScope.recordDataId,
                        "attachmentName":$rootScope.recordData.filenamefull[indexvalue]

                    }

                } else {

                    $scope.optionsAttachment = {
                        "attachmentData": $rootScope.recordData.attachedFilesLink[indexvalue],
                        "attachmentType": $rootScope.recordData.fileType[indexvalue],
                        "recordId": $rootScope.recordDataId,
                        "attachmentName":$rootScope.recordData.filenamefull[indexvalue]

                    }



                }

                var resourceRequest = new WLResourceRequest("adapters/contract/mycontract/recordAttachment/save", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.optionsAttachment).then($scope.getSecretData_CallbackOKRecordAttachment, $scope.getSecretData_CallbackFailRecordAttachment);



            } else {

                $scope.hideLoading();

                // clear locally saved drafts after syncing on server
                WL.JSONStore.get(RECORDS_COLLECTION_NAME)
                    .remove({
                        _id: $rootScope.selectedRecordDbId
                    }, {})
                    .then(function(numberOfDocumentsRemoved) {
                        $rootScope.selectedRecordDbId = '';
                        //console.log("draft cleared from local db");
                    }).fail(function(errorObject) {

                       // console.log("draft didn't clear from local db");

                    });

                $rootScope.showAlert("" + AlertMessages.recordSaved, "" + AlertMessages.alertTitile);
                $state.go('fECREDIT.record');

            }

        }


        $scope.getSecretData_CallbackOKRecordAttachment = function(response) {




            var succussvalueindex = $scope.indexvaleforattachment;

            succussvalueindex++;


            $scope.callSaveAttachment(succussvalueindex);




        }

        $scope.getSecretData_CallbackFailRecordAttachment = function(response) {
          
        	  $scope.hideLoading();
        	  if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                  $rootScope.sessionTimeOutMessage();
                  return;
              }
              $rootScope.sessionTimeOutCalled = false;
        	if (response.status == 404 || response.status == 0 || response.status == 500) {
                $rootScope.showAlert(AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                return;
            }

          
       
        }



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
            //				        	$ionicHistory.clearHistory();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('login');
        };


        $scope.getSecretData_CallbackFailRecord = function(response) {
            $scope.hideLoading();
            if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
            	$rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);
            	$rootScope.sessionTimeOutMessage();
                return;
            }
            if (response.status == 404 || response.status == 0 || response.status == 500) {
            	$state.go('fECREDIT.record');
            	$rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);
               // $rootScope.showAlert(AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
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


        //alert(data.rem+" : "+data.ptpAmt+" : "+contactBy+" : "+contactWith+" : "+actionCode+" : "+ contactplace+" : "+address );

        //					}

        $scope.contactedBy = function() {
            var listData = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  ';

            //						Reminder Mode
            for (var int = 0; int < $rootScope.reminidermode.length; int++) {
                var array_element = $rootScope.reminidermode[int];

                var desc = array_element.description;
                var value = array_element.value;

                listData += '<p onclick="email(' + "'" + value + "','" + desc + "'" + ');"  class="contByPopLi" >' + desc + ' </p>' +
                    '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';

            }




            var myPopup = $ionicPopup
                .show({

                    template: listData,

                    cssClass: 'record-custom-popup contByPop',
                    scope: $scope,

                    buttons: [{
                        text: Messages.cancelButton
                    }]

                });
            email = function(value, desc) {


                $rootScope.recordData.contactedWithCode = value;


                //							$rootScope.recordData.contacted_by = contactedByArray[arg - 1];
                $rootScope.recordData.contacted_by = desc;

                if ($rootScope.selectedDraftRecord = "") {
                    if ($rootScope.selectedDraftRecord.json.personContacted.length > 0) {
                        document.getElementById("conBychangeValue").innerHTML = $rootScope.selectedDraftRecord.json.personContacted;
                    }
                } else {
                    //							document.getElementById("conBychangeValue").innerHTML = contactedByArray[arg - 1];
                    document.getElementById("conBychangeValue").innerHTML = desc;

                    myPopup.close();
                }

            };

        };
         var actionCodeDynamicArr = [];
        $scope.contactedWith = function() {

            var listData = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  ';
            for (var int = 0; int < $rootScope.personContact.length; int++) {
                var array_element = $rootScope.personContact[int];

                var desc = $.trim(array_element.description);
                var value = $.trim(array_element.value);

                listData += '<p onclick="emailw(' + "'" + value + "','" + desc + "','" + int + "'" + ');">' +
                    desc +
                    '</p>' +
                    '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';

            }

            var myPopup = $ionicPopup
                .show({

                    template: listData,

                    cssClass: 'record-custom-popup',
                    scope: $scope,

                    buttons: [{
                        text: Messages.cancelButton
                    }]

                });
            emailw = function(value, description, index) {

                $rootScope.recordData.personContactedCode = value;
                actionCodeDynamicArr = $rootScope.personContact[index].actionCode;

                //							$rootScope.recordData.contacted_with = contactedWithArray[arg - 1];
                $rootScope.recordData.contacted_with = description;
                if ($rootScope.selectedDraftRecord = "") {
                    if ($rootScope.selectedDraftRecord.json.contactedWith.length > 0) {
                        document.getElementById("conwithchangeValue").innerHTML = $rootScope.selectedDraftRecord.json.contactedWith;
                    }
                } else {
                    $scope.contWithModel = value;
                    //							document.getElementById("conwithchangeValue").innerHTML = contactedWithArray[arg - 1];
                    document.getElementById("conwithchangeValue").innerHTML = description;

                    $scope.actionCodeModel = '';
                    //							document.getElementById("actionchangeValue").innerHTML = actionCodeArray[arg - 1];
                    document.getElementById("actionchangeValue").innerHTML = Messages.selectButton;
                    myPopup.close();
                }

            };

        };
   /*     var clientActCodeArr = ['PTP', 'WFP', 'IGN3', 'BRP', 'CSO', 'F_OBT', 'F_SOB', 'GSF', 'HPR', 'LST',
            'WAS', 'MCW', 'CTI', 'RMA', 'F_CGI', 'IGN1', 'IGN2', 'IGN4', 'IGN5', 'RTP','SKF_NAF', 'SKF_NSP'
        ];

        var relativeActCodeArr = ['PTP', 'WFP', 'IGN3', 'BRP', 'CSO', 'DIE', 'F_CGI', 'F_NAH', 'F_NLA',
            'F_OBT', 'F_SOB', 'F_WAU', 'GSF', 'HPR', 'LEM', 'RTP', 'LST',
            'WAS', 'MCW', 'CTI', 'RMA', 'IGN1', 'IGN2', 'IGN4', 'IGN5','SKF_NAF', 'SKF_NSP'
        ];
        var otherActCodeArr = ['BRP', 'CSO', 'DIE', 'F_CGI', 'F_HOS', 'F_NAH', 'F_NFH', 'F_NLA',
            'F_NIW', 'F_RENT', 'F_SOB', 'F_WAU', 'F_WET', 'GSF', 'HPR', 'SKF_NAF', 'SKF_NSP'
        ];
        var noBodyActCodeArr = ['F_HOS', 'F_NAH', 'F_NFH', 'F_NIW', 'F_RENT', 'F_WET', 'GSF',
            'IGN1', 'IGN2', 'IGN3', 'IGN4', 'IGN5'
        ];
        var relativePersonArr = ['FATHER', 'MOTHER', 'WIFE', 'HUSBAND', 'CHILD', 'BROTHER', 'SISTER', 'UNCLE', 'RELATIVE'];
*/
        $scope.actionCode = function() {
            var perContVal = $scope.contWithModel;
            var ifPersonContSelected = $('#conwithchangeValue').text();
            if (ifPersonContSelected.trim() == select) {
                return;
            }
            var listData = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  ';
            for (var int = 0; int < $rootScope.actionCode.length; int++) {
                var array_element = $rootScope.actionCode[int];

                var desc = array_element.description;
                var value = array_element.actionCode;

               // if (perContVal == "CLIENT") {

                    if (actionCodeDynamicArr.indexOf(value) != -1) {
                        listData += '<p onclick="emailac(' + "'" + value + "','" + desc + "'" + ');">' +
                            desc +
                            '</p>' +
                            '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';
                    }
/*
                } else if (perContVal == "OWNER") {

                    listData = '';

                } else if (relativePersonArr.indexOf(perContVal) != -1) {

                    if (relativeActCodeArr.indexOf(value) != -1) {
                        listData += '<p onclick="emailac(' + "'" + value + "','" + desc + "'" + ');">' +
                            desc +
                            '</p>' +
                            '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';
                    }

                } else if (perContVal == "OTHER") {

                    if (otherActCodeArr.indexOf(value) != -1) {
                        listData += '<p onclick="emailac(' + "'" + value + "','" + desc + "'" + ');">' +
                            desc +
                            '</p>' +
                            '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';
                    }

                } else if (perContVal == "NOBODY") {

                    if (noBodyActCodeArr.indexOf(value) != -1) {
                        listData += '<p onclick="emailac(' + "'" + value + "','" + desc + "'" + ');">' +
                            desc +
                            '</p>' +
                            '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';
                    }
                }*/ else {
                    listData += '';
                }

            }

            if (listData == '') {
                return;
            }
            myPopup = $ionicPopup
                .show({

                    template: listData,

                    cssClass: 'record-custom-popup actionCodePop',
                    scope: $scope,

                    buttons: [{
                        text: Messages.cancelButton
                    }]

                });
            emailac = function(value, description) {

                $rootScope.recordData.contactModeCode = value;

                //							$rootScope.recordData.action_code = actionCodeArray[arg - 1];
                $rootScope.recordData.action_code = value;
                $rootScope.recordData.action_desc = description;

                if ($rootScope.selectedDraftRecord = "") {
                    if ($rootScope.selectedDraftRecord.json.contactedWith.length > 0) {
                        document.getElementById("actionchangeValue").innerHTML = $rootScope.selectedDraftRecord.json.contactMode;
                    }
                } else {
                    $scope.actionCodeModel = value;
                    //							document.getElementById("actionchangeValue").innerHTML = actionCodeArray[arg - 1];
                    document.getElementById("actionchangeValue").innerHTML = description;
                    myPopup.close();
                }

            };

        };

        /*  */
        // this is a comment for git . . . 
        /*  */



        $scope.Reminder = function() {


            var listData = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  ';
            for (var int = 0; int < $rootScope.reminidermode.length; int++) {
                var array_element = $rootScope.reminidermode[int];

                var desc = array_element.description;
                var value = array_element.value;

                listData += '<p onclick="emailrm(' + "'" + value + "','" + desc + "'" + ');">' +
                    desc +
                    '</p>' +
                    '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';

            }

            var myPopup = $ionicPopup
                .show({

                    template: listData,

                    cssClass: 'record-custom-popup',
                    scope: $scope,

                    buttons: [{
                        text: Messages.cancelButton
                    }]

                });
            emailrm = function(value, description) {

                $rootScope.recordData.reminderCodemode = value;


                //							$rootScope.recordData.contacted_with = contactedWithArray[arg - 1];
                $rootScope.recordData.contacted_with = description;
                if ($rootScope.selectedDraftRecord = "") {
                    if ($rootScope.selectedDraftRecord.json.contactedWith.length > 0) {
                        document.getElementById("remenderchangeValue").innerHTML = $rootScope.selectedDraftRecord.json.contactedWith;
                    }
                } else {
                    $scope.contByModel = value;
                    //							document.getElementById("conwithchangeValue").innerHTML = contactedWithArray[arg - 1];
                    document.getElementById("remenderchangeValue").innerHTML = description;
                    myPopup.close();
                }

            };




        }



        $scope.ContactMode = function() {


            var listData = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  ';
            for (var int = 0; int < $rootScope.contactMode.length; int++) {
                var array_element = $rootScope.contactMode[int];

                var desc = array_element.description;
                var value = array_element.value;

                listData += '<p onclick="emailcm(' + "'" + value + "','" + desc + "'" + ');">' +
                    desc +
                    '</p>' +
                    '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';

            }

            var myPopup = $ionicPopup
                .show({

                    template: listData,

                    cssClass: 'record-custom-popup placeContPop',
                    scope: $scope,

                    buttons: [{
                        text: Messages.cancelButton
                    }]

                });
            emailcm = function(value, description) {

                $rootScope.recordData.contactCodemode = value;


                //							$rootScope.recordData.contacted_with = contactedWithArray[arg - 1];
                $rootScope.recordData.contacted_with = description;
                if ($rootScope.selectedDraftRecord = "") {
                    if ($rootScope.selectedDraftRecord.json.contactedWith.length > 0) {
                        document.getElementById("contactchangeValue").innerHTML = $rootScope.selectedDraftRecord.json.contactedWith;
                    }
                } else {
                    $scope.contModeModel = value;
                    //							document.getElementById("conwithchangeValue").innerHTML = contactedWithArray[arg - 1];
                    document.getElementById("contactchangeValue").innerHTML = description;
                    myPopup.close();
                }

            };




        }



        $scope.placeContacted = function() {

            var listData = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  ';
            for (var int = 0; int < $rootScope.contactPlace.length; int++) {
                var array_element = $rootScope.contactPlace[int];

                var desc = array_element.description;
                var value = array_element.value;

                listData += '<p onclick="emailpc(' + "'" + value + "','" + desc + "'" + ');">' +
                    desc +
                    '</p>' +
                    '<p style="background-color: #DCDCDC; width: 100%; height: 1px;">';


            }




            var myPopup = $ionicPopup
                .show({

                    template: listData,

                    cssClass: 'record-custom-popup placeContPop',
                    scope: $scope,

                    buttons: [{
                        text: Messages.cancelButton
                    }]

                });
            emailpc = function(value, description) {

                $rootScope.recordData.contactPlaceCode = value;

                //							$rootScope.recordData.place_contacted = placeContactedArray[arg - 1];
                $rootScope.recordData.place_contacted = description;
                if ($rootScope.selectedDraftRecord = "") {
                    if ($rootScope.selectedDraftRecord.json.contactedWith.length > 0) {
                        document.getElementById("placechangeValue").innerHTML = $rootScope.selectedDraftRecord.json.contactPlace;
                    }
                } else {
                    $scope.placeContModel = value;
                    //							document.getElementById("placechangeValue").innerHTML = placeContactedArray[arg - 1];
                    document.getElementById("placechangeValue").innerHTML = description;
                    myPopup.close();
                }

            };

        };
        $scope.addressdropdownview = true;
        $scope.addresstypeclick = function() {
            //	if ($rootScope.recordData.checkIn.latLong === '' ){

            //  	$rootScope.showAlert(""+AlertMessages.isLocatinSelected,""+AlertMessages.alertTitile);
            //}else{
            $scope.addressdropdownview = $scope.addressdropdownview ? false :
                true;
            //}

        };

        $scope.$on('$ionicView.leave', function() {
            $rootScope.recordData = {};
            $rootScope.recordData.checkIn = {};
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
            $rootScope.recordData.attachedFilesLink = [];
            $rootScope.recordData.fileType = [];
            $rootScope.recordData.filenamefull = [];
            $rootScope.recordData.checkIn.difference = '';
            $("#distance").html("");
            $rootScope.recordData.checkIn.addressType = '';
            $("#ptpHidden").val('');
            $rootScope.recordData.checkIn.latLong = '';
            $("#addvalue").html("");
        });



        /*function onPhotoURISuccess(imageURI) {
            
            
            
            WL.App.sendActionToNative("changeimagebase64", { customData: imageURI});
          
        }*/




        function rfail(e) {
            alert(e);
        }

        /*  */
        // this is a comment for git . . . 
        /*  */

        function getPhoto(source) {

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

        function onFileSystemSuccess(fileSystem) {
            console.log(fileSystem.name);
        }

        function bytesToSize(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0)
                return 'n/a';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };

        function onResolveSuccess(fileEntry) {

            filenameofajax = fileEntry.name;

            var efail = function(evt) {
                console.log("File entry error  " + error.code);
            };
            var win = function(file) {
                console.log(file);

                //alert(file);

                alert(bytesToSize(file.size));

            };
            fileEntry.file(win, efail);
        }

        function efail(e) {
            //alert("esa")
        }

        function fail(e) {
            //alert("sa")
        }

        // Called if something bad happens.
        // 
        function onFail(message) {
            //alert('Failed because: ' + message);
        }

        function onFail(message) {
            /// alert('Failed because: ' + message);
        }

        $scope.numericOnly = function(id) {
            var dotCount = 0;
            var idd = "#" + id;
            var textValue = $(idd).val();



            for (var i = 0; i < textValue.length; i++) {

                if (isNaN(textValue[i]) && textValue[i] != '.') {


                    textValue = textValue.substring(0, i) + textValue.substring(i + 1, textValue.length);
                    $(idd).val(textValue);
                } else if (textValue[i] == '.') {
                    dotCount++;

                    if (dotCount > 1) {
                        textValue = textValue.substring(0, i) + textValue.substring(i + 1, textValue.length);
                        $(idd).val(textValue);
                    }
                }
            }

            $(idd).val(textValue.split(' ').join(''));
        };
       
        $scope.hidePtpHiddenInput = function() {
            $("#ptpHidden").hide();
            $("#ptpAmount").show();
            $("#ptpAmount").focus();
        }

        $scope.makeNumeric = function(id) {
            var idd = "#" + id;
            $rootScope.recordData.ptpAmount = $(idd).val();

            var currencyValue = currencyFormat($(idd).val());
            if (currencyValue == 0) {
                currencyValue = '';
            }
            if (ionic.Platform.isIOS()) {
                $(idd).hide();
                $("#ptpHidden").val(currencyValue);
                $("#ptpHidden").show();
            } else {
                $(idd).val(currencyValue);
            }


        }

        function currencyFormat(x) {
            x = x.toString();
            var afterPoint = '';
            if (x.indexOf('.') > 0) {
                afterPoint = x.substring(x.indexOf('.'), x.length);
            }
            var regex = new RegExp(',', 'g');
            x = x.replace(regex, ''); // added by aman to prevent NaN
            x = Math.floor(x);
            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + lastThree + afterPoint;
            return res
        }

        function getAddressFromLatLong(lat, long) {
        	 if(window.google === undefined) {
        	        //$scope.hideLoading();
        	        return;
        	    }
            var geocoder = new google.maps.Geocoder();
            var latLng = new google.maps.LatLng(lat, long);
            geocoder.geocode({
                    latLng: latLng
                },
                function(responses) {
                    if (responses && responses.length > 0) {
                        currentAddress = responses[0].formatted_address;

                    } else {
                        currentAddress = '';

                    }
                    $rootScope.recordData.checkIn.checkinAddress = currentAddress;
                }
            );
        }

        var globalAddrType = '';
        var globalAddrListId = '';
        function getLocationFromAddress(address,addrType,listId) {
        	 //var address = "H122, H Block, Sector 63, Noida, Uttar Pradesh 201301";
        	   globalAddrType = addrType;
               globalAddrListId = listId;
               if(window.google === undefined) {
                   //$scope.hideLoading();
                   return;
               }
                       
            if (address !='undefined' &&  address !=null ){
                       
                    
                       
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    lat = results[0].geometry.location.lat();
                    long = results[0].geometry.location.lng();
                    var addr2 = (lat + "," + long); // customer address latlong
                    $rootScope.recordData.checkIn.latLong2 = addr2;

                    var addr1 = $rootScope.recordData.checkIn.latLong; // check in address latlong

                    $rootScope.recordData.checkIn.addressType = addrType;
                    $rootScope.recordData.checkIn.customersAddress = address;
                     $("#" + listId).addClass("advancelsSelected");

                    if (addr1 != '' && addr1 != undefined && addr1 != 'undefined') {
                        getDistance(addr1, addr2);
                    }
                    // return addr2;
                } else {
                	
                	if(address.length > 0 && address.indexOf(" ")!=-1){
                        var address1Part = address.split(" ")[0];
                        if(address.indexOf(address1Part)!=-1){
                        address = address.replace(address1Part+" ", "");
                        getLocationFromAddress(address,addrType,listId);
                        return;
                        }
                        }
                	
                    $rootScope.recordData.checkIn.latLong2 = undefined;
                    $rootScope.recordData.checkIn.difference = '';
                    $("#distance").html("");
                    // no manual entry
                    //$rootScope.showAlert("" + AlertMessages.address_notAvailable, "" + AlertMessages.alertTitile);
                    // manual address entry
                    /*
                       if ($rootScope.isInternetConnected()) {
                             //if online
                            $("#addrTextArea").val(address);
                            $("#addrPromptPopUp").show();

                       }else{ //if offline
                            navigator.notification.confirm( AlertMessages.addrPromptMsg, // message
                                onConfirm, // callback
                               AlertMessages.address_notAvailable, // title
                                ['Proceed','Cancel'] // buttonName
                                );
                            function onConfirm(btnIndex) {
                               if(btnIndex == 1){       // proceed button
                                   // do nothing
                              }else if(btnIndex == 2){ // cancel button

                                    $('.advancels').removeClass("advancelsSelected");
                                    $rootScope.recordData.checkIn.customersAddress = '';
                                    $rootScope.recordData.checkIn.addressType = '';  // for validation

                              }
                            }

                       }
                        */
                } // if addr not found else ends
            });
                       
                       }else{
                       
                       $rootScope.recordData.checkIn.latLong2 = undefined;
                       $rootScope.recordData.checkIn.difference = '';
                       $("#distance").html("");
                       
                       
                       
                       
                       }
        }
        $scope.onAddrPrompt = function(buttonIndex) {
            $("#addrPromptPopUp").hide();
          if(buttonIndex == 1){       // proceed button
               // do nothing
          }else if(buttonIndex == 2){ // cancel button

                $('.advancels').removeClass("advancelsSelected");
                $rootScope.recordData.checkIn.customersAddress = '';
                $rootScope.recordData.checkIn.addressType = '';  // for validation

          }else if(buttonIndex == 3){ // search button

                var enteredAddr =   $("#addrTextArea").val();
                getLocationFromAddress(enteredAddr,globalAddrType,globalAddrListId);
          }

       }
        
        $rootScope.closeRecordUploadModule = function() {
            if($rootScope.selectedRecordFromRecord==true){
                    	 $state.go('fECREDIT.record');
                    	 $rootScope.selectedRecordFromRecord=false;
                    	 
                    	 
                    }
                	
            else {

                    	$state.go('fECREDIT.contractInformation');
                    }
                };

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

            //var R = 6371; // km (change this constant to get miles)
            var R = 6378137; 
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
            //d = Math.round(d * 1000);
            d = Math.round(d);
            //    	}
            $rootScope.recordData.checkIn.difference = d;
            $("#distance").html(d + " m");
            return d;

            /*   var origin1 = new google.maps.LatLng(addr1Lat, addr1Long);
               var destinationB = new google.maps.LatLng(addr2Lat, addr2Long);
               var service = new google.maps.DistanceMatrixService();
               service.getDistanceMatrix({
                   origins: [origin1],
                   destinations: [destinationB],
                   travelMode: google.maps.TravelMode.DRIVING,
                   unitSystem: google.maps.UnitSystem.IMPERIAL,
                   avoidHighways: false,
                   avoidTolls: false,
               }, callback);
               function callback(response, status) {
                   if (status == 'OK') {
                       var origins = response.originAddresses;
                       var destinations = response.destinationAddresses;
                       var results = response.rows[0].elements;
                       var element = results[0];
                       if (element.status == "OK") {
                           $scope.distance = element.distance.text;
                       } else {
                           $scope.distance = "NO DATA FOUND";
                       }
                   }
               }*/



            function getFileFromWindowRequest(indexOfAttachment) {
                window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {



                    fileSystem.root.getFile($rootScope.recordData.attachedFilesLink[indexOfAttachment], {
                        create: false,
                        exclusive: false
                    }, function(fileEntry) {
                        fileEntry.file(function(file) {
                            var reader = new window.FileReader();

                            reader.onloadend = function(evt) {

                                //                            console.log(""+evt.target.result);
                                $rootScope.imageData1 = evt.target.result;
                                if (file.type === null) {
                                    $rootScope.fileType1 = "application/json";
                                    $rootScope.recordData.fileType.push("application/json");
                                } else {
                                    $rootScope.fileType1 = file.type;
                                    $rootScope.recordData.fileType.push(file.type);

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
                                        $rootScope.imageData.push(canvas.toDataURL());
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

                                    // comment      

                                }


                                //                                       var indexvalue=0;
                                

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



            };
        }

    })