import React, { Component } from "react";
import NewTable from "../../component/newtable";
import SavingPlanForm from "../../component/insertSavingPlanForm/popupSavingPlanForm";
import Swal from "sweetalert2";
import Select from "react-select";
import { Line } from "rc-progress";
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

class savingPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editValueIndex: "",
      editValueTitle: "",
      editValueAmount: "",
      editValueInterval: "",
      editValueIntervalValue: "",
      editValueIntervalLabel: "",
      editValueStartDate: "",
      editValueEndDate: "",
      show: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeInterval = (editValueInterval) => {
    this.setState({
      editValueInterval,
      editValueIntervalValue: editValueInterval.value,
      editValueIntervalLabel: editValueInterval.label,
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
    const body = new FormData();
    body.append("title", this.state.editValueTitle);
    body.append("start_date", this.state.editValueStartDate);
    body.append("end_date", this.state.editValueEndDate);
    body.append("amount", this.state.editValueAmount);
    body.append("interval", this.state.editValueIntervalLabel);
    body.append("categories_id", 1);
    body.append("type", "saving expense");
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
      editValueAmount: "",
      editValueStartDate: "",
      editValueEndDate: "",
      editValueIntervalLabel: "",
    });
    if (result.success)
      Swal.fire("Good job!", "Saving Plan Edit Successfully", "success");

    this.getSavingPlan();
    this.handleClose();
  };
  getSavingPlan = async () => {
    const response = await fetch(`http://localhost:8000/api/savingPlans`, {
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
          const currentSaving = {
            id: item.id,
            title: item.title,
            amount: item.amount,
            interval: item.interval,
            start_date: item.start_date,
            end_date: item.end_date,
          };
          return currentSaving;
        }),
      });
    }
  };
  async componentDidMount() {
    this.getSavingPlan();
  }
  render() {
    const intervalOptions = [
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
    ];
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
        name: "amount",
        label: "Amount",
      },
      {
        name: "interval",
        label: "Interval",
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
        name: "progress",
        label: "Progress",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            let per =
              ((Date.parse(currentDate) - Date.parse(tableMeta.rowData[5])) /
                (Date.parse(tableMeta.rowData[6]) -
                  Date.parse(tableMeta.rowData[5]))) *
              100;
            return (
              <Line
                strokeWidth="5"
                percent={per < 0 ? 0 : per > 100 ? 100 : per}
                strokeColor={per >= 100 ? "#85D262" : "#3FC7FA"}
              />
            );
          },
        },
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
                      editValueAmount: tableMeta.rowData[3],
                      editValueIntervalLabel: tableMeta.rowData[4],
                      editValueStartDate: tableMeta.rowData[5],
                      editValueEndDate: tableMeta.rowData[6],
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
                      Edit Saving Plan
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
                          // value={this.state.editValueInterval}
                          defaultValue={[
                            {
                              value: this.state.editValueIntervalLabel,
                              label: this.state.editValueIntervalLabel,
                            },
                          ]}
                          onChange={this.handleChangeInterval}
                          options={intervalOptions}
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
                              // max={currentDate}
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
        <SavingPlanForm getSavingPlan={() => this.getSavingPlan()} />
        <div style={{ height: "450px" }}>
          <NewTable
            title="Saving Table"
            data={this.state.data}
            columns={columns}
          />
        </div>
      </>
    );
  }
}
export default savingPlan;
