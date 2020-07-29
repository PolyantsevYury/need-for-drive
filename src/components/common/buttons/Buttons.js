import React from "react";
import "./Buttons.scss";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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

Button.propTypes = {
  additionalStyles: PropTypes.string,
  children: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  to: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  additionalStyles: "",
  history: null,
  to: "",
  onClick: null,
};

export const LinkButton = withRouter(Button);
