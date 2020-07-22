import React from "react";
import './MainContent.scss';
import {LinkButton} from "../../common/buttons/Buttons";
import {Header} from "../../common/header/Header";

export const MainContent = () => {
  return (
      <section className='main-content'>
        <Header/>
        <div className='hero-block main-content__hero-block'>
          <h1 className='hero-block__title'>
            Каршеринг <br/>
            <span>Need for drive</span>
          </h1>
          <span className='hero-block__subtitle'>
            Поминутная аренда авто твоего города
          </span>
          <LinkButton to='/order'>
            Забронировать
          </LinkButton>
        </div>
        <footer className='footer'>
          <span className='footer__copyright'>© 2016-2019 «Need for drive»</span>
          <a href='tel:84952342244' className='footer__number'>8 (495) 234-22-44</a>
        </footer>
      </section>
  )
};