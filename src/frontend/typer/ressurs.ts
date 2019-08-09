export enum RessursStatus {
    'UNFETCHED' = 'UNFETCHED',
    'IN_PROGRESS' = 'IN_PROGRESS',
    'SUCCESS' = 'SUCCESS',
    'FAILURE' = 'FAILURE',
}

export type Ressurs<T> =
    | {
          status: RessursStatus.UNFETCHED;
      }
    | {
          status: RessursStatus.IN_PROGRESS;
      }
    | {
          data: T;
          status: RessursStatus.SUCCESS;
      }
    | {
          melding: string;
          status: RessursStatus.FAILURE;
      };

export const byggTomData = <T>(): Ressurs<T> => {
    return {
        status: RessursStatus.UNFETCHED,
    };
};

export const byggFeiletRessurs = <T>(melding: string): Ressurs<T> => {
    return {
        melding,
        status: RessursStatus.FAILURE,
    };
};
