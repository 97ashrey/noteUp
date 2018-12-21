import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import localStorageMiddleware,  { reHydrateStore } from './middleware/localStorageMiddleware';

import rootReducer from './reducers';


const middleware = [thunk,localStorageMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,reHydrateStore(),composeEnhancers(
  applyMiddleware(...middleware)
));

export default store;
