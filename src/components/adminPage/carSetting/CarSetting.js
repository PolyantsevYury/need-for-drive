import React from "react";
import "./CarSetting.scss";
import { Form, Formik } from "formik";
import { Button } from "../../common/buttons/Buttons";
import { Checkbox } from "../../common/forms/Forms";
import modelExample from "../../../assets/images/adminModel.png";
import progressBar from "../../../assets/images/progressBar.png";

const CarSetting = () => {
  const periodOptions = [
    { key: "За год", value: "year" },
    { key: "За месяц", value: "month" },
    { key: "За неделю", value: "week" },
    { key: "За день", value: "day" },
  ];
  const initialValues = {
    period: "week",
    model: "all",
    city: "Ульяновск",
    status: "process",
  };

  return (
    <div className="car-setting">
      <h2 className="content__title">Карточка автомобиля</h2>
      <div className="car-setting__content">
        <div className="content__card car-setting__info-card info-card">
          <div className="info-card__model">
            <img className="info-card__model-img" src={modelExample} alt="" />
            <h2 className="info-card__model-title">Hyndai, i30 N</h2>
            <span className="info-card__model-subtitle">Компакт-кар</span>
            <div className="info-card__model-input">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="file">
                <input
                  type="file"
                  id="file"
                  aria-label="File browser example"
                />
                <span className="file-custom" />
              </label>
            </div>
          </div>
          <div className="info-card__progress">
            <div className="info-card__progress-title">
              <h4>Заполнено</h4>
              <span>74%</span>
            </div>
            <img className="info-card__progress-bar" src={progressBar} alt="" />
          </div>
          <div className="info-card__description">
            <h4 className="info-card__description-title">Описание</h4>
            <article className="info-card__description-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              eaque, quidem, commodi soluta qui quae quod dolorum sint alias,
              possimus illum assumenda eligendi cumque?
            </article>
          </div>
        </div>
        <div className="content__card car-setting__form-card">c</div>
      </div>
    </div>
  );
};

export default CarSetting;
