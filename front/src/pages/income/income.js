import React, { Component } from "react";
import Table from "../../component/testt";
import IncomeForm from "../../component/insertIncomeForm/popupIncomeForm";
import AddCategory from "../../component/addCategory/addCategory";
class income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <IncomeForm className="popupIncome" />
          <AddCategory />
        </div>
        <Table />
      </>
    );
  }
}
export default income;
