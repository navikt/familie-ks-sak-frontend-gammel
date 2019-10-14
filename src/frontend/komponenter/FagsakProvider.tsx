import { AxiosError } from 'axios';
import * as React from 'react';
import { hentFagsak } from '../api/fagsak';
import { IFagsak } from '../typer/fagsak';
import { byggFeiletRessurs, byggTomRessurs, Ressurs, RessursStatus } from '../typer/ressurs';

export enum actions {
    HENT_FAGSAK = 'HENT_FAGSAK',
    HENT_FAGSAK_FEILET = 'HENT_FAGSAK_FEILET',
    HENT_FAGSAK_SUKSESS = 'HENT_FAGSAK_SUKSESS',
    SETT_SAKSNUMMER = 'SETT_SAKSNUMMER',
}

interface IAction {
    payload?: any;
    type: actions;
}

type Dispatch = (action: IAction) => void;

interface IState {
    saksnummer?: string;
    fagsak: Ressurs<IFagsak>;
}

const FagsakStateContext = React.createContext<IState | undefined>(undefined);
const FagsakDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const fagsakReducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case actions.HENT_FAGSAK: {
            return {
                ...state,
                fagsak: {
                    status: RessursStatus.HENTER,
                },
            };
        }
        case actions.HENT_FAGSAK_SUKSESS: {
            return {
                ...state,
                fagsak: action.payload,
            };
        }
        case actions.HENT_FAGSAK_FEILET: {
            return {
                ...state,
                fagsak: action.payload,
            };
        }
        case actions.SETT_SAKSNUMMER: {
            return {
                ...state,
                saksnummer: action.payload,
            };
        }
        default: {
            throw new Error(`Uhåndtert action type: ${action.type}`);
        }
    }
};

const FagsakProvider: React.StatelessComponent = ({ children }) => {
    const [state, dispatch] = React.useReducer(fagsakReducer, {
        fagsak: byggTomRessurs<IFagsak>(),
        saksnummer: undefined,
    });

    React.useEffect(() => {
        if (state.saksnummer) {
            dispatch({ type: actions.HENT_FAGSAK });
            hentFagsak(state.saksnummer)
                .then((fagsak: Ressurs<IFagsak[]>) => {
                    dispatch({
                        payload: {
                            ...fagsak,
                            data:
                                fagsak.status === RessursStatus.SUKSESS
                                    ? fagsak.data[0]
                                    : undefined,
                        },
                        type: actions.HENT_FAGSAK_SUKSESS,
                    });
                })
                .catch((error: AxiosError) => {
                    dispatch({
                        payload: byggFeiletRessurs('Ukent feil ved innhenting av fagsak', error),
                        type: actions.HENT_FAGSAK_FEILET,
                    });
                });
        }
    }, [state.saksnummer]);

    return (
        <FagsakStateContext.Provider value={state}>
            <FagsakDispatchContext.Provider value={dispatch}>
                {children}
            </FagsakDispatchContext.Provider>
        </FagsakStateContext.Provider>
    );
};

const useFagsakContext = () => {
    const context = React.useContext(FagsakStateContext);
    if (context === undefined) {
        throw new Error('useFagsakContext må brukes inne i en FagsakContext');
    }
    return context;
};

const useFagsakDispatch = () => {
    const context = React.useContext(FagsakDispatchContext);
    if (context === undefined) {
        throw new Error('useFagsakDispatch må brukes inne i en FagsakContext');
    }
    return context;
};

export { FagsakProvider, useFagsakContext, useFagsakDispatch };
