const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const dataService = require("./dataService");

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
    <p><a href="/logout">Logout</a></p>
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
        const token = await dataService.loginUser(username, password)

        res.cookie('token', token, { httpOnly: true });

        // req.session.username = user.username;
        // req.session.privateInfo = user.password;

        return res.redirect('/');
    } catch (err) {
        console.log(err);
        res.status(401).end();
    }
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
    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).end();
    }

    try {
        const decodedToken = jwt.verify(token, 'myveryverysecretsecret');

        console.log(decodedToken);

        res.send(`
            <h2>Hello - ${decodedToken.username}</h2>
        `);
    } catch(err) {
        res.status(401).end();
    }
});


app.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

app.listen(5000);