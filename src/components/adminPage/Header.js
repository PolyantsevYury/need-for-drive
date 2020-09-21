import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../../assets/images/icons/search_icon.svg";
import NotificationsIcon from "../../assets/images/icons/notifications_icon.svg";
import UserImg from "../../assets/images/user-img.png";
import LogoutIcon from "../../assets/images/icons/logout_icon.png";
import Dropdown from "../common/icons/Dropdown";
import { logOut } from "../../store/auth-reducer";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="admin-header">
      <div className="admin-header__search">
        <img className="admin-header__search-icon" src={SearchIcon} alt="" />
        <input
          className="admin-header__search-input"
          type="search"
          placeholder="Поиск …"
        />
      </div>
      <div className="admin-header__notifications notifications">
        <img className="notifications__icon" src={NotificationsIcon} alt="" />
        <div className="notifications__number">2</div>
      </div>
      <div className="admin-header__user user-info">
        <img className="user-info__img" src={UserImg} alt="" />
        <div className="user-info__name">Admin</div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="user-info__dropdown-btn"
          type="button"
        >
          <Dropdown />
        </button>
        {isDropdownOpen && (
          <div className="dropdown">
            <button
              type="button"
              onClick={() => dispatch(logOut())}
              className="dropdown__logout-btn"
            >
              <img src={LogoutIcon} alt="" />
              <span>Выйти</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
