import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./PriceBar.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button } from "../../common/buttons/Buttons";
import {
  getCities,
  getOrderId,
  getPoints,
  getRate,
} from "../../../store/order-selectors";
import {
  cancelOrder,
  requestRate,
  submitOrder,
} from "../../../store/order-reducer";

const PriceBar = ({
  step,
  setStep,
  isStepsDisabled,
  setIsStepsDisabled,
  isFinished,
  orderData,
  requestRate,
  rate,
  cities,
  points,
  submitOrder,
  cancelOrder,
  isOrderSubmitting,
  isOrderFetching,
  isOrderCancelling,
  orderId,
  history,
}) => {
  useEffect(() => {
    if (orderId) {
      history.push(`/order/finished/${orderId}`);
    }
  }, [history, orderId]);
  useEffect(() => {
    requestRate();
  }, [requestRate]);

  const diffTime = Math.abs(orderData?.dateTo - orderData?.dateFrom);
  const diffMinutes =
    orderData.dateTo && orderData.dateFrom !== ""
      ? Math.ceil(diffTime / (1000 * 60))
      : 0;
  const diffHours =
    orderData.dateTo && orderData.dateFrom !== ""
      ? Math.ceil(diffTime / (1000 * 60 * 60))
      : 0;
  const diffDays =
    orderData?.dateTo && orderData?.dateFrom !== ""
      ? Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      : 0;
  const calculatePrice = () => {
    let price = 0;
    if (orderData.modelName) {
      if (diffMinutes === 0) {
        let priceMin =
          orderData.rate === "Поминутно"
            ? orderData.priceMin * 1.5
            : orderData.priceMin;
        const { priceMax } = orderData;
        if (orderData?.fullFuel) {
          priceMin += 500;
        }
        if (orderData?.childSeat) {
          priceMin += 200;
        }
        if (orderData?.rightHand) {
          priceMin += 1600;
        }
        price = `${priceMin} - ${priceMax}`;
      } else {
        price = Math.round(
          orderData.rate === "Поминутно"
            ? (orderData.priceMin / 1440) * diffMinutes * 1.5
            : orderData.priceMin * diffDays
        );
        if (orderData?.fullFuel) {
          price += 500;
        }
        if (orderData?.childSeat) {
          price += 200;
        }
        if (orderData?.rightHand) {
          price += 1600;
        }
      }
    }
    return `${price} ₽`;
  };
  const [isModal, setIsModal] = useState(false);
  const submitForm = () => {
    const cityId = cities.find((city) => city.name === orderData.locationCity)
      .id;
    const pointId = points.find(
      (point) => point.address === orderData.locationPoint
    ).id;
    const { carId } = orderData;
    const { color } = orderData;
    const dateFrom = orderData.dateFrom.getTime();
    const dateTo = orderData.dateTo.getTime();
    const rateId =
      orderData.rate === "На сутки"
        ? rate.find((rate) => rate.rateTypeId.name === "На сутки").id
        : rate.find((rate) => rate.rateTypeId.name === "Поминутно").id;
    const price = calculatePrice();
    const isFullTank = orderData.fullFuel;
    const isNeedChildChair = orderData.childSeat;
    const isRightWheel = orderData.rightHand;
    submitOrder(
      cityId,
      pointId,
      carId,
      color,
      dateFrom,
      dateTo,
      rateId,
      price,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
      setIsModal
    );
  };
  const onModalConfirm = () => {
    if (isFinished) {
      cancelOrder(orderId, setIsModal);
    } else {
      submitForm();
    }
  };
  const buttonText = () => {
    if (isFinished) {
      return orderData?.status === "отменен"
        ? "Оформить новый заказ"
        : "Отменить";
    }
    switch (step) {
      case 1:
        return "Выбрать модель";
      case 2:
        return "Дополнительно";
      case 3:
        return "Итого";
      case 4:
        return "Заказать";
      default:
        return "Выбрать модель";
    }
  };
  const onButtonClick = () => {
    if (step === 4 || isFinished) {
      setIsModal(!isModal);
    } else {
      const nexStep = step + 1;
      setIsStepsDisabled({
        ...isStepsDisabled,
        [nexStep]: false,
      });
      setStep(nexStep);
    }
  };
  const isPlaceValid = () =>
    points.find((point) => point.address === orderData?.locationPoint);

  const isButtonDisabled = () => {
    if (isFinished) {
      return false;
    }
    if (!isPlaceValid()) {
      return true;
    }
    if (step > 1 && !orderData.modelName) {
      return true;
    }
    return step > 2 && diffDays === 0;
  };

  if (isOrderFetching) return "";

  return (
    <section className="price-bar">
      {isModal && (
        <div className="modal">
          <div className="modal__overlay" />
          <div className="modal__container">
            <div className="modal__title">
              {isFinished ? "Отменить заказ" : "Подтвердить заказ"}
            </div>
            <div className="modal__buttons">
              <Button
                onClick={() => onModalConfirm()}
                isLoading={isFinished ? isOrderCancelling : isOrderSubmitting}
              >
                Подтвердить
              </Button>
              <div className="modal__buttons-space" />
              <Button
                additionalStyles="button__cancel"
                onClick={() => setIsModal(false)}
              >
                Вернуться
              </Button>
            </div>
          </div>
        </div>
      )}
      <h2 className="price-bar__title">Ваш заказ:</h2>
      <div className="price-bar__info-items">
        {orderData?.locationPoint && (
          <div className="price-bar__info-item">
            <div className="price-bar__info-name">Пункт выдачи</div>
            <div className="price-bar__info-filler" />
            <div className="price-bar__info-value">
              <p>{orderData?.locationCity},</p>
              {orderData?.locationPoint}
            </div>
          </div>
        )}
        {((isFinished && orderData.modelName) ||
          (!isStepsDisabled[2] && orderData.modelName)) && (
          <>
            {orderData?.modelName && (
              <div className="price-bar__info-item">
                <div className="price-bar__info-name">Модель</div>
                <div className="price-bar__info-filler" />
                <div className="price-bar__info-value">
                  {orderData?.modelName}
                </div>
              </div>
            )}
            {(isFinished || !isStepsDisabled[3]) && (
              <>
                <div className="price-bar__info-item">
                  <div className="price-bar__info-name">Цвет</div>
                  <div className="price-bar__info-filler" />
                  <div className="price-bar__info-value">
                    {orderData?.color?.charAt(0).toUpperCase() +
                      orderData?.color?.slice(1)}
                  </div>
                </div>
                <div className="price-bar__info-item">
                  <div className="price-bar__info-name">Длительност аренды</div>
                  <div className="price-bar__info-filler" />
                  <div className="price-bar__info-value">{`${Math.floor(
                    diffHours / 24
                  )}д ${diffHours % 24}ч`}</div>
                </div>
                <div className="price-bar__info-item">
                  <div className="price-bar__info-name">Тариф</div>
                  <div className="price-bar__info-filler" />
                  <div className="price-bar__info-value">{orderData?.rate}</div>
                </div>
                {orderData?.fullFuel && (
                  <div className="price-bar__info-item">
                    <div className="price-bar__info-name">Полный бак</div>
                    <div className="price-bar__info-filler" />
                    <div className="price-bar__info-value">Да</div>
                  </div>
                )}
                {orderData?.childSeat && (
                  <div className="price-bar__info-item">
                    <div className="price-bar__info-name">Детское кресло</div>
                    <div className="price-bar__info-filler" />
                    <div className="price-bar__info-value">Да</div>
                  </div>
                )}
                {orderData?.rightHand && (
                  <div className="price-bar__info-item">
                    <div className="price-bar__info-name">Правый руль</div>
                    <div className="price-bar__info-filler" />
                    <div className="price-bar__info-value">Да</div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="price-bar__price">
        <h4 className="price-bar__price-title">Цена: </h4>
        {/* get price from finished order data or calculate it if the order is being formed */}
        <span>{orderData?.price || calculatePrice()}</span>
      </div>
      <Button
        additionalStyles={
          isFinished && orderData?.status !== "отменен" ? "button__cancel" : ""
        }
        onClick={() =>
          orderData?.status === "отменен"
            ? history.push("/order/")
            : onButtonClick()
        }
        isDisabled={isButtonDisabled()}
      >
        {buttonText()}
      </Button>
    </section>
  );
};

const mapStateToProps = (state) => ({
  points: getPoints(state),
  cities: getCities(state),
  orderId: getOrderId(state),
  rate: getRate(state),
  isOrderSubmitting: state.order.isOrderSubmitting,
  isOrderCancelling: state.order.isOrderCancelling,
  isOrderFetching: state.order.isOrderFetching,
});

export default compose(
  connect(mapStateToProps, { requestRate, submitOrder, cancelOrder }),
  withRouter
)(PriceBar);
