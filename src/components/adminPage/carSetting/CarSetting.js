import React from "react";
import "./CarSetting.scss";
import { Field, Form, Formik } from "formik";
import { Button } from "../../common/buttons/Buttons";
import { Text, Checkbox } from "../../common/forms/Forms";
import modelExample from "../../../assets/images/adminModel.png";
import progressBar from "../../../assets/images/progressBar.png";
import plusIcon from "../../../assets/images/icons/plus_icon.svg";
import { AdminRadio } from "../adminForms/AdminForms";

const CarSetting = () => {
  const colorOptions = [{ label: "Белый", value: "Белый", checked: true }];
  const initialValues = {
    model: "",
    category: "Эконом",
    color: "",
    addedColors: [],
    description: "",
  };
  const addColor = (color) => {
    colorOptions.push({ label: color, value: color, checked: true });
  };
  // eslint-disable-next-line no-console
  const deleteColor = () => console.log("Delete");
  // eslint-disable-next-line no-console
  const onSubmit = (value) => console.log(value);

  return (
    <div className="car-setting">
      <h2 className="admin__title">Карточка автомобиля</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <div className="car-setting__content">
                <div className="admin__card car-setting__info-card info-card">
                  <div className="info-card__model">
                    <h2 className="info-card__model-title">
                      {formik.values.model || "Название модели"}
                    </h2>
                    <span className="info-card__model-subtitle">
                      {formik.values.category}
                    </span>
                    <img
                      className="info-card__model-img"
                      src={modelExample}
                      alt=""
                    />
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
                    <div className="info-card__description-text">
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                      />
                    </div>
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
                    <div>
                      <div className="form-card__form-item">
                        <Text
                          name="color"
                          title="Доступные цвета"
                          type="text"
                          placeholder="Введите цвет"
                        />
                        <button
                          className="form-card__clr-btn"
                          type="button"
                          onClick={() => {
                            addColor(formik.values.color);
                            formik.setValues({ ...formik.values, color: "" });
                          }}
                        >
                          <img src={plusIcon} alt=" " />
                        </button>
                      </div>
                      <div className="form-card__checkbox">
                        <Checkbox
                          direction="column"
                          items={colorOptions}
                          onChange={deleteColor}
                        />
                      </div>
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
