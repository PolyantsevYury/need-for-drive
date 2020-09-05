import React from "react";
import "./CarSetting.scss";
import { Form, Formik } from "formik";
import { Button } from "../../common/buttons/Buttons";
import { Text, Checkbox } from "../../common/forms/Forms";
import modelExample from "../../../assets/images/adminModel.png";
import progressBar from "../../../assets/images/progressBar.png";
import plusIcon from "../../../assets/images/icons/plus_icon.svg";
import { AdminRadio } from "../adminForms/AdminForms";

const CarSetting = () => {
  const colorOptions = [
    { label: "Красный", value: "Красный", checked: true },
    { label: "Белый", value: "Белый", checked: true },
    { label: "Черный", value: "Черный", checked: true },
  ];
  const initialValues = {
    model: "",
    category: "Эконом",
    colors: "Синий",
  };
  // eslint-disable-next-line no-console
  const onFilterSubmit = (value) => console.log(value);
  // eslint-disable-next-line no-console
  const onCheck = () => console.log("Check");

  return (
    <div className="car-setting">
      <h2 className="admin__title">Карточка автомобиля</h2>
      <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
        {(formik) => {
          return (
            <Form>
              <div className="car-setting__content">
                <div className="admin__card car-setting__info-card info-card">
                  <div className="info-card__model">
                    <img
                      className="info-card__model-img"
                      src={modelExample}
                      alt=""
                    />
                    <h2 className="info-card__model-title">
                      {formik.values.model || "Название модели"}
                    </h2>
                    <span className="info-card__model-subtitle">
                      {formik.values.category}
                    </span>
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
                    <img
                      className="info-card__progress-bar"
                      src={progressBar}
                      alt=""
                    />
                  </div>
                  <div className="info-card__description">
                    <h4 className="info-card__description-title">Описание</h4>
                    <article className="info-card__description-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Odio eaque, quidem, commodi soluta qui quae quod dolorum
                      sint alias, possimus illum assumenda eligendi cumque?
                    </article>
                  </div>
                </div>
                <div className="admin__card car-setting__form-card form-card">
                  <div className="form-card__form">
                    <h4 className="form-card__title">Настройки автомобиля</h4>
                    <div className="form-card__model-inputs">
                      <div className="form-card__form-item">
                        <Text
                          name="model"
                          title="Модель автомобиля"
                          type="text"
                        />
                      </div>
                      <div className="form-card__form-item">
                        <AdminRadio
                          title="Категория автомобиля"
                          items={[
                            {
                              label: "Эконом",
                              value: "Эконом",
                              checked: formik.values.category === "Эконом",
                            },
                            {
                              label: "Премиум",
                              value: "Премиум",
                              checked: formik.values.category === "Премиум",
                            },
                          ]}
                          name="category"
                          option="blue"
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-card__form-item">
                      <Text
                        name="colors"
                        title="Доступные цвета"
                        placeholder="Синий"
                        type="text"
                      />
                      <button className="form-card__clr-btn" type="button">
                        <img src={plusIcon} alt=" " />
                      </button>
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
                        <Button type="submit" additionalStyles="button__admin">
                          Сохранить
                        </Button>
                        <Button additionalStyles="button__admin button__admin-cancel">
                          Отменить
                        </Button>
                      </div>
                      <Button additionalStyles="button__admin button__admin-delete">
                        Удалить
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CarSetting;
