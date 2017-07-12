
/* JavaScript content from js/controllers/printRecieptCtrl.js in folder common */

						
						
FeCreditApp.controller('printRecieptCtrl', ['$scope','$state','$location','$ionicPopup','$ionicLoading','$rootScope','$ionicNavBarDelegate',		
				                                   
				    function($scope,$state,$location,$ionicPopup,$ionicLoading,$rootScope,$ionicNavBarDelegate){     
					
	
	 $scope.$on("$ionicView.enter", function(event, data){
	      	//alert("msg obj = "+ JSON.stringify(Messages));
	      	  // handle event

				$scope.searchBtn = Messages.searchBtn;
	        	$scope.mapButton = Messages.mapButton;
	        	$scope.cancelButton = Messages.cancelButton;
	      	
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
	          
	          $scope.footerPR = Messages.footerPR;
	          $scope.print = Messages.print;
	          $scope.reprint = Messages.reprint;
	          $scope.saveButton = Messages.saveButton;
	          $scope.eseriesNo = Messages.eseriesNo;
	          $scope.FCName = Messages.FCName;
	          $scope.FCCode = Messages.FCCode;
	          $scope.date = Messages.date;
	          $scope.contractOwner = Messages.contractOwner;
	          $scope.currentAdress = Messages.currentAdress;
	          $scope.depositorName = Messages.depositorName;
	          $scope.relationshipWithContract = Messages.relationshipWithContract;
	          $scope.amountInNumbers = Messages.amountInNumbers;
	          $scope.amountInWords = Messages.amountInWords;
	          $scope.remark = Messages.remark;
	          $scope.searchContract = Messages.searchContract;
	          
	          $scope.dateAssign = Messages.dateAssign;
	          $scope.contCustName = Messages.contCustName;
	          $scope.directionText = Messages.directionText;
	          
	          
	          
	          
	          
	          
	          if( $rootScope.deviceLang == 'vi'){
	         
	          	 $scope.cnclButtonViet = true;
	          	
	      		}

	      });
	
	
	
	$scope.Searchcontract = function() {
		    var myPopup = $ionicPopup.show({

		            title: '<input type="password" ng-model="data.wifi">',
		            templateUrl: 'templates/search.html',
		            cssClass: 'ptppop',
		            scope: $scope,
		            rootScope: $rootScope,
		            ionicLoading: $ionicLoading


		        });

		    $scope.formulaSelected = function(formulaSelected,id) {
		    	id="#filt"+id;
		    	if($(id).hasClass('filterSelected')){
		    		$(id).removeClass('filterSelected');
		    	}else{
		    	    
		    	    for (var i = 5; i < 11; i++) {
		    	        var idd = "#filt" + i;
		    	        $(idd).removeClass('filterSelected');
		    	    }

		    	    $(id).addClass('filterSelected');
		    	}
		        $scope.formula = formulaSelected;
		        $scope.addressdropdownview=true;
		        $scope.filterdropdownview=true;
		    };
		    $scope.filterSelected = function(filter,index) {
		        id = "#filt" + index;
		    	if($(id).hasClass('filterSelected')){
		    		$(id).removeClass('filterSelected');
		    	} else {
		    	    if (index <= 4) {
		    	        for (var i = 1; i < 5; i++) {
		    	            var idd = "#filt" + i;
		    	            $(idd).removeClass('filterSelected');
		    	        }
		    	    } else if (index >= 11) {
		    	        for (var i = 11; i < 14; i++) {
		    	            var idd = "#filt" + i;
		    	            $(idd).removeClass('filterSelected');
		    	        }
		    	    }

		    		$(id).addClass('filterSelected');
		    	}
		        $scope.advanceColumn = filter;
		        $scope.formuladropdownview =true;
		    };
		        $scope.advanceColumn = 'firstName';
		        $scope.formula = 6;

		        $scope.advanceSearch = function(valueData) {
		        	
		            $ionicLoading.show({
		                template: AlertMessages.loadingDialougeSearch
		            });
		            if ($scope.formula === 1) {
		                $scope.advanceQuery = [WL.JSONStore.QueryPart().equal($scope.advanceColumn, valueData)];
		            } else if ($scope.formula === 2) {
		                $scope.advanceQuery = [WL.JSONStore.QueryPart().notEqual($scope.advanceColumn, valueData)];
		            } else if ($scope.formula === 3) {
		                $scope.advanceQuery = [WL.JSONStore.QueryPart().rightLike($scope.advanceColumn, valueData)];
		            } else if ($scope.formula === 4) {
		                $scope.advanceQuery = [WL.JSONStore.QueryPart().like($scope.advanceColumn, valueData)];
		            } else if ($scope.formula === 5) {
		                $scope.advanceQuery = [WL.JSONStore.QueryPart().notLike($scope.advanceColumn, valueData)];
		            } else if($scope.formula === 6){
		                $scope.advanceQuery = [WL.JSONStore.QueryPart().like('firstName', valueData),
		                    WL.JSONStore.QueryPart().like('custId', valueData),
		                    WL.JSONStore.QueryPart().like('idIssueDate', valueData),
		                    WL.JSONStore.QueryPart().like('contractId', valueData)
		                ];
		            }


		          $scope.options = {
		                exact: false,
		                limit: 10
		            };


		            WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)
		                .advancedFind($scope.advanceQuery)

		            .then(function(arrayResults) {
		            	 $scope.formula = 6;
		                $ionicLoading.hide();
		                
		                
		                if (arrayResults.length == 0) {
		                    $rootScope.showAlert(""+AlertMessages.noResultsFound, ""+AlertMessages.alertTitile);
		                }
		                
		                $rootScope.contractList = arrayResults;
		                $scope.closebuttonFunc();
		            })

		            .fail(function(errorObject) {
		            	 $scope.formula = 6;
		               // alert(JSON.stringify(errorObject));
		                $ionicLoading.hide();
		                $scope.closebuttonFunc();
		            });

		        };


		        $scope.simpleSearch = function(valueData) {

		        	
		        	
		            $ionicLoading.show({
		                template: AlertMessages.loadingDialougeSearch
		            });


		            $scope.query1 = WL.JSONStore.QueryPart()
		                .equal('customerName', valueData);
		            $scope.query2 = WL.JSONStore.QueryPart()
		                .equal('customerId', valueData);
		            $scope.query3 = WL.JSONStore.QueryPart() 
		                .equal('contractId', valueData);
		            $scope.query4 = WL.JSONStore.QueryPart()
		                .equal('idIssueDate', valueData);
		            $scope.query5 = WL.JSONStore.QueryPart()
		                .equal('firstName', valueData);
		            $scope.query6 = WL.JSONStore.QueryPart()
		                .equal('lastName', valueData);



					 $scope.arrayResults = [{firstName: valueData}, {lastName: valueData}, {contractId:valueData}]


		            $scope.options = {
		                exact: false,
		                limit: 100
		            };

		            WL.JSONStore.get(CONTRACTS_COLLECTION_NAME)

		            .find($scope.arrayResults, $scope.options)

		            .then(function(arrayResults) {
		            	
//		            	hide map and show list
		            	
		                $ionicLoading.hide();
		                if (arrayResults.length == 0) {
		                    $rootScope.showAlert(""+AlertMessages.noResultsFound, ""+AlertMessages.alertTitile);
		                }
		                $rootScope.contractList = arrayResults;
		                $scope.closebuttonFunc();
		                //arrayResults = [{_id: 1, json: {name: 'carlos', age: 99}}]
		            })

		            .fail(function(errorObject) {
		                $ionicLoading.hide();
		                $scope.closebuttonFunc();
		            });




		        };


		        $scope.closebuttonFunc = function() {

		            myPopup.close();
		            var listContract = document.getElementById("listContract");
		            var printRecieptForm = document.getElementById("printRecieptForm");
		            
		            printRecieptForm.style.visibility='hidden'; 
		            listContract.style.visibility='visible'; 


		        };
		        
		        
		      
		        
		       
                 $scope.quickbuttonclick = function() {


		            $scope.quickhide = false;
		            $scope.advancehide = true;
		            $scope.quickview = "withclick";
		            $scope.advanceview = "withoutclick";


		        }

		        $scope.advancebuttonclick = function() {


		            $scope.quickview = "withoutclick";
		            $scope.advanceview = "withclick";


		            $scope.quickhide = true;

		            $scope.advancehide = false;



		        }


		        $scope.filterconditionclick = function() {

		            $scope.filterdropdownview = $scope.filterdropdownview ? false : true;


		        };



		        $scope.filterformulaclick = function() {

		            $scope.formuladropdownview = $scope.formuladropdownview ? false : true;

		        };



		        $scope.addresstypeclick = function() {

		            $scope.addressdropdownview = $scope.addressdropdownview ? false : true;

		        };

		       $scope.quickbuttonclick();
		    }
	 
	 
	
	$scope.showHistory = function(){
		var myPopup = $ionicPopup.show({

            title: '<input type="password" ng-model="data.wifi">',
            templateUrl: 'templates/showHistory.html',
            cssClass: 'ptppop',
            scope: $scope,
            rootScope: $rootScope,
            ionicLoading: $ionicLoading


        });
		
		
		 $scope.closebutton = function() {

	            myPopup.close();
	            var listContract = document.getElementById("listContract");
	            var printRecieptForm = document.getElementById("printRecieptForm");
	           
	            
	            listContract.style.visibility='hidden'; 
	            printRecieptForm.style.visibility='visible'; 

	         
	        };
	}
	 
	 $scope.selectContractListItems = function(index) {
	    	var i = index;
	      
	         var listContract = document.getElementById("listContract");
	         var printRecieptForm = document.getElementById("printRecieptForm");
	         var contDetailSubHeader = document.getElementById("contDetailSubHeader");
	         contDetailSubHeader.style.visibility='visible';
	         printRecieptForm.style.visibility='visible'; 
	         listContract.style.visibility='hidden'; 
	                	  
	                         
           }
	 
	 
	 
					
					
					
} ]);
						