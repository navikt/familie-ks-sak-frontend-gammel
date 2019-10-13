import * as React from 'react';
import { IBehandling } from '../../../typer/fagsak';
import { datakilder } from '../../../typer/vilkår';
import { hentBosattINorgeVilkår, hentOppholdINorge } from '../../../utils/vilkårHenting';
import PersonNavnOgIkon from '../../Felleskomponenter/PersonNavnOgIkon/PersonNavnOgIkon';
import Vilkår from '../../Felleskomponenter/Vilkår/Vilkår';
import VilkårBolk from '../../Felleskomponenter/VilkårBolk/VilkårBolk';

interface IProps {
    behandling: IBehandling;
}

const SøkersVilkår: React.StatelessComponent<IProps> = ({ behandling }) => {
    return (
        <div className={'vilkårperson'}>
            <PersonNavnOgIkon person={behandling.personopplysninger.søker} type={'søker'} />

            <VilkårBolk>
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
            </VilkårBolk>

            <br />
            <VilkårBolk tittel={'Medlemskap i Folketrygden'}>
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={'Botid i Norge'}
                    navn={'5 år'}
                    oppfylt={hentBosattINorgeVilkår(behandling.behandlingsresultat)}
                />
                <Vilkår
                    datakilde={datakilder.MEDLEMSSKAPSREGISTERET}
                    kortInfo={'Nei'}
                    navn={'Funn i Medlemsskapsregisteret'}
                />
            </VilkårBolk>
        </div>
    );
};

export default SøkersVilkår;
