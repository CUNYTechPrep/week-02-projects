import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import multireducer from 'multireducer';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
});
