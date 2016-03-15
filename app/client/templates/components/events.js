/**
 * Created by dhu on 16/3/15.
 */

function addEvents(event) {
    var events = Session.get('events');
    if (!events) {
        events = [];
    }
    for (var i = 0; i < events.length; ++i) {
        if (events[i].block == event.block) {
            return;
        }
    }
    events.unshift(event);
    events.sort(function(a, b){
        return b.block - a.block;
    });
    Session.set('events', events);
}

// when the template is rendered
Template["components_events"].onRendered(function(){
    var rechargeEvent = contractInstance.Recharge({}, {fromBlock: 0, toBlock: 'latest'});
    var transferEvent = contractInstance.Transfer({}, {fromBlock: 0, toBlock: 'latest'});
    rechargeEvent.watch(function(error, result){
        if (!error) {
            var msg = "Recharge from: " + result.args.from + " amount: " + result.args.amount;
            var blockNumber = result.blockNumber;
            var time = web3.eth.getBlock(blockNumber).timestamp;
            //console.log("Event: " + JSON.stringify(result));
            addEvents({time: time, block: blockNumber, msg: msg});
            updateStatus();
        }
    });
    transferEvent.watch(function(error, result){
        if (!error) {
            var msg = "Transfer to: " + result.args.to + " amount: " + result.args.amount;
            var blockNumber = result.blockNumber;
            var time = web3.eth.getBlock(blockNumber).timestamp;
            //console.log("Event: " + JSON.stringify(result));
            addEvents({time: time, block: blockNumber, msg: msg});
            updateStatus();
        }
    });
});

Template['components_events'].helpers({

    'events': function() {
        return Session.get('events');
    },

});