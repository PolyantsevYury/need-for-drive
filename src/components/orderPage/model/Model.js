import React, { useEffect, useState } from "react";
import "./Model.scss";
import classNames from "classnames";
import { connect } from "react-redux";
import { Radio } from "../../common/forms/Forms";
import { getCars } from "../../../store/order-selectors";
import { requestCars, setCurrentCar } from "../../../store/order-reducer";
import { Preloader } from "../../common/preloader/Preloader";

const Model = ({
  formik,
  cars,
  isCarsFetching,
  requestCars,
  setCurrentCar,
}) => {
  const [models, setModels] = useState([...cars]);
  useEffect(() => {
    if (cars.length === 0) {
      requestCars();
    }
  }, [cars, requestCars]);

  useEffect(() => {
    const filterCars = () => {
      if (formik.values.modelFilter === "all") {
        return setModels(cars);
      }
      const filteredCars = [];
      cars.map(
        (car) =>
          car.categoryId.name === formik.values.modelFilter &&
          filteredCars.push(car)
      );
      return setModels(filteredCars);
    };
    filterCars();
  }, [cars, formik.values.modelFilter]);

  const onModelClick = (car) => {
    formik.setValues({ ...formik.values, model: car.name });
    setCurrentCar(car);
  };

  const cardClass = (carName) =>
    classNames("catalog__car", {
      "catalog__car--active": carName === formik.values.model,
      "catalog__car--blur":
        formik.values.model && carName !== formik.values.model,
    });

  return (
    <section className="model">
      <div className="model__option">
        <Radio
          name="modelFilter"
          items={[
            {
              label: "Все модели",
              value: "all",
              checked: formik.values.modelFilter === "all",
            },
            {
              label: "Эконом",
              value: "Эконом",
              checked: formik.values.modelFilter === "Эконом",
            },
            {
              label: "Премиум",
              value: "Премиум",
              checked: formik.values.modelFilter === "Премиум",
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>
      <div className="catalog">
        {isCarsFetching ? (
          <Preloader />
        ) : (
          models.map((car) => (
            <button
              type="button"
              onClick={() => onModelClick(car)}
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
                src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${car?.thumbnail?.path}`}
                alt=""
              />
            </button>
          ))
        )}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cars: getCars(state),
  isCarsFetching: state.order.isCarsFetching,
});

export default connect(mapStateToProps, { requestCars, setCurrentCar })(Model);
