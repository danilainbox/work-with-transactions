import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopNav from './top-nav';
import {connect} from 'react-redux';

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <MuiThemeProvider>
        <div className="container">
          <TopNav href="/new-transaction" title="New transaction" />
          <div className="transaction-history">
            {this.props.transactions.map((item, index) => {
              return (
                <div key={index} className="transaction-history__item">{JSON.stringify(item)}</div>
              )
            })}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.transactionState
});

export default connect(mapStateToProps)(TransactionHistory);
