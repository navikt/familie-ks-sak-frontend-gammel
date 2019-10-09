const Environment = () => {
    if (process.env.ENV === 'local') {
        return {
            buildPath: '../frontend_development',
            namespace: 'local',
            proxyUrl: 'http://localhost:8083',
            redisUrl: 'localhost',
            unleashUrl: 'https://unleash.herokuapp.com/api/',
        };
    } else if (process.env.ENV === 'preprod') {
        return {
            buildPath: '../frontend_production',
            namespace: 'preprod',
            proxyUrl: 'http://familie-ks-sak',
            redisUrl: 'familie-ks-sak-frontend-redis.default.svc.nais.local',
            unleashUrl: 'http://unleashproxy-fss.default.svc.nais.local/api/',
        };
    }

    return {
        buildPath: '../frontend_production',
        namespace: 'production',
        proxyUrl: 'http://familie-ks-sak',
        redisUrl: 'familie-ks-sak-frontend-redis.default.svc.nais.local',
        unleashUrl: 'http://unleash.default.svc.nais.local/api/',
    };
};
const env = Environment();

export const buildPath = env.buildPath;
export const proxyUrl = env.proxyUrl;
export const namespace = env.namespace;
export const redisUrl = env.redisUrl;
export const unleashUrl = env.unleashUrl;
