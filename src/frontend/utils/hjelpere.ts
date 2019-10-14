import * as moment from 'moment';

export const hentAlderFraFnr = (fnr: string): number => {
    const århundre = parseInt(fnr.slice(6, 7), 0);
    const fødselsdato = `${fnr.slice(0, 4)}${århundre >= 5 ? '20' : '19'}${fnr.slice(4, 6)}`;
    return moment().diff(moment(fødselsdato, 'DDMMYYYY'), 'years');
};
