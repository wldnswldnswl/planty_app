
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


// const { store, persistor } = configureStore();
AppRegistry.registerComponent(appName, () => App);

{/* <Provider store = {store}>
<PersistGate>
</PersistGate>
    </Provider> */}
