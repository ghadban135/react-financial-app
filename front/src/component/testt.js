import React from "react";
import MUIDataTable from "mui-datatables";

class Test extends React.Component {
  render() {
    const columns = [
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "company",
        label: "Company",
        options: {
          filter: true,
          sort: false
        }
      },
      {
        name: "city",
        label: "City",
        options: {
          filter: true,
          sort: false,
          filterType: "textField"
        }
      },
      {
        name: "state",
        label: "State",
        options: {
          filter: true,
          sort: false
        }
      }
    ];

    const data = [
      { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
      {
        name: "John Walsh",
        company: "Test Corp",
        city: "Hartford",
        state: "CT"
      },
      { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
      {
        name: "James Houston",
        company: "Test Corp",
        city: "Dallas",
        state: "TX"
      },
      { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
      {
        name: "John Walsh",
        company: "Test Corp",
        city: "Hartford",
        state: "CT"
      },
      { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
      {
        name: "James Houston",
        company: "Test Corp",
        city: "Dallas",
        state: "TX"
      },
      { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
      {
        name: "John Walsh",
        company: "Test Corp",
        city: "Hartford",
        state: "CT"
      },
      { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
      {
        name: "James Houston",
        company: "Test Corp",
        city: "Dallas",
        state: "TX"
      }
    ];

    const options = {
      filterType: "dropdown",
      pagination: true,
      rowsPerPage: 7,
      rowsPerPageOptions: [5, 10, 15, 20],
      searchPlaceholder: "Search ..."
    };
    return (
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  }
}
export default Test;
