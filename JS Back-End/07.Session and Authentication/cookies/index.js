const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded( {extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`<h1>Home page</h1>
    <p><a href="/login">Login</a></p>
    <p><a href="/profile">Profile</a></p>`
    );
});

app.get('/login', (req, res) => {
    res.send(`
    <form action="/login" method="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username"/>

    <label for="password">Password</label>
    <input type="password" id="password" name="password"/>

    <input type="submit" value="login"/>
</form>
    `)
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    if(username == 'Duygu' && password == 'rmdn'){
        const authData = {
            username: 'DUDU'
        };

        res.cookie('auth', JSON.stringify(authData));
        return res.redirect('/');
    }

    res.status(401).end();
});

app.get('/profile', (req, res) =>{
    const authData = req.cookies['auth'];

    if (!authData) {
        return res.status(401).end();
    }
 
    const {username} = JSON.parse(authData);

    res.send(`
    <h2> Hello - ${username}<?h2>
        `);
});

app.listen(5000);