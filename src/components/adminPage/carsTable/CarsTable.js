import React, { useEffect, useState } from "react";
import "./CarsTable.scss";
import { connect } from "react-redux";
import Paginator from "../../common/paginator/Paginator";
import {
  requestCarsPage,
  setCurrentCarsPage,
} from "../../../store/carstable-reducer";
import { AdminPreloader } from "../../common/preloader/Preloader";
import { DropdownCheckbox } from "../adminForms/AdminForms";

const checkboxItems = [
  { label: "Эконом", value: "economic" },
  { label: "Премиум", value: "premium" },
];

const CarsTable = ({
  requestCarsPage,
  isFetching,
  cars,
  pageSize,
  currentPage,
  totalCarsCount,
  setCurrentCarsPage,
}) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    requestCarsPage(currentPage, pageSize, filteredCategories);
  }, [currentPage, filteredCategories, pageSize, requestCarsPage]);

  return (
    <>
      <h2 className="admin__title">Список авто</h2>
      <div className="admin__card cars-table">
        <div className="cars-table__header">
          <div className="cars-table__header-filter">
            <DropdownCheckbox
              checkboxItems={checkboxItems}
              filteredItems={filteredCategories}
              setFilteredItems={setFilteredCategories}
              dropdownButton="Категории"
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
                    <DropdownCheckbox
                      checkboxItems={checkboxItems}
                      filteredItems={filteredCategories}
                      setFilteredItems={setFilteredCategories}
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
            onPageChanged={(p) => setCurrentCarsPage(p)}
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
  pageSize: state.carsTable.carsPageSize,
  currentPage: state.carsTable.currentCarsPage,
  totalCarsCount: state.carsTable.totalCarsCount,
});

export default connect(mapStateToProps, {
  requestCarsPage,
  setCurrentCarsPage,
})(CarsTable);
