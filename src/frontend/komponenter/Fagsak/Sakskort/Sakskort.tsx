import * as moment from 'moment';
import { Panel } from 'nav-frontend-paneler';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { IFagsak } from '../../../typer/fagsak';

interface IProps {
    fagsak: IFagsak;
}

const Sakskort: React.StatelessComponent<IProps> = ({ fagsak }) => {
    return (
        <Panel className={'sakskort'} border={true}>
            <Normaltekst children={'Saksnummer'} />
            <Element className={'sakskort__saksnummer'} children={fagsak.id} />

            <div className={'vr'} />
            <Normaltekst children={'Førstegangsbehandling'} />

            <div className={'vr'} />
            <Normaltekst children={'Opprettet dato'} />
            <Element
                className={'sakskort__opprettetdato'}
                children={moment(fagsak.opprettetTidspunkt).format('DD.MM.YYYY')}
            />
        </Panel>
    );
};

export default Sakskort;
