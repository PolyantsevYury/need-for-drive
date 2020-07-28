import React from "react";
import "./Final.scss";
import Car from "../../../assets/images/car1.png";

const Final = ({ formData }) => {
  return (
    <section className="final">
      <div className="final__info">
        <p className="final__model">{formData.model}</p>
        <p className="final__number">K 761 HA 73</p>
        <p className="final__options">
          Топливо <span>{formData.fullFuel ? "100%" : "70%"}</span>
        </p>
        <p className="final__access">
          Доступна с <span>12.06.2019 12:00</span>
        </p>
      </div>
      <img className="final__car-img" src={Car} alt="" />
    </section>
  );
};

export default Final;
