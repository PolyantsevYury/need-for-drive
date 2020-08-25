import React from "react";
import { Button } from "../../common/buttons/Buttons";
import "./Error.scss";

const Error = () => {
  return (
    <div className="error">
      <h2 className="error__number">500</h2>
      <h5 className="error__title">Что то пошло не так</h5>
      <span className="error__subtitle">Попробуйте перезагрузить страницу</span>
      <Button additionalStyles="button__admin">Назад</Button>
    </div>
  );
};

export default Error;
