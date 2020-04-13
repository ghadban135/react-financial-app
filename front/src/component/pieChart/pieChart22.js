import React from "react";
import Chart from "react-google-charts";

class PieChart22 extends React.Component {
  render() {
    let data3 = this.props.transaction.map((x) => [
      x.title,
      parseInt(x.amount),
    ]);
    data3.unshift(["Task", "Hours per Day"]);
    // console.log(data3);
    return (
      <div className="App">
        <Chart
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={data3}
          //   data={[
          //     ["Task", "Hours per Day"],
          //     ["Work", 11],
          //     ["Eat", 2],
          //     ["Commute", 2],
          //     ["Watch TV", 2],
          //     ["Sleep", 7],
          //   ]}
          options={{
            title: "My Daily Activities",
            pieHole: this.props.pieHole ? this.props.pieHole : 0,
            slices: [
              {
                color: "#2BB673",
              },
              {
                color: "#d91e48",
              },
              {
                color: "#007fad",
              },
              {
                color: "#e9a227",
              },
            ],
            legend: {
              position: "bottom",
              alignment: "center",
              textStyle: {
                color: "233238",
                fontSize: 14,
              },
            },
            tooltip: {
              showColorCode: true,
            },
            chartArea: {
              left: 0,
              top: 0,
              width: "100%",
              height: "80%",
            },
            fontName: "Roboto",
          }}
          // graph_id="PieChart"
          width={"600px"}
          height={"400px"}
          legend_toggle
        />
      </div>
    );
  }
}
export default PieChart22;
