import React from "react";
import "./Buttons.scss";
import { withRouter } from "react-router-dom";

export const Button = ({
  additionalStyles,
  children,
  history,
  to,
  onClick,
  isDisabled,
}) => {
  return (
    <button
      type="button"
      className={`button ${additionalStyles}`}
      disabled={isDisabled}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
        if (history) {
          history.push(to);
        }
      }}
    >
      {children}
    </button>
  );
};

export const LinkButton = withRouter(Button);
