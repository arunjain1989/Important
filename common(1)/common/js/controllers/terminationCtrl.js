
/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */

/* JavaScript content from js/controllers/terminationCtrl.js in folder common */
FeCreditApp
    .controller(
        'terminationCtrl',
        function($scope, $state, $location, $ionicPopup, $ionicLoading,
            $rootScope, $ionicNavBarDelegate, $filter,$compile, utilFactory, $ionicHistory, $ionicPlatform,$ionicScrollDelegate,$exceptionHandler ) {

                 var attachcounter = 0;
            $scope.$on("$ionicView.enter", function(event, data) {

            	$rootScope.contractNotificationBool=true;
             // variale declaration starts
             var attachcounter = 0;
             
             $ionicScrollDelegate.scrollTop();
             

                $rootScope.dataToSend = {};
                $rootScope.dataToSend.checkIn = {};
                $rootScope.dataToSend.attachedFilesLink = [];
                $rootScope.dataToSend.filenamefull = [];
                $rootScope.dataToSend.fileType = [];
               

                $rootScope.dataToSend.earlyTerminationFeeRequested = '';
                $rootScope.dataToSend.penaltyFeeRequested = '';
                $rootScope.dataToSend.totalWaiveRequest = '';

                $rootScope.dataToSend.checkIn.addressType = '';
                $rootScope.dataToSend.checkIn.customersAddress = '';
                $rootScope.dataToSend.checkIn.latLong = '';
                $rootScope.dataToSend.checkIn.checkinTime = '';
                $rootScope.dataToSend.checkIn.checkinAddress = '';
                $rootScope.dataToSend.checkIn.difference = '';
                $rootScope.dataToSend.payer = '';
                $rootScope.dataToSend.reason = '';
                $scope.pay = ''; $scope.rsn = '';

                $rootScope.termFormPart1 = false;
                $rootScope.termFormPart2 = false;
                $rootScope.listContract = false;
                $rootScope.termListHeader = true;
                //$rootScope.terminationSelected = ''; // not required to declare
                $scope.terminationToSearch = '';
                $("#terminationStatus").html("Pending");
                $("#statusDiv").hide();
                $scope.numericOnly = utilFactory.numericOnly;
                $scope.phoneNumericOnly = utilFactory.phoneNumeric;
                $scope.currencyFormat = utilFactory.currencyFormat;
                $scope.terminationServerData='';

                // variale declaration ends

            //  below this lang specific strings used in UI
                $scope.checkInButton = Messages.checkIn;
                $scope.addressType = Messages.addressType;
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
                $scope.recordTitle = Messages.record;
                $scope.cancelButton = Messages.cancelButton;

                $scope.customerId = Messages.customerId;
                $scope.custName = Messages.custName;
                $scope.dateAssign = Messages.dateAssign;
                $scope.directionText = Messages.directionText;
                $scope.footerCT = Messages.footerCT;
                $scope.saveButton = Messages.saveButton;
                $scope.loanDpd = Messages.loanDpd;
                $scope.nextButton = Messages.nextButton;
                $scope.contractHeader = Messages.contractHeader;
                $scope.daysPastDue = Messages.daysPastDue;
                $scope.bucket = Messages.bucket;
                $scope.unit = Messages.unit;
                $scope.model = Messages.model;
                $scope.brand = Messages.brand;
                $scope.city = Messages.city;
                $scope.readInvoicePrice = Messages.readInvoicePrice;
                $scope.loanAmount = Messages.readInvoicePrice;
                $scope.principalOs = Messages.principalOs;
                $scope.interest = Messages.interest;
                $scope.loanPenalty = Messages.loanPenalty;
                $scope.earlyTermiantionFee = Messages.earlyTermiantionFee;
                $scope.closingAmount = Messages.closingAmount;
                $scope.assetCondition = Messages.assetCondition;
                $scope.financialCondition = Messages.financialCondition;
                $scope.proposalSalesPrice = Messages.proposalSalesPrice;
                $scope.reason = Messages.reason;
                $scope.financialhardship = Messages.financialhardship;
                $scope.customerDeceased = Messages.customerDeceased;
                $scope.accidentSickness = Messages.accidentSickness;
                $scope.collateral = Messages.collateral;
                $scope.payer = Messages.payer;
                $scope.customer = Messages.customer;
                $scope.relative = Messages.relative;
                $scope.other = Messages.other;
                $scope.attachments = Messages.attachments;
                $scope.chargedOff = Messages.chargedOff;
                $scope.excessAmount = Messages.excessAmount;
                $scope.waiveRequest = Messages.waiveRequest;
                $scope.penaltyFeeRqust = Messages.penaltyFeeRqust;
                $scope.earlyTerFeeRequst = Messages.earlyTerFeeRequst;
                $scope.amountPaidByCust = Messages.amountPaidByCust;
                $scope.noOfInstallments = Messages.noOfInstallments;
                $scope.contCustName = Messages.contCustName;
                $scope.attachFileButton = Messages.attachFileButton;
                $scope.cameraButton = Messages.cameraButton;
                $scope.galleryButton = Messages.galleryButton;
                $scope.fileButton = Messages.fileButton;
                $scope.phoneNum = Messages.phoneNumber;
                $scope.status = Messages.status;
                $scope.distance = Messages.distance;
                $scope.preButton = Messages.preButton;

                $scope.unableFindAddr = AlertMessages.address_notAvailable;
                $scope.addrPromptMsgOnline = AlertMessages.addrPromptMsgOnline;
                $scope.addrPromptMsgOffline = AlertMessages.addrPromptMsg;

                $scope.proceedBtn = Messages.proceedBtn;

                $scope.addReceiverCaller();
                if (WL.App.getDeviceLanguage() == 'vi') {
                   // document.getElementById("cancelText").style.paddingLeft = "3px";
                    //document.getElementById("cancelButton").style.paddingLeft = "3px";


                }

                if ($rootScope.deviceLang == 'vi') {

                    $scope.cnclButtonViet = true;
                    // document.getElementById("recordContentTop").className += " recordContentTopCss";
                }
                $scope.clearFilter();
               // alert("view enter   "+JSON.stringify($rootScope.terminationSelected));
                if ($rootScope.terminationSelected != "" && $rootScope.terminationSelected != undefined ){
                	$rootScope.terminationSelectedFrom=true;
                    $scope.initData(1); // 1 means it came from contract pages footer
                }

                
                $scope.fieldcollector= 'fieldColllector';
                $scope.headcollection= 'headOfCollection';
                $scope.directorcollection= 'directorOfCollection';
                 
                 
                  if($scope.fieldCollector === 'fieldCollector' || $scope.headcollection==='headOfCollection'||
                         $scope.fieldCollector === 'directorOfCollection'){

                     $scope.saveContractTermination = true;

                  } else{
                     $scope.saveContractTermination = false;
                  }
	        

                        try{
$rootScope.searchTextBlack = false;
                                                            					document.getElementById("mytext_termination").value = ""+Messages.searchBtn;
                                                            					}catch(e){
                                                            						$exceptionHandler(e, " ");
                                                            					}

            });  // ionic view.enter ends here



            $scope.payerdropdownview = true;
            $scope.payerclick = function() {

                $scope.payerdropdownview = $scope.payerdropdownview ? false : true;


            };

              $scope.addrdropdownview = true;
            $scope.addrclick = function() {

                $scope.addrdropdownview = $scope.addrdropdownview ? false : true;


            };

            $scope.reasondropdownview = true;
            $scope.reasonclick = function() {

                $scope.reasondropdownview = $scope.reasondropdownview ? false : true;


            };


            $ionicNavBarDelegate.showBackButton(false);
            $scope.quickview = "withclick";
            $scope.advanceview = "withoutclick";
            $scope.quickhide = false;
            $scope.advancehide = true;
            $rootScope.valueData;
            $rootScope.selectedDraftRecord = "";






            $scope.selectContractArr = [];




            $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
               // $rootScope.contractList = [];
            });




            $scope.nextTerminationScreen = function() {

            	$ionicScrollDelegate.scrollTop();
                $rootScope.termFormPart1 = false;
                $rootScope.listContract = false;
                $rootScope.termFormPart2 = true;

            }
               
                var  isDataSavedLocally=false;
                
       $scope.clearDataDisableInput = function(){
                $("#attachmentList").html("");
                $('#penaltyFeeModal').prop('disabled', false);
                $('#earlyTerminationModal').prop('disabled', false);
                $('#waiveModal').prop('disabled', false);
                $('#phoneNum').prop('disabled', false);
                $('#penaltyFeeModal').val('');
                $('#earlyTerminationModal').val('');
                $('#waiveModal').val('');
                $('#phoneNum').val('');
                $("#distanceTerm").html("");
                 $('.advancels').removeClass("advancelsSelected");
                  isDataSavedLocally=false;
                $scope.terminationServerData='';
                  attachcounter = 0;
                $rootScope.dataToSend = {};
                $rootScope.dataToSend.checkIn = {};
                $rootScope.dataToSend.attachedFilesLink = [];
                $rootScope.dataToSend.filenamefull = [];
                $rootScope.dataToSend.fileType = [];
                
                
                $rootScope.dataToSend.earlyTerminationFeeRequested = '';
                $rootScope.dataToSend.penaltyFeeRequested = '';
                $rootScope.dataToSend.totalWaiveRequest = '';
                
                $rootScope.dataToSend.checkIn.addressType = '';
                $rootScope.dataToSend.checkIn.customersAddress = '';
                $rootScope.dataToSend.checkIn.latLong = '';
                $rootScope.dataToSend.checkIn.checkinTime = '';
                $rootScope.dataToSend.checkIn.checkinAddress = '';
                $rootScope.dataToSend.checkIn.difference = '';
                $rootScope.dataToSend.payer = '';
                $rootScope.dataToSend.reason = '';
                $scope.rsnChk1 = false;
                $scope.rsnChk2 = false;
                $scope.rsnChk3 = false;
                $scope.rsnChk4 = false;
                $scope.payChk1 = false;
                $scope.payChk2 = false;
                $scope.payChk3 = false;

                $rootScope.termFormPart2 = false;
                $rootScope.listContract = false;
                $rootScope.termFormPart1 = true;
                $rootScope.termListHeader = false;
                
                //$scope.terminationServerData='';
                
                //checkbox disable//
                
                 $scope.checkBoxDisable = false;
                
                

              //  $rootScope.terminationSelected = ''; // not required to clear here
                $scope.terminationToSearch = '';
                
                
                }
                
                
            $scope.selectContractListItems = function(index) {
            	
            	
            	

                $rootScope.terminationSelected = $rootScope.contractList[index].json;
                                
                $scope.initData(2);  // 2 means it came from home page and searched the contract 

            }
        
                $scope.comingFromTermination = function(){
                
                
                $scope.showLoading();
                
                
                $scope.tempObject = {
                "contractId" : $rootScope.terminationSelected.contractId
                }
                
                
                var resourceRequest = new WLResourceRequest("/adapters/getContractTermination/users/data", WLResourceRequest.POST);
                resourceRequest.setHeader("Content-Type", "application/json");
                resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                resourceRequest.send($scope.tempObject).then($scope.termCancelRequestDataSuccess, $scope.termCancelRequestDataFailure);
                
                
                }
                
                $scope.termCancelRequestDataSuccess = function(response){
                
                $scope.hideLoading();
                if (response.responseJSON.responseCode == 102) {
                
                $scope.savAndLogout();
                return;
                
                } else if (response.responseJSON.responseCode == 101) {
                
                $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                return;
                
                } else if (response.responseJSON.responseCode == 200) {
                
                var termiData = response.responseJSON.dto;
                
                
                if(termiData==null){
                
                
                }else{
                
                $rootScope.terminationDto.push(termiData);
                
                }
                
                
               
                $scope.getByValue();
                
                $scope.initData();
                
                
                }
                
                }
                
                
                
                
                
                
                
                
    $scope.termCancelRequestDataFailure= function(response){
   counter=0
    $scope.hideLoading();
    if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
        $rootScope.sessionTimeOutMessage();
        return;
    }       
    $rootScope.showAlert("" + AlertMessages.gettingServerData, "" + AlertMessages.alertTitile);
     
                
                }
                
                
                
                
                
                
        $scope.getByValue = function(){

                var arr = $rootScope.terminationDto;
                
                for (var i=0, iLen=arr.length; i<iLen; i++) {
                
                     if (arr[i].contractId ==$rootScope.terminationSelected.contractId)
                
                     $scope.terminationServerData= arr[i];
                }
        
                
         }
                
                $scope.getByValue1 = function(){
                
                var arr = $rootScope.terminationDto;
                
                for (var i=0, iLen=arr.length; i<iLen; i++) {
                
                if ($rootScope.termIdFromNoti ==arr[i].contractTerminationId)
                
                $scope.terminationServerData= arr[i];
                }
                
                
                }
                
                
                
                
                
                
                
                
            var counter=0
                
                
         $scope.loginDataShow = function(){
                
                
                if ($rootScope.comingFromNotification == true){
                

                 $scope.getByValue1();


                }


                var nullCheck = $scope.terminationServerData;




                if($rootScope.offlinetermination==true && nullCheck==""){


                 $rootScope.showAlert("" + AlertMessages.isInternet, "" + AlertMessages.alertTitile);

                 $rootScope.offlinetermination=false;

                return;

                }


          if ( typeof(nullCheck) !== "undefined" && nullCheck !== null && nullCheck !== 0 && nullCheck !=='' && nullCheck !==  undefined ) {

                   if( nullCheck.status == "APPROVED" || nullCheck.status == "PENDING"  ){
                        $("#cancelTermBtn").show();
                   } else{
                         $("#cancelTermBtn").hide();
                   }

                if( nullCheck.status != "APPROVED"  && $rootScope.termIdFromNoti == "" && $rootScope.comingFromNotification != true){
                     counter=0;

                    $rootScope.showAlert(""+AlertMessages.noTerminationData, "Alert");
                    $scope.terminationServerData='';

                }else{

                	$rootScope.terminationSelected=nullCheck;



                $scope.terminationServerData1=nullCheck;

                $scope.clearDataDisableInput();
                isDataSavedLocally=true;
                 $scope.checkBoxDisable = true;
                 $('#penaltyFeeModal').prop('disabled', true);
                 $('#earlyTerminationModal').prop('disabled', true);
                 $('#waiveModal').prop('disabled', true);
                 $('#phoneNum').prop('disabled', true);


                if(nullCheck.penaltyFeeRequested != null){
                nullCheck.penaltyFeeRequested = $scope.currencyFormat(nullCheck.penaltyFeeRequested);


                }

                if(nullCheck.earlyTerminationFeeRequested != null){
                 nullCheck.earlyTerminationFeeRequested = $scope.currencyFormat(nullCheck.earlyTerminationFeeRequested);


                }
                if(nullCheck.totalWaiveRequest != null){
            nullCheck.totalWaiveRequest = $scope.currencyFormat(nullCheck.totalWaiveRequest);


                }


                $('#penaltyFeeModal').val(nullCheck.penaltyFeeRequested);
                $('#earlyTerminationModal').val(nullCheck.earlyTerminationFeeRequested);
                $('#waiveModal').val(nullCheck.totalWaiveRequest);
                $('#phoneNum').val(nullCheck.phoneNumber);
                if ($rootScope.deviceLang == 'vi') {
                    $("#terminationStatus").html(nullCheck.displayStatusVn);
                           }
                           else{
                             $("#terminationStatus").html(nullCheck.displayStatusEn);
                           }
                $("#statusDiv").show();

                 $("#reasonValue").html(nullCheck.reason);
                  $("#payerValue").html(nullCheck.payer);

                        if (nullCheck.reason == "Tai nạn, ốm đau" || nullCheck.reason == "Accident Or Sickness"){
                            $scope.rsnChk2 = true;
                        }else if( nullCheck.reason=="KH chết hoặc mất tích" || nullCheck.reason == "Customer Is Deceased Or Lost"){
                            $scope.rsnChk1 = true;
                        }else if( nullCheck.reason=="Thanh lý tài sản đảm bảo" || nullCheck.reason == "Collateral Was Repossessed"){
                            $scope.rsnChk3 = true;
                        }else if( nullCheck.reason=="Khó khăn tài chính" || nullCheck.reason == "Financial Hardship"){
                            $scope.rsnChk4 = true;
                        }

                        if (nullCheck.payer=="Khách hàng" || nullCheck.payer=="Customer" ){
                            $scope.payChk1 = true;
                        }else if( nullCheck.payer=="Người thân" || nullCheck.payer=="Relatives"){
                            $scope.payChk2 = true;
                        }else if( nullCheck.payer=="Khác" || nullCheck.payer=="Others"){
                            $scope.payChk3 = true;
                        }


                }


                }else{

                    // fetch from server


                    if ( $rootScope.termIdFromNoti != "" ) {

                        $scope.tempObject = {
                            "termination": $rootScope.termIdFromNoti
                        };
//                        $rootScope.termIdFromNoti = "";

                        if ($rootScope.isInternetConnected() ){
                             $scope.showLoading();


                            var resourceRequest = new WLResourceRequest("/adapters/getTermination/users/data", WLResourceRequest.POST);
                            resourceRequest.setHeader("Content-Type", "application/json");
                            resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                            resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                            resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                            resourceRequest.send($scope.tempObject).then($scope.getTerminationSuccess, $scope.getTerminationFailure);
                        }else{
                              $rootScope.showAlert("" + AlertMessages.isInternet, "" + AlertMessages.alertTitile);

                        }

                    }else{

                if ($rootScope.isInternetConnected()) {

                if (counter==0){

                counter=1

                $scope.comingFromTermination();
                }else{
                counter=0

                $rootScope.showAlert(""+AlertMessages.noTerminationData, ""+AlertMessages.alertTitile);

                }
                }else{

                $rootScope.offlinetermination=true;

                $scope.getByValue();

                $scope.initData();


                }







                    //	$rootScope.showAlert(""+AlertMessages.noTerminationData, "Alert");
                      //  $scope.terminationServerData='';
                        //return;
                    }


                }


             }
             $scope.getTerminationSuccess = function(response) {
                // alert(JSON.stringify(response));

                 $scope.hideLoading();
                 if (response.responseJSON.responseCode == 102) {

                     $scope.savAndLogout();
                     return;

                 } else if (response.responseJSON.responseCode == 101) {

                     $rootScope.showAlert("" + AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                     return;

                 } else if (response.responseJSON.responseCode == 200) {

                     var termiData = response.responseJSON.dto;


                         // for saving in termiantion array which was already received on login time


                     if ($rootScope.terminationDto.length == 0) {

                         $rootScope.terminationDto.push(termiData);
                     }
                     var found = 0;
                     for (var j = 0; j < $rootScope.terminationDto.length; j++) {

                         if ($rootScope.terminationDto[j].contractTerminationId == termiData.contractTerminationId) {

                             found = 1;
                             break;
                         }

                     }
                     if (found == 0) {
                         $rootScope.terminationDto.push(termiData);
                     }else{
                         // delete older one & insert this one
                     }
                     $scope.initData();


                 }

             }

             $scope.getTerminationFailure = function(error) {

                 $scope.hideLoading();
                 if(error.errorCode != undefined && error.errorCode==="SESSIONTIMEOUT"){
                     $rootScope.sessionTimeOutMessage();
                     return;
                 }
                 $rootScope.showAlert("" + AlertMessages.gettingServerData, "" + AlertMessages.alertTitile);
             }

            $scope.initData = function(from){

                // from means,  if coming from contract pages or list in same page


                $scope.loginDataShow();

                /*
                $scope.terminationToSearch = [{
                            contractId: $rootScope.terminationSelected.contractId
                }]

                // find from $rootScope.terminationDto

            	WL.JSONStore.get(TERMINATION_COLLECTION_NAME)
                .find($scope.terminationToSearch).then(function(findResults) {

                 //alert("find "+findResults.length);
                 if (findResults.length != 0) {

	                 isDataSavedLocally=true;  // used further to prevent checkbox

	                       $scope.checkBoxDisable = true;

	                   $('#penaltyFeeModal').prop('disabled', true);
	                   $('#earlyTerminationModal').prop('disabled', true);
	                   $('#waiveModal').prop('disabled', true);
	                   $('#phoneNum').prop('disabled', true);
	                   $('#penaltyFeeModal').val($scope.currencyFormat(findResults[0].json.penaltyFeeRequested));
	                   $('#earlyTerminationModal').val($scope.currencyFormat(findResults[0].json.earlyTerminationFeeRequested));
	                   $('#waiveModal').val($scope.currencyFormat(findResults[0].json.totalWaiveRequest));
	                   $('#phoneNum').val(findResults[0].json.phoneNumber);
	                    $("#terminationStatus").html("Pending");
	                  	$("#statusDiv").show();

	                 if (findResults[0].json.reason=="Tai nạn, ốm đau"){
	                      $scope.rsnChk2 = true;
	                 }else if( findResults[0].json.reason=="KH chết hoặc mất tích"){
	                   $scope.rsnChk1 = true;
	                  }else if( findResults[0].json.reason=="Thanh lý tài sản đảm bảo"){
	                      $scope.rsnChk3 = true;
	                    }else if( findResults[0].json.reason=="Khó khăn tài chính"){
	                      $scope.rsnChk4 = true;
	                    }


	                if (findResults[0].json.payer=="Khách hàng"){
	                  $scope.payChk1 = true;

	                  }else if( findResults[0].json.payer=="Người thân"){
	                    $scope.payChk2 = true;
	                     }else if( findResults[0].json.payer=="Khác"){
	                      $scope.payChk3 = true;
	                    }



                 	}

                 }).fail(function (errorObject) {


                    $scope.hideLoading();
                });
                */
//                setTimeout(function(){ $scope.showStatusFromNotification(); }, 200);

                $scope.attacmentDataShow();


                }

            $scope.showStatusFromNotification = function(){

                var arrName = $rootScope.terminationStatusArr;
                for (var j = 0; j < arrName.length; j++) {

                    if (arrName[j].contractId == $rootScope.terminationSelected.contractId) {
                        if($("#terminationStatus").html() != "CANCEL"){
                        	  $("#terminationStatus").html(arrName[j].status);
                        }
                        else{
                        	  $("#terminationStatus").html(arrName[j].status);
                        }
                          
                        }
                        $("#statusDiv").show();
                        break;
                    }

                }

     
  $scope.attacmentDataShow = function(){



    WL.JSONStore.get(TERMINATION_ATTACHMENTDB_NAME)
                .find($scope.terminationToSearch).then(function(findResults) {

          if (findResults.length != 0) {


          var roor = findResults.length;


         for (i = 0; i <= roor - 1; i++) {


            var $el = $('<li class="attachclasscss" id="cancelAttachID' + i + '">' + findResults[i].json.attachmentName + '</li>').appendTo("#attachmentList");



            }









            }

        }).fail(function (errorObject) {


              // $scope.hideLoading();
        });





                }


                $scope.previousTerminationScreen = function() {

                	$ionicScrollDelegate.scrollTop();
                $rootScope.termFormPart1 = true;
                $rootScope.listContract = false;
                $rootScope.termFormPart2 = false;
            }
             var regex = new RegExp(',', 'g');
            $scope.checkWaiverAmount = function() {

                var penaltyFeevalue = $('#penaltyFeeModal').val();
                var earlyTerminationvalue = $('#earlyTerminationModal').val();
                var waiveModalvalue = $('#waiveModal').val();



                 penaltyFeevalue = parseFloat( penaltyFeevalue.replace(regex, '') );
                 earlyTerminationvalue = parseFloat( earlyTerminationvalue.replace(regex, '') );
                 waiveModalvalue = parseFloat( waiveModalvalue.replace(regex, '') );


                var totalFee = penaltyFeevalue + earlyTerminationvalue;

                if (waiveModalvalue > totalFee) {

                    $rootScope.showAlert("Waive request can't be greater than sum of Penalty fee and Early Termination fee", "Alert");


                    $('#waiveModal').val("");

                }


            }

             $scope.moneyFormat = function(id) {
                        var idd = "#" + id;

                        var currencyValue = $scope.currencyFormat($(idd).val());


                        $(idd).val(currencyValue);

                    }

            $scope.addressFunction = function(addressObject, event, i) {

                if (isDataSavedLocally)  {
                return;
                }


                var addrType = addressObject.address;
               // $rootScope.dataToSend.checkIn.addressType = addrType; //  added in success of getLocationFromAddress
                $rootScope.dataToSend.checkIn.addressTypeId = event.target.id;
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
                var addr2 = $rootScope.terminationSelected[mapping];
                $rootScope.dataToSend.checkIn.customersAddress = addr2;
                getLocationFromAddress(addr2,addrType,event.target.id);


                $scope.addrdropdownview = true;
            }


            $scope.checkIn = function() {

                if (isDataSavedLocally)  {

                return;
                }


                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function(position) {

                            $rootScope.dataToSend.checkIn.latLong = (position.coords.latitude + "," +
                                position.coords.longitude);

                            var checkinTime = $filter('date')(new Date(), 'yyyy-MM-dd H:mm:ss');
                            $rootScope.dataToSend.checkIn.checkinTime = checkinTime;

                            getAddressFromLatLong(position.coords.latitude, position.coords.longitude);

                            if ($rootScope.dataToSend.checkIn.latLong2 != undefined) {
                                getDistance($rootScope.dataToSend.checkIn.latLong, $rootScope.dataToSend.checkIn.latLong2);
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
                        $rootScope.dataToSend.checkIn.checkinAddress = currentAddress;
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
                        $rootScope.dataToSend.checkIn.latLong2 = addr2;

                        var addr1 = $rootScope.dataToSend.checkIn.latLong; // check in address latlong

                        $rootScope.dataToSend.checkIn.addressType = addrType;
                        $rootScope.dataToSend.checkIn.customersAddress = address;
                         $("#" + listId).addClass("advancelsSelected");

                        if (addr1 != '' && addr1 != undefined && addr1 != 'undefined') {
                            getDistance(addr1, addr2);
                        }
                        // return addr2;
                    } else {
                        $rootScope.dataToSend.checkIn.latLong2 = undefined;
                        $rootScope.dataToSend.checkIn.difference = '';
                        $("#distance").html("");

                        // manual address entry
                           if ($rootScope.isInternetConnected()) {
                                 //if online
                                $("#addrTextAreaTerm").val(address);
                                $("#addrPromptPopUpTerm").show();

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
                                        $rootScope.dataToSend.checkIn.customersAddress = '';
                                        $rootScope.dataToSend.checkIn.addressType = '';  // for validation

                                  }
                                }

                           }

                    } // if addr not found else ends
                });
            }
            $scope.onAddrPromptTerm = function(buttonIndex) {
                $("#addrPromptPopUpTerm").hide();
              if(buttonIndex == 1){       // proceed button
                   // do nothing
              }else if(buttonIndex == 2){ // cancel button

                    $('.advancels').removeClass("advancelsSelected");
                    $rootScope.dataToSend.checkIn.customersAddress = '';
                    $rootScope.dataToSend.checkIn.addressType = '';  // for validation

              }else if(buttonIndex == 3){ // search button

                    var enteredAddr =   $("#addrTextAreaTerm").val();
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
                $rootScope.dataToSend.checkIn.difference = d;
                $("#distanceTerm").html(d + " m");
                return d;
            }

             $scope.rsn = '';



                $scope.selectReasonCheckBox = function(model) {

                if (isDataSavedLocally)  {
                $scope.rsnChk1 = false;
                $scope.rsnChk2 = false;
                $scope.rsnChk3 = false;
                $scope.rsnChk4 = false;
                 return
                }

                            $scope.rsnChk1 = false;
                            $scope.rsnChk2 = false;
                            $scope.rsnChk3 = false;
                            $scope.rsnChk4 = false;
                            if (model == 'rsnChk1') {
                                $scope.rsnChk1 = true;
                                if ($scope.rsn != 'KH chết hoặc mất tích') {
                                    $scope.rsn = 'KH chết hoặc mất tích';
                                } else {
                                    $scope.rsn = '';
                                }

                            } else if (model == 'rsnChk2') {
                                $scope.rsnChk2 = true;
                                if ($scope.rsn != 'Tai nạn, ốm đau') {
                                    $scope.rsn = 'Tai nạn, ốm đau';
                                } else {
                                    $scope.rsn = '';
                                }
                            } else if (model == 'rsnChk3') {
                                $scope.rsnChk3 = true;
                                if ($scope.rsn != 'Thanh lý tài sản đảm bảo') {
                                    $scope.rsn = 'Thanh lý tài sản đảm bảo';
                                } else {
                                    $scope.rsn = '';
                                }
                            }else if (model == 'rsnChk4') {
                                $scope.rsnChk4 = true;
                                if ($scope.rsn != 'Khó khăn tài chính') {
                                    $scope.rsn = 'Khó khăn tài chính';
                                } else {
                                    $scope.rsn = '';
                                }
                            }


                            $rootScope.dataToSend.reason = $scope.rsn;
                        }
                        $scope.pay = '';
            $scope.selectPayerCheckBox = function(model) {

                      if (isDataSavedLocally)  {

                $scope.payChk1 = false;
                $scope.payChk2 = false;
                $scope.payChk3 = false;

                    return
                        }


                            $scope.payChk1 = false;
                            $scope.payChk2 = false;
                            $scope.payChk3 = false;

                            if (model == 'payChk1') {
                                $scope.payChk1 = true;
                                if ($scope.pay != 'Khách hàng') {
                                    $scope.pay = 'Khách hàng';
                                } else {
                                    $scope.pay = '';
                                }
                            } else if (model == 'payChk2') {
                                $scope.payChk2 = true;
                                if ($scope.pay != 'Người thân') {
                                    $scope.pay = 'Người thân';
                                } else {
                                    $scope.pay = '';
                                }
                            } else if (model == 'payChk3') {
                                $scope.payChk3 = true;
                                if ($scope.pay != 'Khác') {
                                    $scope.pay = 'Khác';
                                } else {
                                    $scope.pay = '';
                                }
                            }

                            $rootScope.dataToSend.payer = $scope.pay;
                        }

            $scope.saveRequest = function() {
            	if (isDataSavedLocally)  {
                    return;
            	}

                $rootScope.dataToSend.contractId = $rootScope.terminationSelected.contractId;

                var penaltyFee = $('#penaltyFeeModal').val();
                var earlyFee = $('#earlyTerminationModal').val();
                var totWavReq = $('#waiveModal').val();

                if (penaltyFee == "") {
                    penaltyFee = '0';
                }
                if (earlyFee == "") {
                    earlyFee = '0';
                }
                if (totWavReq == "") {
                    totWavReq = '0';
                }

                 var regex = new RegExp(',', 'g');

                 penaltyFee = parseInt( penaltyFee.replace(regex, '') );
                 earlyFee = parseInt( earlyFee.replace(regex, '') );
                 totWavReq = parseInt( totWavReq.replace(regex, '') );

                var phoneNum = $('#phoneNum').val();

                $rootScope.dataToSend.earlyTerminationFeeRequested = earlyFee;
                $rootScope.dataToSend.penaltyFeeRequested = penaltyFee;
                $rootScope.dataToSend.totalWaiveRequest = totWavReq;
                $rootScope.dataToSend.phoneNumber = phoneNum;


                // validation start
                if($rootScope.dataToSend.phoneNumber == ""){
                    $rootScope.termFormPart1 = true;
                    $rootScope.termFormPart2 = false;
                    $rootScope.listContract = false;

                    $rootScope.showAlert("" +AlertMessages.enter_bidder_cusNumber , "" + AlertMessages.alertTitile);

                }else if($rootScope.dataToSend.phoneNumber.length < 10 ){
                            $rootScope.termFormPart1 = true;
                            $rootScope.termFormPart2 = false;
                            $rootScope.listContract = false;
                    $rootScope.showAlert("" + AlertMessages.mobileLength10 , "" + AlertMessages.alertTitile);

                }else if($rootScope.dataToSend.payer == ""){
                    $rootScope.showAlert("" + AlertMessages.choosePayer , "" + AlertMessages.alertTitile);

                }else if ($rootScope.dataToSend.checkIn.addressType === '') {
                    $rootScope.showAlert("" + AlertMessages.isAddressType, "" + AlertMessages.alertTitile);

                }else if ($rootScope.dataToSend.checkIn.latLong === '') {
                    $rootScope.showAlert("" + AlertMessages.isLocatinSelected, "" + AlertMessages.alertTitile);

                }else{
                        var sendjson = {}
                        sendJson = {
                                   "contractId": $rootScope.dataToSend.contractId,
                                   "totalWaiveRequest": $rootScope.dataToSend.totalWaiveRequest,
                                   "penaltyFeeRequested": $rootScope.dataToSend.penaltyFeeRequested,
                                   "earlyTerminationFeeRequested": $rootScope.dataToSend.earlyTerminationFeeRequested,
                                   "reason": $rootScope.dataToSend.reason,
                                   "payer":  $rootScope.dataToSend.payer,
                                   "phoneNumber": $rootScope.dataToSend.phoneNumber,
                                   "isskiptracer": $rootScope.terminationSelected.isskiptracer,
                                   "checkIn": {
                                       "addressType": $rootScope.dataToSend.checkIn.addressType,
                                       "address": $rootScope.dataToSend.checkIn.customersAddress,
                                       "latLong": $rootScope.dataToSend.checkIn.latLong,
                                       "checkinAddress": $rootScope.dataToSend.checkIn.checkinAddress,
                                       "checkinDateTime":$rootScope.dataToSend.checkIn.checkinTime,
                                       "distance": $rootScope.dataToSend.checkIn.difference,
                                       "unitCode":$rootScope.terminationSelected.unitCode1,
                                       "unitCodeDesc": $rootScope.terminationSelected.unitCodeDesc,
                                       }
                                   };


                        $scope.tempObject = sendJson;

                        $scope.sendTerminationRequest();
                        // $scope.sendTerminationAttachRequest(0);
               }

            }
            $scope.cancelRequest = function () {

//                 $scope.getByValue();

                 $scope.tempObject = {
                    "contractTerminationId" : $scope.terminationServerData1.contractTerminationId
                 }
                $scope.showLoading();
                 var resourceRequest = new WLResourceRequest("/adapters/cancelTermination/request/cancel", WLResourceRequest.POST);
                 resourceRequest.setHeader("Content-Type", "application/json");
                 resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                 resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                 resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                 resourceRequest.send($scope.tempObject).then($scope.termCancelRequestSuccess, $scope.termCancelRequestFailure);
            }

             $scope.termCancelRequestSuccess = function(response) {
                 $scope.hideLoading();

                 if (response.responseJSON.responseCode == "102") {


                     $scope.hideLoading();
                     $rootScope.termFormPart1 = false;
                     $rootScope.termFormPart2 = false;
                     $rootScope.listContract = true;
                     $rootScope.termListHeader = true;
                         $rootScope.showAlert(""+AlertMessages.cancel_termi_message, ""+AlertMessages.alertTitile);
                     return;

                 } else if (response.responseJSON.responseCode == "101") {


                     $scope.hideLoading();
                     $rootScope.termFormPart1 = false;
                     $rootScope.termFormPart2 = false;
                     $rootScope.listContract = true;
                     $rootScope.termListHeader = true;
                      $rootScope.showAlert(""+AlertMessages.cancel_termi_message, ""+AlertMessages.alertTitile);
                     return;

                 } else if (response.responseJSON.responseCode == "200") {

                    // success
                     var arr = $rootScope.terminationDto;

                        for (var i=0, iLen=arr.length; i<iLen; i++) {

                             if (arr[i].contractId ==$rootScope.terminationSelected.contractId)

                             $rootScope.terminationDto[i].status = "CANCEL";
                        }
                        $scope.hideLoading();
                     $rootScope.termFormPart1 = false;
                     $rootScope.termFormPart2 = false;
                     $rootScope.listContract = true;
                     $rootScope.termListHeader = true;
                          $rootScope.showAlert(""+AlertMessages.success_canel_termi, ""+AlertMessages.alertTitile);
                 }


            }
            $scope.termCancelRequestFailure = function(response) {
                    $scope.hideLoading();
                    if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                        $rootScope.sessionTimeOutMessage();
                        return;
                    }
                  $rootScope.termFormPart1 = false;
                  $rootScope.termFormPart2 = false;
                  $rootScope.listContract = true;
                  $rootScope.termListHeader = true;

                  $rootScope.showAlert(""+AlertMessages.cancel_termi_message, ""+AlertMessages.alertTitile);


            }


            $scope.sendTerminationRequest = function() {
                 $scope.showLoading();

                WL.JSONStore.get(TERMINATION_COLLECTION_NAME).add($scope.tempObject).then(function(data) {


                         var resourceRequest = new WLResourceRequest("/adapters/ContractTermination/contract/termination/save", WLResourceRequest.POST);
                        resourceRequest.setHeader("Content-Type", "application/json");
                        resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                        resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                        resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                        resourceRequest.send([$scope.tempObject]).then($scope.termRequestSuccess, $scope.termRequestFailure);


                }).fail(function(error) {
                    $scope.hideLoading();
                    $rootScope.showAlert(""+AlertMessages.cancel_termi_message, ""+AlertMessages.alertTitile);
                });

            }

            $scope.termRequestSuccess = function(response) {
                 $scope.hideLoading();
               //  alert("success = "+ JSON.stringify(response));
                 if (response.responseJSON[0].responseCode == "102") {
                     $scope.saveTerminationDataForSync();
                     $scope.saveTerminationAttachDataForSync();

                     $scope.hideLoading();
                     $rootScope.termFormPart1 = false;
                     $rootScope.termFormPart2 = false;
                     $rootScope.listContract = true;
                     $rootScope.termListHeader = true;
                     $rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);
                     $scope.saveAndLogout();
                     return;

                 } else if (response.responseJSON[0].responseCode == "101") {
                    $scope.saveTerminationDataForSync();
                    $scope.saveTerminationAttachDataForSync();

                     $scope.hideLoading();
                     $rootScope.termFormPart1 = false;
                     $rootScope.termFormPart2 = false;
                     $rootScope.listContract = true;
                     $rootScope.termListHeader = true;
                     $rootScope.showAlert("" + AlertMessages.dataNeedToSync, "" + AlertMessages.alertTitile);
                     return;

                 } else if (response.responseJSON[0].responseCode == "200") {
                      $scope.sendTerminationAttachRequest(0);
                 }


            }
            $scope.termRequestFailure = function(response) {
                $scope.hideLoading();
                //alert("failure : response= "+ JSON.stringify(response));
                $scope.saveTerminationDataForSync();
                $scope.saveTerminationAttachDataForSync();
                if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);

                    $rootScope.sessionTimeOutMessage();
                    return;
                }
               if (response.status == 404 || response.status == 0 || response.status == 500) {
                          $rootScope.termFormPart1 = false;
                          $rootScope.termFormPart2 = false;
                          $rootScope.listContract = true;
                          $rootScope.termListHeader = true;
                     $rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);
                   //$rootScope.showAlert(AlertMessages.serverUnrechable, "" + AlertMessages.alertTitile);
                   return;
               }


               $rootScope.sessionTimeOutCalled = false;

            }
         $scope.sendTerminationAttachRequest = function(indexvalue) {
          $scope.showLoading();

            var arrayLengthvalue = $rootScope.dataToSend.attachedFilesLink.length;
           // alert(arrayLengthvalue);

            if (indexvalue <= arrayLengthvalue - 1){
                $scope.indexvaleforattachment = indexvalue;

                 var isAndroid = ionic.Platform.isAndroid();

                    if (isAndroid) {

                        $scope.tempObjectAttach = {
                            "contractId": $rootScope.terminationSelected.contractId,
                            "attachmentData": $rootScope.dataToSend.attachedFilesLink[indexvalue].split(",")[1],
                            "attachmentType": $rootScope.dataToSend.fileType[indexvalue],
                            "attachmentName": $rootScope.dataToSend.filenamefull[indexvalue]

                        }

                    } else {

                        $scope.tempObjectAttach = {
                            "contractId": $rootScope.terminationSelected.contractId,
                            "attachmentData": $rootScope.dataToSend.attachedFilesLink[indexvalue],
                            "attachmentType": $rootScope.dataToSend.fileType[indexvalue],
                            "attachmentName":  $rootScope.dataToSend.filenamefull[indexvalue]

                        }
                    }



                    WL.JSONStore.get(TERMINATION_ATTACHMENTDB_NAME).add($scope.tempObjectAttach).then(function(data) {


                            var resourceRequest = new WLResourceRequest("/adapters/ContractTermination/contract/termination/attachment/save", WLResourceRequest.POST);
                            resourceRequest.setHeader("Content-Type", "application/json");
                            resourceRequest.setHeader('Access-Control-Allow-Origin', '*');
                            resourceRequest.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
                            resourceRequest.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
                            resourceRequest.send($scope.tempObjectAttach).then($scope.termAttachRequestSuccess, $scope.termAttachRequestFailure);


                    }).fail(function(error) {
                        $scope.hideLoading();
                        $rootScope.showAlert(""+AlertMessages.cancel_termi_message, ""+AlertMessages.alertTitile);
                    });

                }else {

                         $scope.hideLoading();
                         $rootScope.showAlert("" + AlertMessages.savedSuccess , "" + AlertMessages.alertTitile);

                        $rootScope.termFormPart1 = false;
                        $rootScope.termFormPart2 = false;
                        $rootScope.listContract = true;
                        $rootScope.termListHeader = true;


                          // $state.go('fECREDIT.record');
                  }
            }

            $scope.termAttachRequestSuccess = function(response) {

                  // alert("attach success = "+ JSON.stringify(response));
                   // recursive request
                   var succussvalueindex = $scope.indexvaleforattachment;
                   succussvalueindex++;

                   $scope.sendTerminationAttachRequest(succussvalueindex);

            }
            $scope.termAttachRequestFailure = function(response) {

                $scope.saveTerminationAttachDataForSync();
                $scope.hideLoading();
                if(response.errorCode != undefined && response.errorCode==="SESSIONTIMEOUT"){
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);

                    $rootScope.sessionTimeOutMessage();
                    return;
                }
                $rootScope.sessionTimeOutCalled = false;
                //alert("attach failure : response= "+ JSON.stringify(response));
               if (response.status == 404 || response.status == 0 || response.status == 500) {
                     $rootScope.termFormPart1 = false;
                     $rootScope.termFormPart2 = false;
                     $rootScope.listContract = true;
                     $rootScope.termListHeader = true;
                    $rootScope.showAlert("" + AlertMessages.dataNeedToSync , "" + AlertMessages.alertTitile);
                   return;
               }


            }
            $scope.saveTerminationDataForSync = function(){

                WL.JSONStore.get(TERMINATION_COLLECTION_SYNC).add($scope.tempObject).then(function(data) {
                                   //
                }).fail(function(error) {

                });
            }

            $scope.saveTerminationAttachDataForSync = function(){

               for(var i=0; i<$rootScope.dataToSend.attachedFilesLink.length; i++){

                        $scope.attachObjForSync = {
                           "contractId": $rootScope.terminationSelected.contractId,
                           "attachmentData": $rootScope.dataToSend.attachedFilesLink[i].split(",")[1],
                           "attachmentType": $rootScope.dataToSend.fileType[i],
                           "attachmentName": $rootScope.dataToSend.filenamefull[i]

                       }


                    WL.JSONStore.get(TERMINATION_ATTACHMENTDB_SYNC).add($scope.attachObjForSync).then(function(data) {
                                       //
                    }).fail(function(error) {

                    });

                }
            }


            $scope.$on('$ionicView.leave', function() {


             counter=0


            	$('.advancels').removeClass("advancelsSelected");
                  $scope.addrdropdownview = true;
            	var attachcounter = 0;
                       $rootScope.dataToSend = {};
               $rootScope.dataToSend.checkIn = {};
               $rootScope.dataToSend.attachedFilesLink = [];
               $rootScope.dataToSend.earlyTerminationFeeRequested = '';
               $rootScope.dataToSend.penaltyFeeRequested = '';
               $rootScope.dataToSend.totalWaiveRequest = '';
             $rootScope.comingFromNotification = false;
               $rootScope.dataToSend.checkIn.addressType = '';
               $rootScope.dataToSend.checkIn.customersAddress = '';
               $rootScope.dataToSend.checkIn.latLong = '';
               $rootScope.dataToSend.checkIn.checkinTime = '';
               $rootScope.dataToSend.checkIn.checkinAddress = '';
               $rootScope.dataToSend.checkIn.difference = '';
               $rootScope.dataToSend.payer = '';
               $rootScope.dataToSend.reason = '';

               $rootScope.termFormPart1 = false;
               $rootScope.termFormPart2 = false;
               $rootScope.listContract = false;
               $rootScope.terminationSelected = '';
               $scope.terminationToSearch = '';
                       
             

                $scope.rsnChk1 = false;
                $scope.rsnChk2 = false;
                $scope.rsnChk3 = false;
                $scope.rsnChk4 = false;
                $scope.payChk1 = false;
                $scope.payChk2 = false;
                $scope.payChk3 = false;
                $scope.pay = ''; $scope.rsn = '';

                $rootScope.termIdFromNoti = "";


                $("#distanceTerm").html("");
                			    $rootScope.searchBtn = Messages.searchBtn;
                                $rootScope.searchTextBlack = false;
            });



            $scope.attachFile = function() {
           
            if (isDataSavedLocally)  {
                return;
            }
                
                
                if ($rootScope.dataToSend.attachedFilesLink.length >= 5) {
                    $rootScope.showAlert(AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);
                    return;
                }

                if (ionic.Platform.isAndroid()) {

                    myPopup = $ionicPopup
                        .show({
                            template: '<button style="background-color:#008345" class="button button-full button-balanced" ng-click="getPhotoAndroid(1)">{{cameraButton }}</button>' +
                                '<button  style="background-color:#008345"class="button button-full button-balanced" ng-click="getPhotoAndroidGallery(2)">{{galleryButton}}</button>' +
                                '<button  style="background-color:#008345"class="button button-full button-balanced" ng-click="getFile()">{{fileButton}}</button>',
                            title: '<b>Select</b>',
                            scope: $scope,
                            cssClass: 'recordbutton',

                            buttons: [{
                                text: Messages.cancelButton

                            }]

                        });

                    $scope.getPhotoAndroid = function(source) {

                        getPhoto(source);

                    }
                    $scope.getPhotoAndroidGallery = function(source) {

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


               if (attachcounter == undefined || attachcounter == 'undefined') {

                   attachcounter = 0;
                   $rootScope.dataToSend.attachedFilesLink = [];
                   $rootScope.dataToSend.filenamefull = [];

                   $rootScope.dataToSend.fileType = [];

               };

               if (true) {
                   // alert("1 ="+JSON.stringify(res));
                  // $rootScope.dataToSend.attachedFilesLink.push(res);


                   window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {



                       fileSystem.root.getFile(res, {
                           create: false,
                           exclusive: false
                       }, function(fileEntry) {
                           fileEntry.file(function(file) {
                               $rootScope.dataToSend.filenamefull.push(file.name);



                               var $el = $('<li class="attachclasscss" id="cancelAttachID' + $rootScope.dataToSend.filenamefull.length + '">' + file.name + '<img   class="headerIconsRight" ng-click="cancelAttach(' + ($rootScope.dataToSend.filenamefull.length) + ')" src="img/cancelBlack.png"></li>').appendTo("#attachmentList");
                               $compile($el)($scope);
                               var reader = new window.FileReader();

                               reader.onloadend = function(evt) {

                                   //                            console.log(""+evt.target.result);
                                   $rootScope.imageData1 = evt.target.result;
                                 //  $rootScope.dataToSend.attachedFilesLink.push(evt.target.result);
                                   if (file.type === null) {
                                       $rootScope.fileType1 = "application/json";
                                       $rootScope.dataToSend.fileType.push("application/json");
                                   } else {
                                       $rootScope.fileType1 = file.type;
                                       $rootScope.dataToSend.fileType.push(file.type);

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
                                           $rootScope.dataToSend.attachedFilesLink.push(canvas.toDataURL());
                                          // console.log("Data: " + canvas.toDataURL());

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
                   attachcounter++;
               } else {
                   $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);
               }


           }

           function onFail(message) {

           }

            openNativeAppAttachment = function() {
                WL.App.sendActionToNative("openNativeFile");


            }

            
            
            
            $scope.addReceiverCaller = function() {
            
            
            WL.App.addActionReceiver("MyActionReceiverId", function actionReceiver(received) {
                if (received.action === "doSomething") {
                    
                    // $rootScope.dataToSend.attachedFilesLink = received.data.FilePath;
                 	var path=received.data.FilePath;
                    var pathType= ""+path.substring(path.lastIndexOf(".")+1);
                    if(pathType!="jpg" && pathType!="JPEG" && pathType!="JPG" && pathType!="jpeg" &&  pathType!= "png" &&  pathType!= "PNG" && pathType!="doc" && pathType!="docx" && pathType!="pdf" && pathType!="PDF" && pathType!="txt" && pathType!="xlsx" && pathType!="csv" && pathType!="CSV"){
                    $rootScope.showAlert(""+AlertMessages.notSupportFileType,"" + AlertMessages.alertTitile);
                    return;
                    }

                   myPopup.close();

                    if (attachcounter == undefined || attachcounter == 'undefined') {

                        attachcounter = 0;
                        $rootScope.dataToSend.attachedFilesLink = [];
                        $rootScope.dataToSend.filenamefull = [];
                        $rootScope.dataToSend.fileType = [];
                        $rootScope.dataToSend.attachedFilesLink = [];
                    };
                    if (true) {
                       // alert("2"+JSON.stringify(received.data.FilePath));
                       // $rootScope.dataToSend.attachedFilesLink.push(received.data.FilePath);
                        //		                              $rootScope.dataToSend.filenamefull.push(received.data.FilePath.substr(received.data.FilePath.lastIndexOf("/")+1));
                      //  console.log("log: " + received.data.FilePath);


                        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

                            fileSystem.root.getFile(received.data.FilePath, {
                                create: false,
                                exclusive: false
                            }, function(fileEntry) {
                                fileEntry.file(function(file) {
                                    $rootScope.dataToSend.filenamefull.push(file.name);
                                    var $el = $('<li class="attachclasscss" id="cancelAttachID' + $rootScope.dataToSend.filenamefull.length + '">' + file.name + '<img   class="headerIconsRight" ng-click="cancelAttach(' + $rootScope.dataToSend.filenamefull.length + ')" src="img/cancelBlack.png"></li>').appendTo("#attachmentList");
                                    $compile($el)($scope);
                                    var reader = new window.FileReader();

                                    reader.onloadend = function(evt) {

                                        //                            console.log(""+evt.target.result);
                                        $rootScope.imageData1 = evt.target.result;
                                         if (file.type != "image/jpeg" && file.type != "image/png") {
                                            $rootScope.dataToSend.attachedFilesLink.push(evt.target.result);
                                        }
                                        if (file.type === null) {
                                            $rootScope.fileType1 = "application/json";
                                            $rootScope.dataToSend.fileType.push("application/json");
                                        } else {
                                            $rootScope.fileType1 = file.type;
                                            console.log("fileType1: " + file.type);
                                            $rootScope.dataToSend.fileType.push(file.type);

                                        }

                                        if (file.type == '' || file.type == null || file.type == undefined) {

                                            $rootScope.fileType1 = (file.name).split(".")[1];
                                            $rootScope.dataToSend.fileType.push($rootScope.fileType1);
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
                                                $rootScope.dataToSend.attachedFilesLink.push(canvas.toDataURL());
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
                        attachcounter++;




                    } else {
                        $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);
                    }




                } else if (received.action === "attachfile") {



                    if (attachcounter <= 4) {
                    //alert("3 ios "+received.data.url);
                        $rootScope.dataToSend.attachedFilesLink.push(received.data.url);
                        $rootScope.dataToSend.fileType.push(received.data.exten);
                        $rootScope.dataToSend.filenamefull.push(received.data.filename);

                        //  $("#attachmentList").append('<li class="attachclasscss">'+$rootScope.filenamefull[attachcounter]+'<img   class="headerIconsRight"  src="img/cancelBlack.png"></li>');

                        var $el = $('<li class="attachclasscss" id="cancelAttachID' + attachcounter + '">' + $rootScope.dataToSend.filenamefull[attachcounter] + '<img   class="headerIconsRight" ng-click="cancelAttach(' + (attachcounter) + ')" src="img/cancelBlack.png"></li>').appendTo("#attachmentList");


                        $compile($el)($scope);



                        attachcounter++


                    } else {


                        $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);


                    }


                } else if (received.action === "camerafile") {


                    getPhoto(Camera.PictureSourceType.CAMERA);


                } else if (received.action === "changeimagebase64") {



                    if (attachcounter <= 4) {
                    //alert("4 "+received.data.url);
                        $rootScope.dataToSend.attachedFilesLink.push(received.data.url);

                        $rootScope.dataToSend.fileType.push(received.data.exten);
                        $rootScope.dataToSend.filenamefull.push(received.data.filename);

                        var $el = $('<li class="attachclasscss" id="cancelAttachID' + attachcounter + '">' + $rootScope.dataToSend.filenamefull[attachcounter] + '<img   class="headerIconsRight" ng-click="cancelAttach(' + attachcounter + ')" src="img/cancelBlack.png"></li>').appendTo("#attachmentList");


                        $compile($el)($scope);


                        attachcounter++




                    } else {


                        $rootScope.showAlert("" + AlertMessages.cannotAttach5files, "" + AlertMessages.alertTitile);


                    }




                } else if (received.action === "galeryfile") {


                    getPhoto(Camera.PictureSourceType.SAVEDPHOTOALBUM)


                }
            });
            }



            $scope.cancelAttach = function(attachcountervalue) {


                var cancelid = 'cancelAttachID' + attachcountervalue;



                $rootScope.dataToSend.attachedFilesLink.splice(attachcountervalue, 1);
                $rootScope.dataToSend.filenamefull.splice(attachcountervalue, 1);
                $rootScope.dataToSend.fileType.splice(attachcountervalue, 1);

                var roor = $rootScope.dataToSend.filenamefull.length;

                attachcounter--;



                $("#attachmentList").html("");


                for (i = 0; i <= roor - 1; i++) {


                    var $el = $('<li class="attachclasscss" id="cancelAttachID' + i + '">' + $rootScope.dataToSend.filenamefull[i] + '<img   class="headerIconsRight" ng-click="cancelAttach(' + i + ')" src="img/cancelBlack.png"></li>').appendTo("#attachmentList");

                    $compile($el)($scope);


                }




            }
            $scope.saveAndLogout = function() {

                    $scope.hideLoading();
                    $rootScope.showAlert(AlertMessages.otherDeviceLogin, AlertMessages.alertTitile);
                    WL.Client.logout('FeCreditAppRealm', {
                        onSuccess: $scope.goToLogin,
                        onFailure: $scope.goToLogin
                    });

            };
            
   $scope.clearFilter = function(value) {
               

                if (value=="1"){
              $rootScope.comingFromNotification = false;
                counter=0
               
                $rootScope.termIdFromNoti = "";
                
                
                }
                
                
                
                
                			    $rootScope.searchBtn = Messages.searchBtn;
                                $rootScope.searchTextBlack = false;
                $rootScope.contractList = $rootScope.mainContractList;
                $rootScope.termFormPart1 = false;
                $rootScope.listContract = true;
                $rootScope.termFormPart2 = false;
                $rootScope.termListHeader = true;
                $("#terminationStatus").html("Pending");
                $("#statusDiv").hide();
                
    };
     $scope.showLoading = function() {
            $ionicLoading.show({
            template: AlertMessages.loadingDialouge
        });
    };

    $scope.hideLoading = function() {
        $ionicLoading.hide();
    };
   
    
    $rootScope.closeTerminationModule = function() {
		if($rootScope.termSelectedFromNoti==true){
			$state.go('fECREDIT.notification');
			$rootScope.termSelectedFromNoti=false;
			$rootScope.terminationSelectedFrom=false;

		}
         else if($rootScope.terminationSelectedFrom==true){
        	 $state.go('fECREDIT.contractInformation');
        	 $rootScope.terminationSelectedFrom=false;
        	 $rootScope.termSelectedFromNoti=false;
        }

         else if($rootScope.termFormPart1 || $rootScope.termFormPart2){
        	 $scope.clearFilter("1");

             }
        	else{
            
            $ionicHistory.nextViewOptions({
                disableBack : true
            });
            
            $state.go('fECREDIT.home');
        }
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
/*
                      $ionicPlatform.onHardwareBackButton(function (event) {
alert("1");
                           if($state.current.name == "fECREDIT.termination"){
alert("11");
                                            // $rootScope.closeTerminationModule();
                                             return false;
                                       }
                        });

                    	$ionicPlatform.registerBackButtonAction(function () {
alert("2");
                                                        if($state.current.name == "fECREDIT.termination"){
alert("22");
                                                                          $rootScope.closeTerminationModule();
                                                                         return false;
                                                                    }
                    		}, 100);

*/
})
