require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 5000


// Middleware to set the correct MIME types //
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.woff')) {
            res.setHeader('Content-Type', 'application/font-woff');
        } else if (path.endsWith('.woff2')) {
            res.setHeader('Content-Type', 'application/font-woff2');
        } else if (path.endsWith('.ttf')) {
            res.setHeader('Content-Type', 'application/font-ttf');
        }
    }
}));

//CSP - Content Security Policy//
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data: https://www.iker42.blog; style-src 'self' 'unsafe-inline'; script-src 'self' https://kit.fontawesome.com");
    next();
});

//Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

//Configuración de la sesión
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
        }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 día
      }
}));

app.use(express.static('public'));

//Template Engine EJS
app.use(expressLayout);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});