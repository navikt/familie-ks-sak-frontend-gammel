import AlertStripe from 'nav-frontend-alertstriper';
import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { hentFagsaker } from '../../api/fagsak';
import { byggTomRessurs, Ressurs, RessursStatus } from '../../typer/ressurs';
import Fagsaker from './Fagsaker';

const Søk: React.FunctionComponent = () => {
    const [fagsaker, settFagsaker] = React.useState<Ressurs<any>>(byggTomRessurs());
    const [filter, settFilter] = React.useState('');

    React.useEffect(() => {
        if (filter !== '') {
            hentFagsaker(filter).then((hentetFagsaker: Ressurs<any>) =>
                settFagsaker(hentetFagsaker)
            );
        } else {
            settFagsaker(byggTomRessurs());
        }
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

            <Fagsaker fagsaker={fagsaker} />
        </React.Fragment>
    );
};

export default Søk;
