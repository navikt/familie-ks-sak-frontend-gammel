import { captureException, configureScope, showReportDialog, withScope } from '@sentry/browser';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { hentInnloggetBruker } from '../api/saksbehandler';
import { ISaksbehandler } from '../typer/saksbehandler';
import Dekoratør from './Dekoratør/Dekoratør';

interface IState {
    innloggetSaksbehandler?: ISaksbehandler;
}

class App extends React.Component<{}, IState> {
    public constructor(props: any) {
        super(props);

        this.state = {};
    }

    public componentDidMount() {
        hentInnloggetBruker().then(innhentetInnloggetSaksbehandler => {
            this.setState({ innloggetSaksbehandler: innhentetInnloggetSaksbehandler });
        });
    }

    public componentDidCatch(error: any, info: any) {
        if (process.env.NODE_ENV !== 'development') {
            configureScope(scope => {
                scope.setUser({
                    username: this.state.innloggetSaksbehandler
                        ? this.state.innloggetSaksbehandler.displayName
                        : 'Ukjent bruker',
                });
            });

            withScope(scope => {
                Object.keys(info).forEach(key => {
                    scope.setExtra(key, info[key]);
                    captureException(error);
                });
            });
            showReportDialog();
        }
    }

    public render() {
        return (
            <React.Fragment>
                <Dekoratør
                    innloggetSaksbehandler={this.state.innloggetSaksbehandler}
                    tittel={'NAV Kontantstøtte'}
                    onClick={() => {
                        window.location.href = `${window.origin}/auth/logout`;
                    }}
                />
            </React.Fragment>
        );
    }
}

export default App;
