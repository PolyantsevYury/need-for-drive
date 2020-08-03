import React from "react";
import "./Forms.scss";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import Clean from "../../../assets/images/icons/clean_icon.svg";
import "react-datepicker/dist/react-datepicker.css";

export const InputRadio = ({ name, items, onChange, direction }) => {
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
            checked={item.checked}
            onChange={onChange}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export const InputCheckbox = ({ items, direction, onChange }) => {
  const inputClass = classNames("input", {
    input__column: direction === "column",
  });
  return (
    <div className={inputClass}>
      {items.map((item) => (
        <div className="input__checkbox-item" key={item.value}>
          <input
            type="checkbox"
            name={item.value}
            value={item.value}
            id={item.value}
            checked={item.checked}
            onChange={onChange}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export const InputText = ({ items, onChange }) => {
  return (
    <div className="input-text">
      {items.map((item) => (
        <div className="input-text__item" key={item.label}>
          <div className="input-text__title">{item.label}</div>
          <input
            type="text"
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            onChange={onChange}
            value={item.value}
            list={item.placeholder}
          />
          {item.options && (
            <datalist id={item.placeholder}>
              <option>{item.options[0]}</option>
              <option>{item.options[1]}</option>
              <option>{item.options[2]}</option>
              <option>{item.options[3]}</option>
              <option>{item.options[4]}</option>
              <option>{item.options[5]}</option>
            </datalist>
          )}
          <img src={Clean} alt="" />
        </div>
      ))}
    </div>
  );
};

export const InputDate = ({ items, formik }) => {
  return (
    <div className="input-text">
      <div className="input-text__item" key={items[0].label}>
        <div className="input-text__title">{items[0].label}</div>
        <DatePicker
          placeholderText={items[0].placeholder}
          selectsStart
          selected={items[0].value}
          onChange={(date) =>
            formik.setValues({ ...formik.values, dateFrom: date })
          }
          startDate={formik.values.dateFrom}
          endDate={formik.values.dateTo}
          maxDate={formik.values.dateTo}
        />
        <img src={Clean} alt="" />
      </div>
      <div className="input-text__item" key={items[1].label}>
        <div className="input-text__title">{items[1].label}</div>
        <DatePicker
          placeholderText={items[1].placeholder}
          selectsEnd
          selected={items[1].value}
          onChange={(date) =>
            formik.setValues({ ...formik.values, dateTo: date })
          }
          startDate={formik.values.dateFrom}
          endDate={formik.values.dateTo}
          minDate={formik.values.dateFrom}
        />
        <img src={Clean} alt="" />
      </div>
    </div>
  );
};
