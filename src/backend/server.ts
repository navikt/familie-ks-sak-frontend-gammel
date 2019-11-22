import Backend from '@navikt/familie-backend';
import bodyParser from 'body-parser';
import express, { Request } from 'express';
import helmet from 'helmet';
import loglevel from 'loglevel';
import path from 'path';
import prom_client from 'prom-client';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { passportConfig, saksbehandlerTokenConfig, sessionConfig } from './config';
import { attachToken, doProxy } from './proxy';
import setupRouter from './router';

/* tslint:disable */
const config = require('../build_n_deploy/webpack/webpack.dev');
/* tslint:enable */

loglevel.setDefaultLevel(loglevel.levels.INFO);
const backend = new Backend(passportConfig, sessionConfig, saksbehandlerTokenConfig);
backend.getApp().use(helmet());

const port = 8000;

// Metrics
const setupMetrics = () => {
    const register = backend.getPrometheusRegistry();

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

    return register;
};
const prometheus = setupMetrics();

backend.getApp().get('/metrics', (req: Request, res) => {
    res.set('Content-Type', prometheus.contentType);
    res.end(prometheus.metrics());
});

let middleware;

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    middleware = webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    });

    backend.getApp().use(middleware);
    backend.getApp().use(webpackHotMiddleware(compiler));
} else {
    backend
        .getApp()
        .use('/assets', express.static(path.join(__dirname, '..', 'frontend_production')));
}

backend
    .getApp()
    .use(
        '/familie-ks-sak/api',
        backend.ensureAuthenticated(true, saksbehandlerTokenConfig),
        attachToken(backend),
        doProxy()
    );

// Sett opp bodyParser og router etter proxy. Spesielt viktig med tanke på større payloads som blir parset av bodyParser
backend.getApp().use(bodyParser.json({ limit: '200mb' }));
backend.getApp().use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
backend.getApp().use('/', setupRouter(backend, middleware, prometheus));

backend.getApp().listen(port, '0.0.0.0', (err: Error) => {
    if (err) {
        loglevel.error(`${backend.getLogTimestamp()}: server startup failed - ${err}`);
    }
    loglevel.info(
        `${backend.getLogTimestamp()}: server startet på port ${port}. Build version: ${
            process.env.APP_VERSION
        }.`
    );
});
