import React from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import "./insertSavingPlanForm.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

const intervalOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];
const currencyOptions = [
  { value: "DOLLAR", label: "$" },
  { value: "LBP", label: "LBP" },
  { value: "EURO", label: "€" },
];

class SavingPlanForm extends React.Component {
  state = {
    selectedIntervalOption: "",
    selectedCurrencyOption: "",
    type: "saving expense",
    title: "",
    DueDate: "",
    amount: "",
    currentDate: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeInterval = (selectedIntervalOption) => {
    this.setState({ selectedIntervalOption });
    console.log(`Option selected:`, selectedIntervalOption);
  };
  handleChangeCurrency = (selectedCurrencyOption) => {
    this.setState({ selectedCurrencyOption });
    console.log(`currency selected:`, selectedCurrencyOption);
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    // debugger;
    body.append("title", this.state.title);
    body.append("start_date", this.state.currentDate);
    body.append("end_date", this.state.DueDate);
    body.append("amount", this.state.amount);
    body.append("type", this.state.type);
    body.append("categories_id", 1);
    //we should not insert category to saving plans or any category id and not used
    body.append("interval", this.state.selectedIntervalOption.value);
    body.append("currencies_id", 1);
    // debugger;
    //we need to fix currencies like categories or get currency from user
    const response = await fetch(`http://localhost:8000/api/transaction`, {
      method: "POST",
      body,
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const result = await response.json();
    this.setState({
      title: "",
      DueDate: "",
      amount: "",
      selectedIntervalOption: "",
    });
    if (result.success) {
      this.props.getSavingPlan();
      this.closeModal();
      Swal.fire("Good job!", "Saving Goal Added Successfully", "success");
    }
  };
  closeModal() {
    this.props.handleClose();
  }
  currentDate() {
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
    this.setState({ currentDate });
  }
  async componentDidMount() {
    this.currentDate();
  }
  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <p className="h4 text-center py-4">Goal Saving</p>
                  <div className="grey-text">
                    <MDBRow around>
                      <MDBInput
                        style={{ marginBottom: "0" }}
                        label="Title"
                        icon="book-open"
                        required
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                      <div>
                        <MDBInput
                          label="Due date"
                          icon="calendar-alt"
                          // size="lg"
                          group
                          type="date"
                          validate
                          min={this.state.currentDate}
                          required
                          error="wrong"
                          success="right"
                          name="DueDate"
                          value={this.state.DueDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </MDBRow>
                    <MDBRow center>
                      <div
                        style={{
                          width: "80%",
                        }}
                      >
                        {/* <MDBIcon icon="list-ol" size="lg" /> */}
                        <Select
                          value={this.state.selectedIntervalOption}
                          onChange={this.handleChangeInterval}
                          options={intervalOptions}
                          placeholder="Achieved in ..."
                        />
                      </div>
                    </MDBRow>
                    <MDBRow
                      center
                      style={{
                        margin: "10px -30px",
                      }}
                    >
                      <MDBInput
                        style={{
                          width: "70%",
                          marginBottom: "0",
                        }}
                        label="Amount"
                        icon="money-bill-alt"
                        //outline
                        group
                        type="number"
                        validate
                        required
                        name="amount"
                        value={this.state.amount}
                        onChange={this.handleChange}
                      />
                      <div
                        style={{
                          marginLeft: "5%",
                          paddingTop: "6%",
                          width: "28%",
                        }}
                      >
                        <Select
                          value={this.state.selectedCurrencyOption}
                          onChange={this.handleChangeCurrency}
                          options={currencyOptions}
                          placeholder="Currency"
                        />
                      </div>
                    </MDBRow>
                  </div>
                  <div className="text-center py-4 mt-3 SavingButtonPad">
                    <MDBBtn color="cyan" type="submit">
                      Save
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SavingPlanForm;
