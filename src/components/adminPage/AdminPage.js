import React from "react";
import "./AdminPage.scss";
import { Route, Switch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Orders from "./orders/Orders";
import NavBar from "./NavBar";
import Header from "./Header";
import NavBarMobile from "./NavBarMobile";
import Error from "./error/Error";

const AdminPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="admin">
      {isMobile ? <NavBarMobile /> : <NavBar />}
      <div className="admin__container">
        <div className="admin__header">
          <Header />
        </div>
        <div className="admin__content content">
          <Switch>
            <Route exact path="/admin/orders" render={() => <Orders />} />
            <Route path="*" render={() => <Error />} />
          </Switch>
        </div>
        <div className="admin__footer">
          <a className="admin__footer-link" href="/">
            Главная страница
          </a>
          <span className="admin__footer-copyright">
            Copyright © 2020 Simbirsoft
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
