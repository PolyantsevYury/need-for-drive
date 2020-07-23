import React from 'react';
import './Buttons.scss';
import {withRouter} from "react-router-dom";

export const Button = (props) => {
  const {additionalStyles, children, history, to, onClick} = props;
  return (
      <button className={`button ${additionalStyles}`}
              onClick={(event) => {
                onClick && onClick(event)
                history && history.push(to)
              }}>
        {children}
      </button>
  )
}

export const LinkButton = withRouter(Button);