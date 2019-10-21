import * as moment from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { Ressurs, RessursStatus } from '../../typer/ressurs';

interface IProps {
    fagsaker: Ressurs<any[]>;
}

const Fagsaker: React.StatelessComponent<IProps> = ({ fagsaker }) => {
    return <div>{renderFagsaker(fagsaker)}</div>;
};

const renderFagsaker = (fagsaker: Ressurs<any[]>) => {
    switch (fagsaker.status) {
        case RessursStatus.SUKSESS:
            return (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {fagsaker.data.length > 0 ? (
                        fagsaker.data.map((fagsak: any) => {
                            return (
                                <a
                                    className={'lenke'}
                                    href={`/fagsak/${fagsak.id}`}
                                    key={fagsak.id}
                                >{`${moment(fagsak.opprettetTidspunkt).format(
                                    'DD.MM.YYYY'
                                )}: Fagsak id: ${fagsak.id}, saksnummer: ${
                                    fagsak.saksnummer
                                }, person ident: ${fagsak.personIdent.id}`}</a>
                            );
                        })
                    ) : (
                        <AlertStripe children={'Fant ingen saker'} type={'info'} />
                    )}
                </div>
            );
        default:
            return <React.Fragment />;
    }
};

export default Fagsaker;
