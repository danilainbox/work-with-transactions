import {createStore} from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

store.subscribe(function(){
  let state = store.getState(),
      balance = state.balanceState,
      transactions = JSON.stringify(state.transactionState);

  localStorage.setItem('balance', balance);
  localStorage.setItem('transactions', transactions);
});

export default store;