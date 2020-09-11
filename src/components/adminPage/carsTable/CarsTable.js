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

const categoryOptions = [
  { key: "Все категории", value: "Все категории" },
  { key: "Эконом", value: "Эконом" },
  { key: "Премиум", value: "Премиум" },
];

const initialValues = {
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
  const [categoriesForFilter, setCategoriesForFilter] = useState([]);
  useEffect(() => {
    requestCarsPage(currentPage, pageSize, categoriesForFilter);
  }, [categoriesForFilter, currentPage, pageSize, requestCarsPage]);

  const onFilterSubmit = (value) => {
    setCategoriesForFilter(
      value.brand !== "Все категории" ? [value.brand] : []
    );
  };
  const onFilterReset = (resetForm) => {
    setCategoriesForFilter([]);
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
                  <th scope="col">Модель</th>
                  <th scope="col">
                    Категория
                    <DropdownFilter
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

const DropdownFilter = ({ categoriesForFilter, setCategoriesForFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const initialValues = {
    economic: categoriesForFilter.includes("Эконом"),
    premium: categoriesForFilter.includes("Премиум"),
  };
  const onFilterSubmit = (value) => {
    const arrayForFilter = [];
    if (value.economic) arrayForFilter.push("Эконом");
    if (value.premium) arrayForFilter.push("Премиум");
    setCategoriesForFilter(arrayForFilter);
  };
  const onFilterReset = (resetForm) => {
    setCategoriesForFilter([]);
    resetForm();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`dropdown-icon ${
          categoriesForFilter.length !== 0 ? "dropdown-icon--active" : ""
        }`}
      >
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
