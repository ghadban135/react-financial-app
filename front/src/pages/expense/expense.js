import React, { Component } from "react";
import Table from "../../component/testt";
import AddCategory from "../../component/addCategory/addCategory";
import PopupExpenseForm from "../../component/insertExpenseForm/popupExpenseForm";

class expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <PopupExpenseForm />
          <AddCategory />
        </div>
        <Table />
      </>
    );
  }
}
export default expense;
