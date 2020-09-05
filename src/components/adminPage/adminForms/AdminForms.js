import React from "react";
import s from "./AdminForms.module.scss";

// eslint-disable-next-line import/prefer-default-export
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
