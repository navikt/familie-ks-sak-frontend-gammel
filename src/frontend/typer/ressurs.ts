export enum RessursStatus {
    SUKSESS = 'SUKSESS',
    FEILET = 'FEILET',
    IKKE_HENTET = 'IKKE_HENTET',
    HENTER = 'HENTER',
}

export type Ressurs<T> =
    | {
          status: RessursStatus.IKKE_HENTET;
      }
    | {
          status: RessursStatus.HENTER;
      }
    | {
          data: T;
          status: RessursStatus.SUKSESS;
      }
    | {
          errorMelding?: string;
          melding: string;
          status: RessursStatus.FEILET;
      };

export const byggTomRessurs = <T>(): Ressurs<T> => {
    return {
        status: RessursStatus.IKKE_HENTET,
    };
};

export const byggFeiletRessurs = <T>(melding: string, error?: Error): Ressurs<T> => {
    return {
        errorMelding: error ? error.message : undefined,
        melding,
        status: RessursStatus.FEILET,
    };
};
