import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBehandling } from '../../../typer/fagsak';
import { IPersonAdresse } from '../../../typer/person';
import { datakilder } from '../../../typer/vilkår';
import { hentBosattINorgeVilkår, hentOppholdINorge } from '../../../utils/vilkårHenting';
import PersonNavnOgIkon from '../../Felleskomponenter/PersonNavnOgIkon/PersonNavnOgIkon';
import Vilkår from '../../Felleskomponenter/Vilkår/Vilkår';
import VilkårBolk from '../../Felleskomponenter/VilkårBolk/VilkårBolk';

interface IProps {
    behandling: IBehandling;
}

const AnnenPartsVilkår: React.StatelessComponent<IProps> = ({ behandling }) => {
    const annenPartsAdresse: IPersonAdresse =
        behandling.personopplysninger.annenPart.personhistorikk.adresser[0];

    return (
        <div className={'vilkårperson'}>
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
                                <Element children={'Bor med søker'} />
                                <Element children={annenPartsAdresse.adresselinje1} />
                                <Element
                                    children={`${annenPartsAdresse.postnummer} ${annenPartsAdresse.poststed}`}
                                />
                            </React.Fragment>
                        );
                    }}
                    navn={'Bosted'}
                />
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={behandling.personopplysninger.søker.statsborgerskap}
                    navn={'Statsborgerskap'}
                />

                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={'Ja'}
                    navn={'Opphold i Norge i de neste 12 mnd'}
                    oppfylt={hentOppholdINorge(behandling.søknad)}
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

export default AnnenPartsVilkår;
