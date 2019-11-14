import { Response } from 'express';
import loglevel from 'loglevel';
import { SessionRequest } from '../auth/utils/session';
import { logInfo } from '../customLoglevel';
import { namespace } from '../Environment';

// tslint:disable-next-line: no-var-requires
const slack = require('slack-notify')(process.env.SLACK_NOTIFY_WEBHOOK);

slack.onError = (error: Error) => {
    loglevel.error(`Slack feil: ${error}`);
};

export const slackNotify = (req: SessionRequest, res: Response, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);
    slack.send({
        channel: `#${kanal}`,
        text: formatertMelding,
    });
    res.status(200).send();
};
