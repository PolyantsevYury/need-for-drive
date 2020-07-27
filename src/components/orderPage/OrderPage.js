import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useFormik } from "formik";
import Header from "../common/header/Header";
import Location from "./location/Location";
import Model from "./model/Model";
import Addition from "./addition/Addition";
import Final from "./final/Final";
import Status from "./status/Status";
import NextStep from "../../assets/images/icons/next_step_icon.svg";
import "./OrderPage.scss";
import Finished from "./finished/Finished";

const OrderPage = ({ isFinished }) => {
  const [step, setStep] = useState(1);
  const formik = useFormik({
    initialValues: {
      locationCity: "",
      locationPlace: "",
      modelFilter: "all",
      color: "any",
      dateFrom: "",
      dateTo: "",
      plan: "day",
      fullFuel: false,
      childSeat: false,
      rightHand: false,
    },
  });
  console.log(formik.values);
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Location formik={formik} />;
      case 2:
        return <Model formik={formik} />;
      case 3:
        return <Addition formik={formik} />;
      case 4:
        return <Final formik={formik} />;
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
          <Steps isFinished={isFinished} step={step} setStep={setStep} />
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
            <Status isFinished={isFinished} step={step} setStep={setStep} />
          </div>
        </div>
      </div>
    </section>
  );
};

OrderPage.propTypes = {
  isFinished: PropTypes.bool,
};

OrderPage.defaultProps = {
  isFinished: false,
};

const Steps = ({ isFinished, step, setStep }) => {
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
              <span
                role="button"
                tabIndex={index}
                onKeyPress={() => setStep(index + 1)}
                className={stepTitleClass(index)}
                onClick={() => setStep(index + 1)}
              >
                {title}
              </span>
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

Steps.propTypes = {
  isFinished: PropTypes.bool,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

Steps.defaultProps = {
  isFinished: false,
};

export default OrderPage;
