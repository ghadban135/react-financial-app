import React from "react";
import FormPage from "../../component/userSignUp/userSignUp";
import { StaticBarChart } from "../../component/staticBarChart/staticBarChart";
import { StaticPieChart } from "../../component/staticPieChart/staticPieChart";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import "./landing.css";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="backAndSignUp">
          <div className="descText">
            <h1 style={{ fontWeight: "800" }}>Manage your finances</h1>
            <p style={{ fontWeight: "400" }}>
              Your data is easily accessible while you are away from home, so
              you can manage your finances anywhere or anytime.
            </p>
          </div>

          <div style={{ right: "0" }}>
            <FormPage></FormPage>
          </div>
        </div>
        <h1
          style={{
            margin: "90px 20px 0px 20px",
            textAlign: "center",
            fontWeight: "400",
            width: "80%",
            paddingLeft: "14%"
          }}
        >
          Track By:
          <hr />
        </h1>
        <div style={{ display: "flex", margin: "30px 0" }}>
          <div style={{ margin: "0 20px" }}>
            <StaticBarChart></StaticBarChart>
          </div>
          <StaticPieChart></StaticPieChart>
        </div>
      </div>
    );
  }
}
export default LandingPage;
