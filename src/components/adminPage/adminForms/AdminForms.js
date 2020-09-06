import React from "react";
import classNames from "classnames";
import s from "./AdminForms.module.scss";

export const AdminRadio = ({ title, name, items, onChange }) => {
  return (
    <div className={s.radio}>
      <span className={s.title}>{title}</span>
      <div className={s.radio__items}>
        {items.map((item) => (
          <div className={s.radio__item} key={item.value}>
            <input
              type="radio"
              name={name}
              value={item.value}
              id={item.value}
              checked={item.checked}
              onChange={onChange}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Checkbox = ({ items, direction, onChange }) => {
  const inputClass = classNames(s.checkbox, {
    [s.checkbox__column]: direction === "column",
  });
  return (
    <div className={inputClass}>
      {items.map((item) => (
        <div className={s.checkbox__item} key={item.value}>
          <input
            type="checkbox"
            name={item.value}
            value={item.value}
            id={item.value}
            checked={item.checked}
            onChange={() => onChange(item.value)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};
