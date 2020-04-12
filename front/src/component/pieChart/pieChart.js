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
  render() {
    console.log(this.props.transaction);
    // debugger;
    let data1 = this.props.transaction.map((item, index) => ({
      categoryName: item.title,
      categoryValue: item.amount,
      labelText: item.title + ": " + item.amount + " $",
    }));
    console.log("test");

    // let data1 = [
    //   {
    //     categoryName: "test1",
    //     categoryValue: "350.0",
    //     labelText: "test1: 350.0 $",
    //   },
    //   {
    //     categoryName: "ssjj",
    //     categoryValue: "78.0",
    //     labelText: " $",
    //   },
    // ];
    console.log(data1);
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
                dataSource={data1}
                xName="categoryName"
                yName="categoryValue"
                innerRadius={this.props.innerRadius}
                startAngle={this.props.startAngle}
                endAngle={this.props.endAngle}
                dataLabel={{
                  visible: true,
                  position: "Outside",
                  connectorStyle: { length: "10%" },
                  name: "labelText",
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
