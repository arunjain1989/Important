/* JavaScript content from js/controllers/recordCtrl.js in folder common */
FeCreditApp
		.controller(
				'openattachCtrl',
				function($scope, $state, $location, $ionicPopup, $ionicLoading,
						$rootScope, $ionicNavBarDelegate, $ionicHistory) {
					// The following

					$scope.$on("$ionicView.enter", function(event, data) {

						$rootScope.informationNotificationBool = false;
						$rootScope.contractNotificationBool = false;

						$scope.cancelButton = Messages.cancelButton;
						$scope.attachments = Messages.attachments;
						$scope.loadingDialouge = AlertMessages.loadingDialouge;
						if ($rootScope.deviceLang == 'vi') {

							$scope.cnclButtonViet = true;

						}

					});

					$scope.showLoading = function() {
						$ionicLoading.show({
							template : AlertMessages.loadingDialouge
						});
					};

					$scope.hideLoading = function() {
						$ionicLoading.hide();
					};

					$scope.base64 = function(value, name, attachContractId) {

						$scope.filename = name.replace(/\s/g, '');

						if ($rootScope.isInternetConnected()) {

							$scope.attachmentReqObject = {
								"attachmentId" : value,
							};
							$scope.json = {
								"contractId" : attachContractId,
							};

							$scope.showLoading();
							if ($rootScope.comingContractList == true) {
								$scope.fetchContractAttachment();
							} else {
								$scope.fetchAttachment();
							}
						} else {
							$scope.showLoading();

							window.requestFileSystem = window.requestFileSystem
									|| window.webkitRequestFileSystem;
							window.requestFileSystem(
									LocalFileSystem.PERSISTENT, 0, gotFS, fail);

						}
					};

					$scope.fetchContractAttachment = function() {
						var resourceRequest = new WLResourceRequest(
								"/adapters/contract/mycontract/getAttachment",
								WLResourceRequest.POST);
						resourceRequest.setHeader("Content-Type",
								"application/json");
						resourceRequest.setHeader(
								'Access-Control-Allow-Origin', '*');
						resourceRequest.setHeader(
								'Access-Control-Allow-Methods',
								'GET, PUT, POST, DELETE, OPTIONS');
						resourceRequest
								.setHeader('Access-Control-Allow-Headers',
										'Content-Type, Content-Range, Content-Disposition, Content-Description');
						resourceRequest.send($scope.json).then(
								$scope.fetchContractAttachmentSuccess,
								$scope.fetchContractAttachmentFail);
					};

					$scope.fetchContractAttachmentSuccess = function(response) {
						if (response.status == 102) {
							$scope.hideLoading();
							return;
						} else if (response.status == 101) {
							$scope.hideLoading();
							$rootScope.showAlert(""
									+ AlertMessages.serverUnrechable, ""
									+ AlertMessages.alertTitile);
							return;
						} else if (response.status == 200) {
							$scope.contentType = response.responseJSON.dto.attachmentType;
							$scope.bytearraystring = response.responseJSON.dto.attachmentData;

							window.requestFileSystem = window.requestFileSystem
									|| window.webkitRequestFileSystem;
							window.requestFileSystem(
									LocalFileSystem.PERSISTENT, 0, gotFS,
									gotFSfail);
						}
					};

					$scope.fetchContractAttachmentFail = function(response) {
						$scope.hideLoading();
						if (response.errorCode != undefined
								&& response.errorCode === "SESSIONTIMEOUT") {
							$rootScope.sessionTimeOutMessage();
							return;
						}
						$rootScope.showAlert(""
								+ AlertMessages.gettingServerData, ""
								+ AlertMessages.alert);
					};

					$scope.fetchAttachment = function() {

						var resourceRequest = new WLResourceRequest(
								"/adapters/dsaNotification/dsa-notification/getAttachment",
								WLResourceRequest.POST);
						resourceRequest.setHeader("Content-Type",
								"application/json");
						resourceRequest.setHeader(
								'Access-Control-Allow-Origin', '*');
						resourceRequest.setHeader(
								'Access-Control-Allow-Methods',
								'GET, PUT, POST, DELETE, OPTIONS');
						resourceRequest
								.setHeader('Access-Control-Allow-Headers',
										'Content-Type, Content-Range, Content-Disposition, Content-Description');
						resourceRequest.send($scope.attachmentReqObject).then(
								$scope.readSuccessattachment,
								$scope.readFailureattachment);

					}

					$scope.readSuccessattachment = function(response) {

						if (response.status == 102) {
							$scope.hideLoading();

							return;

						} else if (response.status == 101) {
							$scope.hideLoading();
							$rootScope.showAlert(""
									+ AlertMessages.serverUnrechable, ""
									+ AlertMessages.alertTitile);
							return;

						} else if (response.status == 200) {

							$scope.contentType = response.responseJSON.body.notificationData.type;
							$scope.bytearraystring = response.responseJSON.body.notificationData.attachmentData;

							window.requestFileSystem = window.requestFileSystem
									|| window.webkitRequestFileSystem;
							window.requestFileSystem(
									LocalFileSystem.PERSISTENT, 0, gotFS,
									gotFSfail);
						}

					}

					function gotFSfail(fileSystem) {

						$scope.hideLoading();

					}

					$scope.readFailureattachment = function(response) {
						$scope.hideLoading();
						if (response.errorCode != undefined
								&& response.errorCode === "SESSIONTIMEOUT") {
							$rootScope.sessionTimeOutMessage();
							return;
						}
						$rootScope.showAlert(""
								+ AlertMessages.gettingServerData, ""
								+ AlertMessages.alertTitile);
					}

					function gotFS(fileSystem) {
						$scope.folderpath = fileSystem.root.toURL();

						console.log("gotFS");

						setTimeout(function() {
							listDir($scope.folderpath)
						}, 1000);

					}

					function savebase64AsPDF(folderpath, filename, content,
							contentType) {
						// Convert the base64 string in a Blob

						console.log("savebase64AsPDF");
						var DataBlob = b64toBlob(content, contentType);

						console.log("Starting to write the file :3");

						window
								.resolveLocalFileSystemURL(
										folderpath,
										function(dir) {
											console
													.log("Access to the directory granted succesfully");
											dir
													.getFile(
															filename,
															{
																create : true
															},
															function(file) {
																console
																		.log("File created succesfully.");
																file
																		.createWriter(
																				function(
																						fileWriter) {
																					console
																							.log("Writing content to file");
																					fileWriter
																							.write(DataBlob);

																					console
																							.log("finalsavebase64AsPDF");

																					setTimeout(
																							function() {
																								openAttachFileService($scope.folderpath)
																							},
																							2000);

																				},
																				function() {

																					$scope
																							.hideLoading();
																					alert('Unable to save file in path '
																							+ folderpath);
																				});
															});
										});
					}

					function openAttachFileService() {

						$scope.hideLoading();

						if (ionic.Platform.isAndroid()) {
							$scope.type = "_system";
						} else {
							$scope.type = "_blank";
						}

						var openfile = $scope.folderpath + $scope.filename;

						window
								.open(openfile, $scope.type,
										"location=yes,hidden=no,closebuttoncaption=Close,enableViewportScale=yes");

					}

					function b64toBlob(b64Data, contentType, sliceSize) {
						contentType = contentType || '';
						sliceSize = sliceSize || 512;

						// var byteCharacters = atob(b64Data);

						var byteCharacters = decodeFromBase64(b64Data);

						var byteArrays = [];

						for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
							var slice = byteCharacters.slice(offset, offset
									+ sliceSize);

							var byteNumbers = new Array(slice.length);
							for (var i = 0; i < slice.length; i++) {
								byteNumbers[i] = slice.charCodeAt(i);
							}

							var byteArray = new Uint8Array(byteNumbers);

							byteArrays.push(byteArray);
						}

						var blob = new Blob(byteArrays, {
							type : contentType
						});
						return blob;
					}

					function decodeFromBase64(input) {
						input = input.replace(/\s/g, '');
						return atob(input);
					}

					function listDir(path) {
						window
								.resolveLocalFileSystemURL(
										path,
										function(fileSystem) {
											var reader = fileSystem
													.createReader();
											reader
													.readEntries(
															function(entries) {
																console
																		.log(entries);

																$scope.listoofiles = entries;

																for (i = 0; i <= $scope.listoofiles.length - 1; i++) {

																	var array = $scope.listoofiles[i].nativeURL
																			.split('/');

																	var urlfilename = array[array.length - 1];

																	if ($scope.filename == urlfilename) {

																		$scope.filenamefromdevice = $scope.listoofiles[i].nativeURL;
																		console
																				.log(""
																						+ $scope.filenamefromdevice);
																		$scope
																				.openfileattachbase64();

																		return;
																	}

																}

																console
																		.log("listDir");

																if ($scope.contentType == 'undefined'
																		|| $scope.contentType == undefined) {
																	$scope
																			.hideLoading();
																	$rootScope
																			.showAlert(""
																					+ AlertMessages.message_need_internet_file);

																} else {

																	savebase64AsPDF(
																			$scope.folderpath,
																			$scope.filename,
																			$scope.bytearraystring,
																			$scope.contentType);

																}

															},
															function(err) {
																console
																		.log(err);
															});
										}, function(err) {
											console.log(err);
										});
					}

					function getTarget() {
						if (ionic.Platform.isAndroid()) {
							return "_system";
						} else {
							return "_blank";
						}

					}

					$scope.myGoBack = function() {
						$ionicHistory.goBack();

					};

					$scope.openfileattachbase64 = function() {
						$scope.hideLoading();
						window
								.open($scope.filenamefromdevice, getTarget(),
										"location=yes,hidden=no,closebuttoncaption=Close,enableViewportScale=yes");

					}

				})