import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import FamilieIkonVelger from '../../../ikoner/Familie/FamilieIkonVelger';
import { IPerson, IPersonAdresse } from '../../../typer/person';
import { formaterNavn } from '../../../utils/hjelpere';

interface IProps {
    person: IPerson;
}

const Personkort: React.StatelessComponent<IProps> = ({ person }) => {
    const bostedsadresse: IPersonAdresse | undefined = person.bostedsadresse;
    return (
        <div className={'personkort'}>
            <FamilieIkonVelger kjønn={person.kjønn} fødselsnummer={person.personIdent} />
            <Element className={'personkort__navn'} children={formaterNavn(person.navn)} />

            <div className={'vr'} />
            <Normaltekst children={`Fødsel- og personnummer: ${person.personIdent}`} />
            <div className={'vr'} />
            {bostedsadresse && bostedsadresse.adresselinje1 ? (
                <Normaltekst
                    children={`Adresse: ${bostedsadresse.adresselinje1}, ${bostedsadresse.postnummer} ${bostedsadresse.poststed}`}
                />
            ) : (
                <Normaltekst children={'Personen har ikke registrert bostedsadresse'} />
            )}
        </div>
    );
};

export default Personkort;
