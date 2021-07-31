import React, { Component } from "react";
import "./quantityPicker.css";

class QuantityPicker extends Component {
  state = {
    value: 1,
  };

  render() {
    return (
      <div className="quantity-picker">
        <button onClick={this.increase} className="btn btn-sm btn-light">
          +
        </button>
        <label className="value">{this.state.value}</label>
        <button
          disabled={this.state.value === 1}
          onClick={this.decrease}
          className="btn btn-minus btn-sm btn-light"
        >
          -
        </button>
      </div>
    );
  }

  increase = () => {
    let val = this.state.value + 1;
    this.setState({ value: val });
    this.props.onValueChange(val);
  };

  decrease = () => {
    let val = this.state.value - 1;
    // validation
    if (val > 0) {
      this.setState({ value: val });
      this.props.onValueChange(val);
    }
  };
}

export default QuantityPicker;
