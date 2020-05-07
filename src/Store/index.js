import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../Reducers/index';
//import { typoedWordsMiddleware } from '../Middleware/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'appStore',
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  //Note: the following line is just used to enable Redux Dev Tools
  storeEnhancers(applyMiddleware(thunk))
  //applyMiddleware(typoedWordsMiddleware,thunk)
);

store.subscribe(() => console.log('Look ma, Redux!!'));
const persistor = persistStore(store);

export { persistor, store };
