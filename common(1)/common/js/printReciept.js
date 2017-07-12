//function printRecieptstartDatepicker(){
//
// $("#startdatefield").datepicker("destroy");
//					 $('#startdatefield').datepicker();
//					 $('#startdatepicker').focus();
//				      $('#startdatefield').datepicker(
//						{
//							 onSelect: function(date) {
//						            alert(date)
//						            
//						        },
//							
//							createButton:false,
//							displayClose:true,
//							closeOnSelect:false,
//							dateFormat: "yy-mm-dd"
//							}
//						)
//							
//				
//			
//}	
//
//
//function printRecieptendDatepicker(){
//	
//
//	 $("#enddatefield").datepicker("destroy");
//						 $('#enddatefield').datepicker();
//						 $('#enddatepicker').focus();
//					      $('#enddatefield').datepicker(
//							{
//								 onSelect: function(date) {
//							            alert(date)
//							            
//							        },
//								
//								createButton:false,
//								displayClose:true,
//								closeOnSelect:false,
//								dateFormat: "yy-mm-dd"
//								}
//							)
//								
//					
//				
//	}	
//
//function printRecieptstartTimepicker(){
//	
//    
//
//}	
//
//		
////function recordActionDatepicker(){
////		
////	 $("#calender_actiondate").datepicker("destroy");
////						 $('#calender_actiondate').datepicker();
////						 $('#action_btn').focus();
////					      $('#calender_actiondate').datepicker(
////							{
////								 onSelect: function(date) {
////							            alert(date)
////							            
////							        },
////								
////								createButton:false,
////								displayClose:true,
////								closeOnSelect:false,
////								dateFormat: "yy-mm-dd"
////								}
////							)
////								
////					
////				
////	}	
//
//
//	function recordNextActionDatepicker(){
//		
//			
//		 $("#calender_nextactiondate").datepicker("destroy");
//							 $('#calender_nextactiondate').datepicker();
//							 $('#next_action_btn').focus();
//						      $('#calender_nextactiondate').datepicker(
//								{
//									 onSelect: function(date) {
//								            alert(date)
//								            
//								        },
//									
//									createButton:false,
//									displayClose:true,
//									closeOnSelect:false,
//									dateFormat: "yy-mm-dd"
//									}
//								)
//									
//						
//					
//		}		
//		
		
		
		
		
			
function onPhotoURISuccess(imageURI) {
	//alert(imageURI);

	//var largeImage = document.getElementById('largeImage');

	//largeImage.src = imageURI;
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,onFileSystemSuccess, rfail);

//	window.resolveLocalFileSystemURI(imageURI, onResolveSuccess, fail);
	
	
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        fileSystem.root.getFile(imageURI,
            {create: false, exclusive: false}, function(fileEntry) {
                fileEntry.file(function(file) {
                    var reader = new window.FileReader();

                     reader.onloadend = function(evt) {

//                    console.log(""+evt.target.result);
                     $rootScope.imageData=evt.target.result;
                     if(file.type===null){
                         $rootScope.fileType="application/json";
                         }else
                         {
                          $rootScope.fileType=file.type;
                         }
                     if(file.type==="image/jpeg" || file.type==="image/png"){
                    	  
                    
                     var canvas = document.createElement("canvas");
                     canvas.width = 250;
                     canvas.height = 250;
                     var context = canvas.getContext("2d");
                     var deferred = $.Deferred();
                     $("<img/>").attr("src", ""+$rootScope.imageData).load(function() {
                         context.scale(250/file.width, 250/file.height);
                         context.drawImage(this, 0, 0);
                         $rootScope.imageData=canvas.toDataURL();
//                         console.log(""+canvas.toDataURL());
                         deferred.resolve($("<img/>").attr("src", $rootScope.imageData));
                     });
                     
                     }
                     $scope.callSaveAttachment();

                    };
                                       reader.onerror = function(evt) {
                                      
                                       };
                  reader.readAsDataURL(file);



                }, function(e){console.log(e);
                 });
            }, function(e){console.log(e);

            });
    }, function(e) {console.log(e);
     });
	
	
	

}

function rfail(e) {
	alert(e);
}

//function getPhoto(source) {
//	
//	// Retrieve image file location from specified source
//	pictureSource = navigator.camera.PictureSourceType;
///*	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
//		
//		quality : 100,
//		targetWidth : 800,
//		targetHeight : 800,
//		allowEdit:true,
//		destinationType : Camera.DestinationType.FILE_URI,
//		sourceType : source,
//		encodingType: Camera.EncodingType.JPEG,
//		mediaType: Camera.MediaType.PICTURE,
//	    correctOrientation: true
//	});
//
//	*/
//	navigator.camera.getPicture(onPhotoURISuccess,onFail , {
//		allowEdit: true,
//        quality: 50,
//        targetWidth : 800,
//		targetHeight : 800,
//        destinationType: Camera.DestinationType.FILE_URI,   // FILE_URI
//        // In this app, dynamically set the picture source, Camera or photo gallery
//        sourceType: source,
//        encodingType: Camera.EncodingType.JPEG,
//        mediaType: Camera.MediaType.PICTURE,
//        correctOrientation: true  //Corrects Android orientation quirks
//	});
//
//}
function onFileSystemSuccess(fileSystem) {
	console.log(fileSystem.name);
}
function bytesToSize(bytes) {
	var sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB' ];
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
	alert("esa")
}
function fail(e) {
	alert("sa")
}

// Called if something bad happens.
// 
function onFail(message) {
	alert('Failed because: ' + message);
}

function onFail(message) {
	alert('Failed because: ' + message);
}

 

