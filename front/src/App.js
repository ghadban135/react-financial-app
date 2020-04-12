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
      transactionY: [],
      transactionM: [],
    };
  }
  // async componentDidMount() {
  //   var d = new Date();
  //   var y = d.getFullYear();
  //   var m = d.getMonth();
  //   const response = await fetch(
  //     `http://localhost:8000/api/pieChartMonth?year=${y}&month=${m}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.token}`,
  //         Accept: "application/json",
  //       },
  //     }
  //   );
  //   const result = await response.json();
  //   if (result.success) {
  //     this.setState({
  //       transactionMonth: result.transactions,
  //     });
  //   }
  //   const response1 = await fetch(
  //     `http://localhost:8000/api/pieChartYear?year=${y}&month=${m}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.token}`,
  //         Accept: "application/json",
  //       },
  //     }
  //   );
  //   const result1 = await response1.json();
  //   if (result1.success) {
  //     this.setState({
  //       transactionYear: result1.transactions,
  //     });
  //   }
  // }
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
                    transactionM={this.state.transactionM}
                    transactionY={this.state.transactionY}
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
