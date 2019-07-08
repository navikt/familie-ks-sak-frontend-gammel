import { NextFunction, Request, Response } from 'express';
import { ClientRequest } from 'http';
import proxy from 'http-proxy-middleware';
import { SessionRequest } from './session';

const token = require('./token');
const { proxyUrl } = require('../../Environment.js');

const restream = (proxyReq: ClientRequest, req: Request, res: Response) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

export const doProxy = () => {
    return proxy('/familie-ks-mottak/api', {
        pathRewrite: (path, req) => {
            const newPath = path.replace('/familie-ks-mottak/api', '');
            return `/api${newPath}`;
        },
        changeOrigin: true,
        logLevel: 'info',
        onProxyReq: restream,
        secure: true,
        target: `${proxyUrl}`,
    });
};

export const attachToken = () => {
    return async (req: SessionRequest, res: Response, next: NextFunction) => {
        const accessToken = await token.validateRefreshAndGetToken(req);
        req.headers.Authorization = `Bearer ${accessToken}`;
        return next();
    };
};
