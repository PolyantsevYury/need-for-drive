import React from "react";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/mainPage/MainPage";
import OrderPage from "./components/orderPage/OrderPage";
import Login from "./components/login/Login";
import AdminPage from "./components/adminPage/AdminPage";

const App = () => {
  return (
    <div className="app-wrapper">
      <Switch>
        <Route exact path="/" render={() => <MainPage />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route path="/admin" render={() => <AdminPage />} />
        <Route exact path="/order" render={() => <OrderPage />} />
        <Route
          path="/order/finished/:orderId?"
          render={() => <OrderPage isFinished />}
        />
        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
      </Switch>
    </div>
  );
};

export default App;
