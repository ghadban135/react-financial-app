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
    this.state = {
      pieValue: [],
      barValue: [],
      currentPieValue: [],
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
    };
  }
  async componentDidMount() {
    const response = await fetch(
      `http://localhost:8000/api/barChartExpense?year=${this.state.currentYear}`,
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
      `http://localhost:8000/api/barChartIncome?year=${this.state.currentYear}`,
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
      `http://localhost:8000/api/pieChartYear?year=${this.state.currentYear}`,
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
    // current month pie
    const response5 = await fetch(
      `http://localhost:8000/api/pieChartMonth?year=${this.state.currentYear}&month=${this.state.currentMonth}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
        },
      }
    );
    const result5 = await response5.json();
    if (result5.success) {
      let incomeValue = [
        {
          title: result5.incomes.title,
          amount: result5.incomes.amount,
        },
        {
          title: result5.expenses.title,
          amount: result5.expenses.amount,
        },
      ];
      this.setState({
        currentPieValue: incomeValue,
      });
    }
  }
  render() {
    return (
      <div className="dashboardContainer">
        <div className="boxContainer">
          <div className="dashboardPart1">
            <div className="dashboardPart2">Overall Income</div>
            <div className="dashboardPart3">{this.props.overAllIncome}</div>
          </div>
          <div className="dashboardPart1">
            <div className="dashboardPart2">overall Spent</div>
            <div className="dashboardPart3">{this.props.overAllSpent}</div>
          </div>
          <div className="dashboardPart1">
            <div className="dashboardPart2">Most Spent</div>
            <div className="dashboardPart3">{this.props.mostSpent}</div>
          </div>
          <div className="dashboardPart1">
            <div className="dashboardPart2">Budget </div>
            <div className="dashboardPart3">{this.props.budget}</div>
          </div>
        </div>
        <div
          style={{
            width: "15%",
            textAlign: "center",
            fontWeight: "500",
            position: "absolute",
            top: "333px",
            zIndex: "1",
            color: "#5e96f3",
          }}
        >
          Budget
          <br /> (Current Month/{this.state.currentMonth}) <hr />
        </div>
        <div style={{ marginBottom: "40px" }}>
          <PieChart22 pieHole={0.6} transaction={this.state.currentPieValue} />
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "400",
          }}
        >
          Breakdown(Current Year/{this.state.currentYear}) <hr />
        </div>
        <div className="chartContainer"></div>
        <div className="chartContainer">
          <PieChart22 transaction={this.state.pieValue} />
          <BarChartDashboard
            title="Expenses and Incomes in year"
            transaction={this.state.barValue}
          />
        </div>
      </div>
    );
  }
}
export default dashBoard;
