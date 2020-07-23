import React from 'react';
import './Forms.scss';
import classNames from "classnames";
import Clean from "../../../assets/images/icons/clean_icon.svg";

export const InputRadio = (props) => {
  const {name, direction, items} = props;
  const inputClass = classNames('input', {'input__column': direction && direction === 'column'})
  return (
      <div className={inputClass}>
        {items.map((item) => (
            <div className='input__radio-item' key={item.value}>
              <input type="radio" name={name} value={item.value}
                     id={item.value} defaultChecked={!!item.defaultChecked}/>
              <label htmlFor={item.value}>{item.label}</label>
            </div>
        ))}
      </div>
  )
}

export const InputCheckbox = (props) => {
  const {name, direction, items} = props;
  const inputClass = classNames('input', {'input__column': direction && direction === 'column'})
  return (
      <div className={inputClass}>
        {items.map((item) => (
            <div className='input__checkbox-item' key={item.value}>
              <input type="checkbox" name={name} value={item.value}
                     id={item.value} defaultChecked={!!item.defaultChecked}/>
              <label htmlFor={item.value}>{item.label}</label>
            </div>
        ))}
      </div>
  )
}

export const InputText = ({items}) => {
  return (
      <div className='input-text'>
        {items.map((item, index) => (
            <label className='input-text__item' key={index}>
              <div className='input-text__title'>{item.label}</div>
              <input type="text" name={item.label} placeholder={item.placeholder}/>
              <img src={Clean} alt=""/>
            </label>
        ))}
      </div>
  )
}