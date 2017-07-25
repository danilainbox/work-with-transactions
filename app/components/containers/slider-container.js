import React from 'react';
import Slider from 'material-ui/Slider';

export default class SliderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let self = this;

    return (
      <div className="slider-container">
        <Slider
          min={0}
          max={this.props.balance}
          step={0.01}
          value={this.props.sum}
          onChange={function(e, value) {self.props.handleSliderMove(e, value)}}
          disabled={this.props.disabled}
        />
        <div className="slider-container__sum" style={{left: Math.round(this.props.sum/this.props.balance * 100) + '%'}}>{this.props.sum}/{this.props.balance}</div>
      </div>
    )
  }
}
