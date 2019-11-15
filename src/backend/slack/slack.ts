import { WebClient } from '@slack/web-api';
import { Response } from 'express';
import HttpsProxyAgent from 'https-proxy-agent';
import { SessionRequest } from '../auth/utils/session';
import { logError, logInfo } from '../customLoglevel';
import { namespace } from '../Environment';
const token = process.env.SLACK_TOKEN;
const proxy = new HttpsProxyAgent(process.env.http_proxy || 'http://webproxy.nais:8088');
const slack = new WebClient(token, {
    agent: process.env.NODE_ENV === 'production' ? proxy : undefined,
});

export const slackNotify = (req: SessionRequest, res: Response, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);
    slack.chat
        .postMessage({
            channel: `#${kanal}`,
            text: formatertMelding,
        })
        .then(() => res.status(200).send())
        .catch((error: Error) => {
            logError(req, `Sending av melding til slack feilet: ${error}`);
            res.status(500).send(error);
        });
};
