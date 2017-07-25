import React from 'react';
import Recipient from '../views/recipient';

export default class RecipientContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
      newNameErrorText: '',
      mouseOver: false,
      edit: false,
      newName: ''
    };

    this.handleAmountFieldChange = this.handleAmountFieldChange.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleStartEditClick = this.handleStartEditClick.bind(this);
    this.handleNewNameFieldChange = this.handleNewNameFieldChange.bind(this);
    this.handleFinishEditClick = this.handleFinishEditClick.bind(this);
  }

  handleAmountFieldChange(e) {
    let value = e.target.value < 0 ? 0 : e.target.value;
    this.props.changeRecipientAmount(e, value);
  }

  handleNewNameFieldChange(e) {
    this.setState({
      newName: e.target.value,
      newNameErrorText: ''
    })
  }

  handleMouseMove() {
    this.setState({
      mouseOver: true
    })
  }

  handleMouseOut() {
    this.setState({
      mouseOver: false
    })
  }

  handleStartEditClick() {
    this.setState({
      edit: true
    })
  }

  handleFinishEditClick(e) {
    let newName = this.state.newName.trim();

    if (!newName) {
      this.setState({
        newNameErrorText: 'Enter name',
        newName: ''
      })
    } else {
      this.setState({
        edit: false,
        newName: ''
      });

      this.props.changeRecipientName(e, newName);
    }
  }

  render() {
    let className = this.state.mouseOver ? 'recipient recipient_mouseover' : 'recipient';
    className = this.state.edit ? `${className} recipient_edit` : className;

    return (
      <Recipient
        className={className}
        handleMouseEnter={this.handleMouseMove}
        handleMouseMove={this.handleMouseMove}
        handleMouseOut={this.handleMouseOut}
        id={this.props.id}
        recipientName={this.props.recipientName}
        amountVal={this.props.amount}
        amountErrorText={this.state.errorText}
        handleAmountFieldChange={this.handleAmountFieldChange}
        handleDeleteClick={this.props.handleDeleteClick}
        handleStartEditClick={this.handleStartEditClick}
        newNameVal={this.state.newName}
        newNameErrorText={this.state.newNameErrorText}
        handleNewNameFieldChange={this.handleNewNameFieldChange}
        handleFinishEditClick={this.handleFinishEditClick}
      />
    )
  }
}
