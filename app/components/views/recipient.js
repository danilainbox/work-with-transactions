import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default function(props) {
  return(
    <div className={props.className} onMouseEnter={props.handleMouseEnter} onMouseMove={props.handleMouseMove} onMouseOut={props.handleMouseOut} id={props.id}>
      <div className="recipient__name">{`${props.recipientName}:`}</div>
      <TextField className="recipient__value" value={props.amountVal} hintText="Enter value" errorText={props.amountErrorText} onChange={props.handleAmountFieldChange} type="number" style={{'width': '100px'}} />
      <div className="recipient__buttons">
        <RaisedButton className="recipient__delete" label="Delete" primary={true} onClick={props.handleDeleteClick} />
        <RaisedButton className="recipient__edit" label="Edit" primary={true} onClick={props.handleStartEditClick} />
      </div>
      <div className="recipient__edit">
        <TextField className="recipient__new-name" value={props.newNameVal} hintText="Enter new name" errorText={props.newNameErrorText} onChange={props.handleNewNameFieldChange} style={{'width': '140px'}} />
        <RaisedButton className="recipient__new-name-accept" label="Edit" primary={true} onClick={props.handleFinishEditClick} />
      </div>
    </div>
  )
}
