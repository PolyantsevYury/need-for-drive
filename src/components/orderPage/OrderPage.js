import React, { useState } from "react";
import classNames from "classnames";
import { useFormik } from "formik";
import { connect } from "react-redux";
import Header from "../common/header/Header";
import Location from "./location/Location";
import Model from "./model/Model";
import Addition from "./addition/Addition";
import Status from "./status/Status";
import PriceBar from "./priceBar/PriceBar";
import NextStep from "../../assets/images/icons/next_step_icon.svg";
import "./OrderPage.scss";
import Finished from "./finished/Finished";
import {
  getCurrentModel,
  getFinishedOrderData,
} from "../../store/order-selectors";

const OrderPage = ({ isFinished, finishedOrderData, currentModel }) => {
  const [isStepsDisabled, setIsStepsDisabled] = useState({
    1: false,
    2: true,
    3: true,
    4: true,
  });
  const [step, setStep] = useState(1);
  const formik = useFormik({
    initialValues: {
      locationCity: "",
      locationPoint: "",
      modelFilter: "all",
      model: "",
      color: "любой",
      dateFrom: "",
      dateTo: "",
      rate: "day",
      fullFuel: false,
      childSeat: false,
      rightHand: false,
    },
  });
  const formData = formik.values;
  const formOrderData = {
    locationCity: formData?.locationCity,
    locationPoint: formData?.locationPoint,
    modelName: currentModel?.name,
    modelNumber: currentModel?.number || "K 761 HA 73",
    carId: currentModel?.id,
    color: formData?.color,
    priceMin: currentModel?.priceMin,
    priceMax: currentModel?.priceMax,
    tank: currentModel?.tank,
    fullFuel: formData?.fullFuel,
    childSeat: formData?.childSeat,
    rightHand: formData?.rightHand,
    rate: formData?.rate === "day" ? "На сутки" : "Поминутно",
    dateFrom: formData?.dateFrom,
    dateTo: formData?.dateTo,
    modelImg: currentModel?.thumbnail?.path,
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Location formik={formik} />;
      case 2:
        return <Model formik={formik} />;
      case 3:
        return <Addition formik={formik} />;
      case 4:
        return <Status orderData={formOrderData} />;
      default:
        return <Location formik={formik} />;
    }
  };

  return (
    <section className="order-page">
      <div className="order-page__header">
        <Header />
      </div>
      <div className="order-page__steps-border">
        <div className="order-page__steps">
          <Steps
            isStepsDisabled={isStepsDisabled}
            isFinished={isFinished}
            step={step}
            setStep={setStep}
          />
        </div>
      </div>
      <div className="order">
        <div className="order__content-container">
          <div className="order__content">
            {isFinished ? <Finished /> : renderStep()}
          </div>
        </div>
        <div className="order__status-container">
          <div className="order__status">
            <PriceBar
              isStepsDisabled={isStepsDisabled}
              setIsStepsDisabled={setIsStepsDisabled}
              isFinished={isFinished}
              step={step}
              setStep={setStep}
              orderData={isFinished ? finishedOrderData : formOrderData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Steps = ({ isFinished, step, setStep, isStepsDisabled }) => {
  const stepsTitles = ["Местоположение", "Модель", "Дополнительно", "Итого"];
  const stepTitleClass = (index) =>
    classNames("steps__item-title", {
      "steps__item-title--active": index + 1 === step,
    });

  return (
    <section className="steps">
      <div className="steps__items">
        {isFinished ? (
          <span className="steps__finished">Заказ номер RU58491823</span>
        ) : (
          stepsTitles.map((title, index) => (
            <div className="steps__item" key={title}>
              <button
                className={stepTitleClass(index)}
                disabled={isStepsDisabled[index + 1]}
                type="button"
                onClick={() => setStep(index + 1)}
              >
                {title}
              </button>
              {index !== stepsTitles.length - 1 && (
                <img className="steps__item-icon" src={NextStep} alt="" />
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  currentModel: getCurrentModel(state),
  finishedOrderData: getFinishedOrderData(state),
});

export default connect(mapStateToProps, {})(OrderPage);
