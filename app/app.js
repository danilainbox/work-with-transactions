import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import TransactionHistory from './components/views/transaction-history';
import NewTransactionContainer from './components/containers/new-transaction-container';

import '../public/scss/style.scss';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={TransactionHistory} />
      <Route path="/new-transaction" component={NewTransactionContainer} />
    </Switch>
  </Router>,
  document.getElementById('app')
);