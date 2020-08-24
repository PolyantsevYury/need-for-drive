import React from "react";
import "./AdminPage.scss";
import { withRouter } from "react-router-dom";
import Orders from "./orders/Orders";
import NavBar from "./NavBar";
import Header from "./Header";

const AdminPage = ({ location }) => {
  return (
    <div className="admin">
      <div className="admin__nav-bar">
        <NavBar />
      </div>
      <div className="admin__container">
        <div className="admin__header">
          <Header />
        </div>
        <div className="admin__content content">
          {location.pathname === "/admin/orders" && <Orders />}
        </div>
        <div className="admin__footer"> </div>
      </div>
    </div>
  );
};

export default withRouter(AdminPage);
