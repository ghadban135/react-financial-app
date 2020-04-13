import React, { Component } from "react";
import NewTable from "../../component/newtable";
import AddCategory from "../../component/addCategory/addCategory";
import PopupExpenseForm from "../../component/insertExpenseForm/popupExpenseForm";
import Swal from "sweetalert2";
import Select from "react-select";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
} from "mdbreact";
import PieChart22 from "../../component/pieChart/pieChart22";
import BarChart22 from "../../component/barChart/barChart22";

class expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editValueIndex: "",
      editValueTitle: "",
      editValueDescription: "",
      editValueCategory: "",
      editValueCategoryIndex: "",
      editValueAmount: "",
      editValueStartDate: "",
      editValueEndDate: "",
      show: false,
      CategoryOptions: [],
      selectedPieMonth: { value: 1, label: "Jan" },
      selectedPieYear: { value: 2020, label: 2020 },
      // selectedPieMonth: [],
      // selectedPieYear:
      //   { label: new Date().getFullYear(), value: new Date().getFullYear() },
      selectedBarYear: { value: 2020, label: 2020 },
      pieValue: [],
      barValue: [],
    };
  }
  getIndexOfCategory = () => {
    let index = this.state.CategoryOptions.findIndex(
      (x) => x.label === this.state.editValueCategory
    );
    this.setState({
      editValueCategoryIndex: this.state.CategoryOptions[index].value,
    });
    // debugger;
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeCategory = (editValueCategoryAll) => {
    this.setState({
      editValueCategoryAll,
      editValueCategoryIndex: editValueCategoryAll.value,
      editValueCategory: editValueCategoryAll.label,
    });
    // debugger;
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    await this.getIndexOfCategory();
    const body = new FormData();
    body.append("title", this.state.editValueTitle);
    body.append("start_date", this.state.editValueStartDate);
    body.append("end_date", this.state.editValueEndDate);
    body.append("amount", this.state.editValueAmount);
    body.append("description", this.state.editValueDescription);
    body.append("categories_id", this.state.editValueCategoryIndex);
    body.append("type", "expense");
    // debugger;
    const response = await fetch(
      `http://localhost:8000/api/transaction/${this.state.editValueIndex}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
        },
        body,
      }
    );
    const result = await response.json();
    this.setState({
      editValueIndex: "",
      editValueTitle: "",
      editValueDescription: "",
      editValueCategory: "",
      editValueAmount: "",
      editValueStartDate: "",
      editValueEndDate: "",
      editValueCategoryIndex: "",
    });
    if (result.success)
      Swal.fire("Good job!", "Expense Edit Successfully", "success");

    this.getExpenses();
    this.handleClose();
  };

  getExpenses = async () => {
    const response = await fetch(`http://localhost:8000/api/expenses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
    });

    const result = await response.json();
    // debugger;
    if (result.success) {
      this.setState({
        data: result.transactions.map((item) => {
          const currentExpense = {
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category.name,
            amount: item.amount,
            start_date: item.start_date,
            end_date: item.end_date,
          };
          return currentExpense;
        }),
      });
    }
  };
  getCategories = async () => {
    const response = await fetch(`http://localhost:8000/api/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      this.setState({
        CategoryOptions: result.categories.map((item) => {
          const currentCategory = {
            value: item.id,
            label: item.name,
          };
          return currentCategory;
        }),
      });
    }
  };

  PieFilter = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/pieChartMonth?year=${this.state.selectedPieYear.value}&month=${this.state.selectedPieMonth.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
        },
      }
    );
    // debugger;
    const result = await response.json();
    if (result.success) {
      let incomeValue = result.transactions
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
  };
  BarFilter = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/api/barChartExpense?year=${this.state.selectedBarYear.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: "application/json",
        },
      }
    );

    const result = await response.json();
    if (result.success) {
      let incomeValue = result.transactions;
      this.setState({
        barValue: incomeValue,
      });
    }
    // debugger;
  };

  async componentDidMount() {
    this.getExpenses();
    this.getCategories();
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
    if (result.success) {
      let incomeValue = result.transactions;
      this.setState({
        barValue: incomeValue,
      });
    }
    //bar
    //pie
    const response1 = await fetch(
      `http://localhost:8000/api/pieChartMonth?year=${2020}&month=${1}`,
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
    let yyyy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    let currentDate = yyyy + "-" + mm + "-" + dd;

    const MonthOptions = [
      // { value: 0, label: "All" },
      { value: 1, label: "Jan" },
      { value: 2, label: "Feb" },
      { value: 3, label: "Mar" },
      { value: 4, label: "Apr" },
      { value: 5, label: "May" },
      { value: 6, label: "Jun" },
      { value: 7, label: "Jul" },
      { value: 8, label: "Aug" },
      { value: 9, label: "Sep" },
      { value: 10, label: "Oct" },
      { value: 11, label: "Nov" },
      { value: 12, label: "Dec" },
    ];
    const YearOptions = [
      { value: 2019, label: 2019 },
      { value: 2020, label: 2020 },
      { value: 2021, label: 2021 },
      { value: 2022, label: 2022 },
      { value: 2023, label: 2023 },
      { value: 2024, label: 2024 },
    ];

    const columns = [
      {
        name: "id",
        label: "ID",
        options: {
          display: false,
          filter: false,
          viewColumns: false,
        },
      },
      {
        name: "",
        label: "",
        options: {
          filter: false,
          viewColumns: false,
        },
      },
      {
        name: "title",
        label: "Title",
      },
      {
        name: "description",
        label: "Description",
      },
      {
        name: "category",
        label: "Category",
      },
      {
        name: "amount",
        label: "Amount",
      },
      {
        name: "start_date",
        label: "Start Date",
      },
      {
        name: "end_date",
        label: "End Date",
      },
      {
        // name: "Edit",
        name: "",
        options: {
          filter: false,
          sort: false,
          viewColumns: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            // debugger;
            return (
              <div>
                <MDBBtn
                  // outline
                  size="sm"
                  color="cyan"
                  onClick={() => {
                    this.setState({
                      editValueIndex: tableMeta.rowData[0],
                      editValueTitle: tableMeta.rowData[2],
                      editValueDescription: tableMeta.rowData[3],
                      editValueCategory: tableMeta.rowData[4],
                      editValueAmount: tableMeta.rowData[5],
                      editValueStartDate: tableMeta.rowData[6],
                      editValueEndDate: tableMeta.rowData[7],
                    });
                    // debugger;
                    this.handleShow();
                  }}
                >
                  Edit
                </MDBBtn>
                {this.state.show && (
                  <MDBModal
                    isOpen={this.state.show}
                    // size="lg"
                    // centered
                    // fullHeight
                    position="right"
                    backdrop={false}
                  >
                    <MDBModalHeader toggle={this.handleClose}>
                      Edit Expense
                    </MDBModalHeader>
                    <form onSubmit={this.onSubmit}>
                      <MDBModalBody>
                        <MDBRow>
                          <MDBCol>
                            <h5>Add new title :</h5>
                            <MDBInput
                              style={{ width: "70%", marginBottom: "0px" }}
                              label="new title"
                              icon="book-open"
                              required
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              name="editValueTitle"
                              value={this.state.editValueTitle}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol>
                            <h5>Add new amount :</h5>
                            <MDBInput
                              style={{
                                width: "70%",
                                marginBottom: "0px",
                              }}
                              label="new amount .."
                              icon="money-bill-alt"
                              group
                              type="number"
                              validate
                              required
                              name="editValueAmount"
                              value={this.state.editValueAmount}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <Select
                          // isClearable
                          value={this.state.editValueCategoryAll}
                          // defaultInputValue={this.state.editValueCategory}
                          defaultValue={[
                            {
                              value: this.state.editValueCategoryIndex,
                              label: this.state.editValueCategory,
                            },
                          ]}
                          onChange={this.handleChangeCategory}
                          options={this.state.CategoryOptions}
                          placeholder="New Category..."
                        />
                        <MDBRow style={{ marginTop: "20px" }}>
                          <MDBCol>
                            <MDBInput
                              style={{ marginBottom: "0px" }}
                              label="New Start Date"
                              icon="calendar-alt"
                              group
                              type="date"
                              validate
                              required
                              error="wrong"
                              success="right"
                              max={currentDate}
                              name="editValueStartDate"
                              value={this.state.editValueStartDate}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                          <MDBCol>
                            <MDBInput
                              style={{ marginBottom: "0px" }}
                              label="New End Date"
                              icon="calendar-alt"
                              group
                              type="date"
                              validate
                              error="wrong"
                              success="right"
                              name="editValueEndDate"
                              value={this.state.editValueEndDate}
                              onChange={this.handleChange}
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBInput
                          style={{ marginTop: "-20px", marginBottom: "-20px" }}
                          outline
                          type="textarea"
                          rows="2"
                          label="Your message"
                          icon="pencil-alt"
                          name="editValueDescription"
                          value={this.state.editValueDescription}
                          onChange={this.handleChange}
                        />
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.handleClose}>
                          Close
                        </MDBBtn>
                        <MDBBtn color="primary" type="submit">
                          Save changes
                        </MDBBtn>
                      </MDBModalFooter>
                    </form>
                  </MDBModal>
                )}
              </div>
            );
          },
        },
      },
      {
        // name: "Delete",
        name: "",
        options: {
          filter: false,
          sort: false,
          viewColumns: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <MDBBtn
                // outline
                color="danger"
                size="sm"
                onClick={async (e) => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You will not be able to recover this Category !",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, keep it",
                  }).then(async (result) => {
                    if (result.value) {
                      const response = await fetch(
                        `http://localhost:8000/api/transaction/${tableMeta.rowData[0]}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${localStorage.token}`,
                            Accept: "application/json",
                          },
                        }
                      ).then(async () => {
                        this.setState({
                          data: this.state.data.filter(function (data) {
                            return data.id !== tableMeta.rowData[0];
                          }),
                        });
                        // this.getExpenses();
                        Swal.fire(
                          "Deleted!",
                          "Your Category has been deleted.",
                          "success"
                        );
                      });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        "Cancelled",
                        "Your Category is safe :)",
                        "error"
                      );
                    }
                  });
                }}
              >
                {/* <MDBIcon icon="trash-alt" className="mr-1" /> */}
                Delete
              </MDBBtn>
            );
          },
        },
      },
    ];

    return (
      <>
        <div style={{ display: "flex" }}>
          <PopupExpenseForm getExpenses={() => this.getExpenses()} />
          <AddCategory />
        </div>
        <div style={{ height: "450px" }}>
          <NewTable
            title="Expense Table"
            data={this.state.data}
            columns={columns}
          />
        </div>
        <br />
        <div style={{ width: "100%", textAlign: "center", fontWeight: "400" }}>
          Expenses Breakdown <hr />
        </div>
        <div
          className="chartContainer"
          style={{ justifyContent: "space-around" }}
        >
          <div style={{ display: "flex", marginRight: "110px" }}>
            <div style={{ display: "flex", marginRight: "20px" }}>
              <h5 style={{ marginTop: "5px" }}>Year:</h5>&nbsp;
              <div style={{ width: "110px" }}>
                <Select
                  value={this.state.selectedPieYear}
                  // defaultValue={{ label: 2020, value: 2020 }}
                  //when i use defaultValue i shouldn't use Value
                  onChange={(value) => {
                    this.setState({
                      selectedPieYear: {
                        value: value.value,
                        label: value.label,
                      },
                    });
                  }}
                  options={YearOptions}
                  placeholder="Year..."
                />
              </div>
            </div>
            <div style={{ display: "flex", marginRight: "10px" }}>
              <h5 style={{ marginTop: "5px" }}>Month:</h5>&nbsp;
              <div style={{ width: "110px" }}>
                <Select
                  menuPlacement="auto"
                  menuPosition="fixed"
                  value={this.state.selectedPieMonth}
                  // defaultValue={[{ value: 0, label: "All" }]}
                  onChange={(value) => {
                    this.setState({
                      selectedPieMonth: {
                        value: value.value,
                        label: value.label,
                      },
                    });
                  }}
                  options={MonthOptions}
                  placeholder="Month..."
                />
              </div>
            </div>
            <MDBBtn
              style={{ top: "-5px", padding: "8px 25px" }}
              outline
              size="sm"
              color="info"
              onClick={this.PieFilter}
            >
              Filter
            </MDBBtn>
          </div>
          <div style={{ marginRight: "150px", display: "flex" }}>
            <h5 style={{ marginTop: "5px" }}>Year:</h5>&nbsp;
            <div style={{ width: "110px", marginRight: "10px" }}>
              <Select
                value={this.state.selectedBarYear}
                onChange={(value) => {
                  this.setState({
                    selectedBarYear: {
                      value: value.value,
                      label: value.label,
                    },
                  });
                }}
                options={YearOptions}
                placeholder="Year..."
              />
            </div>
            <MDBBtn
              style={{ top: "-5px", padding: "8px 25px" }}
              outline
              size="sm"
              color="info"
              onClick={this.BarFilter}
            >
              Filter
            </MDBBtn>
          </div>
        </div>
        <div className="chartContainer"></div>
        <div className="chartContainer">
          <PieChart22 transaction={this.state.pieValue} />
          <BarChart22
            side="Expense"
            title="Expense per year including saving plans"
            transaction={this.state.barValue}
          />
        </div>
      </>
    );
  }
}
export default expense;
