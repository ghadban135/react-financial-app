import React from "react";
import Select from "react-select";
import "./insertSavingPlanForm.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

const options = [
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" }
];
const currencyOptions = [
  { value: "DOLLAR", label: "$" },
  { value: "LBP", label: "LBP" },
  { value: "EURO", label: "€" }
];

class SavingPlanForm extends React.Component {
  state = {
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

  render() {
    const { selectedOption } = this.state;
    const { selectedCurrencyOption } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4">Goal Saving</p>
                  <div className="grey-text">
                    <MDBRow around>
                      <MDBInput
                        style={{ marginBottom: "0" }}
                        label="Title"
                        icon="book-open"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                      />
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
                        />
                      </div>
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
                          placeholder="Achieved in ..."
                        />
                      </div>
                    </MDBRow>
                    <MDBRow
                      center
                      style={{
                        margin: "10px -30px"
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
                          marginLeft: "5%",
                          paddingTop: "6%",
                          width: "28%"
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
