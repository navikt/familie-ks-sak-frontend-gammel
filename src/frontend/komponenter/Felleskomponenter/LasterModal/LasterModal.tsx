import Modal from 'nav-frontend-modal';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';

const LasterModal: React.StatelessComponent = () => {
    return (
        <Modal
            className={'lastermodal'}
            isOpen={true}
            closeButton={false}
            onRequestClose={() => {
                return;
            }}
            contentLabel="Løsningen jobber"
        >
            <div className={'lastermodal__innhold'}>
                <NavFrontendSpinner />

                <div className={'lastermodal__innhold--vr'} />

                <Normaltekst children={'Et øyeblikk, løsningen jobber.'} />
            </div>
        </Modal>
    );
};

export default LasterModal;
