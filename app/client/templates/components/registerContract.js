
var insuranceByteCode = '606060405260048054600160a060020a031916331790556103ec806100246000396000f3606060405236156100615760e060020a600035046307973ccf81146100c857806312b58349146100d1578063365b98b21461011b57806343d726d61461013c57806370a082311461015c5780638da5cb5b14610174578063d6add2b614610186575b33600160a060020a0381166000908152600160205260409020546101b2916101b49134015b600160a060020a03821660009081526020819052604090205460ff16801561038857600160a060020a03831660009081526001602052604090208290556103e7565b6101fa60035481565b6101fa5b6000808080805b60035483101561037f575050600081815260026020908152604080832054600160a060020a0316808452600192839052922054938401939201916100dc565b61020c600435600260205260009081526040902054600160a060020a031681565b6101b2600454600160a060020a03908116339190911614610349576101f8565b6101fa60043560016020526000908152604090205481565b61020c600454600160a060020a031681565b6101b2600435600454600090819081908190600160a060020a039081163391909116146102755761026e565b005b60408051600160a060020a033316815234602082015281517f78d9de6f3ad1cae9e0cbcbaa5267fd90f6a6728831eec42b7c147b398b226924929181900390910190a15b565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b60408051600160a060020a03871681526020810185905281517f69ca02dd4edd7bf0a4abb9ed3b7af3f14778db5d61921c7dc7cd545266326de2929181900390910190a15b5050505050565b600160a060020a03851660009081526020819052604090205460ff16151561029c5761026e565b600354620493e0049350600092508291505b6003548210156102f15750600081815260026020908152604080832054600160a060020a031683526001909152902054838110610317579183019183900361031b565b600160a060020a0385166000908152600160205260409020546102299086908501610086565b5060005b60008281526002602052604090205461033d90600160a060020a031682610086565b600191909101906102ae565b600454600160a060020a0316600061035f6100d5565b6040516000818181858888f15050600454600160a060020a031692505050ff5b50919392505050565b600160a060020a0383166000908152600160208181526040808420869055838252808420805460ff1916841790556003805485526002909252909220805473ffffffffffffffffffffffffffffffffffffffff19168617905581540190555b50505056';


// When the template is rendered
Template['components_registerContract'].onRendered(function(){
    if (contractInstance) {
        TemplateVar.set('state', {isMined: true, address: contractAddress});
    } else {
        TemplateVar.set('state', {isInactive: true});
    }
});

Template['components_registerContract'].helpers({

});

Template['components_registerContract'].events({

    /**
     On "Create New Contract" click

     @event (click .btn-default)
     */

    "click .btn-default": function(event, template){ // Create Contract
        TemplateVar.set('state', {isMining: true});

        // Set coinbase as the default account
        web3.eth.defaultAccount = web3.eth.coinbase;

        // assemble the tx object w/ default gas value
        var transactionObject = {
            data: insuranceByteCode,
            gas: 3000000,
            from: web3.eth.accounts[0]
        };

        insuranceContract.new(transactionObject, function(err, contract){
            console.log(err, JSON.stringify(contract));
            if(err)
                return TemplateVar.set(template, 'state', {isError: true, error: String(err)});

            if(typeof contract.address != 'undefined') {
                TemplateVar.set(template, 'state', {isMined: true, address: contract.address});
                contractAddress = contract.address;
                contractInstance = contract;
                LocalStore.set('contractAddress', contractAddress);
            }
        });
    },

});