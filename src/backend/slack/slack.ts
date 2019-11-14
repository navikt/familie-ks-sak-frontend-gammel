import { Response } from 'express';
import slack from 'slack';
import { SessionRequest } from '../auth/utils/session';
import { logError, logInfo } from '../customLoglevel';
import { namespace } from '../Environment';

export const slackNotify = (req: SessionRequest, res: Response, kanal: string) => {
    const displayName = req.session.displayName ? req.session.displayName : 'System';
    const formatertMelding: string = `*${displayName}, ${namespace}*\n ${req.body.melding}`;

    logInfo(req, `Poster slack melding til #${kanal}: ${formatertMelding}`);
    slack.chat
        .postMessage({
            channel: `#${kanal}`,
            text: formatertMelding,
            token: process.env.SLACK_TOKEN,
        })
        .then(() => res.status(200).send())
        .catch((error: Error) => {
            logError(req, `Sending av melding til slack feilet: ${error}`);
            res.status(500).send(error);
        });
};
