import React from "react";
import "./Burger.scss";
import classNames from "classnames";
import PropTypes from "prop-types";

const Burger = ({ setIsMenuOpen, isMenuOpen }) => {
  const burgerClass = classNames("burger", { "burger--active": isMenuOpen });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div
      role="button"
      className={burgerClass}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <span className="burger__line" />
    </div>
  );
};

Burger.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default Burger;
