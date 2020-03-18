import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip
} from "@syncfusion/ej2-react-charts";
// import { SampleBase } from "../common/sample-base";
import { Browser } from "@syncfusion/ej2-base";
import { DataManager, Query } from "@syncfusion/ej2-data";
let data1 = [
  { x: "Jan", y: 111.1 },
  { x: "Feb", y: 127.3 },
  { x: "Mar", y: 143.4 },
  { x: "Apr", y: 159.9 },
  { x: "May", y: 111.1 },
  { x: "Jun", y: 127.3 },
  { x: "Jul", y: 143.4 },
  { x: "Aug", y: 159.9 },
  { x: "Sep", y: 111.1 },
  { x: "Oct", y: 127.3 },
  { x: "Nov", y: 143.4 },
  { x: "Dec", y: 159.9 }
];
let data2 = [
  { x: "Jan", y: 76.9 },
  { x: "Feb", y: 99.5 },
  { x: "Mar", y: 121.7 },
  { x: "Apr", y: 142.5 },
  { x: "May", y: 111.1 },
  { x: "Jun", y: 127.3 },
  { x: "Jul", y: 143.4 },
  { x: "Aug", y: 159.9 },
  { x: "Sep", y: 111.1 },
  { x: "Oct", y: 127.3 },
  { x: "Nov", y: 143.4 },
  { x: "Dec", y: 159.9 }
];
let data3 = [
  { x: "Jan", y: 66.1 },
  { x: "Feb", y: 79.3 },
  { x: "Mar", y: 91.3 },
  { x: "Apr", y: 102.4 },
  { x: "May", y: 111.1 },
  { x: "Jun", y: 127.3 },
  { x: "Jul", y: 143.4 },
  { x: "Aug", y: 159.9 },
  { x: "Sep", y: 111.1 },
  { x: "Oct", y: 127.3 },
  { x: "Nov", y: 143.4 },
  { x: "Dec", y: 159.9 }
];
let data4 = [
  { x: "Jan", y: 34.1 },
  { x: "Feb", y: 38.2 },
  { x: "Mar", y: 44.0 },
  { x: "Apr", y: 51.6 },
  { x: "May", y: 111.1 },
  { x: "Jun", y: 127.3 },
  { x: "Jul", y: 143.4 },
  { x: "Aug", y: 159.9 },
  { x: "Sep", y: 111.1 },
  { x: "Oct", y: 127.3 },
  { x: "Nov", y: 143.4 },
  { x: "Dec", y: 159.9 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class StaticBarChart extends React.Component {
  //   constructor() {
  //     super(...arguments);
  //     this.dataManager = new DataManager({
  //       url: "http://mvc.syncfusion.com/Services/Northwnd.svc/Tasks/"
  //     });
  //     this.query = new Query().take(5).where("Estimate", "lessThan", 3, false);
  //   }
  render() {
    return (
      <div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ChartComponent
            id="charts"
            // legendSettings={{
            //   visible: true,
            //   position: "Top"
            // }}
            style={{ textAlign: "center" }}
            primaryXAxis={{
              majorGridLines: { width: 0 },
              minorGridLines: { width: 0 },
              majorTickLines: { width: 0 },
              minorTickLines: { width: 0 },
              interval: 1,
              lineStyle: { width: 0 },
              labelIntersectAction: "Rotate45",
              valueType: "Category"

              //   title: "Estimate"
            }}
            primaryYAxis={{
              title: "Amount",
              lineStyle: { width: 0 },
              minimum: 0,
              maximum: 800,
              interval: 100,
              majorTickLines: { width: 0 },
              majorGridLines: { width: 1 },
              minorGridLines: { width: 1 },
              minorTickLines: { width: 0 },
              labelFormat: "{value}B"
            }}
            width={Browser.isDevice ? "100%" : "60%"}
            chartArea={{ border: { width: 0 } }}
            // load={this.load.bind(this)}
            title="Expense"
            // loaded={this.onChartLoad.bind(this)}
            tooltip={{ enable: true }}
          >
            <Inject
              services={[StackingColumnSeries, Category, Legend, Tooltip]}
            />
            <SeriesCollectionDirective>
              {/* <SeriesDirective
                dataSource={this.dataManager}
                xName="Assignee"
                type="Column"
                yName="Estimate"
                name="Sales"
                query={this.query}
              /> */}
              <SeriesDirective
                dataSource={data1}
                xName="x"
                yName="y"
                name="UK"
                type="StackingColumn"
              ></SeriesDirective>
              <SeriesDirective
                dataSource={data2}
                xName="x"
                yName="y"
                name="Germany"
                type="StackingColumn"
              ></SeriesDirective>
              <SeriesDirective
                dataSource={data3}
                xName="x"
                yName="y"
                name="France"
                type="StackingColumn"
              ></SeriesDirective>
              <SeriesDirective
                dataSource={data4}
                xName="x"
                yName="y"
                name="Italy"
                type="StackingColumn"
              ></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    );
  }
  //   onChartLoad(args) {
  //     let chart = document.getElementById("charts");
  //     chart.setAttribute("title", "");
  //   }
}
