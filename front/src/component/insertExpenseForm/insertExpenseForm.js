import React from "react";
import Select from "react-select";
import "./insertExpenseForm.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBFormInline
} from "mdbreact";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
const currencyOptions = [
  { value: "DOLLAR", label: "$" },
  { value: "LBP", label: "LBP" },
  { value: "EURO", label: "€" }
];

class ExpenseForm extends React.Component {
  state = {
    dueDate: "none",
    radio: "",
    selectedOption: null,
    selectedCurrencyOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeCurrency = selectedCurrencyOption => {
    this.setState({ selectedCurrencyOption });
    console.log(`currency selected:`, selectedCurrencyOption);
  };

  onClick = (nr, dis) => () => {
    this.setState({
      radio: nr,
      dueDate: dis
    });
  };
  render() {
    const { selectedOption } = this.state;
    const { selectedCurrencyOption } = this.state;
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

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4">Add New Expense</p>
                  <div className="grey-text">
                    <MDBRow center>
                      <MDBInput
                        style={{ width: "67%", marginBottom: "0" }}
                        label="Title"
                        icon="book-open"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBRow>
                        <div>
                          <MDBInput
                            label="Date"
                            icon="calendar-alt"
                            // size="lg"
                            group
                            type="date"
                            validate
                            error="wrong"
                            success="right"
                            max={currentDate}
                          />
                        </div>
                        <div
                          style={{
                            display: this.state.dueDate,
                            marginLeft: "25px"
                          }}
                        >
                          <MDBInput
                            label="Due Date"
                            icon="calendar-alt"
                            // size="lg"
                            group
                            type="date"
                            validate
                            error="wrong"
                            success="right"
                          />
                        </div>
                      </MDBRow>
                    </MDBRow>
                    <MDBRow center>
                      <div
                        style={{
                          width: "80%"
                        }}
                      >
                        {/* <MDBIcon icon="list-ol" size="lg" /> */}
                        <Select
                          value={selectedOption}
                          onChange={this.handleChange}
                          options={options}
                          placeholder="category..."
                        />
                      </div>
                    </MDBRow>
                    <MDBRow
                      center
                      style={{
                        margin: "10px -15px"
                      }}
                    >
                      <MDBInput
                        style={{
                          width: "70%",
                          marginBottom: "0"
                        }}
                        label="Amount"
                        icon="money-bill-alt"
                        //outline
                        group
                        type="number"
                        validate
                      />
                      <div
                        style={{
                          paddingTop: "6%",
                          width: "25%"
                        }}
                      >
                        <Select
                          value={selectedCurrencyOption}
                          onChange={this.handleChangeCurrency}
                          options={currencyOptions}
                          placeholder="Currency"
                        />
                      </div>
                    </MDBRow>
                    <MDBFormInline style={{ paddingLeft: "28%" }}>
                      <MDBInput
                        onClick={this.onClick(1, "none")}
                        checked={this.state.radio === 1 ? true : false}
                        label="Fixed"
                        type="radio"
                        id="radio1"
                        containerClass="mr-5"
                      />
                      <MDBInput
                        gap
                        onClick={this.onClick(2, "")}
                        checked={this.state.radio === 2 ? true : false}
                        label="Recurring"
                        type="radio"
                        id="radio2"
                        containerClass="mr-5"
                      />
                    </MDBFormInline>
                    <MDBInput
                      outline
                      type="textarea"
                      rows="2"
                      label="Your message"
                      icon="pencil-alt"
                    />
                  </div>
                  <div className="text-center py-4 mt-3 expenseButtonPad">
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

export default ExpenseForm;
