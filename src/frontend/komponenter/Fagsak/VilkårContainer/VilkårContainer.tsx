import { AlertStripeAdvarsel, AlertStripeSuksess } from 'nav-frontend-alertstriper';
import { Panel } from 'nav-frontend-paneler';
import * as React from 'react';
import { IBehandling, IVilkårsResultat, UtfallType } from '../../../typer/fagsak';
import AnnenPartsVilkår from './AnnenPartsVilkår';
import BarnVilkår from './BarnVilkår';
import SøkersVilkår from './SøkersVilkår';

interface IProps {
    behandling: IBehandling;
}

const VilkårContainer: React.StatelessComponent<IProps> = ({ behandling }) => {
    const samletResultatOppfylt =
        behandling.behandlingsresultat.vilkårsResultat.filter(
            (vilkårresultat: IVilkårsResultat) => vilkårresultat.utfall !== UtfallType.OPPFYLT
        ).length === 0;

    return (
        <Panel className={'vilkårcontainer'} border={true}>
            {samletResultatOppfylt ? (
                <AlertStripeSuksess
                    children={
                        'Vedtak er foreslått innvilget basert på informasjon funnet i Folkeregisteret, søknaden og medlemsregisteret (MEDL).'
                    }
                />
            ) : (
                <AlertStripeAdvarsel children={'Saken må behandles manuelt av saksbehandler.'} />
            )}
            <div className={'vilkårcontainer__innhold'}>
                <div className={'vilkårcontainer__innhold--split'}>
                    <SøkersVilkår behandling={behandling} />
                    <div className={'vilkårcontainer__innhold--split-skille'} />
                    <BarnVilkår behandling={behandling} />
                </div>

                <hr />
                {behandling.personopplysninger.annenPart && (
                    <AnnenPartsVilkår behandling={behandling} />
                )}
            </div>
        </Panel>
    );
};

export default VilkårContainer;
