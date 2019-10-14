import * as React from 'react';
import { hentAlderFraFnr } from '../../utils/hjelpere';
import GuttIkon from './GuttIkon';
import JenteIkon from './JenteIkon';
import KvinneIkon from './KvinneIkon';
import MannIkon from './MannIkon';
import NøytralPersonIkon from './NøytralPersonIkon';

interface IProps {
    className?: string;
    fødselsnummer: string;
    kjønn: string;
}

const FamilieIkonVelger: React.StatelessComponent<IProps> = ({
    className,
    fødselsnummer,
    kjønn,
}) => {
    switch (kjønn) {
        case 'KVINNE':
            if (hentAlderFraFnr(fødselsnummer) < 18) {
                return <JenteIkon className={className} heigth={32} width={32} />;
            } else {
                return <KvinneIkon className={className} heigth={32} width={32} />;
            }
        case 'MANN':
            if (hentAlderFraFnr(fødselsnummer) < 18) {
                return <GuttIkon className={className} heigth={32} width={32} />;
            } else {
                return <MannIkon className={className} heigth={32} width={32} />;
            }
        default:
            return <NøytralPersonIkon className={className} heigth={32} width={32} />;
    }
};

export default FamilieIkonVelger;
