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
        <div className="boxContainer">
          <p>
            Overall Income
            <br />
            {this.props.overAllIncome}
          </p>
          <p>
            overall Spent
            <br />
            {this.props.overAllSpent}
          </p>
          <p>
            Most Spent
            <br />
            {this.props.mostSpent}
          </p>
          <p>
            Budget
            <br />
            {this.props.budget}
          </p>
        </div>
        <div>
          <PieChart
            transaction={[
              {
                title: "Incomes",
                amount: "30.0",
                percentage: 10,
                category: "firstcategory",
              },
              {
                title: "Expenses",
                amount: "70.0",
                percentage: 90,
                category: "firstcategory",
              },
            ]}
            // endAngle="90"
            // startAngle="270"
            innerRadius="55%"
            title="Budget (Current Month)"
          />
        </div>
        <div style={{ width: "100%", textAlign: "center", fontWeight: "400" }}>
          Breakdown (Current Year) <hr />
        </div>
        <div className="chartContainer">
          <PieChart transaction={this.props.transaction} title="Category" />
          <BarChart />
        </div>
      </div>
    );
  }
}
export default dashBoard;
