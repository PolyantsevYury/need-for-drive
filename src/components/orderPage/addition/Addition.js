import React from "react";
import './Addition.scss'
import Clean from "../../../assets/images/icons/clean_icon.svg";

export const Addition = () => {
  return (
      <section className='addition'>
        <div className='addition__item'>
          <h4 className='addition__title'>Цвет</h4>
          <div className='addition__filter'>
            <div className='addition__filter-item'>
              <input type="radio" id='any' defaultChecked={true} name='color' value='any'/>
              <label htmlFor='any'>Любой</label>
            </div>
            <div className='addition__filter-item'>
              <input type="radio" id='red' name='color' value='red'/>
              <label htmlFor='red'>Красный</label>
            </div>
            <div className='addition__filter-item'>
              <input type="radio" id='blue' name='color' value='blue'/>
              <label htmlFor='blue'>Голубой</label>
            </div>
          </div>
        </div>

        <div className='addition__item'>
          <h4 className='addition__title'>Дата аренды</h4>
          <div className='addition__input-items'>
            <label className='addition__input-item'>C
              <input placeholder='Введите дату и время' name="from" type="text"/>
              <img src={Clean} alt=""/>
            </label>
            <label className='addition__input-item'>По
              <input placeholder='Введите дату и время' name='to' type="text"/>
              <img src={Clean} alt=""/>
            </label>
          </div>
        </div>

        <div className='addition__item'>
          <h4 className='addition__title'>Тариф</h4>
          <div className='addition__filter addition__filter-tarif'>
            <div className='addition__filter-item'>
              <input type="radio" id='minute' name='tarif' value='minute'/>
              <label htmlFor='minute'>Поминутно, 7₽/мин</label>
            </div>
            <div className='addition__filter-item'>
              <input type="radio" id='day' name='tarif' value='day'/>
              <label htmlFor='day'>На сутки, 1999 ₽/сутки</label>
            </div>
          </div>
        </div>

        <div className='addition__item'>
          <h4 className='addition__title'>Доп услуги</h4>
          <div className='addition__filter addition__filter-tarif'>
            <div className='addition__filter-item'>
              <input type="checkbox" id='fuel' value='fuel'/>
              <label htmlFor='fuel'>Полный бак, 500р</label>
            </div>
            <div className='addition__filter-item'>
              <input type="checkbox" id='chair' value='chair'/>
              <label htmlFor='chair'>Детское кресло, 200р</label>
            </div>
            <div className='addition__filter-item'>
              <input type="checkbox" id='wheel' value='wheel'/>
              <label htmlFor='wheel'>Правый руль, 1600р</label>
            </div>
          </div>
        </div>
      </section>
  )
};