const { v4: uuidv4 } = require('uuid');
const Account = require('../account');

const TRANSACTION_TYPE_MAP = {
    CREATE_ACCOUNT: 'CREATE_ACCOUNT',
    TRANSACT: 'TRANSACT'
};

class Transaction {
    constructor({ id, from, to, value, data, signature }) {
        this.id = id || uuidv4();
        this.from = from || '-';
        this.to = to || '-';
        this.value = value || 0;
        this.data = data || '-';
        this.signature = signature || '-';
    }

    static createTransaction({ account, to, value }) {
        if (to) {
            const transactionData = {
                id: uuidv4(),
                from: account.address,
                to,
                value,
                data: { type: TRANSACTION_TYPE_MAP.TRANSACT }
            }

            return new Transaction({
                ...transactionData,
                signature: account.sign(transactionData)
            });
        }

        return new Transaction({
            data: {
                type: TRANSACTION_TYPE_MAP.CREATE_ACCOUNT,
                accountData: account.toJSON()
            }
        });
            
    }
}


module.exports = Transaction;

const account = new Account();
const transaction = Transaction.createTransaction({
    account
});
console.log('transaction:', transaction);