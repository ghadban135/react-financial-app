import React, { Component } from "react";
import { MDBContainer, MDBBtn, MDBModal } from "mdbreact";
import ExpenseForm from "./insertExpenseForm";
import "./insertExpenseForm.css";

class PopupExpenseForm extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  render() {
    return (
      <MDBContainer>
        <MDBBtn className="popupExpense" onClick={this.toggle}>
          add new expense
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <ExpenseForm
            getExpenses={this.props.getExpenses}
            handleClose={this.toggle}
          ></ExpenseForm>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default PopupExpenseForm;
