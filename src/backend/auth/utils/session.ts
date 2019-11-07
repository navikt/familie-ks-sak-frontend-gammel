import cookieParser from 'cookie-parser';
import { Request } from 'express';
import session from 'express-session';
import { PassportStatic } from 'passport';
import redis from 'redis';
import { redisUrl } from '../../Environment';

/* tslint:disable */
const RedisStore = require('connect-redis')(session);
/* tslint:enable */

export type SessionRequest = Request & {
    session: Express.Session;
    sessionID: string;
};

// Set max age of cookie to 12 hours.
const SESSION_MAX_AGE_MILLISECONDS = 12 * 60 * 60 * 1000;
const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MILLISECONDS / 1000;

export default (app: any, passport: PassportStatic) => {
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.set('trust proxy', 1);

    if (process.env.NODE_ENV === 'production') {
        const client = redis.createClient({
            db: 1,
            host: redisUrl,
            password: process.env.REDIS_PASSWORD,
            port: 6379,
        });
        client.unref();

        app.use(
            session({
                cookie: { maxAge: SESSION_MAX_AGE_SECONDS, secure: true },
                name: 'familie-ks-sak',
                resave: false,
                saveUninitialized: true,
                secret: [`${process.env.COOKIE_KEY1}`, `${process.env.COOKIE_KEY2}`],
                store: new RedisStore({ client }),
            })
        );
    } else {
        app.use(
            session({
                name: 'familie-ks-sak',
                resave: false,
                saveUninitialized: true,
                secret: 'local_secret',
            })
        );
    }

    app.use(passport.initialize());
    app.use(passport.session());
};
