import React from "react";
import SearchIcon from "../../assets/images/icons/search_icon.svg";
import NotificationsIcon from "../../assets/images/icons/notifications_icon.svg";
import UserImg from "../../assets/images/user-img.png";
import DropdownIcon from "../../assets/images/icons/dropdown_icon.svg";

const Header = () => {
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
        <img className="user-info__dropdown-icon" src={DropdownIcon} alt="" />
      </div>
    </div>
  );
};

export default Header;
