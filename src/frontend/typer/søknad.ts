// Enum
export enum BarnehageplassStatus {
    HAR,
    HAR_IKKE,
    HAR_SLUTTET,
    SKAL_BEGYNNE,
    SKAL_SLUTTE,
}

export enum Standpunkt {
    JA,
    NEI,
    UBESVART,
}

export enum TilknytningTilUtlandVerdier {
    Ubesvart,
    jaIEOS,
    jaINorge,
    jaLeggerSammenPerioderEOS,
    nei,
}

export interface ISøknad {
    erklæring: IOppgittErklæring;
    familieforhold: IOppgittFamilieforhold;
    innsendtTidspunkt: string;
    utlandsTilknytning: IOppgittUtlandsTilknytning;
}

export interface IOppgittErklæring {
    barnINorgeNeste12Måneder: boolean;
    barnetHjemmeværendeOgIkkeAdoptert: boolean;
    borSammenMedBarnet: boolean;
    ikkeAvtaltDeltBosted: boolean;
}

export interface IOppgittFamilieforhold {
    barna: ISøknadBarn[];
    borBeggeForeldreSammen: boolean;
}

export interface ISøknadBarn {
    barnehageAntallTimer?: number;
    barnehageDato?: string;
    barnehageKommune?: string;
    barnehageStatus: BarnehageplassStatus;
    fødselsnummer: string;
}

export interface IOppgittUtlandsTilknytning {
    aktørerArbeidYtelseIUtlandet: IAktørArbeidYtelseUtland[];
    aktørerTilknytningTilUtlandet: IAktørTilknytningUtland[];
}

export interface IAktørArbeidYtelseUtland {
    arbeidIUtlandet: Standpunkt;
    arbeidIUtlandetForklaring: string;
    fødselsnummer: string;
    kontantstøtteIUtlandet: Standpunkt;
    kontantstøtteIUtlandetForklaring?: string;
    ytelseIUtlandet: Standpunkt;
    ytelseIUtlandetForklaring: string;
}

export interface IAktørTilknytningUtland {
    fødselsnummer: string;
    tilknytningTilUtland: TilknytningTilUtlandVerdier;
    tilknytningTilUtlandForklaring: string;
}
