import React from "react";
import "./Addition.scss";
import { connect } from "react-redux";
import { InputCheckbox, InputRadio, InputDate } from "../../common/forms/Forms";
import { getCars } from "../../../store/order-selectors";

const Addition = ({ formik, cars }) => {
  const modelData = cars.find((car) => car.name === formik.values.model);
  const carColorsWithAny = ["любой", ...modelData.colors];

  const colorItems = carColorsWithAny.map((color) => {
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
        <InputDate
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
          formik={formik}
        />
      </div>

      <div className="addition__option">
        <h4 className="addition__title">Тариф</h4>
        <InputRadio
          name="rate"
          direction="column"
          items={[
            {
              label: `Поминутно, ${Math.round(
                (modelData.priceMin / (60 * 24)) * 1.8
              )} ₽/мин`,
              value: "minute",
              checked: formik.values.rate === "minute",
            },
            {
              label: `На сутки, ${modelData.priceMin} ₽/сутки`,
              value: "day",
              checked: formik.values.rate === "day",
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
