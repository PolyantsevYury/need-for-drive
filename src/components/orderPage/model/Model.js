import React from "react";
import "./Model.scss";
import Car1 from "../../../assets/images/car1.png";
import Car2 from "../../../assets/images/car2.png";
import Car3 from "../../../assets/images/car3.png";
import Car4 from "../../../assets/images/car4.png";
import Car5 from "../../../assets/images/car5.png";
import Car6 from "../../../assets/images/car6.png";
import { InputRadio } from "../../common/forms/Forms";

const cars = [
  {
    name: "ELANTRA",
    price: "12 000 - 25 000 ₽",
    img: Car1,
  },
  {
    name: "i30 N",
    price: "10 000 - 32 000 ₽",
    img: Car2,
  },
  {
    name: "CRETA",
    price: "12 000 - 25 000 ₽",
    img: Car3,
  },
  {
    name: "SONATA",
    price: "10 000 - 32 000 ₽",
    img: Car4,
  },
  {
    name: "ELANTRA",
    price: "12 000 - 25 000 ₽",
    img: Car5,
  },
  {
    name: "i30 N",
    price: "10 000 - 32 000 ₽",
    img: Car6,
  },
];

const Model = ({ formik }) => {
  return (
    <section className="model">
      <div className="model__option">
        <InputRadio
          name="modelFilter"
          items={[
            {
              label: "Все модели",
              value: "all",
              checked: formik.values.modelFilter === "all",
            },
            {
              label: "Эконом",
              value: "economic",
              checked: formik.values.modelFilter === "economic",
            },
            {
              label: "Премиум",
              value: "premium",
              checked: formik.values.modelFilter === "premium",
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>
      <div className="catalog">
        {cars.map((car, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="catalog__car" key={i}>
            <div className="catalog__car-title">
              <h4>{car.name}</h4>
              <p>{car.price}</p>
            </div>
            <img className="catalog__car-img" src={car.img} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Model;
