import { IBehandlingsresultat, UtfallType, VilkårType } from '../typer/fagsak';
import { ISøknad } from '../typer/søknad';

export const hentBosattINorgeVilkår = (behandlingsresultat: IBehandlingsresultat): boolean => {
    const vilkårsresultat = behandlingsresultat.vilkårsResultat.find(
        vilkårresultat => vilkårresultat.vilkårType === VilkårType.MEDLEMSKAP
    );
    return vilkårsresultat ? vilkårsresultat.utfall === UtfallType.OPPFYLT : false;
};

export const hentOppholdINorge = (søknad: ISøknad) => {
    return søknad.erklæring.barnINorgeNeste12Måneder;
};

export const hentStatsborgerskapForForeldre = (behandlingsresultat: IBehandlingsresultat) => {
    const vilkårsresultat = behandlingsresultat.vilkårsResultat.find(
        vilkårresultat => vilkårresultat.vilkårType === VilkårType.MEDLEMSKAP
    );
    return vilkårsresultat ? vilkårsresultat.utfall === UtfallType.OPPFYLT : false;
};

export const hentBarnehageVilkår = (behandlingsresultat: IBehandlingsresultat) => {
    const vilkårsresultat = behandlingsresultat.vilkårsResultat.find(
        vilkårresultat => vilkårresultat.vilkårType === VilkårType.BARNEHAGE
    );
    return vilkårsresultat ? vilkårsresultat.utfall === UtfallType.OPPFYLT : false;
};

export const hentAlderPåBarnVilkår = (behandlingsresultat: IBehandlingsresultat) => {
    const vilkårsresultat = behandlingsresultat.vilkårsResultat.find(
        vilkårresultat => vilkårresultat.vilkårType === VilkårType.BARN_MELLOM_10_OG_14_MÅNEDER
    );
    return vilkårsresultat ? vilkårsresultat.utfall === UtfallType.OPPFYLT : false;
};
