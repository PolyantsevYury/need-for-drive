import React, { useState } from "react";
import "./Status.scss";
import { connect } from "react-redux";
import { Button, LinkButton } from "../../common/buttons/Buttons";
import { getCars, getCities, getPoints } from "../../../store/order-selectors";
import { submitOrder } from "../../../store/order-reducer";

const Status = ({
  step,
  setStep,
  isStepsDisabled,
  setIsStepsDisabled,
  isFinished,
  formData,
  cars,
  cities,
  points,
  submitOrder,
}) => {
  const modelData = cars.find((car) => car.name === formData.model);
  const diffTime = Math.abs(formData.dateTo - formData.dateFrom);
  // const diffMinutes =
  //   formData.dateTo && formData.dateFrom !== ""
  //     ? Math.ceil(diffTime / (1000 * 60))
  //     : 0;
  const diffDays =
    formData.dateTo && formData.dateFrom !== ""
      ? Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      : 0;
  const calculatePrice = () => {
    let priceMin = 0;
    let priceMax = 0;
    let price = 0;
    if (formData.fullFuel) {
      priceMin += 500;
      price += 500;
    }
    if (formData.childSeat) {
      priceMin += 200;
      price += 200;
    }
    if (formData.rightHand) {
      priceMin += 1600;
      price += 1600;
    }
    if (formData.model !== "") {
      priceMin =
        formData.plan === "minute"
          ? modelData.priceMin * 1.8 + priceMin
          : modelData.priceMin + priceMin;
      priceMax = modelData.priceMax + priceMax;
      price = `${priceMin} - ${priceMax}`;
    }
    if (diffDays !== 0) {
      price = priceMin * diffDays;
    }
    return `${price} ₽`;
  };
  const [isModal, setIsModal] = useState(false);
  const submitForm = () => {
    const cityId = cities.find((city) => city.name === formData.locationCity)
      .id;
    const pointId = points.find(
      (point) => point.address === formData.locationPoint
    ).id;
    const carId = modelData.id;
    const { color } = formData;
    const dateFrom = formData.dateFrom.getTime();
    const dateTo = formData.dateTo.getTime();
    const rateId =
      formData.plan === "day"
        ? "5e26a0e2099b810b946c5d86"
        : "5e26a0d2099b810b946c5d85";
    const price = calculatePrice();
    const isFullTank = formData.fullFuel;
    const isNeedChildChair = formData.childSeat;
    const isRightWheel = formData.rightHand;
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
      isRightWheel
    );
  };
  const onModalConfirm = () => {
    if (isFinished) {
      setStep(1);
      setIsModal(false);
    } else {
      submitForm();
      setIsModal(false);
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
    points.find((point) => point.address === formData.locationPoint);

  const isButtonDisabled = () => {
    if (!isPlaceValid()) {
      return true;
    }
    if (step > 1 && formData.model === "") {
      return true;
    }
    if (step > 2 && diffDays === 0) {
      return true;
    }
    return false;
  };
  // 5e26a0d2099b810b946c5d85 min
  // 5e26a0e2099b810b946c5d86 day
  return (
    <section className="status">
      {isModal && (
        <div className="modal">
          <div className="modal__overlay" />
          <div className="modal__container">
            <div className="modal__title">
              {isFinished ? "Отменить заказ" : "Подтвердить заказ"}
            </div>
            <div className="modal__buttons">
              <LinkButton
                to={isFinished ? "/order" : "/order/finished"}
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
      <h2 className="status__title">Ваш заказ:</h2>
      <div className="status__info-items">
        {formData.locationPoint !== "" && (
          <div className="status__info-item">
            <div className="status__info-name">Пункт выдачи</div>
            <div className="status__info-filler"> </div>
            <div className="status__info-value">
              <p>{formData.locationCity},</p>
              {formData.locationPoint}
            </div>
          </div>
        )}
        {!isStepsDisabled[2] && (
          <>
            {formData.model !== "" && (
              <div className="status__info-item">
                <div className="status__info-name">Модель</div>
                <div className="status__info-filler"> </div>
                <div className="status__info-value">{formData.model}</div>
              </div>
            )}
            {!isStepsDisabled[3] && (
              <>
                <div className="status__info-item">
                  <div className="status__info-name">Цвет</div>
                  <div className="status__info-filler"> </div>
                  <div className="status__info-value">
                    {formData.color.charAt(0).toUpperCase() +
                      formData.color.slice(1)}
                  </div>
                </div>
                <div className="status__info-item">
                  <div className="status__info-name">Длительност аренды</div>
                  <div className="status__info-filler"> </div>
                  <div className="status__info-value">{diffDays}д</div>
                </div>
                <div className="status__info-item">
                  <div className="status__info-name">Тариф</div>
                  <div className="status__info-filler"> </div>
                  <div className="status__info-value">
                    {formData.plan === "day" ? "На сутки" : "Поминутно"}
                  </div>
                </div>
                {formData.fullFuel && (
                  <div className="status__info-item">
                    <div className="status__info-name">Полный бак</div>
                    <div className="status__info-filler"> </div>
                    <div className="status__info-value">Да</div>
                  </div>
                )}
                {formData.childSeat && (
                  <div className="status__info-item">
                    <div className="status__info-name">Детское кресло</div>
                    <div className="status__info-filler"> </div>
                    <div className="status__info-value">Да</div>
                  </div>
                )}
                {formData.rightHand && (
                  <div className="status__info-item">
                    <div className="status__info-name">Правый руль</div>
                    <div className="status__info-filler"> </div>
                    <div className="status__info-value">Да</div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="status__price">
        <h4 className="status__price-title">Цена: </h4>
        <span>{calculatePrice()}</span>
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
  cars: getCars(state),
  cities: getCities(state),
});

export default connect(mapStateToProps, { submitOrder })(Status);
