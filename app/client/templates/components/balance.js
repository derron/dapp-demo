/**
Template Controllers

@module Templates
*/

/**
The balance template

@class [template] components_balance
@constructor
*/

// when the template is rendered
Template['components_balance'].onRendered(function() {
    // get coinbase address
    var coinbase = web3.eth.accounts[0];
    // get the coinbase address balance
    web3.eth.getBalance(coinbase, function(err, result){
        
        // set global temp session balance with result
        Session.set("balance", String(result));
    });
});

Template['components_balance'].helpers({
    /**
    Get The Original Balance

    @method (watchBalance)
    */

    'watchBalance': function(){        
		return web3.fromWei(Session.get('balance'), LocalStore.get('etherUnit')).toString(10);
    },
});

Template['components_balance'].events({

    "click .btn-refresh": function(event, template){ // Create Contract
        // get the coinbase address balance
        var coinbase = web3.eth.accounts[0];
        web3.eth.getBalance(coinbase, function(err, result){
            
            // set global temp session balance with result
            Session.set("balance", String(result));
        });
    }
});


