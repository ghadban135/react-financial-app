import React from "react";
// import axios from 'axios';
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

class SignIN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("email", this.state.email);
    body.append("password", this.state.password);
    const response = await fetch(`http://localhost:8000/api/login`, {
      method: "POST",
      body,
    });

    const result = await response.json();
    console.log(result);
    this.setState({ email: "", password: "" });
    // debugger;
    if (result.access_token) {
      localStorage.setItem("token", result.access_token);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    }
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ color: "black" }}>
        <MDBModalBody>
          <div>
            <h5>Add your email :</h5>
            <MDBInput
              type="email"
              label="E-mail address"
              //   background
              outline
              icon="envelope"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <hr />
          <div>
            <h5>Add your password :</h5>
            <MDBInput
              type="password"
              label="Password"
              outline
              icon="lock"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" type="submit">
            Save changes
          </MDBBtn>
        </MDBModalFooter>
      </form>
    );
  }
}

export default SignIN;
