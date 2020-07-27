import React from "react";
import "./Addition.scss";
import { InputCheckbox, InputRadio, InputText } from "../../common/forms/Forms";

const Addition = ({ formik }) => {
  return (
    <section className="addition">
      <div className="addition__option">
        <h4 className="addition__title">Цвет</h4>
        <InputRadio
          name="color"
          items={[
            {
              label: "Любой",
              value: "any",
              checked: formik.values.color === "any",
            },
            {
              label: "Красный",
              value: "red",
              checked: formik.values.color === "red",
            },
            {
              label: "Голубой",
              value: "blue",
              checked: formik.values.color === "blue",
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>

      <div className="addition__option">
        <h4 className="addition__title">Дата аренды</h4>
        <InputText
          items={[
            {
              name: "dateFrom",
              label: "С",
              placeholder: "Введите дату и время",
              value: formik.values.dateFrom,
            },
            {
              name: "dateTo",
              label: "По",
              placeholder: "Введите дату и время",
              value: formik.values.dateTo,
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>

      <div className="addition__option">
        <h4 className="addition__title">Тариф</h4>
        <InputRadio
          name="plan"
          direction="column"
          items={[
            {
              label: "Поминутно, 7₽/мин",
              value: "minute",
              checked: formik.values.plan === "minute",
            },
            {
              label: "На сутки, 1999 ₽/сутки",
              value: "day",
              checked: formik.values.plan === "day",
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>

      <div className="addition__option">
        <h4 className="addition__title">Доп услуги</h4>
        <InputCheckbox
          direction="column"
          items={[
            {
              label: "Полный бак, 500р",
              value: "fullFuel",
              checked: formik.values.fullFuel === true,
            },
            {
              label: "Детское кресло, 200р",
              value: "childSeat",
              checked: formik.values.childSeat === true,
            },
            {
              label: "Правый руль, 1600р",
              value: "rightHand",
              checked: formik.values.rightHand === true,
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>
    </section>
  );
};

export default Addition;
