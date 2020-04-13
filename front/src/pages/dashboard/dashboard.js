import React, { Component } from "react";
import PieChart from "../../component/pieChart/pieChart";
import BarChart from "../../component/barChart/barChart";
import "./dashboard.css";
import PieChart22 from "../../component/pieChart/pieChart22";
import BarChart22 from "../../component/barChart/barChart22";
import BarChartDashboard from "../../component/barChart/barChartDashboard";
class dashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pieValue: [], barValue: [] };
  }
  async componentDidMount() {
    const response = await fetch(
      `http://localhost:8000/api/barChartExpense?year=${2020}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
        },
      }
    );
    const result = await response.json();
    const response0 = await fetch(
      `http://localhost:8000/api/barChartIncome?year=${2020}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
        },
      }
    );
    const result0 = await response0.json();
    let month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (result.success && result0.success) {
      let expenseValue = result.transactions;
      let incomeValue = result0.transactions;
      let data = incomeValue.map((item, index) => [
        month[index],
        item,
        expenseValue[index],
      ]);
      data.unshift(["", "Income", "Expense"]);
      this.setState({
        barValue: data,
      });
      // console.log("data");
      // console.log(data);
      // console.log("state");
      // console.log(this.state.barValue);
      // debugger;
    }
    //bar
    //pie
    const response1 = await fetch(
      `http://localhost:8000/api/pieChartYear?year=${2020}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
        },
      }
    );
    const result1 = await response1.json();
    if (result1.success) {
      let incomeValue = result1.transactions
        .filter((items) => {
          return items.type !== "income";
        })
        .map((item, index) => {
          const currentTransactions = {
            title: item.title,
            amount: item.amount,
            percentage: item.percentage,
          };
          return currentTransactions;
        });
      this.setState({
        pieValue: incomeValue,
      });
    }
  }
  render() {
    return (
      <div className="dashboardContainer">
        <div className="boxContainer">
          <p>
            Overall Income <br /> {this.props.overAllIncome}
          </p>
          <p>
            overall Spent <br /> {this.props.overAllSpent}
          </p>
          <p>
            Most Spent <br /> {this.props.mostSpent}
          </p>
          <p>
            Budget <br /> {this.props.budget}
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
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "400",
          }}
        >
          Breakdown(Current Year) <hr />
        </div>
        <div className="chartContainer">
          {/* <PieChart transaction={this.props.transactionY} title="Category" />
          <BarChart /> */}
        </div>
        <div className="chartContainer">
          <PieChart22 transaction={this.state.pieValue} />
          <BarChartDashboard
            title="Expenses and Incomes in year"
            transaction={this.state.barValue}
          />
          {/* <BarChart22
            side="Expense"
            title="Expense per year including saving plans"
            transaction={this.state.barValue}
          /> */}
        </div>
      </div>
    );
  }
}
export default dashBoard;
