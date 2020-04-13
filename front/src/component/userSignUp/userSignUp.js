import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
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
import SignIN from "../signin/signin";

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: "",
      email: "",
      password: "",
      image: "qwerty",
      currencies_id: 1,
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    body.append("name", this.state.name);
    body.append("email", this.state.email);
    body.append("password", this.state.password);
    body.append("image", this.state.image);
    body.append("currencies_id", this.state.currencies_id);
    const response = await fetch(`http://localhost:8000/api/register`, {
      method: "POST",
      body,
    });

    const result = await response.json();
    // console.log(result);
    this.setState({ email: "", password: "", email: "", image: "" });
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
      window.location = '/dashboard'
    } else {
      Swal.fire("Cancelled", " Invalid Email or password.", "error");
    }
  };
  render() {
    // const FormPage = () => {
    return (
      <MDBContainer>
        <form onSubmit={this.onSubmit}>
          <MDBRow>
            <MDBCol md="6">
              <MDBCard
                className="card-image"
                style={{
                  backgroundImage:
                    "url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)",
                  width: "24rem",
                }}
              >
                <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                  <div className="text-center">
                    <h3 className="white-text mb-5 mt-4 font-weight-bold">
                      <strong>SIGN</strong>
                      <strong className="green-text"> UP</strong>
                    </h3>
                  </div>
                  <MDBInput
                    label="Your name"
                    group
                    type="text"
                    validate
                    labelClass="white-text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    label="Your email"
                    group
                    type="text"
                    validate
                    labelClass="white-text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    validate
                    labelClass="white-text"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <MDBRow className="d-flex align-items-center mb-4">
                    <div className="text-center mb-3 col-md-12">
                      <MDBBtn
                        color="success"
                        rounded
                        type="submit"
                        className="btn-block z-depth-1"
                      >
                        Sign up
                      </MDBBtn>
                    </div>
                  </MDBRow>
                  <MDBCol md="12">
                    <p className="font-small white-text d-flex justify-content-end">
                      Have an account?
                      <MDBBtn
                        // outline
                        style={{ margin: "-4px", marginLeft: "5px" }}
                        size="sm"
                        color="cyan"
                        onClick={() => {
                          this.handleShow();
                        }}
                      >
                        LogIn
                      </MDBBtn>
                      {this.state.show && (
                        <MDBModal
                          isOpen={this.state.show}
                          // size="sm"
                          // side
                          // frame
                          // centered
                          // position="right"
                          backdrop={false}
                        >
                          <MDBModalHeader
                            toggle={this.handleClose}
                            style={{ color: "black" }}
                          >
                            LogIn Form
                          </MDBModalHeader>
                          <SignIN handleClose={this.handleClose} />
                        </MDBModal>
                      )}
                    </p>
                  </MDBCol>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}

export default FormPage;
