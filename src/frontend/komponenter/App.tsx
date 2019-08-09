import * as React from 'react';
import { hentInnloggetBruker } from '../api/saksbehandler';
import { ISaksbehandler } from '../typer/saksbehandler';
import Dekoratør from './Dekoratør/Dekoratør';

const App: React.FunctionComponent = () => {
    const [innloggetSaksbehandler, settInnloggetSaksbehandler] = React.useState<ISaksbehandler>();

    React.useEffect(() => {
        hentInnloggetBruker().then(innhentetInnloggetSaksbehandler => {
            settInnloggetSaksbehandler(innhentetInnloggetSaksbehandler);
        });
    }, []);

    return (
        <React.Fragment>
            <Dekoratør
                innloggetSaksbehandler={innloggetSaksbehandler}
                tittel={'NAV Kontantstøtte'}
                onClick={() => {
                    window.location.href = `${window.origin}/auth/logout`;
                }}
            />
        </React.Fragment>
    );
};

export default App;
