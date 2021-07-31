import React, { Component } from "react";
import "./admin.css";
import ItemService from "./../services/itemService";

class Admin extends Component {
  state = {
    title: "",
    category: "",
    image: "",
    price: "",
    stock: "",
    minimum: "",
  };

  render() {
    return (
      <div className="admin-page">
        <div className="capture-form">
          <div className="my-control">
            <label> Title </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="my-control">
            <label> Category </label>
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="my-control">
            <label> Image </label>
            <input
              type="text"
              name="image"
              value={this.state.image}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="my-control">
            <label> Price $ </label>
            <input
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="my-control">
            <label> Stock </label>
            <input
              type="number"
              name="stock"
              value={this.state.stock}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="my-control">
            <label> Minimum </label>
            <input
              type="number"
              name="minimum"
              value={this.state.minimum}
              onChange={this.handleInputChange}
            />
          </div>

          <button className="btn btn-dark" onClick={this.handleSave}>
            Save Product
          </button>
        </div>
      </div>
    );
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = async () => {
    console.log("saving product");
    let item = { ...this.state };
    item.price = item.price * 1;
    item.stock = +item.stock;
    item.minimum = parseInt(item.minimum);

    console.log(item);

    //send item to the service
    let itemService = new ItemService();
    let response = await itemService.saveItem(item);
    console.log("Savings response", response);

    //clear console
    this.setState({ title: "" });
    this.setState({ category: "" });
    this.setState({ image: "" });
    this.setState({ price: "" });
    this.setState({ stock: "" });
    this.setState({ minimum: "" });
  };
}

export default Admin;
