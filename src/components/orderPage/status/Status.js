import React, { useState } from "react";
import "./Status.scss";
import { connect } from "react-redux";
import { Button, LinkButton } from "../../common/buttons/Buttons";
import { getPoints } from "../../../store/order-selectors";

const Status = ({
  step,
  setStep,
  isStepsDisabled,
  setIsStepsDisabled,
  isFinished,
  formData,
  points,
}) => {
  const [isModal, setIsModal] = useState(false);
  const onModalConfirm = () => {
    if (isFinished) {
      setStep(1);
    }
    setIsModal(false);
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

  const diffTime = Math.abs(formData.dateTo - formData.dateFrom);
  const diffDays =
    formData.dateTo && formData.dateFrom !== ""
      ? Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      : 0;

  const isPlaceValid = () =>
    points.find((point) => point.address === formData.locationPlace);

  const isButtonDisabled = () => {
    if (step === 1 && !isPlaceValid()) {
      return true;
    }
    if (step === 2 && formData.model === "") {
      return true;
    }
    if (step === 3 && diffDays === 0) {
      return true;
    }
    return false;
  };

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
        {formData.locationPlace !== "" && (
          <div className="status__info-item">
            <div className="status__info-name">Пункт выдачи</div>
            <div className="status__info-filler"> </div>
            <div className="status__info-value">
              <p>{formData.locationCity},</p>
              {formData.locationPlace}
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
        <span>от 8 000 до 12 000 ₽</span>
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
});

export default connect(mapStateToProps, {})(Status);
