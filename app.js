import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import helmet from 'helmet';

import indexRouter from './routes/index';
import usersRouter from './routes/Users';
import postsRouter from './routes/Posts';

import customLogger from './config/Logger';
import redisClient from './db/RedisClient';
import sessConfig from './config/SessionConfig';

import * as ANSIColorLog from './utils/ANSIColorLog';

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
        name: 'sessionId',
        store: new RedisStore({ client: redisClient }),
        resave: false,
        saveUninitialized: false,
        secret: sessConfig.SESS_SECRET,
        cookie: {
            expire: new Date(Date.now() + 500 * 60 * 60),
            maxAge: 24 * 60 * 60,
            sameSite: false,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        },
    }),
);
app.use(helmet());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    if (err) {
        customLogger.error(`[GLOBAL ERROR] ${err.message}`);

        if (process.env.NODE_ENV !== 'production') {
            console.log('====================================');
            console.log(ANSIColorLog.dyeRed(err.message));
            console.log('====================================');

            //console.log(err);
        }
    }

    res.status(err.status || 500);
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

module.exports = app;
