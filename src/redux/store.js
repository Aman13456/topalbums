import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import roorReducer from './reducers';

let INITIAL_STATE = {
  data: [],
  loading: true,
};

const store = createStore(roorReducer, INITIAL_STATE, applyMiddleware(thunk));

export default store;
