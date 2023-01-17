const events = {};
const publish = (eventName, data) => {
    if(!events.eventName){
        events[eventName] = [];
    }
    events[eventName].forEach(callback => callback(data));
}

const subscribe = (eventName, callBack) => {
    if(!events.eventName){
        events[eventName] = [];
    }

    events[eventName].push(callBack);
}

const eventBus = {
    publish,
    subscribe,
}
module.exports = eventBus;