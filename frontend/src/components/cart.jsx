import React, { Component } from "react";
import storeContext from "../context/storeContext";
import "./cart.css";
import ItemInCart from "./itemInCart";
import ItemService from "./../services/itemService";

class Cart extends Component {
  static contextType = storeContext;

  state = {
    coupdonCode: "",
    discount: 0,
  };

  render() {
    return (
      <div className="cart-page">
        <h4>This is the cart</h4>
        <div className="products-container">
          {this.context.cart.map((prod) => (
            <ItemInCart key={prod._id} prod={prod}></ItemInCart>
          ))}
        </div>

        <div className="total-container">
          <div>Total {this.getTotal()}</div>
          <div>
            <input
              type="text"
              name="couponCode"
              value={this.state.couponCode}
              onChange={this.handleInputChange}
              placeholder="Discount code"
            />
            <button onClick={this.validateCode} className="btn btn-sm btn-dark">
              Validate Code
            </button>
          </div>
        </div>
      </div>
    );
  }

  validateCode = async () => {
    console.log(this.state.couponCode);
    let service = new ItemService();
    let res = await service.validateCode(this.state.couponCode);
    console.log(res);
    if (res.error) {
      alert("Invalid Code");
    } else {
      //todo: apply disocunt (decrease total)
      this.setState({ discount: res.discount });
      console.log("you got a discount for " + this.state.discount + "%");
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getTotal = () => {
    let total = 0;
    for (let i = 0; i < this.context.cart.length; i++) {
      let product = this.context.cart[i];
      total += product.quantity * product.price;
    }
    return (total * (1 - this.state.discount / 100)).toFixed(2);
  };
}

export default Cart;
