import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./PriceBar.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, LinkButton } from "../../common/buttons/Buttons";
import {
  getCities,
  getOrderId,
  getPoints,
} from "../../../store/order-selectors";
import { submitOrder } from "../../../store/order-reducer";

const PriceBar = ({
  step,
  setStep,
  isStepsDisabled,
  setIsStepsDisabled,
  isFinished,
  orderData,
  cities,
  points,
  submitOrder,
  orderId,
  history,
}) => {
  useEffect(() => {
    if (orderId) {
      history.push(`/order/finished/${orderId}`);
    }
  }, [history, orderId]);

  const diffTime = Math.abs(orderData?.dateTo - orderData?.dateFrom);
  // const diffMinutes =
  //   orderData.dateTo && orderData.dateFrom !== ""
  //     ? Math.ceil(diffTime / (1000 * 60))
  //     : 0;
  const diffDays =
    orderData?.dateTo && orderData?.dateFrom !== ""
      ? Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      : 0;
  const calculatePrice = () => {
    let priceMin = 0;
    let priceMax = 0;
    let price = 0;
    if (orderData?.fullFuel) {
      priceMin += 500;
      price += 500;
    }
    if (orderData?.childSeat) {
      priceMin += 200;
      price += 200;
    }
    if (orderData?.rightHand) {
      priceMin += 1600;
      price += 1600;
    }
    if (orderData?.modelName) {
      priceMin =
        orderData.rate === "Поминутно"
          ? orderData.priceMin * 1.8 + priceMin
          : orderData.priceMin + priceMin;
      priceMax = orderData.priceMax + priceMax;
      price = `${priceMin} - ${priceMax}`;
    }
    if (diffDays !== 0) {
      price = priceMin * diffDays;
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
        ? "5e26a0e2099b810b946c5d86"
        : "5e26a0d2099b810b946c5d85";
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
      setStep(1);
      setIsModal(false);
    } else {
      submitForm();
    }
  };
  const buttonText = () => {
    if (isFinished) {
      return "Отменить";
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
    if (step > 2 && diffDays === 0) {
      return true;
    }
    return false;
  };

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
              <LinkButton
                to={isFinished ? "/order" : false}
                onClick={() => onModalConfirm()}
              >
                Подтвердить
              </LinkButton>
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
            <div className="price-bar__info-filler"> </div>
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
                <div className="price-bar__info-filler"> </div>
                <div className="price-bar__info-value">
                  {orderData?.modelName}
                </div>
              </div>
            )}
            {(isFinished || !isStepsDisabled[3]) && (
              <>
                <div className="price-bar__info-item">
                  <div className="price-bar__info-name">Цвет</div>
                  <div className="price-bar__info-filler"> </div>
                  <div className="price-bar__info-value">
                    {orderData?.color?.charAt(0).toUpperCase() +
                      orderData?.color?.slice(1)}
                  </div>
                </div>
                <div className="price-bar__info-item">
                  <div className="price-bar__info-name">Длительност аренды</div>
                  <div className="price-bar__info-filler"> </div>
                  <div className="price-bar__info-value">{diffDays}д</div>
                </div>
                <div className="price-bar__info-item">
                  <div className="price-bar__info-name">Тариф</div>
                  <div className="price-bar__info-filler"> </div>
                  <div className="price-bar__info-value">{orderData?.rate}</div>
                </div>
                {orderData?.fullFuel && (
                  <div className="price-bar__info-item">
                    <div className="price-bar__info-name">Полный бак</div>
                    <div className="price-bar__info-filler"> </div>
                    <div className="price-bar__info-value">Да</div>
                  </div>
                )}
                {orderData?.childSeat && (
                  <div className="price-bar__info-item">
                    <div className="price-bar__info-name">Детское кресло</div>
                    <div className="price-bar__info-filler"> </div>
                    <div className="price-bar__info-value">Да</div>
                  </div>
                )}
                {orderData?.rightHand && (
                  <div className="price-bar__info-item">
                    <div className="price-bar__info-name">Правый руль</div>
                    <div className="price-bar__info-filler"> </div>
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
        <span>{orderData?.price || calculatePrice()}</span>
      </div>
      <Button
        additionalStyles={isFinished ? "button__cancel" : ""}
        onClick={() => onButtonClick()}
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
});

export default compose(
  connect(mapStateToProps, { submitOrder }),
  withRouter
)(PriceBar);
