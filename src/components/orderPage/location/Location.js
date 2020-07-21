import React from "react";
import './Location.scss'
import Map from '../../../assets/images/map.jpg';

export const Location = () => {
  return (
      <section className='location'>
        <div className='location__input-items'>
          <label className='location__input-item'>Город
            <input placeholder='Начните вводить город' name="city" type="text"/>
          </label>
          <label className='location__input-item'>Пункт выдачи
          <input placeholder='Начните вводить пункт' name='address' type="text"/>
          </label>
        </div>
        <p>Выбрать на карте:</p>
        <img className='location__map' src={Map} alt=""/>
      </section>
  )
};