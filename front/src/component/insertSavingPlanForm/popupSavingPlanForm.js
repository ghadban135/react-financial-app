import React, { Component } from "react";
import "./insertSavingPlanForm.css";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  //   MDBModalBody,
  //   MDBModalHeader,
  //   MDBModalFooter
} from "mdbreact";

import SavingPlanForm from "./insertSavingPlanForm";

class PopupSavingPlanForm extends Component {
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
        <MDBBtn className="popupSavingPlan" onClick={this.toggle}>
          add new saving Plan
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <SavingPlanForm handleClose={this.toggle} />
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default PopupSavingPlanForm;
