import React from "react";
import "./Final.scss";
import { connect } from "react-redux";
import { getCars } from "../../../store/order-selectors";

const FinalContainer = ({ orderData, formData, cars }) => {
  let modelName;
  let modelNumber;
  let fuel;
  let dateFrom;
  let modelImg;

  // If we got finished order data from server
  if (orderData) {
    modelName = orderData?.carId?.name;
    modelNumber = "K 761 HA 73";
    fuel = " 100%";
    const date = new Date(orderData?.dateFrom);
    dateFrom = date?.toLocaleDateString();
    modelImg = orderData?.carId?.thumbnail?.path;
    // If we got order data from form
  } else {
    const modelData = cars.find((car) => car?.name === formData?.model);
    modelName = modelData?.name;
    modelNumber = modelData?.number || "K 761 HA 73";
    fuel = formData?.fullFuel ? " 100%" : ` ${modelData?.tank || " 70"} %`;
    const date = new Date(formData?.dateFrom);
    dateFrom = date?.toLocaleDateString();
    modelImg = modelData?.thumbnail?.path;
  }

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
