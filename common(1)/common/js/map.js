
/* JavaScript content from js/map.js in folder common */

/* JavaScript content from js/map.js in folder common */

/* JavaScript content from js/map.js in folder common */

/* JavaScript content from js/map.js in folder common */

/* JavaScript content from js/map.js in folder common */

/* JavaScript content from js/map.js in folder common */
var makr1, makr2, makr3, mapCalledFromSideMenu=false;

var markerCurrent;

var locationbool =false;
var locationbool1 =false;
var locationboolToShow =0;

function initMap() {
    
    locationboolToShow =0;
    locationbool =false;
    locationbool1 =false;
	
//	 markerA = new google.maps.MarkerImage('./images/green_pin.png');
	
	  var map_Prop = {
         center : new google.maps.LatLng(10.531645, 106.006380),
         zoom : 10,
streetViewControl: false,         mapTypeId : google.maps.MapTypeId.ROADMAP,
         mapTypeControl: false,
         fullscreenControl: false

        };
        map = new google.maps.Map(document.getElementById("googleMap"),
          map_Prop);

        markerCurrent = new google.maps.Marker({
         position : new google.maps.LatLng(10.531645, 106.006380),
         
        });

        markerCurrent.setMap(null);
    
        addYourLocationButton(map, markerCurrent);
        
        
        var options = {
//        		  enableHighAccuracy: true,
        		  timeout: 20000,
        		  maximumAge: 0
        		};

        		function success(pos) {
        		if(locationboolToShow==1){
        		return;
        		}
        		  var crd = pos.coords;

        		  console.log('Your current position is:');
        		  console.log('Latitude : ' + crd.latitude);
        		  console.log('Longitude: ' + crd.longitude);
        		  try{

                    markerCurrent = new google.maps.Marker({
                           position : new google.maps.LatLng(crd.latitude, crd.longitude),

                          });


                          markerCurrent.setMap(map);


                          			var latlng1 = new google.maps.LatLng(crd.latitude, crd.longitude);

                  			new google.maps.Geocoder().geocode({
                  				'latLng' : latlng1
                  			}, function(results, status) {
                  				if (status == google.maps.GeocoderStatus.OK) {
                  					if (results[1]) {

                  						addess_map1 = results[1].formatted_address;
                  						var infowindow1 = new google.maps.InfoWindow({
                  							content : addess_map1
                  						});
                  						google.maps.event.addListener(markerCurrent, 'click',
                  								function() {
                  									infowindow1.open(map, markerCurrent);

                  								});
                  					}
                  				}
                  			});
                  }catch(e){

                  }

        		  console.log('More or less ' + crd.accuracy + ' meters.');
        		  map.setCenter({
              		lat : crd.latitude,
              		lng : crd.longitude
              	});

              	if(mapCalledFromSideMenu==true){
              	mapCalledFromSideMenu=false;
                getFirstPositionAndTrack(false);
//add current location icon
              	}
        		};

        		function error(err) {
        			console.log('ERROR: ' + err.message);
        		 
        		};

        		navigator.geolocation.getCurrentPosition(success, error, options);

}

var markers = [

		{
			"title" : 'Noida',
			"lat" : '28.535517',
			"lng" : '77.391029',
			"description" : 'Mumbai formerly Bombay, is the capital city of the Indian state of Maharashtra.'
		},
		{
			"title" : 'LUCKNOW',
			"lat" : '26.846012',
			"lng" : '80.941322',
			"description" : 'Pune is the seventh largest metropolis in India, the second largest in the state of Maharashtra after Mumbai.'
		} ];
