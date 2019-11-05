import * as React from 'react';
import { IBehandling, VilkårType } from '../../../typer/fagsak';
import { datakilder } from '../../../typer/vilkår';
import { hentSammenlagtBotid } from '../../../utils/hjelpere';
import {
    hentBosattINorgeTekst,
    hentMedlResultatTekst,
    hentOppholdINorge,
    hentTilknytningTilUtlandTekst,
    hentVilkår, oppholdINorgeTilTekst,
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
                    kortInfo={hentBosattINorgeTekst(behandling.behandlingsresultat)}
                    navn={'Bosted'}
                    oppfylt={hentVilkår(
                        behandling.behandlingsresultat,
                        VilkårType.MEDLEMSKAP_BOSTED_NÅ
                    )}
                />
                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={oppholdINorgeTilTekst(behandling.søknad)}
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
                    oppfylt={hentVilkår(
                        behandling.behandlingsresultat,
                        VilkårType.OPPGITT_TILKNYTNING_TIL_UTLAND
                    )}
                />
            </VilkårBolk>

            <br />
            <VilkårBolk tittel={'Medlemskap i Folketrygden'}>
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={hentSammenlagtBotid(behandling.personopplysninger.søker.personhistorikk.adresser)}
                    navn={'Botid i Norge'}
                    oppfylt={hentVilkår(
                        behandling.behandlingsresultat,
                        VilkårType.MEDLEMSKAP_BOSTED
                    )}
                    settAdressehistorikkModal={settAdressehistorikkModalÅpen}
                />
                <Vilkår
                    datakilde={datakilder.MEDLEMSSKAPSREGISTERET}
                    kortInfo={hentMedlResultatTekst(behandling.behandlingsresultat)}
                    navn={'Funn i Medlemsskapsregisteret'}
                    oppfylt={hentVilkår(behandling.behandlingsresultat, VilkårType.MEDLEMSKAP_MEDL)}
                />
            </VilkårBolk>
        </div>
    );
};

export default SøkersVilkår;
