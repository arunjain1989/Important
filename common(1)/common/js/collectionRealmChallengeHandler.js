var sampleAppRealmChallengeHandler = WL.Client.createChallengeHandler("SampleAppRealm");

sampleAppRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || response.responseText === null) {
        return false;
    }
    var indicatorIdx = response.responseText.search('j_security_check');
    
    if (indicatorIdx >= 0){
		return true;
	}  
	return false;
};

sampleAppRealmChallengeHandler.handleChallenge = function(response) {
	alert("handleChallenge Called");
	 
};

sampleAppRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = sampleAppRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	alert("if Called");
    	sampleAppRealmChallengeHandler.handleChallenge(response);
    } else {
    	alert("else Called");
		 
		sampleAppRealmChallengeHandler.submitSuccess();
    }
};

$('#AuthSubmitButton').bind('click', function () {
    var reqURL = '/j_security_check';
    var options = {};
    options.parameters = {
        j_username : 'ajeet',
        j_password : 'ajeet'
    };
    options.headers = {};
    sampleAppRealmChallengeHandler.submitLoginForm(reqURL, options, sampleAppRealmChallengeHandler.submitLoginFormCallback);
});
