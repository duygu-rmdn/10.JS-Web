const experss = require('express');
const handlebars = require('express-handlebars');
const midlogger = require('./midlogger.js')

const app = experss();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

// app.use(express.static('public')); -> for public files in public folder
// app.use('/static', express.static('public')); -> if only starts with static search for public files in public folder
app.use(midlogger);

let validCat = (req, res, next) =>{
    let isValidId = Number(req.params.catId);
    if (!isValidId) {
        res.send('Invalid id!');
        //res.redirect('404 page');
        return; 
    } 
    next();
  
};

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/redir', (req, res) => {
    res.redirect("/cats");
});

app.get('/cats', (req, res) => {
    const cats = [
        {name: 'Zuzi', age: 5},
        {name: 'Gugi', age: 3}
    ]
    res.render('cats', {cats});
});

app.get('/cat/:catId', validCat,(req, res) => {
    const catId = req.params.catId;
    res.render('cat', {catId: catId});
});

app.get('/json', (req, res) => {
    res.json({message: "ok", time: "now"});
});

app.post('/cat', (req, res) => {
    res.send("cat recived!");
});

app.put('/cat', (req, res) => {
    res.send("cat is deleted");
});

app.route('/home')
    .get((req, res) =>{
        res.send("Get - home")})
    .post((req, res) =>{
        res.send("post - home")})
    .all((req, res) =>{
        res.send("all - home")});

app.get('*', (req, res) => {
    res.send('400 not found hihi')
})

app.listen(5000, () => console.log('App is listening'));

