import { Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Textarea } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
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
    const [sender, settSender] = React.useState(false);

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
                    settSender(true);
                    slackNotify(
                        `Ny tilbakemelding fra saksbehandler!\n${melding}`,
                        slackKanaler.tilbakemelding
                    )
                        .then(() => {
                            settSender(false);
                            settÅpen(false);
                            settMelding('');
                        })
                        .catch(error => {
                            settSender(false);
                            settFeil('Klarte ikke å sende tilbakemelding, prøv igjen.');
                        });

                    event.preventDefault();
                }}
            >
                <Normaltekst children={'Skriv beskjed til oss.'} />
                <Normaltekst
                    children={'Det kan være generelle henvendelser, tilbakemeldinger eller feil.'}
                />
                <Normaltekst children={'Obs. ikke skrive sensitive opplysninger.'} />

                <br />
                <Textarea
                    label={'Skriv beskjed (ditt navn blir synlig i beskjeden til oss):'}
                    textareaClass={'tilbakemelding__textarea'}
                    maxLength={500}
                    onChange={event => settMelding(event.target.value)}
                    required={true}
                    value={melding}
                    feil={feil ? { feilmelding: feil } : undefined}
                />

                <br />
                <Knapp spinner={sender} className={'taskpanel__vislogg'} mini={true}>
                    Send tilbakemelding
                </Knapp>
            </form>
        </Modal>
    );
};

export default Tilbakemeldingsmodal;
