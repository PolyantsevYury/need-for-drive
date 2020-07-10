import React from "react";
import '../styles/mainPage/MainContent.scss';

export const MainContent = () => {
  return (
      <div className='main-content'>
        <div className='header'>
          <div className='header__logo'>
            Need for drive
          </div>
          <div className='header__location'>
            Ульяновск
          </div>
        </div>
        <div className='hero-block'>
          <h1 className='hero-block__title'>
            Каршеринг <p>Need for drive</p>
          </h1>
          <span className='hero-block__subtitle'>
            Поминутная аренда авто твоего города
          </span>
          <button className='button'>
            Забронировать
          </button>
        </div>
        <footer className='footer'>footer</footer>
      </div>
  )
};