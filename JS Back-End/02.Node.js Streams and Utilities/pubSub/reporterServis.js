const eventBus = require('./eventBus')

const collect = (data) => {
    console.log("Server is reposting: " + data.method);
};

eventBus.subscribe('request', collect)

/*
const reporter = {
    collect,
};
module.exports = reporter;*/