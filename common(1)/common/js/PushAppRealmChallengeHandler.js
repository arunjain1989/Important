/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var pushAppRealmChallengeHandler = WL.Client.createChallengeHandler("SamplePushAppRealm");

pushAppRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || response.responseText === null) {
        return false;
    }
    var indicatorIdx = response.responseText.search('j_security_check');
    
    if (indicatorIdx >= 0){
		return true;
	}  
	return false;
};

pushAppRealmChallengeHandler.handleChallenge = function(response) {
	 pushlogin ();
};

pushAppRealmChallengeHandler.submitLoginFormCallback = function(response) {
	WL.Logger.info("submit login form ");
    var isLoginFormResponse = pushAppRealmChallengeHandler.isCustomResponse(response);
	WL.Logger.info("submit login form Response  "+isLoginFormResponse);
    if (isLoginFormResponse){
    	pushAppRealmChallengeHandler.handleChallenge(response);
    } else {
		pushAppRealmChallengeHandler.submitSuccess();
    }
};

function pushlogin (){
	WL.Logger.info("login pressed ");
    var reqURL = '/j_security_check';
    var options = {};
    options.parameters = {
        j_username : 'tesla@ldap.forumsys.com',
        j_password : 'tesla@ldap.forumsys.com'
    };
    options.headers = {};
    WL.Logger.info("calling  pushAppRealmChallengeHandler");
    pushAppRealmChallengeHandler.submitLoginForm(reqURL, options, pushAppRealmChallengeHandler.submitLoginFormCallback);
};
