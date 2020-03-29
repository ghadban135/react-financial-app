import React from "react";
// import axios from 'axios';
import Swal from "sweetalert2";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      users_id: 1
    };
  }
  onChangeCategoryName = e => {
    this.setState({ name: e.target.value });
  };
  /* onSubmit(e) {
    e.preventDefault();
    const expense = {
      name: this.state.name,
      users_id: this.state.users_id
    };
    axios
      .post("http://localhost:8000/api/categories/", expense)
      .then(res => console.log(res.data));
    // console.log(`Expense successfully created!`);
    // console.log(`Name: ${this.state.name}`);
    // console.log(`Amount: ${this.state.amount}`);
    // console.log(`Description: ${this.state.description}`);
    Swal.fire("Good job!", "Expense Added Successfully", "success");
    this.setState({ name: "" });
  } */
  onSubmit1 = async e => {
    e.preventDefault();
    const body = new FormData();
    body.append("name", this.state.name);
    body.append("users_id", this.state.users_id);
    const response = await fetch(`http://localhost:8000/api/categories`, {
      method: "POST",
      body
    });
    const result = await response.json();
    this.setState({ name: "" });
    if (result.success)
      Swal.fire("Good job!", "Category Added Successfully", "success");
  };
  render() {
    return (
      <form
        onSubmit={this.onSubmit1}
        style={{ display: "flex", alignSelf: "center" }}
      >
        <input
          type="text"
          placeholder="ADD Category .."
          value={this.state.name}
          onChange={this.onChangeCategoryName}
        />
        <input type="submit" value="ADD"></input>
      </form>
    );
  }
}

export default AddCategory;
