import React from "react";
import './Final.scss';
import Car from '../../../assets/images/car1.png';

export const Final = () => {
  return (
      <section className='final'>
        <div className='final__info'>
          <p className='final__model'>Hyndai, i30 N</p>
          <p className='final__number'>K 761 HA 73</p>
          <p className='final__fuel'>Топливо <span>100%</span></p>
          <p className='final__access'>Доступна с <span>12.06.2019 12:00</span></p>
        </div>
        <img className='final__car-img' src={Car} alt=""/>
      </section>
  )
};