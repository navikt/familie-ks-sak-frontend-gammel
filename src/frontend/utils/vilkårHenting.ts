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
