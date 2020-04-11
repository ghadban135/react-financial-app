import React, { Component } from "react";
import Select from "react-select";
import NewTable from "../../component/newtable";
import Swal from "sweetalert2";

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

const CurrencyOptions = [
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
];

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: null,
      data: [],
      show: false,
      name: "",
      editValueIndex: "",
      editValue: "",
      // token: ""
    };
  }

  onChangeCategoryName = (e) => {
    this.setState({ editValue: e.target.value });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  handleCurrencyChange = (selectedCurrency) => {
    this.setState({ selectedCurrency });
    console.log(`Option selected:`, selectedCurrency);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("name", this.state.editValue);
    // debugger;
    const response = await fetch(
      `http://localhost:8000/api/category/${this.state.editValueIndex}`,
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
    this.setState({ editValue: "" });
    if (result.success)
      Swal.fire("Good job!", "Category Edit Successfully", "success");

    this.getCategories();
    this.handleClose();
  };

  getCategories = async () => {
    // const token = localStorage.token;
    const response = await fetch(`http://localhost:8000/api/categories`, {
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
        data: result.categories.map((item) => {
          const currentCategory = {
            id: item.id,
            name: item.name,
          };
          return currentCategory;
        }),
      });
    }
  };

  async componentDidMount() {
    this.getCategories();
    // const token = localStorage.token;
    // const token = localStorage.getItem("token"); //same as above
    // this.setState({ token });
    // debugger;
  }
  render() {
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
        name: "name",
        label: "Name",
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
                      editValue: tableMeta.rowData[1],
                    });
                    this.handleShow();
                  }}
                >
                  Edit
                </MDBBtn>
                {this.state.show && (
                  <MDBModal
                    isOpen={this.state.show}
                    // side
                    // frame
                    // centered
                    position="right"
                    backdrop={false}
                  >
                    <MDBModalHeader toggle={this.handleClose}>
                      Edit Category
                    </MDBModalHeader>
                    <form onSubmit={this.onSubmit}>
                      <MDBModalBody>
                        <div style={{ display: "flex" }}>
                          <h5>Add new category :</h5>
                          &nbsp;
                          <input
                            type="text"
                            placeholder="ADD Category .."
                            value={this.state.editValue}
                            onChange={this.onChangeCategoryName}
                          />
                        </div>
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
                onClick={async () => {
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
                        `http://localhost:8000/api/category/${tableMeta.rowData[0]}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${localStorage.token}`,
                            Accept: "application/json",
                          },
                        }
                      ).then(async () => {
                        /* i should take a response after delete and make if condition 
                        to take this setState else i should pop up a message you can't 
                        delete this category because you used in transaction */
                        this.setState({
                          data: this.state.data.filter(function (data) {
                            return data.id !== tableMeta.rowData[0];
                          }),
                        });
                        // this.getCategories();
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

    const { selectedCurrency } = this.state;
    return (
      <MDBContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              width: "40%",
              padding: "40px",
              // backgroundColor: "#efefef",
              boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
            }}
          >
            <h4>General Settings</h4>
            <hr />
            <form onSubmit={this.onSubmit1}>
              <MDBInput
                label="System Name"
                type="text"
                valueDefault="Financial App"
                validate
              />
              <Select
                value={selectedCurrency}
                onChange={this.handleCurrencyChange}
                options={CurrencyOptions}
                placeholder="Display Currency"
              />
              <br />
              <input
                type="submit"
                value="Submit"
                className="btn btn-outline-primary "
              />
            </form>
          </div>
          <div
            style={{
              margin: "30px 0",
              height: "450px",
            }}
          >
            <NewTable
              title="Category"
              data={this.state.data}
              columns={columns}
            />
          </div>
        </div>
      </MDBContainer>
    );
  }
}
export default Setting;
