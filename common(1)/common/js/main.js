
/* JavaScript content from js/main.js in folder common */

/* JavaScript content from js/main.js in folder common */

/* JavaScript content from js/main.js in folder common */

/* JavaScript content from js/main.js in folder common */

/* JavaScript content from js/main.js in folder common */

/* JavaScript content from js/main.js in folder common */

/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
/*	WL.Client.connect({
		     		onSuccess: onSuccess,
		     		onFailure: onFailure
		     });
		     */
	// Common initialization code goes here

	/*angular.element(document).ready(function() {
	    angular.bootstrap(document, ['app']);
	    
	  });*/
//	WL.Client.connect({onSuccess: connectSuccess, onFailure: connectFailure});
angular.element(document).ready(function() {
	    angular.bootstrap(document, ['app']);
	    WL.Client.setHeartBeatInterval(-1);

	  });

}

/*function connectSuccess() {
//	alert("Successfully connected to MobileFirst Server.");


}

function connectFailure() {
//alert("Failed to connected to MobileFirst Server.");
}*/





function onSuccess(res) {
	  try {
		  WL.Client.logout('FeCreditAppRealm', {});
	} catch (e) {
		
	}
}
function onFailure(res) {
	alert("Connection Failed.");
}

var 		CONTRACTS_COLLECTION_NAME = 'contracts',
            ATTACHMENT_FETCH_COLLECTION_NAME = 'Attachment',
			REPORTS_COLLECTION_NAME = 'Reports',
			REPOSSESSIONS_COLLECTION_NAME = 'Repossessions',
			CONTRACT_TERMINATIONS_COLLECTION_NAME = 'ContractTerminations',
			RECORDS_COLLECTION_NAME = 'records',
			RECORDS_ONLINE_COLLECTION_NAME = 'onlineRecords',
			CUSTOMERS_MAP_DATA_COLLECTION_NAME = 'CustomersDataForMap',
			REPOSESSION_ONLINE_COLLECTION_NAME = 'onlineRepossession',
			TERMINATION_COLLECTION_NAME = 'terminationData',
			TERMINATION_ATTACHMENTDB_NAME = 'terminationAttachData',
			TERMINATION_COLLECTION_SYNC = 'terminationDataSync',
            TERMINATION_ATTACHMENTDB_SYNC = 'terminationAttachDataSync',
            REPOSSESSION_COLLECTION_SYNC = 'repossessionDataSync',
            REPOSSESSION_ATTACHMENTDB_SYNC = 'repossessionAttachDataSync',
            BIDDER_REPOSSESSION_SYNC = 'bidderSync',
            BIDDERLOCALDB_SAVE = 'biddersave',
            NOTIFICATIONS_DB = 'notificationDb',
            REPOSSESSION_ATTACHMENTDB_REPOSSESSINID='repossessionId',
            CHECK_IN_DB = 'checkInDb',
            IPHONE_LOGGER_DB = 'iPhoneLoggerDb',
			USERNAME = "USERNAME";
					



/*

if (WL.Client.Push) {
	WL.Client.Push.onReadyToSubscribe = function() {
		
		WL.SimpleDialog.show("Push Notifications", "onReadyToSubscribe", [ {
		    text : 'Close',
		    handler : function() {}
		  }
		  ]);
		

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
	*/
/*WL.SimpleDialog.show("Push Notifications", "doSubscribeSuccess", [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);*//*


}

function doSubscribeFailure() {
	*/
/*WL.SimpleDialog.show("Push Notifications", "doSubscribeFailure", [ {
	    text : 'Close',
	    handler : function() {}
	  }
	  ]);*//*

}


//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload) {
	
	WL.SimpleDialog.show("Push Notifications", "Provider notification data: " + JSON.stringify(props), [ {
	    text : 'Close',
	    handler : function() {
	    	WL.SimpleDialog.show("Push Notifications", "Application notification data: " + JSON.stringify(payload), [ {
	    	    text : 'Close',
	    	    handler : function() {}
	    	  }]);    	
	    }
	}]);
}
*/


/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}




