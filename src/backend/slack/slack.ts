import axios from 'axios';
import { Response } from 'express';
import HttpsProxyAgent from 'https-proxy-agent';
import { SessionRequest } from '../auth/utils/session';
import { logError, logInfo } from '../customLoglevel';
import { namespace } from '../Environment';

const agent =
    process.env.NODE_ENV !== 'development'
        ? new HttpsProxyAgent('http://webproxy-nais.nav.no:8088')
        : undefined;

if (agent) {
    agent.options.rejectUnauthorized = false;
}

const token = process.env.SLACK_TOKEN;

export const slackNotify = (req: SessionRequest, res: Response, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);
    axios
        .post(
            'https://slack.com/api/chat.postMessage',
            {
                channel: `#${kanal}`,
                text: formatertMelding,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=utf-8',
                },
            }
        )
        .then((response: any) => {
            logInfo(req, response.data);
            res.status(200).send();
        })
        .catch((error: Error) => {
            logError(req, `Sending av melding til slack feilet: ${error}`);
            res.status(500).send(error);
        });
};
