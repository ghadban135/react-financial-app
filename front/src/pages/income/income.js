import React, { Component } from "react";
import Table from "../../component/testt";
import AddCategory from "../../component/addCategory/addCategory";
import PopupIncomeForm from "../../component/insertIncomeForm/popupIncomeForm";
class income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <PopupIncomeForm />
          <AddCategory />
        </div>
        <Table />
      </>
    );
  }
}
export default income;