var challengeAsked=false;
 var sampleAppRealmChallengeHandler1 = WL.Client.createWLChallengeHandler("FeCreditAppRealm");
       
        sampleAppRealmChallengeHandler1.processSuccess = function(data) {
        challengeAsked=false;
        userNameforChallenge="";
        // userPassforChallenge="1";
            //        	 this.logger.info("processSuccess ::", data);
//           alert("processSuccess Called");

        }

/*        sampleAppRealmChallengeHandler1.handleFailure = function(data) {
//           alert("Challenge Failed");
challengeAsked=true;

            //        			FAIL = "100"
            //        			INVALID_FEILD_VALUE = "101"
            //        			OTHERDEVICE_LOGIN_FAILURE = "102"
            //        			ACCOUNT_LOCK_MESSAGE = "103"
            //        			USER_NOT_FOUND_MESSAGE = "104"
            //                WRONG_USER_NAME_OR_PASSWORD_MESSAGE = '105"
            //        			SUCCESS = "200"

            //busyIndicator.hide();
            //        	 this.logger.info("handleFailure ::", data);

        }*/


        var latitudeAuth = '';
        var longitudeAuth = '';
        var networkIPAddress = '';

var userNameforChallenge="";
var userPassforChallenge="";
var isSesstionTimePopUpCalled=0;
var doublePopUp=0;
        sampleAppRealmChallengeHandler1.handleChallenge = function(response) {
            //if (response.statusCode==='CH002') {
challengeAsked=true;

//alert("Challenge Handler Called: "+JSON.stringify(response));
if(userNameforChallenge==''){
	isSesstionTimePopUpCalled = isSesstionTimePopUpCalled + 1;
	sampleAppRealmChallengeHandler1.submitFailure({errorCode: "SESSIONTIMEOUT"});
	return;
	}

/*if(userNameforChallenge==''){
//alert("session timeout called");
// server returns 500 error, handle this on server and need to send an error code to handle it and show login screen
sampleAppRealmChallengeHandler1.cancel();
return;
}*/
            submitMyAnswer();


        };
var imeiNumber='';
 function submitMyAnswer() {
	 
	 WL.App.sendActionToNative("getImeiNumber");

	    WL.App.addActionReceiver("MyActionReceiverId", function actionReceiver(received) {
	             if (received.action === "ImeiNumber") {
	             imeiNumber=received.data.Imei;
	             WL.Logger.debug ("ImeiNumber: "+imeiNumber);

	             }


	             });

//alert("submitMyAnswer Called: "+userNameforChallenge+" : "+userPassforChallenge);
        WL.Device.getID({
          onSuccess : function(o) {
            console.log("getID: " + o.deviceID);
            var devId = o.deviceID;
           WL.Logger.debug ("deviceID: "+o);
           
           if(ionic.Platform.isIOS()){
               deviceOS = "iOS";
               ionic.Platform.fullScreen();
               }else if(ionic.Platform.isAndroid()){
               deviceOS= "Android";
               }else if(ionic.Platform.isWindowsPhone()){
               deviceOS = "Windows";
               }  
           
           

//           alert("submitMyAnswer");
           var challengeOptions = {};
           challengeOptions.parameters = {
            'reqURL' : '/fecredit/mobile/user/authentication',
             "user.name" : userNameforChallenge,
             "user.password" : userPassforChallenge,
             "user.deviceId" : devId,
             "user.device.os" : deviceOS+device.version,
             "user.app" : "FECOL",
             "user.lat": latitudeAuth,
                "user.lng": longitudeAuth,
                "user.deviceModel" :device.model,
                "user.appVersion": WL.Client.getAppProperty(WL.AppProperty.APP_VERSION),
                "user.internetType": navigator.network.connection.type,
                 "user.ipAddress": networkIPAddress,
                 "user.imei":""+imeiNumber

           };
           challengeOptions.headers = {};
           sampleAppRealmChallengeHandler1.submitChallengeAnswer(challengeOptions);

           // alert(devID);
          },
          onFailure : function(e) {
           // console.log("Error getting ID: " + e);
           // alert(e);
          }
         });
        }
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}