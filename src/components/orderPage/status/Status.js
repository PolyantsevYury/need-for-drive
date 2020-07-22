import React from "react";
import './Status.scss'
import {Button} from "../../common/buttons/Buttons";

export const Status = () => {
  return (
      <section className='status'>
        <h2 className='status__title'>Ваш заказ:</h2>
        <div className='status__info-items'>
          <div className='status__info-item'>
            <div className='status__info-name'>Пункт выдачи</div>
            <div className='status__info-filler'> </div>
            <div className='status__info-value'><p>Ульяновск,</p>Нариманова 42</div>
          </div>
          <div className='status__info-item'>
            <div className='status__info-name'>Модель</div>
            <div className='status__info-filler'> </div>
            <div className='status__info-value'>Hyndai, i30 N</div>
          </div>
        </div>
        <div className='status__price'>
          <h4 className='status__price-title'>Цена: </h4>
          <span>от 8 000 до  12 000 ₽</span>
        </div>
        <Button>
          Дополнительно
        </Button>
      </section>
  )
};