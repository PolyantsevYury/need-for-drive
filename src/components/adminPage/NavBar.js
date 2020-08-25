import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/icons/logo_icon.svg";
import CarIcon from "../common/icons/CarIcon";
import TableIcon from "../common/icons/TableIcon";
import OrdersIcon from "../common/icons/OrdersIcon";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-bar__logo">
        <img className="nav-bar__logo-img" src={Logo} alt="" />
        <span className="nav-bar__logo-text">Need for Drive</span>
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
  );
};

export default NavBar;
