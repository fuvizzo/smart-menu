import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {
  publicReducer,
  accountReducer,
  menuReducer,
  businessReducer,
  uiReducer,
} from '../Reducers/index';
//import { typoedWordsMiddleware } from '../Middleware/index';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootPersistConfig = {
  key: 'privateStore',
  storage,
  debug: true,
  blacklist: 'public',
  //whitelist: 'user',
};

const publicPersistConfig = {
  key: 'publicStore',
  storage,
  blacklist: 'data',
};

const rootReducer = combineReducers({
  account: accountReducer,
  menus: menuReducer,
  ui: uiReducer,
  public: persistReducer(publicPersistConfig, publicReducer),
  businesses: businessReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  //Note: the following line is just used to enable Redux Dev Tools
  storeEnhancers(applyMiddleware(thunk))
  //applyMiddleware(typoedWordsMiddleware,thunk)
);

store.subscribe(() => console.log('Look ma, Redux!!'));
const persistor = persistStore(store);

export { persistor, store };
