import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { RessursStatus } from '../../typer/ressurs';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';
import LasterModal from '../Felleskomponenter/LasterModal/LasterModal';
import Personkort from './Personkort/Personkort';
import Sakskort from './Sakskort/Sakskort';
import VilkårContainer from './VilkårContainer/VilkårContainer';

interface IProps {
    saksnummer: string;
}

const Fagsak: React.FunctionComponent<IProps> = ({ saksnummer }) => {
    const fagsakDispatcher = useFagsakDispatch();
    const fagsak = useFagsakContext().fagsak;

    React.useEffect(() => {
        fagsakDispatcher({
            payload: saksnummer,
            type: actions.SETT_SAKSNUMMER,
        });
    }, [saksnummer]);

    switch (fagsak.status) {
        case RessursStatus.SUKSESS:
            return (
                <React.Fragment>
                    <Personkort person={fagsak.data.behandlinger[0].personopplysninger.søker} />
                    <Sakskort fagsak={fagsak.data} />
                    <VilkårContainer behandling={fagsak.data.behandlinger[0]} />
                </React.Fragment>
            );
        case RessursStatus.HENTER:
            return <LasterModal />;
        case RessursStatus.FEILET:
            return (
                <AlertStripe
                    children={`Innhenting av fagsak feilet med melding: ${fagsak.melding}`}
                    type={'feil'}
                />
            );
        default:
            return <div />;
    }
};

export default Fagsak;
