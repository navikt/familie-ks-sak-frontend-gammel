import { Panel } from 'nav-frontend-paneler';
import * as React from 'react';
import { IBehandling } from '../../../typer/fagsak';
import SøkersVilkår from './SøkersVilkår';

interface IProps {
    behandling: IBehandling;
}

const VilkårContainer: React.StatelessComponent<IProps> = ({ behandling }) => {
    return (
        <Panel className={'vilkårcontainer'} border={true}>
            <SøkersVilkår behandling={behandling} />
        </Panel>
    );
};

export default VilkårContainer;
