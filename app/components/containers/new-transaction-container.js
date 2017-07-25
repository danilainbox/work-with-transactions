import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import AddRecipientContainer from './add-recipient-container';
import RecipientContainer from './recipient-container';
import SliderContainer from './slider-container';
import Balance from '../views/balance'
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import axios from 'axios';
import store from '../../store';

class NewTransactionContainer extends React.Component {
  constructor(props) {
    super(props);

    this.addRecipient = this.addRecipient.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.changeRecipientName = this.changeRecipientName.bind(this);
    this.changeRecipientAmount = this.changeRecipientAmount.bind(this);
    this.getRecipientIndex = this.getRecipientIndex.bind(this);
    this.calculateSum = this.calculateSum.bind(this);
    this.handleSliderMove = this.handleSliderMove.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);

    this.state = {
      recipients: [],
      sum: 0
    }
  }

  getChildContext() {
    return {
      addRecipient: this.addRecipient
    }
  }

  addRecipient(name) {
    let recipient = {
      name: name,
      amount: ''
    },
    recipients = [].concat(this.state.recipients);

    recipients.push(recipient);

    this.setState({
      recipients: recipients
    })
  }

  changeRecipientAmount(e, value) {
    let index = this.getRecipientIndex(e),
      recipients = [].concat(this.state.recipients),
      currentRecipient = recipients[index],
      sum;

    currentRecipient.amount = value;
    recipients.splice(index, 1, currentRecipient);

    sum = this.calculateSum(recipients);

    this.setState({
      recipients: recipients,
      sum: sum
    })
  }

  calculateSum(recipients) {
    let sum = 0;

    recipients.forEach(function(item) {
      sum += Number(item.amount);
    });

    return Math.round(sum * 100)/100;
  }

  handleDeleteClick(e) {
    let index = this.getRecipientIndex(e),
        recipients = [].concat(this.state.recipients),
        sum;

    recipients.splice(index, 1);

    sum = this.calculateSum(recipients);

    this.setState({
      recipients: recipients,
      sum: sum
    })
  }

  changeRecipientName(e, newName) {
    let index = this.getRecipientIndex(e),
      recipients = [].concat(this.state.recipients),
      currentRecipient = recipients[index];

    currentRecipient.name = newName;
    recipients.splice(index, 1, currentRecipient);

    this.setState({
      recipients: recipients
    })
  }

  getRecipientIndex(e) {
    return e.target.closest('.recipient').getAttribute('id').slice(9);
  }

  handleSliderMove(e, value) {
    console.log(value);

    let recipients = [].concat(this.state.recipients),
      sum = this.calculateSum(recipients),
      parts = [],
      part,
      diff,
      minIndex = 0;

    if (!sum) {
      part = 1/recipients.length;

      recipients = recipients.map(function(item) {
        let newAmount = value * part;
        newAmount = Math.round(newAmount*100)/100;

        return {
          name: item.name,
          amount: newAmount
        }
      });

    } else {
      recipients.forEach(function(item) {
        if (!item.amount) {
          parts.push(0);
        } else {
          parts.push(item.amount/sum);
        }
      });

      let minValue;

      recipients = recipients.map(function(item, index) {
        let newAmount = value * parts[index];

        newAmount = Math.round(newAmount*100)/100;

        if (minValue === undefined || newAmount < minValue) {
          minValue = newAmount;
          minIndex = index;
        }

        return {
          name: item.name,
          amount: newAmount
        }
      })
    }

    sum = this.calculateSum(recipients);
    diff = Math.round((this.props.balance - sum)*100)/100;

    if (diff == 0.01 || diff == -0.01) {
      let newAmount = recipients[minIndex].amount += diff;
      newAmount = Math.round(newAmount*100)/100;
      recipients[minIndex].amount = newAmount;
    }

    this.setState({
      recipients: recipients,
      sum: this.calculateSum(recipients)
    })
  }

  makeTransaction() {
    axios.get('/data/ok.json').then(response => {
      if (response.data.ok) {

        let newBalance = this.props.balance - this.state.sum,
            transaction = {
              recipients: this.state.recipients,
              sum: this.state.sum
            };

        newBalance = Math.round(newBalance*100)/100;

        store.dispatch({
          type: 'BALANCE_REDUCE',
          balance: newBalance
        });

        store.dispatch({
          type: 'TRANSACTION_SUCCESS',
          transaction: transaction
        });

        this.setState({
          recipients: [],
          sum: 0
        })
      }
    });
  }

  render() {
    let recipients,
      sum = this.state.sum,
      sliderDisabled = false,
      balance = Number(this.props.balance),
      transactionDisabled = (sum > balance || !sum);

    if (sum > balance) {
      sum = balance;
      sliderDisabled = true;
    }

    if (this.state.recipients.length) {
      recipients = (
        <div className="recipients-wrapper">
          {this.state.recipients.map((item, index) => {
            return (
              <RecipientContainer
                key={index}
                recipientName={item.name}
                amount={item.amount}
                handleDeleteClick={this.handleDeleteClick}
                changeRecipientName={this.changeRecipientName}
                changeRecipientAmount={this.changeRecipientAmount}
                id={`recipient${index}`}/>
            )
          })}
          <SliderContainer sum={sum} balance={balance} disabled={sliderDisabled} handleSliderMove={this.handleSliderMove} />
          <RaisedButton className="recipients-wrapper__make-transaction" label="Make transaction" primary={true} onClick={this.makeTransaction} disabled={transactionDisabled} />
        </div>
      );
    } else {
      recipients = null;
    }

    return(
      <MuiThemeProvider>
        <div className="container">
          {recipients}
          <AddRecipientContainer />
          <Balance balance={this.props.balance} />
        </div>
      </MuiThemeProvider>
    );
  }
}

NewTransactionContainer.childContextTypes = {
  addRecipient: PropTypes.func,
};

const mapStateToProps = state => ({
  balance: state.balanceState,
  transactions: state.transactionState
});

export default connect(mapStateToProps)(NewTransactionContainer);