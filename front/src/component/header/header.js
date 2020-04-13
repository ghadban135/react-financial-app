import React from "react";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";
import "./header.css";

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="ourNavBar navChangeColor">
      <Nav className="mr-auto">
        <Nav.Link>
          <strong>Financial App</strong>
        </Nav.Link>
        <Nav.Link href="dashboard"> DashBoard </Nav.Link>
        <Nav.Link href="income"> Incomes </Nav.Link>
        <Nav.Link href="expense"> Expenses </Nav.Link>
        <Nav.Link href="savingPlan"> Saving Plans </Nav.Link>
        <Nav.Link href="settings"> Settings </Nav.Link>
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
          Sign out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
export default Header;
