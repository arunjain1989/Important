var FeCreditApp = angular.module('app.controllers', []);



FeCreditApp.directive('disableSideMenu', [
    '$ionicSideMenuDelegate',
    function ($ionicSideMenuDelegate) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('touch', function () {
                    scope.$apply(function () {
                        $ionicSideMenuDelegate.canDragContent(false);
                    });
                });

                element.on('release', function () {
                    scope.$apply(function () {
                        $ionicSideMenuDelegate.canDragContent(true);
                    });
                });
            }
        };
    }
]);


FeCreditApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

FeCreditApp.directive('onDoubleClick', function($timeout) {
    return {
    restrict: 'A',
    link: function($scope, $elm, $attrs) {
    
    var clicks=0;
    
    $elm.bind('click', function(evt) {
              console.log('clicked');
              
              clicks++;
              if (clicks == 1) {
              $timeout(function(){
                       if(clicks == 1) {
                       //single_click_callback.call(self, event);
                       } else {
                       $scope.$apply(function() {
                                     console.log('clicked');
                                     $scope.$eval($attrs.onDoubleClick)
                                     });
                       }
                       clicks = 0;
                       },  300);
              }
              });
    
    }
    };
    });

FeCreditApp.directive('focus', function() {
	  return {
	    restrict: 'A',
	    link: function($scope,elem,attrs) {

	      elem.bind('keydown', function(e) {
	        var code = e.keyCode || e.which;
	        if (code === 13) {
	          e.preventDefault();
	          elem.next().focus();
	        }
	      });
	    }
	  }
	});