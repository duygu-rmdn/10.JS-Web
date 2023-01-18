const fs = require('fs');

const readStream = fs.createReadStream('./stream/text.txt');
const writeStream = fs.createWriteStream('./stream/text-copy.txt');

readStream.pipe(writeStream);