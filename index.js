
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import configureStore from './src/common/store';

// const { store, persistor } = configureStore();
AppRegistry.registerComponent(appName, () => App);

{/* <Provider store = {store}>
<PersistGate>
</PersistGate>
    </Provider> */}
