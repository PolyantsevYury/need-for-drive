import React from "react";
import Logo from "../../assets/images/loginLogo.svg";
import "./Login.scss";
import { Button } from "../common/buttons/Buttons";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login">
        <img className="login__logo" src={Logo} alt="" />
        <div className="login-form">
          <h3 className="login-form__label">Вход</h3>
          <div className="login-form__input" />
          <div className="login-form__input" />
          <div className="login-form__footer">
            <div className="login-form__request">Запросить доступ</div>
            <Button additionalStyles="button__admin button__login">
              Войти
            </Button>
            {/* <button className="login-form__submit-btn" type="button" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
