import { IPerson } from './person';
import { ISøknad } from './søknad';

// Enum
export enum VilkårType {
    BARN,
    BARNEHAGE,
    BARN_MELLOM_10_OG_14_MÅNEDER,
    BOSTED,
    KUN_ET_BARN,
    MEDLEMSKAP,
    UTLAND,
}

export enum UtfallType {
    IKKE_OPPFYLT,
    IKKE_VURDERT,
    MANUELL_BEHANDLING,
    OPPFYLT,
    UAVKLART,
}

// Interface
export interface IFagsak {
    behandlinger: IBehandling[];
    id: number;
    opprettetTidspunkt: string;
    saksnummer: string;
    søkerFødselsnummer: string;
}

export interface IBehandling {
    behandlingId: number;
    behandlingsresultat: IBehandlingsresultat;
    personopplysninger: IPersonopplysninger;
    søknad: ISøknad;
}

export interface IBehandlingsresultat {
    aktiv: boolean;
    vilkårsResultat: IVilkårsResultat[];
}

export interface IVilkårsResultat {
    vilkårType: VilkårType;
    utfall: UtfallType;
}

export interface IPersonopplysninger {
    annenPart: IPerson;
    barna: IPerson[];
    søker: IPerson;
}
