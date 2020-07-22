import React from "react";
import {Header} from "../common/header/Header";
import {Location} from "./location/Location";
import {Model} from "./model/Model";
import {Addition} from "./addition/Addition";
import {Final} from "./final/Final";
import {Status} from "./status/Status";
import NextStep from "../../assets/images/icons/next_step_icon.svg";
import './OrderPage.scss';

export const OrderPage = () => {
  return (
      <section className='order-page'>
        <div className='order-page__header'>
          <Header/>
        </div>
        <div className='order-page__steps-border'>
          <div className='order-page__steps'>
            <Steps/>
          </div>
        </div>
        <div className='order'>
          <div className='order__content-container'>
            <div className='order__content'>
              <Final/>
              <div style={{display: 'none'}}>
                <Location/>
                <Model/>
                <Addition/>
              </div>
            </div>
          </div>
          <div className='order__status-container'>
            <div className='order__status'>
              <Status/>
            </div>
          </div>
        </div>
      </section>
  )
};

const Steps = () => {
  return (
      <section className='steps'>
        <div className='steps__items'>
          <div className='steps__item'>
            <span>Местоположение</span>
            <img className='steps__item-icon' src={NextStep} alt=""/>
          </div>
          <div className='steps__item steps__item--active'>
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