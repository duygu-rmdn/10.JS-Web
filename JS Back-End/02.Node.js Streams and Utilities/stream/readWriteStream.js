//Piping = readStream + writeStream => pipe.js

const fs = require('fs');

const readStream = fs.createReadStream('./stream/text.txt');
const writeStream = fs.createWriteStream('./stream/text-copy.txt');

readStream.on('data', (chunk) => {
    writeStream.write(chunk);
});

readStream.on('close', () => {
    writeStream.end();
})