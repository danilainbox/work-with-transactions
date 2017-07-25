let initialState,
    saved = localStorage.getItem('balance');

initialState = saved ? saved : 100000;

const balanceReducer = function (state = initialState, action) {
  switch(action.type) {
    case 'BALANCE_REDUCE':
      return action.balance;
  }
  return state;
};

export default balanceReducer;
