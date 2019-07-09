import { NextFunction, Response } from 'express';
import passport from 'passport';
import { log_error } from '../../customLoglevel';
import { nodeConfig } from '../config/passportConfig';
import { SessionRequest } from './session';

const allowedRedirectRoutes = ['/', 'bank', 'postboks', 'sakslogg', 'transaksjoner', '404'];

export const authenticateAzure = (req: SessionRequest, res: Response, next: NextFunction) => {
    const regex: RegExpExecArray | null = /redirectUrl=(.*)/.exec(req.url);
    const redirectUrl = regex ? regex[1] : 'invalid';
    const validRedirectRoute =
        allowedRedirectRoutes.find(redirectRoute => redirectUrl.includes(redirectRoute)) !==
        undefined;

    const successRedirect = regex && validRedirectRoute ? redirectUrl : '/';
    if (!validRedirectRoute) {
        log_error(req, `Ugyldig redirect path [${redirectUrl}], fallback '/'`);
    }

    req.session.redirectUrl = successRedirect;
    try {
        passport.authenticate('azuread-openidconnect', {
            successRedirect,
            failureRedirect: '/error',
        })(req, res, next);
    } catch (err) {
        throw new Error(`Error during authentication: ${err}`);
    }
};

export const authenticateAzureCallback = () => {
    return (req: SessionRequest, res: Response, next: NextFunction) => {
        try {
            passport.authenticate('azuread-openidconnect', {
                successRedirect: req.session.redirectUrl || '/',
                failureRedirect: '/error',
            })(req, res, next);
        } catch (err) {
            throw new Error(`Error during authentication: ${err}`);
        }
    };
};

export const ensureAuthenticated = (sendUnauthorized: boolean) => {
    return async (req: SessionRequest, res: Response, next: NextFunction) => {
        if (req.isAuthenticated()) {
            return next();
        }

        const pathname = req.originalUrl;
        if (sendUnauthorized) {
            res.status(401).send('Unauthorized');
        } else {
            res.redirect(`/login?redirectUrl=${pathname}`);
        }
    };
};

export const logout = (req: SessionRequest, res: Response) => {
    return async (req: SessionRequest, res: Response) => {
        req.session.destroy(error => {
            log_error(req, `error during logout: ${error}`);
            res.status(500).send(error);
        });
        res.redirect(nodeConfig.logoutUri);
    };
};