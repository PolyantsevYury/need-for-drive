import React, { useEffect, useState } from "react";
import "./CarsTable.scss";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import classNames from "classnames";
import FilterIcon from "../../common/icons/FilterIcon";
import Paginator from "../../common/paginator/Paginator";
import {
  requestCarsPage,
  setCurrentPage,
} from "../../../store/carstable-reducer";
import { AdminPreloader } from "../../common/preloader/Preloader";
import { Checkbox } from "../adminForms/AdminForms";

const CarsTable = ({
  requestCarsPage,
  isFetching,
  cars,
  pageSize,
  currentPage,
  totalCarsCount,
  setCurrentPage,
}) => {
  const [categoriesForFilter, setCategoriesForFilter] = useState([]);
  useEffect(() => {
    requestCarsPage(currentPage, pageSize, categoriesForFilter);
  }, [categoriesForFilter, currentPage, pageSize, requestCarsPage]);

  return (
    <>
      <h2 className="admin__title">Список авто</h2>
      <div className="admin__card cars-table">
        <div className="cars-table__header">
          <div className="cars-table__header-filter">
            <Filter
              categoriesForFilter={categoriesForFilter}
              setCategoriesForFilter={setCategoriesForFilter}
              withButton
            />
          </div>
        </div>
        <div className="cars-table__content">
          {isFetching ? (
            <AdminPreloader />
          ) : (
            <table>
              <thead>
                <tr>
                  <th scope="col">Модель</th>
                  <th scope="col">
                    Категория
                    <Filter
                      categoriesForFilter={categoriesForFilter}
                      setCategoriesForFilter={setCategoriesForFilter}
                    />
                  </th>
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

const Filter = ({
  categoriesForFilter,
  setCategoriesForFilter,
  withButton = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const initialValues = {
    economic: categoriesForFilter.includes("Эконом"),
    premium: categoriesForFilter.includes("Премиум"),
  };
  const onFilterSubmit = (value) => {
    const arrayForFilter = [];
    if (value.economic) arrayForFilter.push("Эконом");
    if (value.premium) arrayForFilter.push("Премиум");
    setIsDropdownOpen(false);
    setCategoriesForFilter(arrayForFilter);
  };
  const onFilterReset = (resetForm) => {
    setCategoriesForFilter([]);
    resetForm();
    setIsDropdownOpen(false);
  };
  const dropdownIconStyles = classNames("dropdown-icon", {
    "dropdown-icon--active": categoriesForFilter.length !== 0,
    "dropdown-icon--with-button": withButton,
  });

  return (
    <span className="dropdown-container">
      <button
        className={dropdownIconStyles}
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {withButton && "Категории"}
        <FilterIcon />
      </button>
      <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
        {(formik) => {
          return (
            isDropdownOpen && (
              <Form className="table-dropdown">
                <div className="table-dropdown__content">
                  <Checkbox
                    items={[
                      {
                        label: "Эконом",
                        value: "economic",
                        checked: formik.values.economic === true,
                      },
                      {
                        label: "Премиум",
                        value: "premium",
                        checked: formik.values.premium === true,
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
                    disabled={!formik.values.economic && !formik.values.premium}
                    onClick={() => onFilterReset(formik.resetForm)}
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
    </span>
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
