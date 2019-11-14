import express, { NextFunction, Response } from 'express';
import path from 'path';
import {
    authenticateAzure,
    authenticateAzureCallback,
    ensureAuthenticated,
    logout,
} from './auth/utils/authenticate';
import { SessionRequest } from './auth/utils/session';
import { getUserProfile } from './auth/utils/user';
import { buildPath } from './Environment';
import { slackNotify } from './slack/slack';

const router = express.Router();

/* tslint:disable */
const packageJson = require('../package.json');
/* tslint:enable */

export default (middleware: any, prometheus: any) => {
    router.get('/version', (req, res) => {
        res.status(200)
            .send({ version: process.env.APP_VERSION, reduxVersion: packageJson.redux_version })
            .end();
    });
    router.get('/error', (req, res) => {
        prometheus.getSingleMetric('error_route').inc();
        res.sendFile('error.html', { root: path.join(`assets/`) });
    });

    // AUTHENTICATION
    router.get('/login', (req: SessionRequest, res: Response, next: NextFunction) => {
        prometheus.getSingleMetric('login_route').inc();
        authenticateAzure(req, res, next);
    });
    router.post('/auth/openid/callback', authenticateAzureCallback());
    router.get('/auth/logout', logout);

    // USER
    router.get('/user/profile', ensureAuthenticated(true), getUserProfile());

    // SLACK
    router.post('/slack/notify/:kanal', (req: SessionRequest, res: Response) => {
        slackNotify(req, res, req.params.kanal);
    });

    // APP
    if (process.env.NODE_ENV === 'development') {
        router.get('*', ensureAuthenticated(false), (req: SessionRequest, res: Response) => {
            prometheus.getSingleMetric('app_load').inc();

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(
                middleware.fileSystem.readFileSync(path.join(__dirname, `${buildPath}/index.html`))
            );
            res.end();
        });
    } else {
        router.get('*', ensureAuthenticated(false), (req: SessionRequest, res: Response) => {
            prometheus.getSingleMetric('app_load').inc();

            res.sendFile('index.html', { root: path.join(__dirname, buildPath) });
        });
    }

    return router;
};
