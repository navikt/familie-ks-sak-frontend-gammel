import * as classNames from 'classnames';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
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
            <a className={'dekoratør__tittel'}>
                <Systemtittel className={'dekoratør__tittel--tekst'} children={tittel} />
                <div className={'dekoratør__skille'} />
            </a>
            <div className={'dekoratør__innloggetsaksbehandler'}>
                {innloggetSaksbehandler && innloggetSaksbehandler.displayName}
                <div className={'dekoratør__skille'} />
                <a
                    className={classNames('dekoratør__innloggetsaksbehandler--lenke')}
                    onClick={onClick}
                    children={'Logg ut'}
                />
            </div>
        </div>
    );
};

export default Dekoratør;
