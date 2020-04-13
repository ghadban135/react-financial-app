import React from "react";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="ourNavBar">
      <Nav className="mr-auto">
        <Nav.Link >
        </Nav.Link>{" "}
        <Nav.Link href="dashboard"> DashBoard </Nav.Link>{" "}
        <Nav.Link href="income"> Incomes </Nav.Link>{" "}
        <Nav.Link href="expense"> Expenses </Nav.Link>{" "}
        <Nav.Link href="savingPlan"> Saving Plans </Nav.Link>{" "}
        <Nav.Link href="settings"> Settings </Nav.Link>{" "}
        <Nav.Link
          style={{
            position: "absolute",
            right: "10px",
          }}
          onClick={() => {
            const response = fetch(`http://localhost:8000/api/logout`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.token}`,
                Accept: "application/json",
              },
            });
            window.location = "/";
            localStorage.clear();
          }}
        >
          {" "}
          signout{" "}
        </Nav.Link>{" "}
        {/* <Nav.Link href="logout">
                <button onClick={() => localStorage.setItem("token", "")}>
                  Log out
                </button>
              </Nav.Link> */}{" "}
      </Nav>{" "}
    </Navbar>
  );
}
export default Header;
