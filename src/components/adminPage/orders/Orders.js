import React, { useEffect, useState } from "react";
import "./Orders.scss";
import { connect } from "react-redux";
import { Checkbox, DropdownCheckbox } from "../adminForms/AdminForms";
import approveIcon from "../../../assets/images/icons/approve_icon.svg";
import rejectIcon from "../../../assets/images/icons/reject_icon.svg";
import editIcon from "../../../assets/images/icons/edit_icon.svg";
import Paginator from "../../common/paginator/Paginator";
import {
  requestOrdersPage,
  setCurrentOrdersPage,
} from "../../../store/orderstable-reducer";
import { AdminPreloader } from "../../common/preloader/Preloader";

const checkboxCitiesItems = [
  { label: "Ульяновск", value: "ulyanovsk" },
  { label: "Саранск", value: "saransk" },
  { label: "Самара", value: "samara" },
  { label: "Краснодар", value: "krasnodar" },
];

const checkboxStatusesItems = [
  { label: "В процессе", value: "process" },
  { label: "Завершенные", value: "finished" },
];

const Orders = ({
  orders,
  requestOrdersPage,
  isFetching,
  pageSize,
  currentPage,
  setCurrentOrdersPage,
  totalOrdersCount,
}) => {
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);
  useEffect(() => {
    requestOrdersPage(currentPage, pageSize);
  }, [currentPage, pageSize, requestOrdersPage]);

  const convertDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()} ${newDate.getHours()}:00`;
  };

  const translateStatus = (status) => {
    switch (status) {
      case "cancelled":
        return "Отменен";
      case "confirmed":
        return "Подтвержден";
      case "issued":
        return "Рассматривается";
      case "new":
        return "Новый";
      default:
        return "Новый";
    }
  };

  return (
    <>
      <h2 className="admin__title">Заказы</h2>
      <div className="admin__card orders">
        <div className="orders__header">
          <DropdownCheckbox
            checkboxItems={checkboxCitiesItems}
            filteredItems={filteredCities}
            setFilteredItems={setFilteredCities}
            dropdownButton="Города"
          />
          <DropdownCheckbox
            checkboxItems={checkboxStatusesItems}
            filteredItems={filteredStatuses}
            setFilteredItems={setFilteredStatuses}
            dropdownButton="Статус"
          />
        </div>
        <div className="orders__content">
          {isFetching ? (
            <AdminPreloader />
          ) : (
            orders.map((order) => {
              const dateFrom = convertDate(order?.dateFrom);
              const dateTo = convertDate(order?.dateTo);
              const createdDate = convertDate(order?.createdAt);
              const translatedStatus = translateStatus(
                order?.orderStatusId?.name
              );
              return (
                <div className="order" key={order.id}>
                  <div className="order__model">
                    <img
                      className="order__img"
                      crossOrigin="anonymous"
                      referrerPolicy="origin"
                      src={`https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/${order.carId?.thumbnail?.path}`}
                      alt=""
                    />
                    <div className="order__info">
                      <p className="order__info-item">
                        <span>{order.carId.name}</span> в
                        <span> {order.cityId.name}</span>,{" "}
                        {order.pointId.address}
                      </p>
                      <p className="order__info-item">
                        <span>
                          {dateFrom} — {dateTo}
                        </span>
                      </p>
                      <p className="order__info-item">
                        Цвет: <span>{order.color}</span>
                      </p>
                      <p className="order__info-item">
                        Дата создания: <span>{createdDate}</span>
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
                          checked: order.isFullTank,
                        },
                        {
                          label: "Детское кресло",
                          value: "childSeat",
                          checked: order.isNeedChildChair,
                        },
                        {
                          label: "Правый руль",
                          value: "rightHand",
                          checked: order.isRightWheel,
                        },
                      ]}
                      onChange={() => {}}
                    />
                    <div className="order__price-container">
                      <div className="order__status-text">
                        Статус: <p>{translatedStatus}</p>
                      </div>
                      <div className="order__price">{order.price || 0} ₽</div>
                    </div>
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
              );
            })
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
