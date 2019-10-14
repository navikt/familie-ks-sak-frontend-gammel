import { Element } from 'nav-frontend-typografi';
import * as React from 'react';

interface IProps {
    tittel?: string;
}

const VilkårBolk: React.StatelessComponent<IProps> = ({ tittel, children }) => {
    return (
        <div className={'vilkårbolk'}>
            {tittel && <Element children={tittel} />}
            <table>{children}</table>
        </div>
    );
};

export default VilkårBolk;
