import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBehandling, VilkårType } from '../../../typer/fagsak';
import { IPersonAdresse, IPersonRelasjon } from '../../../typer/person';
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

const AnnenPartsVilkår: React.StatelessComponent<IProps> = ({ behandling }) => {
    const [adressehistorikkModalÅpen, settAdressehistorikkModalÅpen] = React.useState(false);

    const annenPartsAdresse: IPersonAdresse =
        behandling.personopplysninger.annenPart.personhistorikk.adresser[0];

    const søkerFødselsnummer = behandling.personopplysninger.søker.fødselsnummer;
    const borMedSøker =
        behandling.personopplysninger.annenPart.relasjoner.find(
            (relasjon: IPersonRelasjon) =>
                relasjon.tilFødselsnummer === søkerFødselsnummer && relasjon.harSammeBosted
        ) !== undefined;

    return (
        <div className={'vilkårperson'}>
            <AdressehistorikkModal
                person={behandling.personopplysninger.annenPart}
                settÅpen={settAdressehistorikkModalÅpen}
                åpen={adressehistorikkModalÅpen}
            />

            <PersonNavnOgIkon
                person={behandling.personopplysninger.annenPart}
                type={'annen forelder'}
            />

            <VilkårBolk>
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={behandling.personopplysninger.annenPart.fødselsnummer}
                    navn={'Fødsel- og personnummer'}
                />

                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfoKomponent={() => {
                        return (
                            <React.Fragment>
                                <Element children={`Bor ${!borMedSøker ? 'ikke' : ''} med søker`} />
                                <Element children={annenPartsAdresse.adresselinje1} />
                                <Element
                                    children={`${annenPartsAdresse.postnummer} ${annenPartsAdresse.poststed}`}
                                />
                            </React.Fragment>
                        );
                    }}
                    navn={'Bosted'}
                    oppfylt={hentVilkår(behandling.behandlingsresultat, VilkårType.BOSTED)}
                />
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={behandling.personopplysninger.søker.statsborgerskap}
                    navn={'Statsborgerskap'}
                />

                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={hentOppholdINorge(behandling.søknad) ? 'Ja' : 'Nei'}
                    navn={'Opphold i Norge i de neste 12 mnd'}
                    oppfylt={hentOppholdINorge(behandling.søknad)}
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

export default AnnenPartsVilkår;
