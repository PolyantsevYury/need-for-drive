import React from "react";
import "./Status.scss";

const Status = ({ orderData }) => {
  const dateFrom = new Date(orderData?.dateFrom);
  return (
    <section className="status">
      <div className="status__info">
        <p className="status__model">{orderData.modelName}</p>
        <p className="status__number">{orderData.modelNumber}</p>
        <p className="status__options">
          Топливо
          <span>
            {orderData?.fullFuel ? " 100%" : ` ${orderData?.tank || " 70"} %`}
          </span>
        </p>
        <p className="status__access">
          Доступна с{" "}
          <span>
            {orderData?.dateFrom &&
              `${dateFrom.getDate()}.${dateFrom.getMonth()}.${dateFrom.getFullYear()} ${dateFrom.getHours()}:00`}
          </span>
        </p>
      </div>
      <img
        className="status__car-img"
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${orderData.modelImg}`}
        alt=""
      />
    </section>
  );
};

export default Status;
