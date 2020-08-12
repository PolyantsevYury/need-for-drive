import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import locationIcon from "../../../assets/images/icons/location_icon.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">Need for drive</Link>
      </div>
      <div className="header__location">
        <img src={locationIcon} alt="" />
        <span className="header__location-city">Ульяновск</span>
      </div>
    </div>
  );
};

export default Header;
