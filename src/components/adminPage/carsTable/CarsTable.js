import React, { useEffect } from "react";
import "./CarsTable.scss";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Filter } from "../../common/forms/Forms";
import { Button } from "../../common/buttons/Buttons";
import Paginator from "../../common/paginator/Paginator";
import {
  requestCarsPage,
  setCurrentPage,
} from "../../../store/carstable-reducer";
import Preloader from "../../common/preloader/Preloader";

const firstOptions = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
];
const secondOptions = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
];
const thirdOptions = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
];

const initialValues = {
  name1: "1",
  name2: "1",
  name3: "2",
};

const CarsTable = ({
  requestCarsPage,
  isFetching,
  cars,
  pageSize,
  currentPage,
  totalCarsCount,
  setCurrentPage,
}) => {
  useEffect(() => {
    requestCarsPage(currentPage, pageSize);
  }, [currentPage, pageSize, requestCarsPage]);

  // eslint-disable-next-line no-console
  const onFilterSubmit = (value) => console.log(value);

  return (
    <>
      <h2 className="admin__title">Список авто</h2>
      <div className="admin__card cars-table">
        <div className="cars-table__header">
          <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
            <Form className="cars-table__filter">
              <div className="cars-table__filter-items">
                <Filter name="name1" options={firstOptions} />
                <Filter name="name2" options={secondOptions} />
                <Filter name="name3" options={thirdOptions} />
              </div>
              <div className="cars-table__filter-buttons">
                <div className="cars-table__filter-button">
                  <Button additionalStyles="button__admin">Применить</Button>
                </div>
                <div className="cars-table__filter-button">
                  <Button additionalStyles="button__admin button__admin-delete">
                    Сбросить
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="cars-table__content">
          {isFetching ? (
            <Preloader />
          ) : (
            <table>
              <thead>
                <tr>
                  <th scope="col">Модель</th>
                  <th scope="col">Категория</th>
                  <th scope="col">Цвет</th>
                  <th scope="col">Цена</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td data-label="Модель">{car.name}</td>
                    <td data-label="Категория">{car.categoryId.name}</td>
                    <td data-label="Цвет">{car.colors}</td>
                    <td data-label="Цена">{`${car.priceMin} - ${car.priceMax} ₽`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="cars-table__footer">
          <Paginator
            currentPage={currentPage}
            onPageChanged={(p) => setCurrentPage(p)}
            totalItemsCount={totalCarsCount}
            pageSize={pageSize}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cars: state.carsTable.cars,
  isFetching: state.carsTable.isFetching,
  pageSize: state.carsTable.pageSize,
  currentPage: state.carsTable.currentPage,
  totalCarsCount: state.carsTable.totalCarsCount,
});

export default connect(mapStateToProps, { requestCarsPage, setCurrentPage })(
  CarsTable
);
