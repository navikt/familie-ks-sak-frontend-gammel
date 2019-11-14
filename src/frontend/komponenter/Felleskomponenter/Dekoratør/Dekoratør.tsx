import * as classNames from 'classnames';
import Knapp from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { ISaksbehandler } from '../../../typer/saksbehandler';
import Tilbakemeldingsmodal from '../Tilbakemeldingsmodal/Tilbakemeldingsmodal';

interface IProps {
    innloggetSaksbehandler?: ISaksbehandler;
    onClick: () => void;
    tittel: string;
}

const Dekoratør: React.FunctionComponent<IProps> = ({
    innloggetSaksbehandler,
    onClick,
    tittel,
}) => {
    const [tilbakemeldingsmodalÅpen, settTilbakemeldingsModalÅpen] = React.useState(false);

    return (
        <div className={'dekoratør'}>
            <Tilbakemeldingsmodal
                settÅpen={settTilbakemeldingsModalÅpen}
                åpen={tilbakemeldingsmodalÅpen}
            />

            <div className={'dekoratør__tittel'}>
                <Systemtittel className={'dekoratør__tittel--tekst'} tag={'h1'} children={tittel} />
                <div className={'dekoratør__skille'} />
            </div>
            <div className={'dekoratør__innloggetsaksbehandler'}>
                {innloggetSaksbehandler && innloggetSaksbehandler.displayName}
                <Knapp mini={false} onClick={() => settTilbakemeldingsModalÅpen(true)}>
                    Tilbakemelding
                </Knapp>

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
