import React, { useEffect } from "react";
import "./Model.scss";
import classNames from "classnames";
import { connect } from "react-redux";
import { InputRadio } from "../../common/forms/Forms";
import { getCars } from "../../../store/order-selectors";
import { requestCars } from "../../../store/order-reducer";

const Model = ({ formik, cars, requestCars }) => {
  useEffect(() => requestCars(), [requestCars]);
  const cardClass = (carName) =>
    classNames("catalog__car", {
      "catalog__car--active": carName === formik.values.model,
    });

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
        {cars.map((car) => (
          <button
            type="button"
            onClick={() =>
              formik.setValues({ ...formik.values, model: car.name })
            }
            className={cardClass(car.name)}
            key={car.id}
          >
            <div className="catalog__car-title">
              <h4>{car.name}</h4>
              <p>{`${car.priceMin} - ${car.priceMax} ₽`}</p>
            </div>
            <img
              className="catalog__car-img"
              crossOrigin="anonymous"
              referrerPolicy="origin"
              src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${car.thumbnail.path}`}
              alt=""
            />
          </button>
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cars: getCars(state),
});

export default connect(mapStateToProps, { requestCars })(Model);
