import React from 'react';
import AddRecipient from '../views/add-recipient';
import PropTypes from 'prop-types';

class AddRecipientContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      add: false,
      recipientName: '',
      errorText: ''
    };

    this.startAdd = this.startAdd.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  startAdd() {
    this.setState({
      add: true
    })
  }

  handleCancelClick() {
    this.setState({
      add: false,
      recipientName: ''
    })
  }

  handleAddClick() {
    let name = this.state.recipientName.trim();

    if (!name) {
      this.setState({
        errorText: 'Enter recipient name'
      });
    } else {
      this.context.addRecipient(this.state.recipientName.trim());
      this.setState({
        add: false,
        recipientName: ''
      })
    }
  }

  handleFieldChange(e) {
    this.setState({
      errorText: '',
      recipientName: e.target.value
    })
  }

  render() {
    return <AddRecipient
      recipientName={this.state.recipientName}
      add={this.state.add}
      errorText={this.state.errorText}
      handleFieldChange={this.handleFieldChange}
      startAdd={this.startAdd}
      handleCancelClick={this.handleCancelClick}
      handleAddClick={this.handleAddClick}
    />;
  }
}

AddRecipientContainer.contextTypes = {
  addRecipient: PropTypes.func.isRequired
};

export default AddRecipientContainer
