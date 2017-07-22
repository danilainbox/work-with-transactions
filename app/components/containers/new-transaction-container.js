import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class NewTransactionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <MuiThemeProvider>
        <div>New transaction container will be here</div>
      </MuiThemeProvider>
    );
  }
}

export default NewTransactionContainer