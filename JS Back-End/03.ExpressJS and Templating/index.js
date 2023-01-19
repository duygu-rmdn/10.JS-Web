const experss = require('express');

const app = experss();

app.get('/', (req, res) => {
    res.send("Hello from express");
});

app.get('/redir', (req, res) => {
    res.redirect("/cat");
});

app.get('/cat', (req, res) => {
    res.send("Hello from cats");
});

app.get('/cat/:catId', (req, res) => {
    const catId = req.params.catId;
    res.send(`Hello from individual cat - ${catId}`);
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

