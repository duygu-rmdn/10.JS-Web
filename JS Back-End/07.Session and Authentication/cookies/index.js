const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const dataServise = require("./dataService");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.send(`<h1>Home page</h1>
    <p><a href="/login">Login</a></p>
    <p><a href="/register">Registser</a></p>
    <p><a href="/profile">Profile</a></p>`
    );
});

app.get('/login', (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form action="/login" method="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username"/>

    <label for="password">Password</label>
    <input type="password" id="password" name="password"/>

    <input type="submit" value="login"/>
</form>
    `)
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await dataServise.loginUser(username, password);

        const authData = {
            username: user.username
        };

        res.cookie('auth', JSON.stringify(authData));
        req.session.username = authData.username;
        req.session.privInfo = 'privInfo privInfoprivInfo';

    } catch (err) {
        console.log(err);
        res.status(401).end();
    }

    res.redirect('/');

});

app.get('/register', (req, res) => {
    res.send(` <h1>Register</h1>
    <form action="/register" method="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username"/>
    
    <label for="password">Password</label>
    <input type="password" id="password" name="password"/>
    
    <input type="submit" value="login"/>
    </form>`);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    await dataServise.registerUser(username, password);

    res.redirect('/login');
});

app.get('/profile', (req, res) => {
    const authData = req.cookies['auth'];

    if (!authData) {
        return res.status(401).end();
    }

    const { username } = JSON.parse(authData);

    console.log(req.session);

    res.send(`
    <h2> Hello - ${username}<?h2>
        `);
});

app.listen(5000);