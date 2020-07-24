import React from "react";
import "./Location.scss";
import Map from "../../../assets/images/map.jpg";
import { InputText } from "../../common/forms/Forms";

const Location = () => {
  return (
    <section className="location">
      <div className="location__form">
        <InputText
          name="date"
          items={[
            { label: "Город", placeholder: "Начните вводить город" },
            { label: "Пункт выдачи", placeholder: "Начните вводить пункт" },
          ]}
        />
      </div>
      <p>Выбрать на карте:</p>
      <img className="location__map" src={Map} alt="" />
    </section>
  );
};

export default Location;
