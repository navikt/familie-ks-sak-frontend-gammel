import { captureException, configureScope, withScope } from '@sentry/core';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Ressurs, RessursStatus } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';

axios.defaults.baseURL = window.location.origin;
export const preferredAxios = axios;

export const axiosRequest = async <T>(
    config: AxiosRequestConfig,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<T>> => {
    return preferredAxios
        .request(config)
        .then((response: AxiosResponse<Ressurs<T>>) => {
            const responsRessurs: Ressurs<T> = response.data;

            let typetRessurs: Ressurs<T> = {
                status: RessursStatus.UNFETCHED,
            };
            if (responsRessurs.status === RessursStatus.SUCCESS) {
                typetRessurs = {
                    data: responsRessurs.data,
                    status: RessursStatus.SUCCESS,
                };
            } else if (responsRessurs.status === RessursStatus.FAILURE) {
                typetRessurs = {
                    melding: responsRessurs.melding,
                    status: RessursStatus.FAILURE,
                };
            } else {
                typetRessurs = {
                    melding: 'Ukjent api feil',
                    status: RessursStatus.FAILURE,
                };
            }

            return typetRessurs;
        })
        .catch((error: AxiosError) => {
            if (process.env.NODE_ENV !== 'development') {
                configureScope(scope => {
                    scope.setUser({
                        username: innloggetSaksbehandler
                            ? innloggetSaksbehandler.displayName
                            : 'Ukjent bruker',
                    });
                });

                const response: AxiosResponse | undefined = error.response;
                if (response) {
                    withScope(scope => {
                        scope.setExtra('nav-call-id', response.headers['nav-call-id']);
                        scope.setExtra('status text', response.statusText);
                        scope.setExtra('status', response.status);

                        captureException(error);
                    });
                }
            }

            return {
                melding: 'test',
                status: RessursStatus.FAILURE,
            };
        });
};
