import React, { useState } from "react";
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
  const [isStepsDisabled, setIsStepsDisabled] = useState({
    1: false,
    2: true,
    3: true,
    4: true,
  });
  const [step, setStep] = useState(3);
  const formik = useFormik({
    initialValues: {
      locationCity: "",
      locationPlace: "",
      modelFilter: "all",
      model: "",
      color: "Любой",
      dateFrom: "",
      dateTo: "",
      plan: "day",
      fullFuel: false,
      childSeat: false,
      rightHand: false,
    },
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Location formik={formik} />;
      case 2:
        return <Model formik={formik} />;
      case 3:
        return <Addition formik={formik} />;
      case 4:
        return <Final formData={formik.values} />;
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
            {isFinished ? <Finished formData={formik.values} /> : renderStep()}
          </div>
        </div>
        <div className="order__status-container">
          <div className="order__status">
            <Status
              isStepsDisabled={isStepsDisabled}
              setIsStepsDisabled={setIsStepsDisabled}
              isFinished={isFinished}
              step={step}
              setStep={setStep}
              formData={formik.values}
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

export default OrderPage;
