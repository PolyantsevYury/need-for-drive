import React, {useState} from "react";
import './Status.scss'
import {Button} from "../../common/buttons/Buttons";

export const Status = () => {
  const [isModal, setIsModal] = useState(false)

  return (
      <section className='status'>
        {isModal &&
          <div className='modal'>
            <div className='modal__overlay'/>
            <div className='modal__container'>
              <div className='modal__title'>Подтвердить заказ</div>
              <div className='modal__buttons'>
                <Button onClick={() => setIsModal(false)}>
                  Подтвердить
                </Button>
                <div className='modal__buttons-space'> </div>
                <Button additionalStyles='button__modal-cancel' onClick={() => setIsModal(false)}>
                  Вернуться
                </Button>
              </div>
            </div>
          </div>
        }
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
        <Button onClick={() => setIsModal(!isModal)}>
          Заказать
        </Button>
      </section>
  )
};