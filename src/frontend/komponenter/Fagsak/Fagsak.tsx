import * as React from 'react';
import { RessursStatus } from '../../typer/ressurs';
import { actions, useFagsakContext, useFagsakDispatch } from '../FagsakProvider';

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

    return (
        <div>{`Fødselsnummer: ${fagsak.status === RessursStatus.SUKSESS &&
            fagsak.data.søkerFødselsnummer}`}</div>
    );
};

export default Fagsak;
