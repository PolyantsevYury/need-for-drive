import React from 'react';
import './Buttons.scss';
import {withRouter} from "react-router-dom";

export const Button = (props) => {
  const {additionalStyles, children, history, to} = props;
  return (
      <button className={`button ${additionalStyles}`}
              onClick={() => history?.push(to)}>
        {children}
      </button>
  )
}

export const LinkButton = withRouter(Button);