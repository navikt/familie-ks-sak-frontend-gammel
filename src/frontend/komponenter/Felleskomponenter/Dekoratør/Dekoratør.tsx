import { AxiosError } from 'axios';
import * as classNames from 'classnames';
import KnappBase from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { axiosRequest } from '../../../api/axios';
import { Ressurs } from '../../../typer/ressurs';
import { ISaksbehandler } from '../../../typer/saksbehandler';

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
    return (
        <div className={'dekoratør'}>
            <div className={'dekoratør__tittel'}>
                <Systemtittel className={'dekoratør__tittel--tekst'} children={tittel} />
                <div className={'dekoratør__skille'} />
            </div>
            <div className={'dekoratør__innloggetsaksbehandler'}>
                {innloggetSaksbehandler && innloggetSaksbehandler.displayName}
                <div className={'dekoratør__skille'} />
                <button
                    className={classNames('dekoratør__innloggetsaksbehandler--lenke')}
                    onClick={onClick}
                    children={'Logg ut'}
                />
            </div>
        </div>
    );
};

export default Dekoratør;
