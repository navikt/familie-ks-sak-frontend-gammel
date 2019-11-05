import * as React from 'react';
import { IBehandling, VilkårType } from '../../../typer/fagsak';
import { barnehageplassStatusTekster } from '../../../typer/søknad';
import { datakilder } from '../../../typer/vilkår';
import { hentAlderFraFnr } from '../../../utils/hjelpere';
import { hentOppholdINorge, hentVilkår, oppholdINorgeTilTekst } from '../../../utils/vilkårHenting';
import PersonNavnOgIkon from '../../Felleskomponenter/PersonNavnOgIkon/PersonNavnOgIkon';
import Vilkår from '../../Felleskomponenter/Vilkår/Vilkår';
import VilkårBolk from '../../Felleskomponenter/VilkårBolk/VilkårBolk';

interface IProps {
    behandling: IBehandling;
}

const BarnVilkår: React.StatelessComponent<IProps> = ({ behandling }) => {
    const barn = behandling.personopplysninger.barna[0];
    const barnFraSøknad =
        behandling.søknad.familieforhold.barna.length === 1
            ? behandling.søknad.familieforhold.barna[0]
            : behandling.søknad.familieforhold.barna.find(
                  findBarn => findBarn.fødselsnummer === barn.personIdent
              );
    const borMedSøker = hentVilkår(
        behandling.behandlingsresultat,
        VilkårType.BARN_BOR_MED_FORELDRE
    );

    return (
        <div className={'vilkårperson'}>
            <PersonNavnOgIkon person={barn} type={'barn'} />

            <VilkårBolk>
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={`${hentAlderFraFnr(barn.personIdent, 'months')} mnd (${
                        barn.fødselsdato
                    })`}
                    navn={'Alder'}
                    oppfylt={hentVilkår(
                        behandling.behandlingsresultat,
                        VilkårType.BARN_MELLOM_10_OG_14_MÅNEDER
                    )}
                />
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={`Bor ${borMedSøker ? '' : 'ikke'} med søker`}
                    navn={'Bosted'}
                    oppfylt={borMedSøker}
                />
                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={oppholdINorgeTilTekst(behandling.søknad)}
                    navn={'Opphold i Norge i de neste 12 mnd'}
                    oppfylt={hentOppholdINorge(behandling.søknad)}
                />
                <Vilkår
                    datakilde={datakilder.FOLKEREGISTERET}
                    kortInfo={barn.statsborgerskap}
                    navn={'Statsborgerskap'}
                />
                <Vilkår
                    datakilde={datakilder.SØKNAD}
                    kortInfo={
                        barnFraSøknad
                            ? barnehageplassStatusTekster[barnFraSøknad.barnehageStatus]
                            : 'Ukjent barnehagestatus'
                    }
                    navn={'Barnehage'}
                    oppfylt={hentVilkår(behandling.behandlingsresultat, VilkårType.BARNEHAGE)}
                />
            </VilkårBolk>
        </div>
    );
};

export default BarnVilkår;
