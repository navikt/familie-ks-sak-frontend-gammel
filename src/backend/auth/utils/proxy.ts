import { NextFunction, Request, Response } from 'express';
import { ClientRequest } from 'http';
import proxy from 'http-proxy-middleware';
import uuid from 'uuid';
import { proxyUrl } from '../../Environment';
import { SessionRequest } from './session';
import { validateRefreshAndGetToken } from './token';

const restream = (proxyReq: ClientRequest, req: Request, res: Response) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

export const doProxy = () => {
    return proxy('/familie-ks-sak/api', {
        changeOrigin: true,
        logLevel: 'info',
        onProxyReq: restream,
        pathRewrite: (path, req) => {
            const newPath = path.replace('/familie-ks-sak/api', '');
            return `/api${newPath}`;
        },
        secure: true,
        target: `${proxyUrl}`,
    });
};

export const attachToken = () => {
    return async (req: SessionRequest, res: Response, next: NextFunction) => {
        const accessToken = await validateRefreshAndGetToken(req);
        req.headers['Nav-Callid'] = uuid.v1();
        req.headers.Authorization = `Bearer ${accessToken}`;
        return next();
    };
};
