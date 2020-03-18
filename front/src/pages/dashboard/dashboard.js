import React, { Component } from "react";
import PieChart from "../../component/pieChart/pieChart";
import BarChart from "../../component/barChart/barChart";
import "./dashboard.css";
class dashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dashboardContainer">
        <div className="boxContainer"></div>
        <div className="chartContainer">
          <PieChart />
          <BarChart />
        </div>
      </div>
    );
  }
}
export default dashBoard;
