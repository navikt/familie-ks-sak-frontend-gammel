import { Panel } from 'nav-frontend-paneler';
import * as React from 'react';
import { IBehandling } from '../../../typer/fagsak';
import AnnenPartsVilkår from './AnnenPartsVilkår';
import BarnVilkår from './BarnVilkår';
import SøkersVilkår from './SøkersVilkår';

interface IProps {
    behandling: IBehandling;
}

const VilkårContainer: React.StatelessComponent<IProps> = ({ behandling }) => {
    return (
        <Panel className={'vilkårcontainer'} border={true}>
            <div className={'vilkårcontainer__split'}>
                <SøkersVilkår behandling={behandling} />
                <div className={'vilkårcontainer__split--skille'} />
                <BarnVilkår behandling={behandling} />
            </div>

            <hr />
            {behandling.personopplysninger.annenPart && (
                <AnnenPartsVilkår behandling={behandling} />
            )}
        </Panel>
    );
};

export default VilkårContainer;
