import React, { Component } from "react";
import Table from "../../component/testt";
import ExpenseForm from "../../component/insertExpenseForm/popupExpenseForm";
import AddCategory from "../../component/addCategory/addCategory";

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
          <AddCategory />
        </div>
        <Table />
      </>
    );
  }
}
export default expense;
