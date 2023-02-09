const express = require('express');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const config = require('./config');
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const setupViewEngine = require('./config/viewEngine');
const initDatabase = require('./config/databaseInit');

const app = express();
setupViewEngine(app);

app.use(express.static('src/public'));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(authMiddleware.authentionation);
app.use(routes); // routes must be at the end
app.use(errorHandler); 

initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`)))
    .catch((err) => console.error(err));
