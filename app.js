const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

const indexRouter = require('./routes/index');

const redisClient = require('./db/RedisClient');
const sessConfig = require('./config/SessionConfig');

const app = express();
const RedisStore = connectRedis(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        name: sessConfig.SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: sessConfig.SESS_SECRET,
        cookie: {
            maxAge: sessConfig.SESS_MAXAGE,
            sameSite: false,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
        },
    }),
);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
