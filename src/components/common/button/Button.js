import React from 'react';
import './Button.scss';

export const Button = (props) => {
  const {additionalStyles, children, ...restProps} = props;
  return (
      <button className={`button ${additionalStyles}`} {...restProps}>
        {children}
      </button>
  )
}