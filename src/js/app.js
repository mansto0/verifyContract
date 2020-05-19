App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',


  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Verify.json", function(Verify) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Verify = TruffleContract(Verify);
      
      // Connect provider to interact with contract
      App.contracts.Verify.setProvider(App.web3Provider);
      
      return App.render();
    });
  },

  // listenForEvents: function() {
  //   App.contracts.Verify.deployed().then(function(instance) {
  //     // Restart Chrome if you are unable to receive this event
  //     // This is a known issue with Metamask
  //     // https://github.com/MetaMask/metamask-extension/issues/2393
  //     instance.votedEvent({}, {
  //       fromBlock: 0,
  //       toBlock: 'latest'
  //     }).watch(function(error, event) {

  //       console.log("event triggered", event)
  //       // Reload when a new vote is recorded
  //       App.render();
  //     });
  //   });
  // },



  render: function() {
    var VerifyInstance;
   
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        console.log(App.account+" "+account);
      }
    });
  },

    addDetails: function(event) {
      event.preventDefault(); 
     
    // var caseNo = $('#caseno').val();
     var caseNo = document.getElementById('caseno').value;
     var location = $('#location').val();
      
      
      
        if ( caseNo !== null && location!== null ){
          console.log(location+" "+location);
          App.contracts.Verify.deployed().then(function(instance) {
            return instance.setCase({ from: App.account },caseNo,location,"abc");
          }).then(function(result) {
            
            
          }).catch(function(err) {
            console.error(err);
          });
    }}
  };
    
     /*verifyDetails: function() {
      var caseNo = $('#caseno').val();
       
      App.contracts.Verify.deployed().then(function(instance) {
        return instance.getCase(caseNo);
      }).then(function(result) {
        
        
      }).catch(function(err) {
        console.error(err);
      });
    }
  };*/

$(function() {
  $(window).load(function() {
    App.init();
  });
});

