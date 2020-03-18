import React from "react";
import "./transactionTable.css";
class incomeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ title: "bb" }, { title: "cc" }]
    };
  }
  render() {
    return (
      <table id="incomeTable">
        <tr>
          <th>title</th>
          <th>description</th>
          <th>amount</th>
          <th>category</th>
          <th>start date</th>
          <th>end date</th>
          <th>interval</th>
          <th>type</th>
          <th>currency</th>
        </tr>
        {this.state.data.map((item, index) => (
          <tr>
            <td>{item.title}</td>
          </tr>
        ))}
      </table>
    );
  }
}

export default incomeTable;
