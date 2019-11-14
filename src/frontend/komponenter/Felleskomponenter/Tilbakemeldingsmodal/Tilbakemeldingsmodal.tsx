import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Textarea } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { slackNotify } from '../../../api/axios';
import { slackKanaler } from '../../../typer/slack';

interface IProps {
    åpen: boolean;
    settÅpen: (åpen: boolean) => void;
}

const Tilbakemeldingsmodal: React.FunctionComponent<IProps> = ({ settÅpen, åpen }) => {
    const [melding, settMelding] = React.useState('');
    const [feil, settFeil] = React.useState('');

    return (
        <Modal
            contentClass={'tilbakemelding'}
            isOpen={åpen}
            closeButton={true}
            onRequestClose={() => {
                settÅpen(!åpen);
            }}
            contentLabel="Tilbakemelding"
        >
            <Undertittel children={`Tilbakemelding`} />

            <br />

            <form
                onSubmit={event => {
                    slackNotify(
                        `Ny tilbakemelding fra saksbehandler!\n${melding}`,
                        slackKanaler.tilbakemelding
                    )
                        .then(() => {
                            settÅpen(false);
                            settMelding('');
                        })
                        .catch(error => {
                            settFeil('Klarte ikke å sende tilbakemelding, prøv igjen.');
                        });

                    event.preventDefault();
                }}
            >
                <Textarea
                    label={'Legg til beskjed til teamet'}
                    textareaClass={'tilbakemelding__textarea'}
                    maxLength={500}
                    onChange={event => settMelding(event.target.value)}
                    required={true}
                    value={melding}
                    feil={feil ? { feilmelding: feil } : undefined}
                />

                <br />
                <Knapp className={'taskpanel__vislogg'} mini={true}>
                    Send tilbakemelding
                </Knapp>
            </form>
        </Modal>
    );
};

export default Tilbakemeldingsmodal;
