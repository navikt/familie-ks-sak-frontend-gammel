import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import Oppfylt from '../../../ikoner/Oppfylt';
import { datakilder } from '../../../typer/vilkår';

interface IProps {
    datakilde: datakilder;
    kortInfo?: string;
    kortInfoKomponent?: () => React.ReactNode;
    navn: string;
    oppfylt?: boolean;
}

const Vilkår: React.StatelessComponent<IProps> = ({
    datakilde,
    kortInfo,
    kortInfoKomponent,
    navn,
    oppfylt,
}) => {
    return (
        <tr className={'vilkår'}>
            <td className={'vilkår__navn'}>
                <Normaltekst children={navn} />
            </td>
            <td className={'vilkår__kortinfo'}>
                {kortInfoKomponent ? kortInfoKomponent() : <Element children={kortInfo} />}
            </td>
            <td className={'vilkår__ikon'}>
                {oppfylt !== undefined && <Oppfylt heigth={24} width={24} />}
            </td>
            <td className={'vilkår__datakilde'}>
                <Normaltekst children={datakilde} />
            </td>
        </tr>
    );
};

export default Vilkår;
