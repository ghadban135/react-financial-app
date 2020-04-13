import React from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
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

    };
  }
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/dashboard"
                component={() => (
                  <DashBoard
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
