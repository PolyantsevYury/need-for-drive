import React from "react";
import "./AdminPage.scss";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Orders from "./orders/Orders";
import NavBar from "./NavBar";
import Header from "./Header";
import NavBarMobile from "./NavBarMobile";

const AdminPage = ({ location }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="admin">
      {isMobile ? <NavBarMobile /> : <NavBar />}
      <div className="admin__container">
        <div className="admin__header">
          <Header />
        </div>
        <div className="admin__content content">
          {location.pathname === "/admin/orders" && <Orders />}
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

export default withRouter(AdminPage);
