import React, { Component } from "react";
import QuantityPicker from "./quantityPicker";

import "./item.css";
import StoreContext from "../context/storeContext";

class Item extends Component {
  static contextType = StoreContext;

  state = {
    quantity: 1,
  };

  render() {
    return (
      <div className="item">
        <img
          className="product-image"
          src={"/images/products/" + this.props.prod.image}
          alt="item"
        />
        <h6 className="title">{this.props.prod.title}</h6>

        <div className="prices">
          <label className="info"> Total: </label>
          <label className="info"> Price: </label>
          <label className="total-value"> ${this.getTotal()} </label>
          <label className="price-value">
            {" "}
            ${(+this.props.prod.price || 0).toFixed(2)}{" "}
          </label>
        </div>

        <div className="item-controls">
          <QuantityPicker
            onValueChange={this.handleQuantityChange}
          ></QuantityPicker>

          <button
            onClick={this.handleAddButton}
            className="btn btn-sm btn-warning btn-add"
          >
            <i className="fa fa-cart-plus" aria-hidden="true">
              {" "}
            </i>
          </button>
        </div>
      </div>
    );
  }

  getTotal = () => {
    let total = this.props.prod.price * this.state.quantity;
    return total.toFixed(2);
  };

  handleAddButton = () => {
    //debugger --- to use console log
    var copy = {
      ...this.props.prod,
      quantity: this.state.quantity,
    };
    this.context.addProdToCart(copy);
  };

  handleQuantityChange = (quantity) => {
    this.setState({ quantity: quantity });
  };
}

export default Item;
