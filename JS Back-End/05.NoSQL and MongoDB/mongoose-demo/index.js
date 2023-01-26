const mongoose = require('mongoose');
const Cat = require('./models/Cat');

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/catShelter');

    //await saveCat('gosho', 5, 'persi');
    const cats = await readCats();

    /*cats.forEach(cat => {
        console.log(cat.info);
    });*/

    /*const nav = await findCat('Nav');

    console.log(nav);*/

    //await updateCat('Nav', 'Navohodonosor');
}

async function saveCat(name, age, breed) {
    await Cat.create({
        name,
        age,
        breed
    });

    // const cat = new Cat..., then await cat.save();
}

async function readCats() {
    const cats = await Cat.find();

    //console.log(cats);

    return cats;
}

async function findCat(name) {
    //find, findOne, findById
    const cat = await Cat.findOne({ name });

    return cat;
}

async function updateCat(name, newName) {
    //updateOne, updateMany
    await Cat.updateOne({ name }, { name: newName });
}

//Student.find({}).where('age').gt(7).lt(14); Student.find({age: {$gt: 7, $lt: 14}});

main();