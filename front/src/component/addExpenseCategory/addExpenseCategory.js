import React from "react";

class AddExpenseCategory extends React.Component {
  render() {
    return (
      <form style={{ display: "flex", alignSelf: "center" }}>
        <input
          type="text"
          placeholder="ADD Expense category"
          name="addExpenseCategory"
        />
        <input type="submit" value="ADD"></input>
      </form>
    );
  }
}

export default AddExpenseCategory;
