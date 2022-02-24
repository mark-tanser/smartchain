const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-50f311f2-20d7-4bb5-b989-1991ff8512e6',
    subscribeKey: 'sub-c-eeeeba50-9516-11ec-adb1-ea060f348a12',
    secretKey: 'sec-c-ZTM3MjQxNDMtZWMwNy00MmUxLWJiMmQtZDVkNzQ0ODMwMjhk',
    uuid: 'smartchain'
};

const CHANNELS_MAP = {
    TEST: 'TEST',
    BLOCK: 'BLOCK'
};

class PubSub {
    constructor({ blockchain }) {
        this.pubnub = new PubNub(credentials);
        this.blockchain = blockchain;
        this.subscribeToChannels();
        this.listen();
    }

    subscribeToChannels() {
        this.pubnub.subscribe({
            channels: Object.values(CHANNELS_MAP)
        });
    }

    publish({ channel, message }) {
        this.pubnub.publish({ channel, message });
    }

    listen() {
        this.pubnub.addListener({
            message: messageObject => {
                const { channel, message } = messageObject;
                const parsedMessage = JSON.parse(message);
                
                console.log('Message received. Channel:', channel);

                switch (channel) {
                    case CHANNELS_MAP.BLOCK:
                        console.log('block message', message);
                        this.blockchain.addBlock({ block: parsedMessage })
                            .then(() => console.log('New block accepted'))
                            .catch(error => console.error('New block rejected:', error.message));
                        break;
                    default:
                        return;
                }
            }
        });
    }

    broadcastBlock(block) {
        this.publish({
            channel: CHANNELS_MAP.BLOCK,
            message: JSON.stringify(block)
        });
    }
}

module.exports = PubSub;
