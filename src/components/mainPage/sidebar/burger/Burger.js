import React from "react";
import './Burger.scss';
import classNames from 'classnames';

export const Burger = ({setIsMenuOpen, isMenuOpen}) => {

  const burgerClass = classNames('burger', { 'burger--active': isMenuOpen });

  return(
    <div className={burgerClass} onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <span className='burger__line'> </span>
    </div>
  )
}