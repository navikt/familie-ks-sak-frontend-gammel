// Enum
export enum AdresseType {
    BOSTEDSADRESSE,
    MIDLERTIDIG_POSTADRESSE_NORGE,
    MIDLERTIDIG_POSTADRESSE_UTLAND,
    POSTADRESSE,
    POSTADRESSE_UTLAND,
    UKJENT_ADRESSE,
}

export enum RelasjonsRolleType {
    BARN,
    EKTE,
    FARA,
    MMOR,
    MORA,
    REPA,
    SAMB,
}

// Interface
export interface IPerson {
    fødselsdato: string;
    fødselsnummer: string;
    kjønn: string;
    navn: string;
    personhistorikk: IPersonhistorikk;
    relasjoner: IPersonRelasjon[];
    statsborgerskap: string;
}

export interface IPersonhistorikk {
    adresser: IPersonAdresse[];
    statsborgerskap: IPersonStatsborgerskap[];
}

export interface IPersonAdresse {
    adresseType: AdresseType;
    adresselinje1: string;
    adresselinje2?: string;
    adresselinje3?: string;
    adresselinje4?: string;
    land: string;
    periode: IPeriode;
    postnummer?: string;
    poststed?: string;
}

export interface IPersonStatsborgerskap {
    periode: IPeriode;
    statsborgerskap: string;
}

export interface IPersonRelasjon {
    fraFødselsnummer: string;
    harSammeBosted: boolean;
    relasjonsrolle: RelasjonsRolleType;
    tilFødselsnummer: string;
}

export interface IPeriode {
    fomDato: string;
    tomDato: string;
}