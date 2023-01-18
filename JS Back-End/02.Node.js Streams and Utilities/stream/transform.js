const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('./stream/text.txt');
const writeStream = fs.createWriteStream('./stream/text-transformed.txt');

readStream.pipe(gzip).pipe(writeStream);