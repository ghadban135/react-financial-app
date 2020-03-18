import React, { Component } from "react";
import Table from "../../component/testt";
import ExpenseForm from "../../component/insertExpenseForm/popupExpenseForm";

class expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <ExpenseForm />
        <Table />
      </>
    );
  }
}
export default expense;
