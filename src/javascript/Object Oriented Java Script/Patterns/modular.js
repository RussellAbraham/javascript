var account = (function () {

    var balance = 1000;

    function getBalance() {
        return balance;
    }

    function addIntrest(intrest) {
        balance += intrest;
    }

    return {
        name: "John",
        getBalance: getBalance,
        addIntrest: addIntrest
    };

}());

console.log(account.name);
console.log(account.getBalance());

account.balance = 2000;
console.log(account.getBalance());

account.addIntrest(300);
console.log(account.getBalance());