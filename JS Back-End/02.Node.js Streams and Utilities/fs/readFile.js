const fs = require('fs');
const fsp = require('fs/promises');

//Synhronous
const text = fs.readFileSync('./text.txt',  {encoding : 'Utf-8'});

console.log(text);
 //Asynchronous
fs.readFile('./text.txt',  {encoding : 'Utf-8'}, (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
 });

 //Asynchronous reading with promisses
 fsp.readFile('./text.txt',  {encoding : 'Utf-8'})
 .then(result => {
    console.log(result);
 })