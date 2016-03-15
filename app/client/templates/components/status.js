/**
 * Created by dhu on 16/3/14.
 */

// when the template is rendered
Template["components_status"].onRendered(function(){
    updateStatus();
});

Template['components_status'].events({

    'change #userIndex': function(event, template) {
        Session.set('userIndex', $("#userIndex").val());
        updateStatus();
    },
});

Template['components_status'].helpers({

    'address': function() {
        return contractAddress;
    },

    'totalBalance': function() {
        return Session.get('totalBalance');
    },

    'userCount': function() {
        return Session.get('userCount');
    },

    'fromWei': function(weiValue, type){
        return web3.fromWei(weiValue, type).toString(10);
    },

    'userAddress': function() {
        return Session.get('userAddress');
    },

    'userBalance': function() {
        return Session.get('userBalance');
    },

    'maxUserIndex': function() {
        var maxIndex = Session.get('userCount') - 1;
        if (maxIndex < 0) {
            maxIndex = 0;
        }
        return maxIndex;
    }

});