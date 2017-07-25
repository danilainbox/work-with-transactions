import React from 'react';

export default function(props) {
  return(
    <div className="balance">
      <span className="balance__label">Balance:</span>
      <span className="balance__value">{props.balance}</span>
    </div>
  )
}
