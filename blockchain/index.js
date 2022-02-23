const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBLock({ block }) {
        this.chain.push(block);
    }
}

module.exports = Blockchain

/*
const blockchain = new Blockchain();

for (let i=0; i<1000; i++) {
    const lastBlock = blockchain.chain[blockchain.chain.length-1];
    const block = Block.mineBlock({
        lastBlock,
        beneficiary: 'beneficiary'
    });
    blockchain.addBLock({ block });

    console.log('block', block);
}
*/