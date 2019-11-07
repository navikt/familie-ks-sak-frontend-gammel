import { Element } from 'nav-frontend-typografi';
import * as React from 'react';

interface IProps {
    tittel?: string;
}

const VilkårBolk: React.StatelessComponent<IProps> = ({tittel, children}) => {
    return (
        <div className={'vilkårbolk'}>
            {tittel && <Element children={tittel}/>}
            <table>
                <thead>
                    <tr>
                        <th>Vilkår/Fakta</th>
                        <th>Informasjon om bruker</th>
                        <th>Resultat</th>
                        <th>Kilde</th>
                        <th>Adressehistorikk</th>
                    </tr>
                </thead>
                {children}
            </table>
        </div>
    );
};

export default VilkårBolk;
