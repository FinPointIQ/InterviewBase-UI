import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from './redux/index';

import Loader from './components/Loader';


export const app = {
    cssRetries: 0,
    fetchRetries: 0,
  
    run() {
      this.render(App);
    },
    render(Component) {
      const root = document.getElementById('root');
  
      /* istanbul ignore next */
      if (root) {
        ReactDOM.render(
            <Provider store={store}>
                <PersistGate loading={<Loader />} persistor={persistor}>
                    <Component />
                </PersistGate>
            </Provider>,
          root,
        );
      }
    },
};
  
app.run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
