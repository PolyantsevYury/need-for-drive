import React from "react";
import PropTypes from "prop-types";
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
  return (
    <section className="order-page">
      <div className="order-page__header">
        <Header />
      </div>
      <div className="order-page__steps-border">
        <div className="order-page__steps">
          <Steps isFinished={isFinished} />
        </div>
      </div>
      <div className="order">
        <div className="order__content-container">
          <div className="order__content">
            {isFinished ? (
              <Finished />
            ) : (
              <>
                <Addition />
                <div style={{ display: "none" }}>
                  <Location />
                  <Model />
                  <Final />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="order__status-container">
          <div className="order__status">
            <Status isFinished={isFinished} />
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

const Steps = ({ isFinished }) => {
  return (
    <section className="steps">
      <div className="steps__items">
        {isFinished ? (
          <span className="steps__finished">Заказ номер RU58491823</span>
        ) : (
          <>
            <div className="steps__item">
              <span>Местоположение</span>
              <img className="steps__item-icon" src={NextStep} alt="" />
            </div>
            <div className="steps__item steps__item--active">
              <span>Модель</span>
              <img className="steps__item-icon" src={NextStep} alt="" />
            </div>
            <div className="steps__item">
              <span>Дополнительно</span>
              <img className="steps__item-icon" src={NextStep} alt="" />
            </div>
            <div className="steps__item">
              <span>Итого</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

Steps.propTypes = {
  isFinished: PropTypes.bool,
};

Steps.defaultProps = {
  isFinished: false,
};

export default OrderPage;
