import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../Reducers/index';
//import { typoedWordsMiddleware } from '../Middleware/index';
import thunk from 'redux-thunk';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  //Note: the following line is just used to enable Redux Dev Tools
  storeEnhancers(applyMiddleware(thunk))
  //applyMiddleware(typoedWordsMiddleware,thunk)
);

store.subscribe(() => console.log('Look ma, Redux!!'));

export default store;
