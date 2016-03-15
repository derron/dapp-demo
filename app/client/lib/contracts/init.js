/**
 * Created by dhu on 16/3/15.
 */

insuranceABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "userCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTotalBalance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "close",
        "outputs": [],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "chubao",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [],
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Recharge",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

insuranceContract = web3.eth.contract(insuranceABI);
contractAddress = LocalStore.get('contractAddress');
if (contractAddress) {
    contractInstance = insuranceContract.at(contractAddress);
} else {
    contractAddress = '0x6b4d118358e8b24a104ba67faa25edb6f03962ed';
    contractInstance = insuranceContract.at(contractAddress);
}

updateStatus = function() {
    Session.set('totalBalance', contractInstance.getTotalBalance().toString(10));
    Session.set('userCount', contractInstance.userCount().toString(10));

    var userIndex = Session.get('userIndex');
    if (typeof userIndex == 'undefined') {
        userIndex = 0;
    }
    var userAddress = contractInstance.users(userIndex);
    var userBalance = contractInstance.balanceOf(userAddress).toString(10);
    Session.set('userAddress', userAddress);
    Session.set('userBalance', userBalance);
};