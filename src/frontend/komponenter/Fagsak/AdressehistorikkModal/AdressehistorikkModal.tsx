import Modal from 'nav-frontend-modal';
import 'nav-frontend-tabell-style';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IPerson, IPersonAdresse } from '../../../typer/person';
import {
    formaterDato,
    formaterNavn,
    hentBotid,
    hentSammenlagtBotid,
} from '../../../utils/hjelpere';

interface IProps {
    person: IPerson;
    settÅpen: (åpen: boolean) => void;
    åpen: boolean;
}

const AdressehistorikkModal: React.StatelessComponent<IProps> = ({ person, settÅpen, åpen }) => {
    return (
        <Modal
            contentClass={'adressehistorikkmodal'}
            isOpen={åpen}
            closeButton={true}
            onRequestClose={() => {
                settÅpen(!åpen);
            }}
            contentLabel="Adressehistorikk"
        >
            <Undertittel children={`Adressehistorikk for ${formaterNavn(person.navn)}`} />

            <Element
                className={'adressehistorikkmodal__sammenlagtbotid'}
                children={`Sammenlagt botid i Norge/trygdetid/medlemskap i folketrygden: ${hentSammenlagtBotid(
                    person.personhistorikk.adresser
                )}`}
            />

            <table className="tabell">
                <thead>
                    <tr>
                        <th>Adresse</th>
                        <th>Periode</th>
                        <th>Botid</th>
                    </tr>
                </thead>
                <tbody>
                    {person.personhistorikk.adresser.map(
                        (adresse: IPersonAdresse, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div>
                                            {adresse.adresselinje1 ? (
                                                <React.Fragment>
                                                    <Normaltekst children={adresse.adresselinje1} />
                                                    <Normaltekst
                                                        children={`${adresse.postnummer} ${adresse.poststed}`}
                                                    />
                                                    <Normaltekst children={adresse.land} />
                                                </React.Fragment>
                                            ) : (
                                                <Normaltekst children={'Ukjent adresse'} />
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <Normaltekst
                                            children={`${formaterDato(
                                                adresse.periode.fomDato
                                            )} - ${formaterDato(adresse.periode.tomDato)}`}
                                        />
                                    </td>
                                    <td>
                                        <Normaltekst children={hentBotid(adresse.periode)} />
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </Modal>
    );
};

export default AdressehistorikkModal;
