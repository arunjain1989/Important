/* JavaScript content from js/routes.js in folder common */
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('fECREDIT.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('fECREDIT.contract', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contract.html',
        controller: 'contractCtrl'
      }
    }
  })

  .state('fECREDIT.notificationDetails', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/notifcationDetails.html',
        controller: 'notificationDetailsCtrl'
      }
    }
  })

  
  
  
  
  
  .state('fECREDIT.contractInformation', {
    url: '/page21',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contractInformation.html',
        controller: 'contractInfoCtrl',
         params: {
         	indices:[]}
      }
    }
  })
   .state('fECREDIT.customerInformation', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/customerInformation.html',
        controller: 'customerInfoCtrl'
      }
    }
  })
    .state('fECREDIT.contactInformation', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contactInformation.html',
        controller: 'contactInformationCtrl'
      }
    }
  })
    .state('fECREDIT.saleInformation', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/saleInformation.html',
        controller: 'customerInfoCtrl'
      }
    }
  })
    .state('fECREDIT.loanInformation', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/loanInformation.html',
        controller: 'loanInfoCtrl'
      }
    }
  })
    .state('fECREDIT.dueInformation', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/dueInformation.html',
        controller: 'dueInfoCtrl'
      }
    }
  })
    .state('fECREDIT.otherInformation', {
    url: '/page22',
    views: {
      'side-menu21': {
        templateUrl: 'templates/otherInformation.html',
        controller: 'otherInfoCtrl'
      }
    }
  })

  .state('fECREDIT.search', {
    url: '/page86',
    views: {
      'side-menu21': {
        templateUrl: 'templates/baseSearch.html',
        controller: 'baseSearchCtrl'
      }
    }
  })
  
  
   .state('fECREDIT.contractTerminationSearch', {
    url: '/pagecontractTerminationSearch',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contractTerminationSearch.html',
        controller: 'terminationCtrl'
      }
    }
  })

  .state('fECREDIT', {
    url: '/side-menu21',
    templateUrl: 'templates/fECREDIT.html',
    controller: 'fECREDITCtrl'
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('fECREDIT.record', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/record.html',
        controller: 'recordCtrl'
      }
    }
  })
  
  

.state('fECREDIT.openattach', {
    url: '/page31',
    views: {
      'side-menu21': {
        templateUrl: 'templates/openAttachfile.html',
        controller: 'openattachCtrl'
      }
    }
  })
  
  
  
  
  .state('fECREDIT.recordUpload', {
    url: '/page30',
    views: {
      'side-menu21': {
        templateUrl: 'templates/recordUpload.html',
        controller: 'recordUploadCtrl'
      }
    }
  })
  
  .state('fECREDIT.draftRecord', {
    url: '/page65',
    views: {
      'side-menu21': {
        templateUrl: 'templates/draftRecord.html',
        controller: 'recordDraftCtrl'
      }
    }
  })
  

  .state('fECREDIT.map', {
    url: '/page7',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('fECREDIT.pTP', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pTP.html',
        controller: 'pTPCtrl'
      }
    }
  })
  .state('fECREDIT.pTPNew', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pTPNew.html',
        controller: 'pTPNewCtrl'
      }
    }
  })

  .state('fECREDIT.paidCases', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paidCases.html',
        controller: 'paidCasesCtrl'
      }
    }
  })

  .state('fECREDIT.unpaidCases', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/unpaidCases.html',
        controller: 'unpaidCasesCtrl'
      }
    }
  })
  
  .state('fECREDIT.unPaidNewCases', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/unPaidNew.html',
        controller: 'unPaidNewCtrl'
      }
    }
  })
  
  .state('fECREDIT.paidNewCtrl', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paidNew.html',
        controller: 'paidNewCtrl'
      }
    }
  })
  
  
  
  .state('fECREDIT.printReciept', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/printReciept.html',
        controller: 'printRecieptCtrl'
      }
    }
  })
  
  .state('fECREDIT.receiptmanagement', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/receiptmanagement.html',
        controller: 'printRecieptMgtCtrl'
      }
    }
  })
  
  
   .state('fECREDIT.notification', {
	  url: '/pagenotification',
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/notification.html',
	        controller: 'notificationCtrl'
	      }
	    }
  })
  
   .state('fECREDIT.repossession', {
	  url: '/pagerepossession',
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/repossession.html',
	        controller:'repossCtrl'
	      }
	    }
  })
  
   .state('fECREDIT.termination', {
	  url: '/pagetermination',
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/termination.html',
	        controller:'terminationCtrl'
	      }
	    }
  })
  
    .state('fECREDIT.terminationNext', {
	  url: '/pagetermination',
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/terminationNext.html',
	        controller:'terminationCtrl'
	      }
	    }
  })
 
 .state('fECREDIT.checkInHistory', {
	  url: '/pag50',
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/checkInHistory.html',
	        controller: 'chekHistoryCtrl'
	      }
	    }
  })
  
  
  .state('fECREDIT.bidderForm', {
	 
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/bidderForm.html',
	        controller:'bidderCtrl'
	      }
	    }
  })
  
  .state('fECREDIT.viewBidder', {
	 
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/viewBidder.html',
	        controller:'bidderCtrl'
	      }
	    }
  })
  
  .state('fECREDIT.status', {
	 
	  views: {
	      'side-menu21': {
	        templateUrl: 'templates/status.html',
	      }
	    }
  })
  
$urlRouterProvider.otherwise('/page4')

  

});