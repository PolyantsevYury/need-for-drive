import React from "react";
import './Steps.scss'
import NextStep from "../../assets/images/icons/next_step_icon.svg";

export const Steps = () => {
  return (
      <section className='steps'>
        <div className='steps__items'>
          <div className='steps__item steps__item--active'>
            <span>Местоположение</span>
            <img className='steps__item-icon' src={NextStep} alt=""/>
          </div>
          <div className='steps__item'>
            <span>Модель</span>
            <img className='steps__item-icon' src={NextStep} alt=""/>
          </div>
          <div className='steps__item'>
            <span>Дополнительно</span>
            <img className='steps__item-icon' src={NextStep} alt=""/>
          </div>
          <div className='steps__item'>
            <span>Итого</span>
          </div>
        </div>
      </section>
  )
};