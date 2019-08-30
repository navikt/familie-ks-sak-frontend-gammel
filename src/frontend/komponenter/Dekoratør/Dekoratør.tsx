import { AxiosError } from 'axios';
import * as classNames from 'classnames';
import KnappBase from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { axiosRequest } from '../../api/axios';
import { Ressurs } from '../../typer/ressurs';
import { ISaksbehandler } from '../../typer/saksbehandler';

interface IProps {
    innloggetSaksbehandler?: ISaksbehandler;
    onClick: () => void;
    tittel: string;
}

const Dekoratør: React.StatelessComponent<IProps> = ({
    innloggetSaksbehandler,
    onClick,
    tittel,
}) => {
    const sentryTest = () => {
        axiosRequest(
            {
                method: 'GET',
                url: '/familie-ks-sak/api/sentryFail',
            },
            innloggetSaksbehandler
        )
            .then((data: Ressurs<any>) => console.log('data: ', data))
            .catch((error: AxiosError) => console.log('error: ', error));
    };

    return (
        <div className={'dekoratør'}>
            <a className={'dekoratør__tittel'}>
                <Systemtittel className={'dekoratør__tittel--tekst'} children={tittel} />
                <div className={'dekoratør__skille'} />
            </a>
            <KnappBase onClick={sentryTest}>Sentry test</KnappBase>
            <div className={'dekoratør__innloggetsaksbehandler'}>
                {innloggetSaksbehandler && innloggetSaksbehandler.displayName}
                <div className={'dekoratør__skille'} />
                <a
                    className={classNames('lenke', 'dekoratør__innloggetsaksbehandler--lenke')}
                    onClick={onClick}
                    children={'Logg ut'}
                />
            </div>
        </div>
    );
};

export default Dekoratør;
