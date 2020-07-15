import React from "react";
import './MainContent.scss';
import locationIcon from '../../../assets/images/icons/location_icon.svg'
import {Button} from "../../common/Button";

export const MainContent = () => {
  return (
      <section className='main-content'>
        <div className='header'>
          <div className='header__logo'>
            Need for drive
          </div>
          <div className='header__location'>
            <img src={locationIcon} alt=""/>
            <span className='header__location-city'>Ульяновск</span>
          </div>
        </div>
        <div className='hero-block main-content__hero-block'>
          <h1 className='hero-block__title'>
            Каршеринг <br/>
            <span>Need for drive</span>
          </h1>
          <span className='hero-block__subtitle'>
            Поминутная аренда авто твоего города
          </span>
          <Button>
            Забронировать
          </Button>
        </div>
        <footer className='footer'>
          <span className='footer__copyright'>© 2016-2019 «Need for drive»</span>
          <a href='tel:84952342244' className='footer__number'>8 (495) 234-22-44</a>
        </footer>
      </section>
  )
};