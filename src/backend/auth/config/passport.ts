import { IProfile, OIDCStrategy, VerifyCallback } from 'passport-azure-ad';
import { SessionRequest } from '../utils/session';
import { passportConfig } from './passportConfig';

export default (passport: any) => {
    passport.serializeUser((user: any, done: any) => {
        done(null, user.oid);
    });

    passport.deserializeUser((oid: string, done: any) => {
        done(null, oid);
    });

    // AZURE AD LOGIN STRATEGY
    passport.use(
        'azuread-openidconnect',
        new OIDCStrategy(
            passportConfig,
            (
                req: SessionRequest,
                _iss: string,
                _sub: string,
                profile: IProfile,
                _access_token: string,
                refresh_token: string,
                done: VerifyCallback
            ) => {
                if (!profile.oid) {
                    return done(new Error('No oid found'), null);
                }
                process.nextTick(() => {
                    req.session.oid = profile.oid;
                    req.session.upn = profile.upn;
                    req.session.displayName = profile.displayName;
                    req.session.firstName = profile.name ? profile.name.givenName : '-';
                    req.session.lastName = profile.name ? profile.name.familyName : '-';
                    req.session.groups = JSON.parse(profile._json.groups);
                    req.session.refreshToken = refresh_token;

                    return done(null, profile);
                });
            }
        )
    );
};
