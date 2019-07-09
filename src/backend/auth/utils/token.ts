import moment from 'moment';
import request from 'request-promise';
import { log_error, log_info } from '../../customLoglevel';
import { nodeConfig } from '../config/passportConfig';
import { SessionRequest } from './session';

// GET AND REFRESH ACCESSTOKENS
export const validateRefreshAndGetToken = async (req: SessionRequest) => {
    if (!req.session) {
        log_error(
            req,
            'No session found in validateRefreshAndGetToken. Returning invalid accessToken.'
        );
        return '';
    }

    if (!req.session.accessToken) {
        log_info(req, 'not authenticated - no accessToken. Fetching new accessToken.');

        const newAccessToken = await getAccessTokenUser(req);

        req.session.accessToken = newAccessToken;
    } else if (moment().isAfter(moment(req.session.expiryDate))) {
        log_info(req, 'not authenticated - expired token. Fetching new accessToken.');

        const newAccessToken = await getAccessTokenUser(req);

        if (req.session) {
            req.session.accessToken = newAccessToken;
        }
    } else {
        log_info(req, 'authenticated.');
    }
    req.session.expiryDate = JSON.parse(decodeToken(req.session.accessToken)).exp * 1000;

    return req.session.accessToken;
};

// GET USER SPESIFIC ACCESSTOKEN
const getAccessTokenUser = async (req: SessionRequest) => {
    const parameters = {
        client_id: nodeConfig.clientID,
        resource: nodeConfig.clientID,
        redirect_uri: nodeConfig.redirectUrl,
        grant_type: 'refresh_token',
        refresh_token: req.session.refreshToken,
        client_secret: nodeConfig.clientSecret,
    };

    return request
        .post({ url: nodeConfig.tokenURI, formData: parameters }, (err, httpResponse, body) => {
            return body;
        })
        .then(result => {
            return JSON.parse(result).access_token;
        })
        .catch(err => {
            log_error(req, `Error during getAccessTokenUser: ${err}`);
            req.session.destroy((error: Error) => {
                log_error(req, `Failed to destroy session: ${error}`);
            });
            return '';
        });
};

// DECODE TOKEN
const decodeToken = (encodedToken: string): string => {
    if (encodedToken) {
        if (encodedToken.startsWith('eyJ0')) {
            const tokenSplit = encodedToken.split('.');
            const tokenDecoded = Buffer.from(tokenSplit[1], 'base64').toString();
            return tokenDecoded;
        } else {
            throw new Error('not a valid accessToken or id_token');
        }
    } else {
        throw new Error('no token in input');
    }
};