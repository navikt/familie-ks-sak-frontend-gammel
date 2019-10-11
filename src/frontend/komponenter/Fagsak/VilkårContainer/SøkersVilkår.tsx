import * as React from 'react';
import { IBehandling } from '../../../typer/fagsak';
import { datakilder } from '../../../typer/vilkår';
import { hentBosattINorgeVilkår, hentOppholdINorge } from '../../../utils/vilkårHenting';
import PersonNavnOgIkon from '../../Felleskomponenter/PersonNavnOgIkon/PersonNavnOgIkon';
import Vilkår from '../../Felleskomponenter/Vilkår/Vilkår';

interface IProps {
    behandling: IBehandling;
}

const SøkersVilkår: React.StatelessComponent<IProps> = ({ behandling }) => {
    return (
        <div className={'vilkårperson'}>
            <PersonNavnOgIkon person={behandling.personopplysninger.søker} type={'søker'} />

            <div className={'vilkårperson__informasjon'}>
                <table className={'vilkårperson__informasjon_tabell'}>
                    <Vilkår
                        datakilde={datakilder.FOLKEREGISTERET}
                        kortInfo={'Bosatt i Norge'}
                        navn={'Bosted'}
                        oppfylt={hentBosattINorgeVilkår(behandling.behandlingsresultat)}
                    />
                    <Vilkår
                        datakilde={datakilder.SØKNAD}
                        kortInfo={'Ja'}
                        navn={'Opphold i Norge i de neste 12 mnd'}
                        oppfylt={hentOppholdINorge(behandling.søknad)}
                    />
                    <Vilkår
                        datakilde={datakilder.FOLKEREGISTERET}
                        kortInfo={'Norsk'}
                        navn={'Statsborgerskap'}
                    />
                    <Vilkår
                        datakilde={datakilder.SØKNAD}
                        kortInfo={'Nei'}
                        navn={'Arbeid eller ytelser fra utlandet'}
                    />
                </table>
            </div>
        </div>
    );
};

export default SøkersVilkår;
