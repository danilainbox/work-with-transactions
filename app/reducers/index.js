import {combineReducers} from 'redux';
import transactionReducer from './transaction-reducer';
import balanceReducer from './balance-reducer';

let reducers = combineReducers({
  transactionState: transactionReducer,
  balanceState: balanceReducer
});

export default reducers;