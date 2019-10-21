import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { RessursStatus } from '../../typer/ressurs';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';
import LasterModal from '../Felleskomponenter/LasterModal/LasterModal';
import Personkort from './Personkort/Personkort';
import Sakskort from './Sakskort/Sakskort';
import VilkårContainer from './VilkårContainer/VilkårContainer';

interface IProps {
    fagsakId: string;
}

const Fagsak: React.FunctionComponent<IProps> = ({ fagsakId }) => {
    const fagsakDispatcher = useFagsakDispatch();
    const fagsak = useFagsakContext().fagsak;

    React.useEffect(() => {
        fagsakDispatcher({
            payload: fagsakId,
            type: actions.SETT_FAGSAK_ID,
        });
    }, [fagsakId]);

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
        case RessursStatus.IKKE_TILGANG:
            return (
                <AlertStripe
                    children={`Du har ikke tilgang til å se denne saken.`}
                    type={'advarsel'}
                />
            );
        case RessursStatus.FEILET:
            return (
                <AlertStripe
                    children={`Løsningen får ikke vist denne saken. Vennligst prøv igjen senere.`}
                    type={'feil'}
                />
            );
        default:
            return <div />;
    }
};

export default Fagsak;
