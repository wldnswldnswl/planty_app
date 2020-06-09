import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import rootReducer from '../reducers';

// Single repository for all data

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiltelist : ['rootReducer']
};


const enhancedReducer = persistReducer(persistConfig, rootReducer);



export default function configureStore() {

  const store = createStore(enhancedReducer);

  const persistor = persistStore(store);

  return { store, persistor };

};