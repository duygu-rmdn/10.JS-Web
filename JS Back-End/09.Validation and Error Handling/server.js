const express = require('express');

const validators = require('./validators');
const {isEmail} = require('./middlewares/validatorMiddleware');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`<h1>Home page</h1>
    <p><a href="/login">Login</a></p>
    <p><a href="/register">//Registser</a></p>
    <p><a href="/logout">//Logout</a></p>
    <p><a href="/profile">//Profile</a></p>`
    );
});

app.get('/login', (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
    <label for="email">Email</label>
    <input type="text" id="email" name="email"/>
    <label for="password">Password</label>
    <input type="password" id="password" name="password"/>
    <input type="submit" value="login"/>
</form>
    `)
});

app.post('/login', isEmail, (req, res) => {
    const { email, password } = req.body;

    // if (!validators.isEmail(email)) {
    //     return res.redirect('/404');
    // }

    res.redirect('/');
}); 

app.get('/404', (req, res) => {
    res.send('Not found!');
});


app.listen(5000, () => {console.log('Server is listening...')});