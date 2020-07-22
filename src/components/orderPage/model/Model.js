import React from "react";
import './Model.scss'
import Car1 from '../../../assets/images/car1.png'
import Car2 from '../../../assets/images/car2.png'
import Car3 from '../../../assets/images/car3.png'
import Car4 from '../../../assets/images/car4.png'
import Car5 from '../../../assets/images/car5.png'
import Car6 from '../../../assets/images/car6.png'

const cars = [
  {
    name: 'ELANTRA',
    price: '12 000 - 25 000 ₽',
    img: Car1,
  },
  {
    name: 'i30 N',
    price: '10 000 - 32 000 ₽',
    img: Car2,
  },
  {
    name: 'CRETA',
    price: '12 000 - 25 000 ₽',
    img: Car3,
  },
  {
    name: 'SONATA',
    price: '10 000 - 32 000 ₽',
    img: Car4,
  },
  {
    name: 'ELANTRA',
    price: '12 000 - 25 000 ₽',
    img: Car5,
  },
  {
    name: 'i30 N',
    price: '10 000 - 32 000 ₽',
    img: Car6,
  },
]

export const Model = () => {
  return (
      <section className='model'>
        <div className='model__filter'>
          <div className='model__filter-item'>
            <input type="radio" id='all' defaultChecked={true} name='model' value='all'/>
            <label htmlFor='all'>Все модели</label>
          </div>
          <div className='model__filter-item'>
            <input type="radio" id='economic' name='model' value='economic'/>
            <label htmlFor='economic'>Эконом</label>
          </div>
          <div className='model__filter-item'>
            <input type="radio" id='premium' name='model' value='premium'/>
            <label htmlFor='premium'>Премиум</label>
          </div>
        </div>
        <div className='catalog'>
          {cars.map((car, i) => (
              <div className='catalog__car' key={i}>
                <div className='catalog__car-title'>
                  <h4>{car.name}</h4>
                  <p>{car.price}</p>
                </div>
                <img className='catalog__car-img' src={car.img} alt=""/>
              </div>
          ))}
          <div>

          </div>
        </div>
      </section>
  )
};