import React, { useState } from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import s from "./AdminForms.module.scss";
import FilterIcon from "../../common/icons/FilterIcon";

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

export const Checkbox = ({ items, direction, onChange, onColorChange }) => {
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
            onChange={
              onColorChange ? () => onColorChange(item.value) : onChange
            }
          />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

export const DropdownCheckbox = ({
  checkboxItems,
  filteredItems,
  setFilteredItems,
  dropdownButton = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const initialValues = {};
  checkboxItems.forEach((item) => {
    initialValues[item.value] = filteredItems.includes(item.label);
  });

  const onFilterSubmit = (value) => {
    const arrayForFilter = [];
    // if value is checked, add appropriate label (from checkboxItems) to arrayForFilter
    checkboxItems.forEach((item) => {
      if (value[item.value]) {
        arrayForFilter.push(item.label);
      }
    });
    setIsDropdownOpen(false);
    setFilteredItems(arrayForFilter);
  };
  const onFilterReset = (resetForm) => {
    setFilteredItems([]);
    resetForm();
    setIsDropdownOpen(false);
  };
  const dropdownIconStyles = classNames([s.dropdownIcon], {
    [s.active]: filteredItems.length !== 0,
    [s.withButton]: dropdownButton,
  });

  return (
    <span className={s.dropdownContainer}>
      <button
        className={dropdownIconStyles}
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {dropdownButton}
        <FilterIcon />
      </button>
      <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
        {(formik) => {
          return (
            isDropdownOpen && (
              <Form className={s.dropdown}>
                <div className={s.dropdownContent}>
                  <Checkbox
                    items={checkboxItems.map((item) => {
                      return {
                        label: item.label,
                        value: item.value,
                        checked: formik.values[item.value] === true,
                      };
                    })}
                    direction="column"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className={s.dropdownFooter}>
                  <button
                    className={s.dropdownResetBtn}
                    type="button"
                    disabled={!formik.values.economic && !formik.values.premium}
                    onClick={() => onFilterReset(formik.resetForm)}
                  >
                    Сбросить
                  </button>
                  <button className={s.dropdownSubmitBtn} type="submit">
                    ОК
                  </button>
                </div>
              </Form>
            )
          );
        }}
      </Formik>
    </span>
  );
};
