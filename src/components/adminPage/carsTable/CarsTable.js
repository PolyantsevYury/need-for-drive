import React from "react";
import "./CarsTable.scss";
import { Form, Formik } from "formik";
import { Filter } from "../../common/forms/Forms";
import { Button } from "../../common/buttons/Buttons";
// import { Button } from "../../common/buttons/Buttons";
// import { Checkbox, Text } from "../../common/forms/Forms";

const CarsTable = () => {
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
        <div className="cars-table__content">Table</div>
        <div className="cars-table__footer">footer</div>
      </div>
    </>
  );
};

export default CarsTable;
