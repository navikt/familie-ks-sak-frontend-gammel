import { IBehandlingsresultat, UtfallType, VilkårType } from '../typer/fagsak';
import { ISøknad } from '../typer/søknad';

export const hentVilkår = (behandlingsresultat: IBehandlingsresultat, vilkårType: VilkårType) => {
    const vilkårsresultat = behandlingsresultat.vilkårsResultat.find(
        vilkårresultat => vilkårresultat.vilkårType === vilkårType
    );
    return vilkårsresultat ? vilkårsresultat.utfall === UtfallType.OPPFYLT : false;
};

// Fra søknad
export const hentOppholdINorge = (søknad: ISøknad) => {
    return søknad.erklæring.barnINorgeNeste12Måneder;
};

// Vilkår til tekst
export const hentMedlResultatTekst = (behandlingsresultat: IBehandlingsresultat) => {
    const vilkårsresultat = hentVilkår(behandlingsresultat, VilkårType.MEDLEMSKAP);
    return vilkårsresultat ? 'Nei' : 'Ja';
};

export const hentTilknytningTilUtlandTekst = (behandlingsresultat: IBehandlingsresultat) => {
    const vilkårsresultat = hentVilkår(behandlingsresultat, VilkårType.UTLAND);
    return vilkårsresultat ? 'Nei' : 'Ja';
};
