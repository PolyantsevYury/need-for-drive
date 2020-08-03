import React from "react";
import "./Final.scss";
import { connect } from "react-redux";
import { getCars } from "../../../store/order-selectors";

const Final = ({ formData, cars }) => {
  const modelData = cars.find((car) => car.name === formData.model);

  return (
    <section className="final">
      <div className="final__info">
        <p className="final__model">{modelData.name}</p>
        <p className="final__number">{modelData.number}</p>
        <p className="final__options">
          Топливо{" "}
          <span>{formData.fullFuel ? "100%" : `${modelData.tank}%`}</span>
        </p>
        <p className="final__access">
          Доступна с <span>{formData.dateFrom.toLocaleDateString()} 12:00</span>
        </p>
      </div>
      <img
        className="final__car-img"
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${modelData.thumbnail.path}`}
        alt=""
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  cars: getCars(state),
});

export default connect(mapStateToProps, {})(Final);
