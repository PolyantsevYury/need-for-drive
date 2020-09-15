import React, { useEffect } from "react";
import "./Orders.scss";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Button } from "../../common/buttons/Buttons";
import { Filter } from "../../common/forms/Forms";
import { Checkbox } from "../adminForms/AdminForms";
import modelExample from "../../../assets/images/adminModel.png";
import approveIcon from "../../../assets/images/icons/approve_icon.svg";
import rejectIcon from "../../../assets/images/icons/reject_icon.svg";
import editIcon from "../../../assets/images/icons/edit_icon.svg";
import Paginator from "../../common/paginator/Paginator";
import {
  requestOrdersPage,
  setCurrentOrdersPage,
} from "../../../store/orderstable-reducer";
import { AdminPreloader } from "../../common/preloader/Preloader";

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

const Orders = ({
  orders,
  requestOrdersPage,
  isFetching,
  pageSize,
  currentPage,
  setCurrentOrdersPage,
  totalOrdersCount,
}) => {
  useEffect(() => {
    requestOrdersPage();
  }, [requestOrdersPage]);

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
          {isFetching ? (
            <AdminPreloader />
          ) : (
            <div className="order">
              <div className="order__model">
                <img className="order__img" src={modelExample} alt="" />
                <div className="order__info">
                  <p className="order__info-item">
                    <span>ELANTRA</span> в <span>Ульяновск</span>, Нариманова 42
                  </p>
                  <p className="order__info-item">
                    <span>12.06.2019 12:00 — 13.06.2019 12:00</span>
                  </p>
                  <p className="order__info-item">
                    Цвет: <span>Голубой</span>
                  </p>
                  <p className="order__info-item">
                    Дата создания: <span>10.06.2019</span>
                  </p>
                  <p className="order__info-item">
                    Статус: <span>Подтвержден</span>
                  </p>
                </div>
              </div>
              <div className="order__options">
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
          )}
        </div>
        <div className="orders__footer">
          <Paginator
            currentPage={currentPage}
            onPageChanged={(p) => setCurrentOrdersPage(p)}
            totalItemsCount={totalOrdersCount}
            pageSize={pageSize}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  orders: state.ordersTable.orders,
  isFetching: state.ordersTable.isOrdersFetching,
  pageSize: state.ordersTable.ordersPageSize,
  currentPage: state.ordersTable.currentOrdersPage,
  totalOrdersCount: state.ordersTable.totalOrdersCount,
});

export default connect(mapStateToProps, {
  requestOrdersPage,
  setCurrentOrdersPage,
})(Orders);
