import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
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
    };
  }
  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  render() {
    // const FormPage = () => {
    return (
      <MDBContainer>
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
                />
                <MDBInput
                  label="Your email"
                  group
                  type="text"
                  validate
                  labelClass="white-text"
                />
                <MDBInput
                  label="Your password"
                  group
                  type="password"
                  validate
                  labelClass="white-text"
                />

                <MDBRow className="d-flex align-items-center mb-4">
                  <div className="text-center mb-3 col-md-12">
                    <MDBBtn
                      color="success"
                      rounded
                      type="button"
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
      </MDBContainer>
    );
  }
}

export default FormPage;
