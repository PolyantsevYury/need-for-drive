import React from "react";
import "./Orders.scss";
import { Form, Formik } from "formik";
import { Button } from "../../common/buttons/Buttons";
import { Filter } from "../../common/forms/Forms";

const Orders = () => {
  const periodOptions = [
    { key: "За год", value: "year" },
    { key: "За месяц", value: "month" },
    { key: "За неделю", value: "week" },
    { key: "За день", value: "day" },
  ];
  const modelOptions = [
    { key: "Все модели", value: "all" },
    { key: "Elantra", value: "Elantra" },
    { key: "Tucson", value: "Tucson" },
    { key: "Solaris", value: "Solaris" },
  ];
  const cityOptions = [
    { key: "Ульяновск", value: "Ульяновск" },
    { key: "Саранск", value: "Саранск" },
    { key: "Самара", value: "Самара" },
    { key: "Краснодар", value: "Краснодар" },
  ];
  const statusOptions = [
    { key: "В процессе", value: "process" },
    { key: "Завершенные", value: "finished" },
  ];
  const initialValues = {
    period: "week",
    model: "all",
    city: "Ульяновск",
    status: "process",
  };
  // eslint-disable-next-line no-console
  const onFilterSubmit = (value) => console.log(value);

  return (
    <div className="orders">
      <h2 className="content__title">Заказы</h2>
      <div className="content__card orders__card">
        <div className="orders__header">
          <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
            <Form className="orders__filter">
              <div className="orders__filter-items">
                <div className="container">
                  <Filter name="period" options={periodOptions} />
                  <Filter name="model" options={modelOptions} />
                </div>
                <div className="container">
                  <Filter name="city" options={cityOptions} />
                  <Filter name="status" options={statusOptions} />
                </div>
              </div>
              <div className="orders__filter-btn">
                <Button additionalStyles="button__admin">Применить</Button>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="orders__content">f</div>
        <div className="orders__footer">f</div>
      </div>
    </div>
  );
};

export default Orders;
