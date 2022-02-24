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
    constructor() {
        this.pubnub = new PubNub(credentials);
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
                console.log('messageObject:', messageObject);
            }
        });
    }
}

module.exports = PubSub;

const pubsub = new PubSub();

setTimeout(() => {
    pubsub.publish({
        channel: CHANNELS_MAP.TEST,
        message: 'foo'
    });
}, 3000);
