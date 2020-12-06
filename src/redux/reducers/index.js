import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import AuthReducer from './AuthReducer';

const rootRducer = combineReducers({
  auth: AuthReducer,
});

export default createStore(
  rootRducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
