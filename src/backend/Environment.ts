const Enviornment = () => {
    if (process.env.ENV === 'local') {
        return {
            buildPath: '../frontend_development',
            proxyUrl: 'http://localhost:8080',
            namespace: 'local',
            redisUrl: '',
            unleashUrl: 'https://unleash.herokuapp.com/api/',
        };
    } else if (process.env.ENV === 'preprod') {
        return {
            buildPath: '../frontend_production',
            proxyUrl: 'http://familie-ks-mottak',
            namespace: 'preprod',
            redisUrl: 'familie-ks-sak-frontend-redis.default.svc.nais.local',
            unleashUrl: 'http://unleashproxy-fss.default.svc.nais.local/api/',
        };
    }

    return {
        buildPath: '../frontend_production',
        proxyUrl: 'http://familie-ks-mottak',
        namespace: 'production',
        redisUrl: 'familie-ks-sak-frontend-redis.default.svc.nais.local',
        unleashUrl: 'http://unleash.default.svc.nais.local/api/',
    };
};
const env = Enviornment();

export const buildPath = env.buildPath;
export const proxyUrl = env.proxyUrl;
export const namespace = env.namespace;
export const redisUrl = env.redisUrl;
export const unleashUrl = env.unleashUrl;
