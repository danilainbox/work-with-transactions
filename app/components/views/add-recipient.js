import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default function(props) {
  let result;

  if (props.add) {
    result = (
      <div className="add-recipient">
        <TextField className="add-recipient__name" value={props.recipientName} hintText="Enter recipient name" errorText={props.errorText} onChange={props.handleFieldChange} />
        <RaisedButton className="add-recipient__add" label="Add" primary={true} onClick={props.handleAddClick} />
        <RaisedButton className="add-recipient__add" label="Cancel" primary={true} onClick={props.handleCancelClick} />
      </div>
    )
  } else {
    result = (
      <div className="add-recipient">
        <RaisedButton label="Add recipient" primary={true} onClick={props.startAdd} />
      </div>
    )
  }

  return result;
}