onloadRoute = function() {
	var mapOptions = {
		center : new google.maps.LatLng(markers[0].lat, markers[0].lng),
		zoom : 10,
streetViewControl: false,		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		fullscreenControl: false
	};
	var map = new google.maps.Map(document.getElementById("googleMap"),
			mapOptions);
	var infoWindow = new google.maps.InfoWindow();
	var lat_lng = new Array();
	var latlngbounds = new google.maps.LatLngBounds();
	for (i = 0; i < markers.length; i++) {
		var data = markers[i]
		var myLatlng = new google.maps.LatLng(data.lat, data.lng);
		lat_lng.push(myLatlng);
		var marker = new google.maps.Marker({
			position : myLatlng,
			map : map,
			title : data.title
		});
		latlngbounds.extend(marker.position);
		(function(marker, data) {
			google.maps.event.addListener(marker, "click", function(e) {
				infoWindow.setContent(data.description);
				infoWindow.open(map, marker);
			});
		})(marker, data);
	}
	map.setCenter(latlngbounds.getCenter());
	map.fitBounds(latlngbounds);

	// ***********ROUTING****************//

	// Initialize the Path Array
	var path = new google.maps.MVCArray();

	// Initialize the Direction Service
	var service = new google.maps.DirectionsService();

	// Set the Path Stroke Color
	var poly = new google.maps.Polyline({
		map : map,
		strokeColor : '#000000'
	});

	// Loop and Draw Path Route between the Points on MAP
	for (var i = 0; i < lat_lng.length; i++) {
		if ((i + 1) < lat_lng.length) {
			var src = lat_lng[i];
			var des = lat_lng[i + 1];
			path.push(src);
			poly.setPath(path);
			service
					.route(
							{
								origin : src,
								destination : des,
								travelMode : google.maps.DirectionsTravelMode.DRIVING,
								provideRouteAlternatives : true,

							},
							function(result, status) {
								if (status == google.maps.DirectionsStatus.OK) {
									for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
										// path.push(result.routes[0].overview_path[i]);
									}
								}
							});

			// var directionsDisplay = new google.maps.DirectionsRenderer;
			var directionsRenderer1 = new google.maps.DirectionsRenderer;
			var directionsRenderer2 = new google.maps.DirectionsRenderer;

			var directionsDisplay = new google.maps.DirectionsRenderer({
				draggable : true,
				map : map,
			// panel: document.getElementById('right-panel')
			});

			directionsDisplay.addListener('directions_changed', function() {
				// computeTotalDistance(directionsDisplay.getDirections());
				// alert("Location Changed:");
			});

			/*
			 * var directionsRenderer1 = new google.maps.DirectionsRenderer({
			 * directions: result, routeIndex: 2, map: map, polylineOptions: {
			 * strokeColor: "green" } }); console.log("routeindex1 = ",
			 * directionsRenderer1.getRouteIndex());
			 * 
			 * var directionsRenderer2 = new google.maps.DirectionsRenderer({
			 * directions: result, routeIndex: 1, map: map, polylineOptions: {
			 * strokeColor: "blue" } });
			 */
			directionsDisplay.setMap(map);

			directionsRenderer1.setMap(map);
			directionsRenderer2.setMap(map);

			var request = {
				origin : 'Noida',
				destination : 'Lucknow',
				travelMode : google.maps.TravelMode.DRIVING,
				provideRouteAlternatives : true
			};
			service.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {

					console.log("Lenght: " + response.routes.length);
					console.log("Lenght: " + JSON.stringify(response));
					directionsDisplay.setDirections(response);
					directionsDisplay.setRouteIndex(0);
					directionsRenderer1.setDirections(response);
					directionsRenderer1.setRouteIndex(1);
					directionsRenderer2.setDirections(response);
					directionsRenderer2.setRouteIndex(2);
					openNativeApp("Lucknow");
					// directionsDisplay.setPanel(document.getElementById("directionsPanel"));
				}
			});
		}
	}
}

initialize = function() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var chicago = new google.maps.LatLng(41.850033, -87.6500523);
	var mapOptions = {
		zoom : 7,
		center : chicago
	}
	map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));
}

