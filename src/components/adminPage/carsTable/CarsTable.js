import React, { useState } from "react";
import "./CarsTable.scss";
import { Form, Formik } from "formik";
import { Filter } from "../../common/forms/Forms";
import { Button } from "../../common/buttons/Buttons";
import Paginator from "../../common/paginator/Paginator";

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

const CarsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
              <tr>
                <td data-label="Модель">Hyndai, i30 N</td>
                <td data-label="Категория">Эконом</td>
                <td data-label="Цвет">синий, красный</td>
                <td data-label="Цена">10000 - 25000 ₽</td>
              </tr>
              <tr>
                <td data-label="Модель">Hyndai, i30 N</td>
                <td data-label="Категория">Эконом</td>
                <td data-label="Цвет">белый, черный</td>
                <td data-label="Цена">12000 - 32000 ₽</td>
              </tr>
              <tr>
                <td data-label="Модель">Hyndai, i30 N</td>
                <td data-label="Категория">Премиум</td>
                <td data-label="Цвет">белый, черный</td>
                <td data-label="Цена">12000 - 32000 ₽</td>
              </tr>
              <tr>
                <td data-label="Модель">Hyndai, i30 N</td>
                <td data-label="Категория">Премиум</td>
                <td data-label="Цвет">белый, черный</td>
                <td data-label="Цена">12000 - 32000 ₽</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cars-table__footer">
          <Paginator
            currentPage={currentPage}
            onPageChanged={(p) => setCurrentPage(p)}
            totalItemsCount={140}
            pageSize={7}
          />
        </div>
      </div>
    </>
  );
};

export default CarsTable;
