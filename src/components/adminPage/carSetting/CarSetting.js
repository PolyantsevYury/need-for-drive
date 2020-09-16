import React, { useEffect } from "react";
import "./CarSetting.scss";
import { Field, Form, Formik } from "formik";
import { Button } from "../../common/buttons/Buttons";
import { Text } from "../../common/forms/Forms";
import modelExample from "../../../assets/images/car-placeholder.png";
import PlusIcon from "../../common/icons/Plus";
import { AdminRadio, Checkbox } from "../adminForms/AdminForms";

const CarSetting = () => {
  const [completedFields, setCompletedFields] = React.useState({
    photo: false,
    description: false,
    model: false,
    color: false,
  });
  const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    let newProgress = 0;
    const fields = Object.values(completedFields);
    fields.forEach((field) => {
      if (field) {
        newProgress += 100 / fields.length;
      }
    });
    setProgress(newProgress);
  }, [completedFields]);
  const initialValues = {
    model: "",
    category: "Эконом",
    color: "",
    addedColors: [],
    description: "",
    photo: "",
  };
  const getPreviewPhoto = (formik) => {
    if (formik.values.photo) {
      return URL.createObjectURL(formik.values.photo);
    }
    return modelExample;
  };
  const addColor = (formik) => {
    formik.values.addedColors.push({
      label: formik.values.color.toLowerCase(),
      value: formik.values.color.toLowerCase(),
      checked: true,
    });
    setCompletedFields({
      ...completedFields,
      color: true,
    });
    formik.setValues({
      ...formik.values,
      color: "",
    });
  };
  const deleteColor = (formik, color) => {
    const newColors = formik.values.addedColors.filter(
      (addedColor) => addedColor.value !== color
    );
    formik.setValues({
      ...formik.values,
      addedColors: newColors,
    });
    if (newColors.length === 0) {
      setCompletedFields({
        ...completedFields,
        color: false,
      });
    }
  };
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
                      src={getPreviewPhoto(formik)}
                      alt=""
                    />
                    <div className="info-card__model-input">
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="file">
                        <input
                          type="file"
                          id="file"
                          aria-label="File browser example"
                          onChange={(e) => {
                            formik.setValues({
                              ...formik.values,
                              photo: e.target.files[0],
                            });
                            setCompletedFields({
                              ...completedFields,
                              photo: !!e.target.files[0],
                            });
                          }}
                        />
                        <span className="file-custom" />
                      </label>
                    </div>
                  </div>
                  <div className="info-card__progress">
                    <h4 className="info-card__progress-title">Заполнено</h4>
                    <div className="info-card__progress-bar">
                      <div
                        className="info-card__progress-bar--done"
                        style={{
                          opacity: `${progress ? 1 : 0}`,
                          width: `${progress}%`,
                        }}
                      >
                        {progress}%
                      </div>
                    </div>
                  </div>
                  <div className="info-card__description">
                    <h4 className="info-card__description-title">Описание</h4>
                    <div className="info-card__description-text">
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        onKeyUp={() =>
                          setCompletedFields({
                            ...completedFields,
                            description: !!formik.values.description,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="admin__card car-setting__form-card form-card">
                  <div className="form-card__form">
                    <h4 className="form-card__title">Настройки автомобиля</h4>
                    <div className="form-card__content">
                      <div className="form-card__model-inputs">
                        <div className="form-card__form-item">
                          <Text
                            name="model"
                            title="Модель автомобиля"
                            type="text"
                            onKeyUp={() =>
                              setCompletedFields({
                                ...completedFields,
                                model: !!formik.values.model,
                              })
                            }
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
                            className={`form-card__clr-btn ${
                              formik.values.color &&
                              "form-card__clr-btn--active"
                            }`}
                            type="button"
                            onClick={() => addColor(formik)}
                            disabled={formik.values.color === ""}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                        <div className="form-card__checkbox">
                          <Checkbox
                            direction="column"
                            items={formik.values.addedColors}
                            onColorChange={(color) =>
                              deleteColor(formik, color)
                            }
                          />
                        </div>
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
