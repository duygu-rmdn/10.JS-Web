const fs = require('fs');

const readStream = fs.createReadStream('./stream/text.txt');

readStream.on('data', (chunk) => {
    console.log('--------------------New chunk-----------------');
    console.log(chunk);
});

readStream.on('close', () => {
    console.log('!!!!!Closed!!!!');
});
