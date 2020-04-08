import React, { Component } from "react";
import NewTable from "../../component/newtable";
import AddCategory from "../../component/addCategory/addCategory";
import PopupIncomeForm from "../../component/insertIncomeForm/popupIncomeForm";
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

class income extends React.Component {
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
    body.append("type", "income");
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
      Swal.fire("Good job!", "Income Edit Successfully", "success");

    this.getIncomes();
    this.handleClose();
  };

  getIncomes = async () => {
    const response = await fetch(`http://localhost:8000/api/incomes`, {
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
          const currentIncome = {
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category.name,
            amount: item.amount,
            start_date: item.start_date,
            end_date: item.end_date,
          };
          return currentIncome;
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
  async componentDidMount() {
    this.getIncomes();
    this.getCategories();
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
          <PopupIncomeForm getIncomes={() => this.getIncomes()} />
          <AddCategory />
        </div>
        <NewTable
          title="Income Table"
          data={this.state.data}
          columns={columns}
        />
      </>
    );
  }
}
export default income;
