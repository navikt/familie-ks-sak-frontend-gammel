import axios, { AxiosError, AxiosResponse } from 'axios';
import { Response as ExpressResponse } from 'express';
import fetch, { Response } from 'node-fetch';
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
                  host: 'webproxy.nais',
                  port: 8088,
                  protocol: 'http',
              },
          })
        : axios.create();

const token = process.env.SLACK_TOKEN;

export const slackNotify = async (req: SessionRequest, res: ExpressResponse, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);

    const postResponse = await fetch(process.env.SLACK_SENTRY_WEBHOOK, {
        body: JSON.stringify({
            text: formatertMelding,
        }),
        headers: {
            'Content-type': 'application/json; charset=utf-8',
        },
        method: 'POST',
    })
        .then((response: Response) => {
            return response.ok;
        })
        .catch((error: any) => {
            logError(req, `Sending av melding til slack feilet: ${error.stack}`);
            return error;
        });
    console.log('post: ', postResponse);

    console.log('proxy: ', axiosGjennomProxy.defaults.proxy);
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
            console.log('post med proxy med api: ', response.data);
        })
        .catch((error: AxiosError) => {
            logError(req, `Sending av melding til slack via api med axios feilet: ${error.stack}`);
        });

    axiosGjennomProxy
        .post(
            process.env.SLACK_SENTRY_WEBHOOK,
            {
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
            console.log('post med proxy med hook: ', response.data);
            res.status(200).send(response.data);
        })
        .catch((error: AxiosError) => {
            logError(req, `Sending av melding til slack via hook med axios feilet: ${error.stack}`);
            res.status(error.response.status).send(error);
        });
};
