import React from "react";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";
function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Nav.Link href="/">
          <strong>Financial App</strong>
        </Nav.Link>
        <Nav.Link href="dashboard">DashBoard</Nav.Link>
        <Nav.Link href="income">Incomes</Nav.Link>
        <Nav.Link href="expense">Expenses</Nav.Link>
        <Nav.Link href="savingPlan">Saving Plans</Nav.Link>
      </Nav>
    </Navbar>
  );
}
export default Header;
