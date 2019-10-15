import { IFagsak } from '../typer/fagsak';
import { Ressurs } from '../typer/ressurs';
import { ISaksbehandler } from '../typer/saksbehandler';
import { axiosRequest } from './axios';

export const hentFagsak = (
    id: string,
    innloggetSaksbehandler?: ISaksbehandler
): Promise<Ressurs<IFagsak>> => {
    axiosRequest({ method: 'GET', url: '/familie-ks-sak/api/fagsak' });

    return axiosRequest<IFagsak>(
        {
            method: 'GET',
            url: `/familie-ks-sak/api/fagsak/${id}`,
        },
        innloggetSaksbehandler
    );
};
