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
                <React.Fragment>
                    {fagsaker.data.length > 0 ? (
                        fagsaker.data.map((fagsak: any) => {
                            return (
                                <div key={fagsak.id}>{`${fagsak.id}: ${fagsak.personIdent}`}</div>
                            );
                        })
                    ) : (
                        <AlertStripe children={'Fant ingen saker'} type={'info'} />
                    )}
                </React.Fragment>
            );
        default:
            return <React.Fragment />;
    }
};

export default Fagsaker;