function calcRoute() {

	var request = {
		origin : 'Noida',
		destination : 'Lucknow',
		travelMode : google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
			console.log("Lenght: " + response.routes.length);
		}
	});
	openNativeApp('Lucknow');
};

openNativeApp = function(destinationAddrs) {
	
	var isIOS = ionic.Platform.isIOS();
	  
	  if (isIOS){
	  
		  WL.App.sendActionToNative("mapDirectionevent", {
				destinationAddress : destinationAddrs
			});

	  }else{
	WL.App.sendActionToNative("openMap", {
		destinationAddress : destinationAddrs
	});
	  }
}
var actAddress = "";
var regAddress = ""
var offAddress = "";

 var map='';
function getLocation1() {
markerA = new google.maps.MarkerImage('./images/green_pin.png');
 markerB = new google.maps.MarkerImage('./images/red_pin.png');
 markerC = new google.maps.MarkerImage('./images/yellow_pin.png');
 var geocoder = new google.maps.Geocoder();

 var marker;

 // var address = document.getElementById("address").value;
 var address = "Noida";
 {
  geocoder.geocode({
//   'address' : encodeURI(actAddress)
	  'address' : actAddress
  }, function(results, status) {
	  
//	  alert("Address: "+actAddress);
	  
   if (status == google.maps.GeocoderStatus.OK) {

            locationboolToShow=1;
                 locationbool=true;
                   
                   
    try{
                  markerCurrent.setMap(null);
                   
                   }catch(e){
                   console.log("error: "+e);
                   }
                   
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    var addess_map = results[0].formatted_address;

    var mapProp = {
     center : new google.maps.LatLng(latitude, longitude),
     zoom : 10,
streetViewControl: false,     mapTypeId : google.maps.MapTypeId.ROADMAP,
     mapTypeControl: false,
     fullscreenControl: false

    };
    map = new google.maps.Map(document.getElementById("googleMap"),
      mapProp);

    marker = new google.maps.Marker({
     position : new google.maps.LatLng(latitude, longitude),
     icon : markerA,
    });


                              try{
                              makr1.setMap(null);
                                                             makr2.setMap(null);
                                                             makr3.setMap(null);
                              }catch(e){
                              console.log("error: "+e);
                              }
makr1 = marker;
 marker.setMap(map);


    addYourLocationButton(map, marker);
    RouteButton(map, marker);

    var infowindow = new google.maps.InfoWindow({
     content : actAddress
    });
    google.maps.event.addListener(marker, 'click', function() {
    selectedAddress = actAddress;
     infowindow.open(map, marker);

    });

   } else {
//    alert("Error in getting location.");
   }
  });
 }


};
function getLocation2() {
markerA = new google.maps.MarkerImage('./images/green_pin.png');
 markerB = new google.maps.MarkerImage('./images/red_pin.png');
 markerC = new google.maps.MarkerImage('./images/yellow_pin.png');
 var geocoder = new google.maps.Geocoder();

 var marker;

 // var address = document.getElementById("address").value;
 var address = "Delhi";
 {
  geocoder.geocode({
   'address' : regAddress
  }, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
                 locationboolToShow=1;
                   locationbool1=true;
                  
                   
                   try{
                   markerCurrent.setMap(null);
                   
                   }catch(e){
                   console.log("error: "+e);
                   }
                   
                   
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    var addess_map = results[0].formatted_address;


                   
                   if (locationbool==false){
                   
                   
                   var mapProp = {
                   center : new google.maps.LatLng(latitude, longitude),
                   zoom : 10,
                   streetViewControl: false,     mapTypeId : google.maps.MapTypeId.ROADMAP,
                   mapTypeControl: false,
                   fullscreenControl: false
                   
                   };
                   map = new google.maps.Map(document.getElementById("googleMap"),
                                             mapProp);
                   
                   
                   }

    marker = new google.maps.Marker({
     position : new google.maps.LatLng(latitude, longitude),
     icon : markerB,
    });
makr2 = marker;
    marker.setMap(map);
                   
                   if (locationbool==false){
                   
                   addYourLocationButton(map, marker);
                    RouteButton(map, marker);
                   
                 
                   
                   }
                   
//    addYourLocationButton(map, marker);
//    RouteButton(map, marker);

    var infowindow = new google.maps.InfoWindow({
     content : regAddress
    });
    google.maps.event.addListener(marker, 'click', function() {
    selectedAddress = regAddress;
     infowindow.open(map, marker);

    });

   } else {
//	   alert("Error in getting location.");
   }
  });
 }


};
function getLocation3() {
markerA = new google.maps.MarkerImage('./images/green_pin.png');
 markerB = new google.maps.MarkerImage('./images/red_pin.png');
 markerC = new google.maps.MarkerImage('./images/yellow_pin.png');
 var geocoder = new google.maps.Geocoder();

 var marker;

 // var address = document.getElementById("address").value;
 var address = "Gurgaon";
 {
  geocoder.geocode({
   'address' : offAddress
  }, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
                   locationboolToShow=1;
                   try{
                   markerCurrent.setMap(null);
                   
                   }catch(e){
                   console.log("error: "+e);
                   }
                   
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    var addess_map = results[0].formatted_address;

     if (locationbool1==false){
                   
                   
                   var mapProp = {
                   center : new google.maps.LatLng(latitude, longitude),
                   zoom : 10,
                   streetViewControl: false,     mapTypeId : google.maps.MapTypeId.ROADMAP,
                   mapTypeControl: false,
                   fullscreenControl: false
                   
                   };
                   map = new google.maps.Map(document.getElementById("googleMap"),
                                             mapProp);
                   
                   
                   }
                   
                   
                   
                   
                   

    marker = new google.maps.Marker({
     position : new google.maps.LatLng(latitude, longitude),
     icon : markerC,
    });
makr3 = marker;
    marker.setMap(map);
                   
                   if (locationbool1==false){
                   
                   addYourLocationButton(map, marker);
                   RouteButton(map, marker);
                   
                   
                 
                   
                   }
                   
                   
//    addYourLocationButton(map, marker);
//    RouteButton(map, marker);

    var infowindow = new google.maps.InfoWindow({
     content : offAddress
    });
    google.maps.event.addListener(marker, 'click', function() {
    selectedAddress = offAddress;
     infowindow.open(map, marker);


    });

   } else {
	  
//	   alert(""+AlertMessages.address_notAvailable);
	  

	   
	   
	   
   }
  });
 }


};



