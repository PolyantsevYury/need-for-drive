import React, { useEffect, useState } from "react";
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
import { AdminPreloader } from "../../common/preloader/Preloader";

const brandOptions = [
  { key: "Все модели", value: "Все модели" },
  { key: "Hyundai", value: "Hyundai" },
  { key: "Nissan", value: "Nissan" },
];
const categoryOptions = [
  { key: "Все категории", value: "Все категории" },
  { key: "Эконом", value: "Эконом" },
  { key: "Премиум", value: "Премиум" },
];

const initialValues = {
  brand: "Все модели",
  category: "Все категории",
};

const tableHeaders = ["Модель", "Категория", "Цвет", "Цена"];

const CarsTable = ({
  requestCarsPage,
  isFetching,
  cars,
  pageSize,
  currentPage,
  totalCarsCount,
  setCurrentPage,
}) => {
  const [brandForFilter, setBrandForFilter] = useState(false);
  const [categoryForFilter, setCategoryForFilter] = useState(false);
  useEffect(() => {
    requestCarsPage(currentPage, pageSize, brandForFilter, categoryForFilter);
  }, [
    brandForFilter,
    categoryForFilter,
    currentPage,
    pageSize,
    requestCarsPage,
  ]);

  const onFilterSubmit = (value) => {
    setBrandForFilter(value.brand);
    setCategoryForFilter(value.category);
  };
  const onFilterReset = () => setBrandForFilter(false);

  return (
    <>
      <h2 className="admin__title">Список авто</h2>
      <div className="admin__card cars-table">
        <div className="cars-table__header">
          <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
            <Form className="cars-table__filter">
              <div className="cars-table__filter-items">
                <Filter name="brand" options={brandOptions} />
                <Filter name="category" options={categoryOptions} />
              </div>
              <div className="cars-table__filter-buttons">
                <div className="cars-table__filter-button">
                  <Button type="submit" additionalStyles="button__admin">
                    Применить
                  </Button>
                </div>
                <div className="cars-table__filter-button">
                  <Button
                    onClick={onFilterReset}
                    additionalStyles="button__admin button__admin-delete"
                  >
                    Сбросить
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="cars-table__content">
          {isFetching ? (
            <AdminPreloader />
          ) : (
            <table>
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header} scope="col">
                      header
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id}>
                    <td data-label="Модель">{car.name}</td>
                    <td data-label="Категория">{car.categoryId.name}</td>
                    <td data-label="Цвет">
                      <span className="colors">{car.colors.join(", ")}</span>
                    </td>
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
