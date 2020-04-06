import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DashBoard from "./pages/dashboard/dashboard";
import Income from "./pages/income/income";
import Expense from "./pages/expense/expense";
import SavingPlan from "./pages/savingPlan/savingPlan";
import Header from "./component/header/header";
import Footer from "./component/footer/footer";
import LandingPage from "./pages/landing page/landing";
import Setting from "./pages/settings/settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overAllSpent: 1000,
      mostSpent: 500,
      overAllIncome: 1000,
      budget: 0,
      transaction: [
        { name: "Expense 1", cost: 50, type: "expense", percentage: 5 },
        { name: "Expense 2", cost: 100, type: "expense", percentage: 10 },
        { name: "Expense 3", cost: 125, type: "expense", percentage: 12.5 },
        { name: "Expense 4", cost: 225, type: "expense", percentage: 22.5 },
        { name: "Saving Plan1", cost: 500, type: "savingPlan", percentage: 50 },
        { name: "Expense 1", cost: 50, type: "expense", percentage: 5 },
        { name: "Expense 2", cost: 100, type: "expense", percentage: 10 },
        { name: "Expense 3", cost: 125, type: "expense", percentage: 12.5 },
        { name: "Expense 4", cost: 225, type: "expense", percentage: 22.5 },
        { name: "Saving Plan1", cost: 500, type: "savingPlan", percentage: 50 },
      ],
    };
  }
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div>
            <Switch>
              {/* <Route
                exact
                path="/"
                render={() =>
                  localStorage.token ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              /> */}
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/dashboard"
                component={() => (
                  <DashBoard
                    transaction={this.state.transaction}
                    overAllSpent={this.state.overAllSpent}
                    overAllIncome={this.state.overAllIncome}
                    budget={this.state.budget}
                    mostSpent={this.state.mostSpent}
                  />
                )}
              />
              <Route exact path="/income" component={Income} />
              <Route exact path="/expense" component={Expense} />
              <Route exact path="/savingPlan" component={SavingPlan} />
              <Route exact path="/settings" component={Setting} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
