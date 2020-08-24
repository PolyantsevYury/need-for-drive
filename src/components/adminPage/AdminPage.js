import React from "react";
import "./AdminPage.scss";
import { NavLink, withRouter } from "react-router-dom";
import Orders from "./orders/Orders";
import Logo from "../../assets/images/loginLogo.svg";
import CarIcon from "../common/icons/CarIcon";
import OrdersIcon from "../common/icons/OrdersIcon";
import TableIcon from "../common/icons/TableIcon";

const AdminPage = ({ location }) => {
  return (
    <div className="admin">
      <div className="admin__nav-bar nav-bar">
        <div className="nav-bar__logo">
          <img className="nav-bar__logo-img" src={Logo} alt="" />
        </div>
        <div className="nav-bar__menu menu">
          <NavLink
            to="/admin/car-setting"
            className="menu__item"
            activeClassName="menu__item--active"
          >
            <div className="menu__item-icon">
              <CarIcon />
            </div>
            <span className="menu__item-title">Карточка автомобиля</span>
          </NavLink>
          <NavLink
            to="/admin/cars-list"
            className="menu__item"
            activeClassName="menu__item--active"
          >
            <div className="menu__item-icon">
              <TableIcon />
            </div>
            <span className="menu__item-title">Список авто</span>
          </NavLink>
          <NavLink
            to="/admin/orders"
            className="menu__item"
            activeClassName="menu__item--active"
          >
            <div className="menu__item-icon">
              <OrdersIcon />
            </div>
            <span className="menu__item-title">Заказы</span>
          </NavLink>
        </div>
      </div>
      <div className="admin__container">
        <div className="admin__header"> </div>
        <div className="admin__content content">
          {location.pathname === "/admin/orders" && <Orders />}
        </div>
        <div className="admin__footer"> </div>
      </div>
    </div>
  );
};

export default withRouter(AdminPage);