var selectedAddress='';

getLocationByAddress = function(index){


  geocoder.geocode({
   'address' : address[index]
  }, function(results, status) {
   if (status == google.maps.GeocoderStatus.OK) {
    latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();


    var mapProp = {
     center : new google.maps.LatLng(latitude, longitude),
     zoom : 10,
streetViewControl: false,     mapTypeId : google.maps.MapTypeId.ROADMAP,
     mapTypeControl: false,
     fullscreenControl: false

    };
    map = new google.maps.Map(document.getElementById("googleMap"),
      mapProp);

    marker[index] = new google.maps.Marker({
     position : new google.maps.LatLng(latitude, longitude),
     icon : markerA[index],
    });

    marker[index].setMap(map);
    addYourLocationButton(map, marker[index]);
    RouteButton(map, marker[index]);

    var infowindow = new google.maps.InfoWindow({
     content : address[index]
    });
    google.maps.event.addListener(marker[index], 'click', function() {
     infowindow.open(map, marker[index]);

    });

   } else {
    alert("Request failed.")
   }
  });

};


 function makeCallback(addressIndex) {

	var map;
	var marker;

	markerA = new google.maps.MarkerImage('./images/green_pin.png');
	markerB = new google.maps.MarkerImage('./images/red_pin.png');
	markerC = new google.maps.MarkerImage('./images/yellow_pin.png');


    var geocodeCallBack = function(results, status) {

        if (status != google.maps.GeocoderStatus.OK) {
            console.log("Geocode was not successful for the following reason: " + status);
        } else {
        	var latitude = results[0].geometry.location.lat();
    		var longitude = results[0].geometry.location.lng();
    		var addess_map = results[0].formatted_address;
    		console.log(addess_map);

    		var mapProp = {
    			center : new google.maps.LatLng(latitude, longitude),
    			zoom : 10,
streetViewControl: false,    			mapTypeId : google.maps.MapTypeId.ROADMAP,
    			mapTypeControl: false,
    			fullscreenControl: false

    		};
    		map = new google.maps.Map(document.getElementById("googleMap"),
    				mapProp);

    		marker = new google.maps.Marker({
    			position : new google.maps.LatLng(latitude, longitude),
    			icon : markerB,
    		});

    		marker.setMap(map);

    		addYourLocationButton(map, marker);
    		RouteButton(map, marker);

    		var infowindow = new google.maps.InfoWindow({
    			content : address
    		});
    		google.maps.event.addListener(marker, 'click', function() {
    			infowindow.open(map, marker);

    		});
        }
    }

    return geocodeCallBack;
}




