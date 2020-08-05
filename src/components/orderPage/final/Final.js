import React from "react";
import "./Final.scss";
import { connect } from "react-redux";
import { getCars } from "../../../store/order-selectors";

const FinalContainer = ({ orderData, formData, cars }) => {
  const modelData = cars.find((car) => car?.name === formData?.model);
  const modelName = orderData?.carId?.name || modelData?.name;
  const modelNumber = modelData?.number || "K 761 HA 73";
  const fuel =
    orderData?.fuel || formData?.fullFuel
      ? " 100%"
      : ` ${modelData?.tank || " 70"} %`;
  const dateFrom =
    "12/07/18" ||
    orderData?.dateFrom?.toLocaleDateString() ||
    formData?.dateFrom?.toLocaleDateString();
  const modelImg =
    orderData?.carId?.thumbnail?.path || modelData?.thumbnail?.path;

  return (
    <Final
      modelName={modelName}
      modelNumber={modelNumber}
      fuel={fuel}
      dateFrom={dateFrom}
      modelImg={modelImg}
    />
  );
};

const Final = ({ modelName, modelNumber, fuel, dateFrom, modelImg }) => {
  return (
    <section className="final">
      <div className="final__info">
        <p className="final__model">{modelName}</p>
        <p className="final__number">{modelNumber}</p>
        <p className="final__options">
          Топливо
          <span>{fuel}</span>
        </p>
        <p className="final__access">
          Доступна с <span>{dateFrom} 12:00</span>
        </p>
      </div>
      <img
        className="final__car-img"
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${modelImg}`}
        alt=""
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  cars: getCars(state),
});

export default connect(mapStateToProps, {})(FinalContainer);
