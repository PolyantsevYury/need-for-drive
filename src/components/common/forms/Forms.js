import React from "react";
import "./Forms.scss";
import classNames from "classnames";
import PropTypes from "prop-types";
import Clean from "../../../assets/images/icons/clean_icon.svg";

export const InputRadio = (props) => {
  const { name, items, direction } = props;
  const inputClass = classNames("input", {
    input__column: direction === "column",
  });
  return (
    <div className={inputClass}>
      {items.map((item) => (
        <div className="input__radio-item" key={item.value}>
          <input
            type="radio"
            name={name}
            value={item.value}
            id={item.value}
            defaultChecked={!!item.defaultChecked}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

InputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  direction: PropTypes.string,
};

InputRadio.defaultProps = {
  direction: "row",
};

export const InputCheckbox = (props) => {
  const { name, items, direction } = props;
  const inputClass = classNames("input", {
    input__column: direction === "column",
  });
  return (
    <div className={inputClass}>
      {items.map((item) => (
        <div className="input__checkbox-item" key={item.value}>
          <input
            type="checkbox"
            name={name}
            value={item.value}
            id={item.value}
            defaultChecked={!!item.defaultChecked}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

InputCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  direction: PropTypes.string,
};

InputCheckbox.defaultProps = {
  direction: "row",
};

export const InputText = ({ items }) => {
  return (
    <div className="input-text">
      {items.map((item) => (
        <div className="input-text__item" key={item.label}>
          <div className="input-text__title">{item.label}</div>
          <input type="text" name={item.label} placeholder={item.placeholder} />
          <img src={Clean} alt="" />
        </div>
      ))}
    </div>
  );
};

InputText.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
