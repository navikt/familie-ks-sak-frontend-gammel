import AlertStripe from 'nav-frontend-alertstriper';
import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { hentFagsaker } from '../../api/fagsak';
import { byggTomRessurs, Ressurs, RessursStatus } from '../../typer/ressurs';
import SakListe from './Fagsaker';

const Søk: React.FunctionComponent = () => {
    const [fagsaker, settFagsaker] = React.useState<Ressurs<any>>(byggTomRessurs());
    const [filter, settFilter] = React.useState('');

    React.useEffect(() => {
        hentFagsaker(filter).then((hentetFagsaker: Ressurs<any>) => settFagsaker(hentetFagsaker));
    }, [filter]);

    return (
        <React.Fragment>
            <Input
                label={'Søk på fødselsnummer, fagsak id eller saksnummer'}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    settFilter(event.target.value);
                }}
                placeholder={
                    fagsaker.status === RessursStatus.IKKE_HENTET
                        ? 'Fyll inn minst 2 tegn for å søke'
                        : ''
                }
                value={filter}
            />
            {fagsaker.status === RessursStatus.SUKSESS && (
                <AlertStripe children={'Fant ingen saker'} type={'advarsel'} />
            )}

            <SakListe fagsaker={fagsaker} />
        </React.Fragment>
    );
};

export default Søk;
