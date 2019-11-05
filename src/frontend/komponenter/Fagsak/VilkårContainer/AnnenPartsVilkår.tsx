import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBehandling, VilkårType } from '../../../typer/fagsak';
import { IPersonAdresse, IPersonRelasjon } from '../../../typer/person';
import { datakilder } from '../../../typer/vilkår';
import { hentSammenlagtBotid } from '../../../utils/hjelpere';
import {
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

const AnnenPartsVilkår: React.StatelessComponent<IProps> = ({ behandling }) => {
    const [adressehistorikkModalÅpen, settAdressehistorikkModalÅpen] = React.useState(false);

    const annenPartsBostedsadresse: IPersonAdresse | undefined =
        behandling.personopplysninger.annenPart.bostedsadresse;

    const barnetsFødselsnummer = behandling.personopplysninger.barna[0].personIdent;
    const borMedBarn =
        behandling.personopplysninger.annenPart.relasjoner.find(
            (relasjon: IPersonRelasjon) =>
                relasjon.tilPersonIdent === barnetsFødselsnummer && relasjon.harSammeBosted
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
                    kortInfo={behandling.personopplysninger.annenPart.personIdent}
                    navn={'Fødsel- og personnummer'}
                />

                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfoKomponent={() => {
                        return (
                            <React.Fragment>
                                <Element children={`Bor ${!borMedBarn ? 'ikke' : ''} med barn`} />
                                {annenPartsBostedsadresse &&
                                annenPartsBostedsadresse.adresselinje1 ? (
                                    <React.Fragment>
                                        <Element
                                            children={`${annenPartsBostedsadresse.adresselinje1}`}
                                        />
                                        <Element
                                            children={`${annenPartsBostedsadresse.postnummer} ${annenPartsBostedsadresse.poststed}`}
                                        />
                                    </React.Fragment>
                                ) : (
                                    <Element children={'Ukjent bostedsadresse'} />
                                )}
                            </React.Fragment>
                        );
                    }}
                    navn={'Bosted'}
                />
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={behandling.personopplysninger.annenPart.statsborgerskap}
                    navn={'Statsborgerskap'}
                />

                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={oppholdINorgeTilTekst(behandling.søknad)}
                    navn={'Opphold i Norge i de neste 12 mnd'}
                    oppfylt={hentOppholdINorge(behandling.søknad)}
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
                    kortInfo={hentSammenlagtBotid(behandling.personopplysninger.annenPart.personhistorikk.adresser)}
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

export default AnnenPartsVilkår;