/*function (results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
		var latitude = results[0].geometry.location.lat();
		var longitude = results[0].geometry.location.lng();
		var addess_map = results[0].formatted_address;

		var mapProp = {
			center : new google.maps.LatLng(latitude, longitude),
			zoom : 10,
			mapTypeId : google.maps.MapTypeId.ROADMAP

		};
		map = new google.maps.Map(document.getElementById("googleMap"),
				mapProp);

		marker = new google.maps.Marker({
			position : new google.maps.LatLng(latitude, longitude),
			icon : markerA,
		});

		marker.setMap(map);
		addYourLocationButton(map, marker);
		RouteButton(map, marker);

		var infowindow = new google.maps.InfoWindow({
			content : address
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);

		});

	} else {
		alert("Request failed.")
	}
});*/





function RouteButton(map, marker) {
	var controlDiv = document.createElement('div');

	var firstChild = document.createElement('button');
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';

	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '2px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Navigation';
	controlDiv.appendChild(firstChild);

	var secondChild = document.createElement('div');
	secondChild.style.margin = '5px';

	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url(./images/direction.png)';
	secondChild.style.backgroundSize = '18px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'div';
	firstChild.appendChild(secondChild);

	google.maps.event.addListener(map, 'dragend', function() {
		$('#div').css('background-position', '0px 0px');
	});

	firstChild.addEventListener('click', function() {
		//alert("ShowRoutes: "+selectedAddress);
		// var platform = device.platform;
		// platform = platform.toLowerCase();
		// alert('pt'+platform);
		 if(ionic.Platform.isWindowsPhone()){
			 window.location.href="maps:"+selectedAddress;return;
		 }else{
			 openNativeApp(selectedAddress);
		 }
	});

	controlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}

function addYourLocationButton(map, marker) {
	var controlDiv = document.createElement('div');

	var firstChild = document.createElement('button');
	firstChild.style.backgroundColor = '#fff';
	firstChild.style.border = 'none';
	firstChild.style.marginTop = '10px'
	firstChild.style.outline = 'none';
	firstChild.style.width = '28px';
	firstChild.style.height = '28px';
	firstChild.style.borderRadius = '2px';
	firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
	firstChild.style.cursor = 'pointer';
	firstChild.style.marginRight = '10px';
	firstChild.style.padding = '0px';
	firstChild.title = 'Your Location';
	controlDiv.appendChild(firstChild);

	var secondChild = document.createElement('div');
	secondChild.style.margin = '5px';

	secondChild.style.width = '18px';
	secondChild.style.height = '18px';
	secondChild.style.backgroundImage = 'url(./images/current_location.png)';
	secondChild.style.backgroundSize = '18px 18px';
	secondChild.style.backgroundPosition = '0px 0px';
	secondChild.style.backgroundRepeat = 'no-repeat';
	secondChild.id = 'div';
	firstChild.appendChild(secondChild);

	google.maps.event.addListener(map, 'dragend', function() {
		$('#div').css('background-position', '0px 0px');
	});

	firstChild.addEventListener('click', function() {

		getFirstPositionAndTrack(false);

	});

	controlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
}

