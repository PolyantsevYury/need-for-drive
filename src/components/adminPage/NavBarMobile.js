import React from "react";
import { NavLink } from "react-router-dom";
import CarIcon from "../common/icons/CarIcon";
import TableIcon from "../common/icons/TableIcon";
import OrdersIcon from "../common/icons/OrdersIcon";
import "./NavBarMobile.scss";

const NavBarMobile = () => {
  return (
    <div className="nav-bar-mobile">
      <NavLink
        to="/admin/car-setting"
        className="nav-bar-mobile__item"
        activeClassName="nav-bar-mobile__item--active"
      >
        <div className="nav-bar-mobile__item-icon">
          <CarIcon />
        </div>
      </NavLink>
      <NavLink
        to="/admin/table"
        className="nav-bar-mobile__item"
        activeClassName="nav-bar-mobile__item--active"
      >
        <div className="nav-bar-mobile__item-icon">
          <TableIcon />
        </div>
      </NavLink>
      <NavLink
        to="/admin/orders"
        className="nav-bar-mobile__item"
        activeClassName="nav-bar-mobile__item--active"
      >
        <div className="nav-bar-mobile__item-icon">
          <OrdersIcon />
        </div>
      </NavLink>
    </div>
  );
};

export default NavBarMobile;
