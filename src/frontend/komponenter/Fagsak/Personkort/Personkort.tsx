import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import FamilieIkonVelger from '../../../ikoner/Familie/FamilieIkonVelger';
import { IPerson, IPersonAdresse } from '../../../typer/person';

interface IProps {
    person: IPerson;
}

const Personkort: React.StatelessComponent<IProps> = ({ person }) => {
    const adresse: IPersonAdresse = person.personhistorikk.adresser[0];
    return (
        <div className={'personkort'}>
            <FamilieIkonVelger kjønn={person.kjønn} fødselsnummer={person.fødselsnummer} />
            <Element className={'personkort__navn'} children={person.navn} />

            <div className={'vr'} />
            <Normaltekst children={`Fnr: ${person.fødselsnummer}`} />
            <div className={'vr'} />
            <Normaltekst
                children={`Adresse: ${adresse.adresselinje1}, ${adresse.postnummer} ${adresse.poststed}`}
            />
        </div>
    );
};

export default Personkort;
