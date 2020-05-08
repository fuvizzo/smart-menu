import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../Reducers/index';
//import { typoedWordsMiddleware } from '../Middleware/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// The transformer
const mapTransformer = config =>
  createTransform(
    map => JSON.stringify(Array.from(map)),
    arrayString => new Map(JSON.parse(arrayString)),
    config
  );

const persistConfig = {
  key: 'appStore',
  storage: storage,
  //whitelist: 'user',
  //transforms: [mapTransformer({ whitelist: 'menus' })],
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
