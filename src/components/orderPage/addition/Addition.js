import React from "react";
import "./Addition.scss";
import { connect } from "react-redux";
import { InputCheckbox, InputRadio, InputText } from "../../common/forms/Forms";
import { getCars } from "../../../store/order-selectors";

const Addition = ({ formik, cars }) => {
  const getCarColors = () => {
    const carColors = ["любой"];
    cars.map(
      (car) => car.name === formik.values.model && carColors.push(...car.colors)
    );
    return carColors;
  };
  const colorItems = getCarColors().map((color) => {
    const container = {};
    container.label = color.charAt(0).toUpperCase() + color.slice(1);
    container.value = color;
    container.checked = formik.values.color === color;
    return container;
  });

  return (
    <section className="addition">
      <div className="addition__option">
        <h4 className="addition__title">Цвет</h4>
        <InputRadio
          name="color"
          items={colorItems}
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

const mapStateToProps = (state) => ({
  cars: getCars(state),
});

export default connect(mapStateToProps, {})(Addition);
