import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '/var/run/secrets/nais.io/vault/.env' });
} else {
    dotenv.config();
}

import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import loglevel from 'loglevel';
import passport from 'passport';
import path from 'path';
import prom_client from 'prom-client';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import setupPassportConfig from './auth/config/passport';
import { ensureAuthenticated } from './auth/utils/authenticate';
import { attachToken, doProxy } from './auth/utils/proxy';
import setupSession, { SessionRequest } from './auth/utils/session';
import { getLogTimestamp } from './customLoglevel';
import setupRouter from './router';
import { slackNotify } from './slack/slack';

import fetch from 'node-fetch';

/* tslint:disable */
const config = require('../build_n_deploy/webpack/webpack.dev');
/* tslint:enable */

setupPassportConfig(passport);
loglevel.setDefaultLevel(loglevel.levels.INFO);

const port = 8000;
const app = express();

import https from 'https';
const agent = new https.Agent({
    rejectUnauthorized: false,
});
const testSlack = async () => {
    const testResponse = await fetch('https://slack.com/api/api.test', {
        agent,
        headers: {
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Content-type': 'application/json',
        },
        method: 'POST',
    })
        .then((response: any) => {
            return response.json();
        })
        .catch((error: any) => {
            console.log('test error: ', error);
            return error;
        });
    console.log('test fetch: ', testResponse);
};

testSlack();

app.use(helmet());
app.get('/isAlive', (req: Request, res: Response) => res.status(200).end());
app.get('/isReady', (req: Request, res: Response) => res.status(200).end());

// Metrics
const setupMetrics = () => {
    const collectDefaultMetrics = prom_client.collectDefaultMetrics;
    const Registry = prom_client.Registry;
    const register = new Registry();

    const Counter = prom_client.Counter;
    const appLoad = new Counter({
        help: 'Counter for times app has been loaded',
        labelNames: ['code'],
        name: 'app_load',
    });

    const errorPageLoad = new Counter({
        help: 'Counter for times error page is loaded',
        labelNames: ['code'],
        name: 'error_route',
    });

    const loginPageRequest = new Counter({
        help: 'Counter for times login route is requested',
        labelNames: ['code'],
        name: 'login_route',
    });

    register.registerMetric(appLoad);
    register.registerMetric(errorPageLoad);
    register.registerMetric(loginPageRequest);

    collectDefaultMetrics({ register });
    return register;
};
const prometheus = setupMetrics();

app.get('/metrics', (req: Request, res) => {
    res.set('Content-Type', prometheus.contentType);
    res.end(prometheus.metrics());
});

let middleware;

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    middleware = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use('/assets', express.static(path.join(__dirname, '..', 'frontend_production')));
}

setupSession(app, passport);

app.use('/familie-ks-sak/api', ensureAuthenticated(true), attachToken(), doProxy());

// Slack
app.post('/slack/notify/:kanal', (req: any, res: Response) => {
    let data = '';
    req.on('data', (chunk: any) => {
        data += chunk;
    });
    req.on('end', () => {
        req.body = JSON.parse(data);
        slackNotify(req, res, req.params.kanal);
    });
});

// Sett opp bodyParser og router etter proxy. Spesielt viktig med tanke på større payloads som blir parset av bodyParser
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use('/', setupRouter(middleware, prometheus));

app.listen(port, '0.0.0.0', (err: Error) => {
    if (err) {
        loglevel.error(`${getLogTimestamp()}: server startup failed - ${err}`);
    }
    loglevel.info(
        `${getLogTimestamp()}: server startet på port ${port}. Build version: ${
            process.env.APP_VERSION
        }.`
    );
});
