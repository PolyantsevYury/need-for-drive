import React from "react";
import "./CarSetting.scss";
import { Form, Formik } from "formik";
import { Button } from "../../common/buttons/Buttons";
import { Checkbox, Text } from "../../common/forms/Forms";
import modelExample from "../../../assets/images/adminModel.png";
import progressBar from "../../../assets/images/progressBar.png";
import plusIcon from "../../../assets/images/icons/plus_icon.svg";

const CarSetting = () => {
  const colorOptions = [
    { label: "Красный", value: "Красный", checked: true },
    { label: "Белый", value: "Белый", checked: true },
    { label: "Черный", value: "Черный", checked: true },
  ];
  const initialValues = {
    model: "Hyndai, i30 N",
    modelType: "Компакт-кар",
    colors: "Синий",
  };
  // eslint-disable-next-line no-console
  const onFilterSubmit = (value) => console.log(value);
  // eslint-disable-next-line no-console
  const onCheck = () => console.log("Check");

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
        <div className="content__card car-setting__form-card form-card">
          <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
            <Form className="form-card__form">
              <h4 className="form-card__title">Настройки автомобиля</h4>
              <div className="form-card__form-items">
                <div className="form-card__form-item">
                  <Text
                    title="Модель автомобиля"
                    placeholder="Hyndai, i30 N"
                    type="text"
                  />
                </div>
                <div className="form-card__form-item">
                  <Text
                    title="Тип автомобиля"
                    placeholder="Компакт-кар"
                    type="text"
                  />
                </div>
                <div className="form-card__form-item">
                  <Text
                    title="Доступные цвета"
                    placeholder="Синий"
                    type="text"
                  />
                  <button className="form-card__clr-btn" type="button">
                    <img src={plusIcon} alt=" " />
                  </button>
                </div>
              </div>
              <div className="form-card__checkbox">
                <Checkbox
                  direction="column"
                  items={colorOptions}
                  onChange={onCheck}
                />
              </div>
              <div className="form-card__footer">
                <div className="form-card__container">
                  <Button additionalStyles="button__admin">Сохранить</Button>
                  <Button additionalStyles="button__admin button__admin-cancel">
                    Отменить
                  </Button>
                </div>
                <Button additionalStyles="button__admin button__admin-delete">
                  Удалить
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CarSetting;
