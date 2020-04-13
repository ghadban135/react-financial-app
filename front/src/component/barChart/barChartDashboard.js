import React from "react";
import Chart from "react-google-charts";

// const data = [
//   ["Year", "Visitations", { role: "style" }],
//   ["2010", 10, "color: gray"],
//   ["2020", 14, "color: #76A7FA"],
//   ["2030", 16, "color: blue"],
//   ["2040", 22, "stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF"],
//   [
//     "2050",
//     28,
//     "stroke-color: #871B47; stroke-opacity: 0.6; stroke-width: 8; fill-color: #BC5679; fill-opacity: 0.2",
//   ],
// ];
class BarChartDashboard extends React.Component {
  render() {
    let data3 = this.props.transaction;
    // debugger;
    return (
      <div className="App">
        <Chart
          width={"600px"}
          height={"300px"}
          chartType="Bar"
          //   legendToggle
          loader={<div>Loading Chart</div>}
          data={data3}
          //   data={[
          //     ["Year", "Sales", "Expenses", "Profit"],
          //     ["2014", 1000, 400, 200],
          //     ["2015", 1170, 460, 250],
          //     ["2016", 660, 1120, 300],
          //     ["2017", 1030, 540, 350],
          //   ]}
          options={{
            isStacked: true,
            // Material design options
            chart: {
              title: this.props.title,
              //  title: "Incomes per year",
              //   subtitle: "Sales, Expenses, and Profit: 2014-2017",
            },
          }}
          // For tests
          rootProps={{ "data-testid": "2" }}
        />
      </div>
    );
  }
}
export default BarChartDashboard;
