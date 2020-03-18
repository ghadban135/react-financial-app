import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashBoard from "./pages/dashboard/dashboard";
import Income from "./pages/income/income";
import Expense from "./pages/expense/expense";
import SavingPlan from "./pages/savingPlan/savingPlan";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import LandingPage from "./pages/landing page/landing";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/dashboard" component={DashBoard} />
              <Route exact path="/income" component={Income} />
              <Route exact path="/expense" component={Expense} />
              <Route exact path="/savingPlan" component={SavingPlan} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
