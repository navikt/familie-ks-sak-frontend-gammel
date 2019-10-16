import * as moment from 'moment';
import { IPeriode, IPersonAdresse } from '../typer/person';
moment.locale('nb');

/* tslint:disable */
const namecase = require('namecase');
/* tslint:enable */

const TIDENES_BEGYNNELSE = moment('01.01.-4712', 'DD.MM.YYYY');
const TIDENES_ENDE = moment('31.12.9999', 'DD.MM.YYYY');

export const hentAlderFraFnr = (fnr: string, tidsenhet?: moment.unitOfTime.Diff): number => {
    const århundre = parseInt(fnr.slice(6, 7), 0);
    const fødselsdato = `${fnr.slice(0, 4)}${århundre >= 5 ? '20' : '19'}${fnr.slice(4, 6)}`;
    return moment().diff(moment(fødselsdato, 'DDMMYYYY'), tidsenhet ? tidsenhet : 'years');
};

export const formaterNavn = (navn: string): string => {
    return namecase(navn);
};

export const formaterDato = (isoString: string): string => {
    const dato = moment(isoString);
    if (dato.isSame(TIDENES_ENDE)) {
        return 'd.d';
    } else {
        return dato.format('DD.MM.YYYY');
    }
};

export const hentDurationFraPeriode = (periode: IPeriode) => {
    let tomDato = moment(periode.tomDato);
    if (tomDato.isSame(TIDENES_ENDE)) {
        tomDato = moment();
    }
    return moment.duration(tomDato.diff(moment(periode.fomDato)));
};

export const hentBotid = (periode: IPeriode) => {
    const botid = hentDurationFraPeriode(periode);
    return botid.humanize();
};

export const hentSammenlagtBotid = (adressehistorikk: IPersonAdresse[]) => {
    return adressehistorikk
        .reduce((acc: moment.Duration, adresse: IPersonAdresse) => {
            return acc.add(hentDurationFraPeriode(adresse.periode));
        }, moment.duration())
        .humanize();
};
