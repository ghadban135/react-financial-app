import React, { Component } from "react";
import Table from "../../component/testt";
import IncomeForm from "../../component/insertIncomeForm/popupIncomeForm";
class income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <IncomeForm className="popupIncome" />
        <Table />
      </>
    );
  }
}
export default income;
