contract Insurance {
    
    mapping(address => bool) activeUser;
    mapping(address => uint) public balanceOf;
    mapping(uint => address) public users;
    uint public userCount;
    address public owner;
    
    event Recharge(address from, uint amount);
    event Transfer(address to, uint amount);

    function Insurance() {
        owner = msg.sender;
    }

    function () {
        saveBalance(msg.sender, balanceOf[msg.sender] + msg.value);
        Recharge(msg.sender, msg.value);
    }
    
    function chubao(address recipient) {
        if (msg.sender != owner) return;
        if (!activeUser[recipient]) return;
        uint amountPerUser = 300000 / userCount;
        uint totalAmount = 0;
        for (uint i = 0; i < userCount; i++)
        {
            uint value = balanceOf[users[i]];
            if (value >= amountPerUser) {
                value -= amountPerUser;
                totalAmount += amountPerUser;
            } else {
                value = 0;
                totalAmount += value;
            }
            saveBalance(users[i], value);
        }
        //recipient.send(totalAmount);
        saveBalance(recipient, balanceOf[recipient] + totalAmount);
        Transfer(recipient, totalAmount);
    }
    
    function close() {
        if (msg.sender != owner) return;
        owner.send(getTotalBalance());
        suicide(owner);
    }
    
    function getTotalBalance() constant returns (uint) {
        uint totalAmount = 0;
        for (uint i = 0; i < userCount; i++)
        {
            address user = users[i];
            uint value = balanceOf[user];
            totalAmount += value;
        }
        return totalAmount;
    }
    
    function saveBalance(address user, uint value) private {
        bool active = activeUser[user];
        if (active) {
            balanceOf[user] = value;
        } else {
            balanceOf[user] = value;
            activeUser[user] = true;
            users[userCount] = user;
            userCount++;
        }
    }
    
}