/**
 * Created by dhu on 16/3/15.
 */
Template['components_recharge'].events({

    "submit .recharge": function(event){ // Create Contract
        event.preventDefault();
        var amount = event.target.amount.value;
        if (amount <= 0) return;
        web3.eth.sendTransaction({from: web3.eth.accounts[0], to: contractAddress, value: amount , gas: 3000000}, function(error, result){
            console.log("recharge result:" + JSON.stringify(result));
        });
        event.target.amount.value = '';
    }
});