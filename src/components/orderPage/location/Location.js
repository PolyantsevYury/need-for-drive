import React from "react";
import "./Location.scss";
import Map from "../../../assets/images/map.jpg";
import { InputText } from "../../common/forms/Forms";

const Location = ({ formik }) => {
  return (
    <section className="location">
      <div className="location__form">
        <InputText
          items={[
            {
              name: "locationCity",
              label: "Город",
              placeholder: "Начните вводить город",
              value: formik.values.locationCity,
            },
            {
              name: "locationPlace",
              label: "Пункт выдачи",
              placeholder: "Начните вводить пункт",
              value: formik.values.locationPlace,
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>
      <p>Выбрать на карте:</p>
      <img className="location__map" src={Map} alt="" />
    </section>
  );
};

export default Location;
