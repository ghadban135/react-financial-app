import React from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import "./insertExpenseForm.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBFormInline,
} from "mdbreact";

// const CategoryOptions = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" }
// ];
const currencyOptions = [
  { value: "DOLLAR", label: "$" },
  { value: "LBP", label: "LBP" },
  { value: "EURO", label: "€" },
];

class ExpenseForm extends React.Component {
  state = {
    showDueDate: "none",
    radio: "",
    selectedCategory: "",
    selectedCurrencyOption: "",
    CategoryOptions: [],
    type: "expense",
    title: "",
    StartDate: "",
    DueDate: "",
    amount: "",
    description: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleChangeCategory = (selectedCategory) => {
    this.setState({ selectedCategory });
    console.log(`Option selected:`, selectedCategory);
  };
  handleChangeCurrency = (selectedCurrencyOption) => {
    this.setState({ selectedCurrencyOption });
    console.log(`currency selected:`, selectedCurrencyOption);
  };

  onClick = (nr, dis) => () => {
    this.setState({
      radio: nr,
      showDueDate: dis,
    });
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
  onSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    // debugger;
    body.append("title", this.state.title);
    body.append("start_date", this.state.StartDate);
    body.append("end_date", this.state.DueDate);
    body.append("amount", this.state.amount);
    body.append("description", this.state.description);
    body.append("type", this.state.type);
    body.append("categories_id", this.state.selectedCategory.value);
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
      StartDate: "",
      DueDate: null,
      amount: "",
      description: "",
      selectedCategory: "",
    });
    if (result.success) {
      this.closeModal();
      Swal.fire("Good job!", "Expense Added Successfully", "success");
    }
  };
  closeModal() {
    this.props.handleClose();
  }

  async componentDidMount() {
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

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <p className="h4 text-center py-4">Add New Expense</p>
                  <div className="grey-text">
                    <MDBRow center>
                      <MDBInput
                        style={{ width: "67%", marginBottom: "0" }}
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
                      <MDBRow>
                        <div>
                          <MDBInput
                            label="Date"
                            icon="calendar-alt"
                            // size="lg"
                            group
                            type="date"
                            validate
                            required
                            error="wrong"
                            success="right"
                            max={currentDate}
                            name="StartDate"
                            value={this.state.StartDate}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div
                          style={{
                            display: this.state.showDueDate,
                            marginLeft: "25px",
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
                            name="DueDate"
                            value={this.state.DueDate}
                            onChange={this.handleChange}
                          />
                        </div>
                      </MDBRow>
                    </MDBRow>
                    <MDBRow center>
                      <div
                        style={{
                          width: "80%",
                        }}
                      >
                        {/* <MDBIcon icon="list-ol" size="lg" /> */}
                        <Select
                          value={this.state.selectedCategory}
                          onChange={this.handleChangeCategory}
                          options={this.state.CategoryOptions}
                          placeholder="category..."
                        />
                      </div>
                    </MDBRow>
                    <MDBRow
                      center
                      style={{
                        margin: "10px -15px",
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
                          paddingTop: "6%",
                          width: "25%",
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
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
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
