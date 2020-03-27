import React, { Component } from "react";
import Table from "../../component/testt";
import ExpenseForm from "../../component/insertExpenseForm/popupExpenseForm";
import AddExpenseCategory from "../../component/addExpenseCategory/addExpenseCategory";

class expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <ExpenseForm />
          <AddExpenseCategory />
        </div>
        <Table />
      </>
    );
  }
}
export default expense;
