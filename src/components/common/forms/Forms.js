import React, { useMemo } from "react";
import "./Forms.scss";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import matchSorter from "match-sorter";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import Clean from "../../../assets/images/icons/clean_icon.svg";

export const Radio = ({ name, items, onChange, direction }) => {
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

export const Checkbox = ({ items, direction, onChange }) => {
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

export const SearchCity = ({ formik, cities }) => {
  function useCityMatch(location) {
    const citiesNames = [];
    cities.map((city) => citiesNames.push(city.name));
    return useMemo(
      () =>
        location.trim().length < 2 ? null : matchSorter(citiesNames, location),
      [citiesNames, location]
    );
  }
  const cityResults = useCityMatch(formik.values.locationCity);

  return (
    <div className="input-text">
      <div className="input-text__item">
        <div className="input-text__title">Город</div>
        <Combobox
          onSelect={(city) =>
            formik.setValues({ ...formik.values, locationCity: city })
          }
        >
          <ComboboxInput
            id="locationCity"
            name="locationCity"
            value={formik.values.locationCity}
            onChange={formik.handleChange}
            placeholder="Начните вводить город"
            autoComplete="off"
          />
          {cityResults && (
            <ComboboxPopover>
              {cityResults.length > 0 ? (
                <ComboboxList>
                  {cityResults.slice(0, 10).map((result) => (
                    <ComboboxOption key={result} value={result} />
                  ))}
                </ComboboxList>
              ) : (
                <span style={{ display: "block", margin: 8 }}>
                  Город не найден
                </span>
              )}
            </ComboboxPopover>
          )}
        </Combobox>
        <button
          className="clear-btn"
          type="button"
          onClick={() =>
            formik.setValues({ ...formik.values, locationCity: "" })
          }
        >
          <img src={Clean} alt="" />
        </button>
      </div>
    </div>
  );
};

export const SearchPoints = ({ formik, points }) => {
  function usePointMatch(location) {
    const addresses = [];
    points.map((point) => addresses.push(point.address));
    return useMemo(
      () =>
        location.trim().length < 2 || addresses.includes(location)
          ? null
          : matchSorter(addresses, location),
      [addresses, location]
    );
  }
  const pointResults = usePointMatch(formik.values.locationPoint);

  return (
    <div className="input-text">
      <div className="input-text__item">
        <div className="input-text__title">Пункт выдачи</div>
        <Combobox
          onSelect={(address) =>
            formik.setValues({ ...formik.values, locationPoint: address })
          }
        >
          <ComboboxInput
            id="locationPoint"
            name="locationPoint"
            value={formik.values.locationPoint}
            onChange={formik.handleChange}
            placeholder="Начните вводить пункт"
            autoComplete="off"
          />
          {pointResults && (
            <ComboboxPopover>
              {pointResults.length > 0 ? (
                <ComboboxList>
                  {pointResults.slice(0, 10).map((result) => (
                    <ComboboxOption key={result} value={result} />
                  ))}
                </ComboboxList>
              ) : (
                <span style={{ display: "block", margin: 8 }}>
                  Пункт не найден
                </span>
              )}
            </ComboboxPopover>
          )}
        </Combobox>
        <button
          className="clear-btn"
          type="button"
          onClick={() =>
            formik.setValues({ ...formik.values, locationPoint: "" })
          }
        >
          <img src={Clean} alt="" />
        </button>
      </div>
    </div>
  );
};

export const Date = ({ items, formik }) => {
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
          showTimeSelect
          dateFormat="dd.MM.yyyy h:mm aa"
          endDate={formik.values.dateTo}
          maxDate={formik.values.dateTo}
        />
        <button
          className="clear-btn"
          type="button"
          onClick={() => formik.setValues({ ...formik.values, dateFrom: "" })}
        >
          <img src={Clean} alt="" />
        </button>
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
          showTimeSelect
          dateFormat="dd.MM.yyyy h:mm aa"
          endDate={formik.values.dateTo}
          minDate={formik.values.dateFrom}
        />
        <button
          className="clear-btn"
          type="button"
          onClick={() => formik.setValues({ ...formik.values, dateTo: "" })}
        >
          <img src={Clean} alt="" />
        </button>
      </div>
    </div>
  );
};

export const Text = ({ title, placeholder, type }) => {
  return (
    <div className="admin-text-input">
      <span className="admin-text-input__title">{title}</span>
      <input
        className="admin-text-input__input"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
