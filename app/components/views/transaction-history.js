import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <MuiThemeProvider>
        <div>Transaction history will be here</div>
      </MuiThemeProvider>
    );
  }
}

export default TransactionHistory
