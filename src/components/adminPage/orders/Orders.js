import React, { useState } from "react";
import "./Orders.scss";
import { Form, Formik } from "formik";
import { Button } from "../../common/buttons/Buttons";
import { Checkbox, Filter } from "../../common/forms/Forms";
import modelExample from "../../../assets/images/adminModel.png";
import approveIcon from "../../../assets/images/icons/approve_icon.svg";
import rejectIcon from "../../../assets/images/icons/reject_icon.svg";
import editIcon from "../../../assets/images/icons/edit_icon.svg";
import Paginator from "../../common/paginator/Paginator";

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

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-console
  const onFilterSubmit = (value) => console.log(value);
  // eslint-disable-next-line no-console
  const onCheck = () => console.log("Check");

  return (
    <>
      <h2 className="admin__title">Заказы</h2>
      <div className="admin__card orders">
        <div className="orders__header">
          <Formik initialValues={initialValues} onSubmit={onFilterSubmit}>
            <Form className="orders__filter">
              <div className="orders__filter-items">
                <div className="orders__container">
                  <Filter name="period" options={periodOptions} />
                  <Filter name="model" options={modelOptions} />
                </div>
                <div className="orders__container">
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
        <div className="orders__content">
          <div className="order">
            <div className="container">
              <img className="order__img" src={modelExample} alt="" />
              <div className="order__info">
                <p className="order__info-item">
                  <span>ELANTRA</span> в <span>Ульяновск</span>, Нариманова 42
                </p>
                <p className="order__info-item">
                  12.06.2019 12:00 — 13.06.2019 12:00
                </p>
                <p className="order__info-item">
                  Цвет: <span>Голубой</span>
                </p>
              </div>
            </div>
            <div className="container">
              <Checkbox
                direction="column"
                items={[
                  {
                    label: "Полный бак",
                    value: "fullFuel",
                    checked: true,
                  },
                  {
                    label: "Детское кресло",
                    value: "childSeat",
                    checked: false,
                  },
                  {
                    label: "Правый руль",
                    value: "rightHand",
                    checked: true,
                  },
                ]}
                onChange={onCheck}
              />
              <div className="order__price">4 300 ₽</div>
            </div>
            <div className="order__actions">
              <button className="order__approve-btn" type="button">
                <img src={approveIcon} alt=" " />
                Готово
              </button>
              <button className="order__reject-btn" type="button">
                <img src={rejectIcon} alt=" " />
                Отмена
              </button>
              <button className="order__edit-btn" type="button">
                <img src={editIcon} alt=" " />
                Изменить
              </button>
            </div>
          </div>
        </div>
        <div className="orders__footer">
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

export default Orders;
