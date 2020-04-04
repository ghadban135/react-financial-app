import React from "react";
import Swal from "sweetalert2";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  onChangeCategoryName = (e) => {
    this.setState({ name: e.target.value });
  };
  onSubmit1 = async (e) => {
    e.preventDefault();
    const body = new FormData();
    // debugger;
    body.append("name", this.state.name);
    const response = await fetch(`http://localhost:8000/api/category`, {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
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
