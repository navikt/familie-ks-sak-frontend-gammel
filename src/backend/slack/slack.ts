import axios, { AxiosResponse, AxiosError } from 'axios';
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
                  host: 'webproxy-nais.nav.no',
                  port: 8088,
              },
          })
        : axios.create();

const token = process.env.SLACK_TOKEN;

export const slackNotify = async (req: SessionRequest, res: ExpressResponse, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);

    const data = {
        channel: `#${kanal}`,
        parse: 'full',
        text: formatertMelding,
    };

    const testResponse = await fetch('https://slack.com/api/api.test', {
        headers: {
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            'Content-type': 'application/json',
        },
        method: 'POST',
    })
        .then((response: Response) => {
            return response.json();
        })
        .catch((error: any) => {
            console.log('test error: ', error);
        });
    console.log('test: ', testResponse);

    const authResponse = await fetch('https://slack.com/api/auth.test', {
        headers: {
            Accept: 'application/json',
            'Accept-Charset': 'utf-8',
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        method: 'POST',
    })
        .then((response: Response) => {
            return response.json();
        })
        .catch((error: any) => {
            console.log('auth error: ', error);
        });
    console.log('auth: ', testResponse);

    const postResponse = await fetch('https://slack.com/api/chat.postMessage', {
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-type': 'application/json; charset=utf-8',
        },
        method: 'POST',
    })
        .then((response: Response) => {
            return response.json();
        })
        .catch((error: any) => {
            console.log(error);
            logError(req, `Sending av melding til slack feilet: ${error.stack}`);
            res.status(error.response.status).send(error);
        });
    console.log('post: ', postResponse);
    res.status(200).send(postResponse);

    /*axiosGjennomProxy
        .post('https://slack.com/api/chat.postMessage', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
        .then((response: AxiosResponse) => {
            res.status(200).send(response.data);
        })
        .catch((error: AxiosError) => {
            logError(req, `Sending av melding til slack feilet: ${error.stack}`);
            res.status(error.response.status).send(error);
        });*/
};
