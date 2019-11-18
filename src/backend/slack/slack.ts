import { Response as ExpressResponse } from 'express';
import HttpsProxyAgent from 'https-proxy-agent';
import fetch, { Response } from 'node-fetch';
import { SessionRequest } from '../auth/utils/session';
import { logError, logInfo } from '../customLoglevel';
import { namespace } from '../Environment';

const token = process.env.SLACK_TOKEN;

export const slackNotify = (req: SessionRequest, res: ExpressResponse, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);
    fetch('https://slack.com/api/chat.postMessage', {
        agent:
            process.env.NODE_ENV !== 'development'
                ? new HttpsProxyAgent('http://webproxy.nais:8088')
                : undefined,
        body: JSON.stringify({
            channel: `#${kanal}`,
            text: formatertMelding,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; charset=utf-8',
        },
        method: 'POST',
    })
        .then((response: Response) => {
            logInfo(req, `response: ${response.ok}`);
            res.status(200).send();
        })
        .catch((error: any) => {
            logError(req, `Sending av melding til slack feilet: ${error.stack}`);
            res.status(error.response.status).send(error);
        });
};
