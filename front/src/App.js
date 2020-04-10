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
      overAllSpent: 1000,
      mostSpent: 500,
      overAllIncome: 1000,
      budget: 0,
      transaction: [],
    };
  }
  async componentDidMount() {
    const response = await fetch(`http://localhost:8000/api/pieChart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
      },
    });
    const result = await response.json();
    if (result.success) {
      this.setState({
        transaction: result.transactions,
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div>
            <Switch>
              {/* 
              let history = useHistory();
              <button
                onClick={() => history.push("/")
                }
              >
                Sign out
               </button> */}
              {/* window.localStorage.removeItem('keyName'); */}
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
              <Route
                exact
                path="/income"
                component={() => (
                  <Income transaction={this.state.transaction} />
                )}
              />
              <Route
                exact
                path="/expense"
                component={() => (
                  <Expense transaction={this.state.transaction} />
                )}
              />
              <Route exact path="/savingPlan" component={SavingPlan} />
              <Route exact path="/settings" component={Setting} />
              {/* <Route exact path="/logout">
                {<Redirect to="/" />}
              </Route> */}
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
