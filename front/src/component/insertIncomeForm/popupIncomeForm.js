import React, { Component } from "react";
import { MDBContainer, MDBBtn, MDBModal } from "mdbreact";
import "./insertIncomeForm.css";
import IncomeForm from "./insertIncomeForm";

class PopupIncomeForm extends Component {
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
        <MDBBtn onClick={this.toggle} className="popupIncome">
          add new income
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <IncomeForm handleClose={this.toggle} />
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default PopupIncomeForm;
