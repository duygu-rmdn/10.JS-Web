const fs = require('fs');

const writableStream = fs.createWriteStream('./stream/outputStr.txt');

const name1 = "Pesho";
const name2 = "Gosho";
const name3 = "Ivo";

writableStream.write(name1);
writableStream.write(name2);
writableStream.write(name3);

writableStream.on('close', () => {
    console.log('This is end!');
});

writableStream.end();