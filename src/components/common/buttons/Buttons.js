import React from "react";
import "./Buttons.scss";
import { withRouter } from "react-router-dom";
import preloader from "../../../assets/buttonPreloader.svg";

export const Button = ({
  additionalStyles,
  children,
  history,
  to,
  onClick,
  isDisabled,
  isLoading,
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
      {isLoading ? (
        <img className="button__preloader" src={preloader} alt="" />
      ) : (
        children
      )}
    </button>
  );
};

export const LinkButton = withRouter(Button);
