import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
/* import "bootstrap/dist/css/bootstrap.min.css"; */
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ExpenseForm from "./component/insertExpenseForm/insertExpenseForm";
import FormPage from "./component/userSignUp/userSignUp";
import IncomeForm from "./component/insertIncomeForm/insertIncomeForm";
import PopupExpenseForm from "./component/insertExpenseForm/popupExpenseForm";
import Table from "./component/transactionTable/transactionTable";
import PopupIncomeForm from "./component/insertIncomeForm/popupIncomeForm";
import SavingPlanForm from "./component/insertSavingPlanForm/insertSavingPlanForm";
import PopupSavingPlanForm from "./component/insertSavingPlanForm/popupSavingPlanForm";
import Test from "./component/testt";
import { SmartLabels } from "./component/pieChart/pieChart";
import LandingPage from "./pages/landing page/landing";

ReactDOM.render(<App />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
