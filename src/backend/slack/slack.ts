import axios, { AxiosResponse } from 'axios';
import { Response } from 'express';
import { SessionRequest } from '../auth/utils/session';
import { logError, logInfo } from '../customLoglevel';
import { namespace } from '../Environment';

/*if (agent) {
    agent.options.rejectUnauthorized = false;
}*/

const axiosGjennomProxy =
    process.env.NODE_ENV !== 'development'
        ? axios.create({
              proxy: {
                  host: 'webproxy-nais.nav.no',
                  port: 8088,
              },
          })
        : axios.create();

const token = process.env.SLACK_TOKEN;

export const slackNotify = (req: SessionRequest, res: Response, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);
    axiosGjennomProxy
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
        .then((response: AxiosResponse) => {
            res.status(200).send(response.data);
        })
        .catch((error: Error) => {
            logError(req, `Sending av melding til slack feilet: ${error}`);
            res.status(500).send(error);
        });
};
