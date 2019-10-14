import * as React from 'react';
import { RessursStatus } from '../../typer/ressurs';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';
import Personkort from './Personkort/Personkort';
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
                <div>
                    <Personkort person={fagsak.data.behandlinger[0].personopplysninger.søker} />
                    <VilkårContainer behandling={fagsak.data.behandlinger[0]} />
                </div>
            );
        case RessursStatus.HENTER:
            return <div>Henter fagsak...</div>;
        case RessursStatus.FEILET:
            return <div>{`Innhenting av fagsak feilet med melding: ${fagsak.melding}`}</div>;
        default:
            return <div />;
    }
};

export default Fagsak;
