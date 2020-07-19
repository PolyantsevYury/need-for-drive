import locationIcon from "../../../assets/images/icons/location_icon.svg";
import React from "react";
import './Header.scss';

export const Header = () => {
  return (
      <div className='header'>
        <div className='header__logo'>
          Need for drive
        </div>
        <div className='header__location'>
          <img src={locationIcon} alt=""/>
          <span className='header__location-city'>Ульяновск</span>
        </div>
      </div>
  )
}