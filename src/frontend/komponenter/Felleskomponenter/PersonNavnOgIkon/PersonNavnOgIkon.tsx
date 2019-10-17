import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import FamilieIkonVelger from '../../../ikoner/Familie/FamilieIkonVelger';
import { IPerson } from '../../../typer/person';
import { formaterNavn } from '../../../utils/hjelpere';

interface IProps {
    person: IPerson;
    type?: string;
}

const PersonNavnOgIkon: React.StatelessComponent<IProps> = ({ person, type }) => {
    return (
        <div className={'personnavnogikon'}>
            <FamilieIkonVelger
                className={'personnavnogikon__ikon'}
                kjønn={person.kjønn}
                fødselsnummer={person.personIdent}
            />
            <Undertittel
                className={'personnavnogikon__tekst'}
                children={`${formaterNavn(person.navn)} ${type ? `/ ${type}` : ''}`}
            />
        </div>
    );
};

export default PersonNavnOgIkon;
