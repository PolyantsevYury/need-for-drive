import React, { useEffect, useState } from "react";
import "./CarsTable.scss";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Filter } from "../../common/forms/Forms";
import FilterIcon from "../../common/icons/FilterIcon";
import { Button } from "../../common/buttons/Buttons";
import Paginator from "../../common/paginator/Paginator";
import {
  requestCarsPage,
  setCurrentPage,
} from "../../../store/carstable-reducer";
import { AdminPreloader } from "../../common/preloader/Preloader";
import { Checkbox } from "../adminForms/AdminForms";

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

const CarsTable = ({
  requestCarsPage,
  isFetching,
  cars,
  pageSize,
  currentPage,
  totalCarsCount,
  setCurrentPage,
}) => {
  const [brandsForFilter, setBrandsForFilter] = useState([]);
  const [categoryForFilter, setCategoryForFilter] = useState(false);
  useEffect(() => {
    requestCarsPage(currentPage, pageSize, brandsForFilter, categoryForFilter);
  }, [
    brandsForFilter,
    categoryForFilter,
    currentPage,
    pageSize,
    requestCarsPage,
  ]);

  const onFilterSubmit = (value) => {
    setBrandsForFilter(value.brand !== "Все модели" ? [value.brand] : []);
    setCategoryForFilter(value.category);
  };
  const onFilterReset = (resetForm) => {
    setBrandsForFilter([]);
    setCategoryForFilter(false);
    resetForm();
  };

  return (
    <>
      <h2 className="admin__title">Список авто</h2>
      <div className="admin__card cars-table">
        <div className="cars-table__header">
          <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
            {(formik) => {
              return (
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
                        onClick={() => onFilterReset(formik.resetForm)}
                        additionalStyles="button__admin button__admin-delete"
                      >
                        Сбросить
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className="cars-table__content">
          {isFetching ? (
            <AdminPreloader />
          ) : (
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    Модель
                    <DropdownFilter setBrandsForFilter={setBrandsForFilter} />
                  </th>
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

const DropdownFilter = ({ setBrandsForFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const initialValues = {
    Hyundai: false,
    Nissan: false,
  };

  const onDropdownFilterSubmit = (value) => {
    const arrayForFilter = [];
    if (value.Hyundai) arrayForFilter.push("Hyundai");
    if (value.Nissan) arrayForFilter.push("Nissan");
    setBrandsForFilter(arrayForFilter);
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="dropdown-icon"
      >
        <FilterIcon />
      </button>
      <Formik initialValues={initialValues} onSubmit={onDropdownFilterSubmit}>
        {(formik) => {
          return (
            isDropdownOpen && (
              <Form className="table-dropdown">
                <div className="table-dropdown__content">
                  <Checkbox
                    items={[
                      {
                        label: "Hyundai",
                        value: "Hyundai",
                        checked: formik.values.Hyundai === true,
                      },
                      {
                        label: "Nissan",
                        value: "Nissan",
                        checked: formik.values.Nissan === true,
                      },
                    ]}
                    direction="column"
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="table-dropdown__footer">
                  <button
                    className="table-dropdown__reset-btn"
                    type="button"
                    disabled={!formik.values.Hyundai && !formik.values.Nissan}
                  >
                    Сбросить
                  </button>
                  <button className="table-dropdown__submit-btn" type="submit">
                    ОК
                  </button>
                </div>
              </Form>
            )
          );
        }}
      </Formik>
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
