import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const rootElement = document.getElementById('app');
const renderApp = (Component: React.ComponentType<{}>): void => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootElement
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NewApp = require('./components/App').default;
        renderApp(NewApp);
    });
}
