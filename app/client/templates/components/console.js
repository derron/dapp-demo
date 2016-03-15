/**
 * Created by dhu on 16/3/15.
 */
// when the template is rendered

Template['components_console'].events({

    "submit .chubao": function(event){ // Create Contract
        event.preventDefault();
        var addr = event.target.address.value;
        contractInstance.chubao.sendTransaction(addr, {from: web3.eth.accounts[0], gas: 3000000}, function(error, result){
            console.log("chubao result:" + JSON.stringify(result));
            window.location = '/home';
        });
        event.target.address.value = '';
    }
});