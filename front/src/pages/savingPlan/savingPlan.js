import React, { Component } from "react";
import Table from "../../component/testt";
import SavingPlanForm from "../../component/insertSavingPlanForm/popupSavingPlanForm";

class savingPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <SavingPlanForm />
        <Table />
      </>
    );
  }
}
export default savingPlan;
