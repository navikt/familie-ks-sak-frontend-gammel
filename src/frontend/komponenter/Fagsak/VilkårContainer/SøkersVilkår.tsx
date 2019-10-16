import * as React from 'react';
import { IBehandling, VilkårType } from '../../../typer/fagsak';
import { datakilder } from '../../../typer/vilkår';
import {
    hentMedlResultatTekst,
    hentOppholdINorge,
    hentTilknytningTilUtlandTekst,
    hentVilkår,
} from '../../../utils/vilkårHenting';
import PersonNavnOgIkon from '../../Felleskomponenter/PersonNavnOgIkon/PersonNavnOgIkon';
import Vilkår from '../../Felleskomponenter/Vilkår/Vilkår';
import VilkårBolk from '../../Felleskomponenter/VilkårBolk/VilkårBolk';
import AdressehistorikkModal from '../AdressehistorikkModal/AdressehistorikkModal';

interface IProps {
    behandling: IBehandling;
}

const SøkersVilkår: React.StatelessComponent<IProps> = ({ behandling }) => {
    const [adressehistorikkModalÅpen, settAdressehistorikkModalÅpen] = React.useState(false);

    return (
        <div className={'vilkårperson'}>
            <AdressehistorikkModal
                person={behandling.personopplysninger.søker}
                settÅpen={settAdressehistorikkModalÅpen}
                åpen={adressehistorikkModalÅpen}
            />

            <PersonNavnOgIkon person={behandling.personopplysninger.søker} type={'søker'} />

            <VilkårBolk>
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={'Bosatt i Norge'}
                    navn={'Bosted'}
                    oppfylt={hentVilkår(behandling.behandlingsresultat, VilkårType.MEDLEMSKAP)}
                />
                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={'Ja'}
                    navn={'Opphold i Norge i de neste 12 mnd'}
                    oppfylt={hentOppholdINorge(behandling.søknad)}
                />
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={behandling.personopplysninger.søker.statsborgerskap}
                    navn={'Statsborgerskap'}
                />
                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={hentTilknytningTilUtlandTekst(behandling.behandlingsresultat)}
                    navn={'Arbeid eller ytelser fra utlandet'}
                    oppfylt={hentVilkår(behandling.behandlingsresultat, VilkårType.UTLAND)}
                />
            </VilkårBolk>

            <br />
            <VilkårBolk tittel={'Medlemskap i Folketrygden'}>
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={'Botid i Norge'}
                    navn={'5 år'}
                    oppfylt={hentVilkår(behandling.behandlingsresultat, VilkårType.MEDLEMSKAP)}
                    settAdressehistorikkModal={settAdressehistorikkModalÅpen}
                />
                <Vilkår
                    datakilde={datakilder.MEDLEMSSKAPSREGISTERET}
                    kortInfo={hentMedlResultatTekst(behandling.behandlingsresultat)}
                    navn={'Funn i Medlemsskapsregisteret'}
                    oppfylt={hentVilkår(behandling.behandlingsresultat, VilkårType.MEDLEMSKAP)}
                />
            </VilkårBolk>
        </div>
    );
};

export default SøkersVilkår;
