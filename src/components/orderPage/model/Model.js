import React, { useEffect } from "react";
import "./Model.scss";
import classNames from "classnames";
import { connect } from "react-redux";
import { InputRadio } from "../../common/forms/Forms";
import { getCars } from "../../../store/order-selectors";
import { requestCars, setCurrentCar } from "../../../store/order-reducer";
import Preloader from "../../common/preloader/Preloader";

const Model = ({
  formik,
  cars,
  isCarsFetching,
  requestCars,
  setCurrentCar,
}) => {
  let filteredCars = [];

  useEffect(() => {
    requestCars();
  }, [requestCars]);

  const filterCars = () => {
    if (formik.values.modelFilter === "all") {
      filteredCars = cars;
      return filteredCars;
    }
    return cars.map(
      (car) =>
        car.categoryId.name === formik.values.modelFilter &&
        filteredCars.push(car)
    );
  };
  filterCars();

  const onModelClick = (car) => {
    formik.setValues({ ...formik.values, model: car.name });
    setCurrentCar(car);
  };

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
          filteredCars.map((car) => (
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
                src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${car.thumbnail.path}`}
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
