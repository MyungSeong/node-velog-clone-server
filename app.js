import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import customLogger from './config/Logger';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

import redisClient from './db/RedisClient';
import sessConfig from './config/SessionConfig';

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
        resave: false,
        saveUninitialized: false,
        secret: sessConfig.SESS_SECRET,
        cookie: {
            maxAge: 24 * 60 * 60,
            sameSite: false,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        },
    }),
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    if (res.headersSent) {
        return next(err);
    }

    customLogger.error(err.message);

    res.status(err.status || 500);
    res.render('error', {
        code: err.code,
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
