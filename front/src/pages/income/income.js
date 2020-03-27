import React, { Component } from "react";
import Table from "../../component/testt";
import IncomeForm from "../../component/insertIncomeForm/popupIncomeForm";
import AddIncomeCategory from "../../component/addIncomeCategory/addIncomeCategory";
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
          <AddIncomeCategory />
        </div>
        <Table />
      </>
    );
  }
}
export default income;
