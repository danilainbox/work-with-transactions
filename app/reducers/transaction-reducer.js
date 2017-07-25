let initialState,
    saved = JSON.parse(localStorage.getItem('transactions'));

initialState = saved ? saved : [];

const transactionReducer = function (state = initialState, action) {
  switch(action.type) {
    case 'TRANSACTION_SUCCESS':
      let prevState = [].concat(state);

      prevState.push(action.transaction);

      return prevState;
  }
  return state;
};

export default transactionReducer;
