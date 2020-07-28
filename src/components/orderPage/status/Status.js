import React, { useState } from "react";
import "./Status.scss";
import PropTypes from "prop-types";
import { Button, LinkButton } from "../../common/buttons/Buttons";

const Status = ({
  step,
  setStep,
  isStepsDisabled,
  setIsStepsDisabled,
  isFinished,
  formData,
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
            <div className="status__info-item">
              <div className="status__info-name">Модель</div>
              <div className="status__info-filler"> </div>
              <div className="status__info-value">Hyndai, i30 N</div>
            </div>
            {!isStepsDisabled[3] && (
              <>
                <div className="status__info-item">
                  <div className="status__info-name">Цвет</div>
                  <div className="status__info-filler"> </div>
                  <div className="status__info-value">{formData.color}</div>
                </div>
                <div className="status__info-item">
                  <div className="status__info-name">Длительност аренды</div>
                  <div className="status__info-filler"> </div>
                  <div className="status__info-value">1д 2ч</div>
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
      >
        {buttonText()}
      </Button>
    </section>
  );
};

Status.propTypes = {
  isFinished: PropTypes.bool,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

Status.defaultProps = {
  isFinished: false,
};

export default Status;
