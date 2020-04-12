import * as React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  PieSeries,
  AccumulationTooltip,
  AccumulationLegend,
} from "@syncfusion/ej2-react-charts";

export class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data3: [] };
  }
  // async componentWillReceiveProps() {
  //   // async componentWillUpdate() {
  //   // async componentWillMount() {
  //   //  async componentDidUpdate() {
  //   // async componentDidMount() {
  //   let data3 = this.props.transaction.map((x) => ({
  //     categoryName: x.title,
  //     categoryValue: x.amount,
  //     labelText: x.title + ": " + x.amount + " $",
  //   }));
  //   // debugger;
  //   this.setState({ data3: data3 });
  // }
  render() {
    let { transaction } = this.props;
    console.log("fi");
    console.log(this.props.transaction);
    // debugger;
    let data1 = this.props.transaction.map((item, index) => [
      {
        categoryName: item.title,
        categoryValue: item.amount,
        labelText: item.title + ": " + item.amount + " $",
      },
    ]);

    console.log("test");
    let data8 = this.props.transaction.map(function (x, y) {
      return {
        x: x.title,
        y: x.amount,
        text: x.title + ": " + x.amount + " $",
      };
    });
    let data2 = [
      {
        x: "test1",
        y: "350.0",
        text: "test1: 350.0 $",
      },
      {
        x: "ssjj",
        y: "78.0",
        text: " $",
      },
    ];
    console.log(data2);
    console.log(this.state.data3);
    console.log(data8);

    return (
      <div className="control-pane">
        <div className="control-section">
          <AccumulationChartComponent
            style={{ textAlign: "center", width: "45%", height: "45%" }}
            // id="pie-chart"
            title={this.props.title}
            legendSettings={{
              position: "Bottom",
              visible: false, //if we want legend
              height: "40",
              width: "300",
            }}
            tooltip={{
              enable: true,
              header: "Category",
              format: "${point.x} : <b>${point.y}%</b>",
            }}
          >
            <Inject
              services={[
                AccumulationDataLabel,
                AccumulationTooltip,
                PieSeries,
                AccumulationLegend,
              ]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                name="Category"
                dataSource={this.state.data3}
                xName="x"
                yName="y"
                innerRadius={this.props.innerRadius}
                startAngle={this.props.startAngle}
                endAngle={this.props.endAngle}
                dataLabel={{
                  visible: true,
                  position: "Outside",
                  connectorStyle: { length: "10%" },
                  name: "text",
                }}
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    );
  }
}
export default PieChart;
