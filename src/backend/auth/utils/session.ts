import cookieParser from 'cookie-parser';
import { Request } from 'express';
import session from 'express-session';
import { PassportStatic } from 'passport';
import { redisUrl } from '../../Environment';

const RedisStore = require('connect-redis')(session);

export type SessionRequest = Request & {
    session: Express.Session;
    sessionID: string;
};

// Set max age of cookie to 12 hours.
const SESSION_MAX_AGE = 12 * 60 * 60 * 1000;

export default (app: any, passport: PassportStatic) => {
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.set('trust proxy', 1);

    if (process.env.NODE_ENV === 'production') {
        app.use(
            session({
                cookie: { maxAge: SESSION_MAX_AGE, secure: true },
                name: 'familie-ks-sak',
                saveUninitialized: true,
                secret: [`${process.env.COOKIE_KEY1}`, `${process.env.COOKIE_KEY2}`],
                store: new RedisStore({
                    host: redisUrl,
                    logErrors: true,
                    pass: process.env.REDIS_PASSWORD,
                    port: 6379,
                    ttl: SESSION_MAX_AGE,
                }),
                resave: false,
            })
        );
    } else {
        app.use(
            session({
                name: 'familie-ks-sak',
                saveUninitialized: true,
                secret: 'local_secret',
                resave: false,
            })
        );
    }

    app.use(passport.initialize());
    app.use(passport.session());
};