search_address = function() {
	var autocomplete = new google.maps.places.Autocomplete($("#address")[0], {});

	google.maps.event.addListener(autocomplete, 'place_changed', function() {
		address = autocomplete.getPlace();
		console.log(address.address_components);
	});
}
var address;
function displayPosition(pos, initTime) {
	var marker;
	var addess_map;
	var mapProp = {
		center : new google.maps.LatLng(pos.coords.latitude,
				pos.coords.longitude),
		zoom : 10,
streetViewControl: false,		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		fullscreenControl: false

	};
	var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(function(position) {
			var latlng = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);

			var geocoder = geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'latLng' : latlng
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[1]) {

						addess_map = results[1].formatted_address;
						var infowindow = new google.maps.InfoWindow({
							content : addess_map
						});

						google.maps.event.addListener(marker, 'click',
								function() {
									infowindow.open(map, marker);

								});
					}
				}
			});

			map.setCenter(latlng);
			marker = new google.maps.Marker({
				position : new google.maps.LatLng(position.coords.latitude,
						position.coords.longitude),

			});
			marker.setMap(map);
			addYourLocationButton(map, marker);
			if (!initTime) {

				RouteButton(map, marker);

			}

		}, function(error){
         		} ,  {      		  timeout: 20000,
                              		  maximumAge: 0
                              		});

	}

}

function alertOnGeoAcquisitionErr(geoErr) {
	alert('Error acquiring geolocation (' + geoErr.code + '): '
			+ geoErr.message);
}

function getFirstPositionAndTrack(initTime) {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(p) {
			var addess_map;
			var infowindow;
			var LatLng = new google.maps.LatLng(p.coords.latitude,
					p.coords.longitude);



					map.setCenter({
                    		lat : p.coords.latitude,
                    		lng : p.coords.longitude
                    	});


			var geocoder = geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'latLng' : LatLng
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[1]) {

						addess_map = results[1].formatted_address;

						infowindow = new google.maps.InfoWindow({
							content : addess_map
						});

					}
				}
			});

			var marker = new google.maps.Marker({
				position : LatLng,
				map : map,
				title : addess_map,
			});
//			addYourLocationButton(map, marker);
//			if (!initTime) {
//				RouteButton(map, marker);
//
//			}
			google.maps.event.addListener(marker, "click", function(e) {
				infowindow.open(map, marker);
			});
		}, function(error){
		} ,  {      		  timeout: 20000,
                     		  maximumAge: 0
                     		});
	} else {
		alert('Geo Location feature is not supported.');
	}
	// use GPS to get the user's location
	// var geoPolicy = WL.Device.Geo.Profiles.LiveTracking();
	// //geoPolicy.timeout = 60000; // set timeout to 1 minute
	// //geoPolicy.maximumAge = 10000; // allow to use a position that is 10
	// seconds old
	//
	// // note: to see at high-accuracy, change RoughTracking above to
	// LiveTracking
	//
	// // get the user's current position
	// WL.Device.Geo.acquirePosition(
	// function(pos) {
	// // when we receive the position, we display it and start on-going
	// acquisition
	//
	// displayPosition(pos, initTime);
	//
	//
	//
	//
	// // WL.Device.startAcquisition({ Geo: geoPolicy }, triggers, { Geo:
	// alertOnGeoAcquisitionErr } );
	// },
	// function(geoErr) {
	// alertOnGeoAcquisitionErr(geoErr);
	// // try again:
	// getFirstPositionAndTrack(false);
	// },
	// geoPolicy
	// );
}



