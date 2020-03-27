import React from "react";

class AddIncomeCategory extends React.Component {
  render() {
    return (
      <form style={{ display: "flex", alignSelf: "center" }}>
        <input
          type="text"
          placeholder="ADD Income category"
          name="addIncomeCategory"
        />
        <input type="submit" value="ADD"></input>
      </form>
    );
  }
}

export default AddIncomeCategory;
