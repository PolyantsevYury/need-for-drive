import React from "react";
import Logo from "../../assets/images/loginLogo.svg";
import "./Login.scss";
import { Button } from "../common/buttons/Buttons";
import { Text } from "../common/forms/Forms";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login">
        <img className="login__logo" src={Logo} alt="" />
        <div className="login-form">
          <h3 className="login-form__label">Вход</h3>
          <Text title="Почта" placeholder="admin@gmail.com" type="email" />
          <Text title="Пароль" type="password" />
          <div className="login-form__footer">
            <div className="login-form__request">Запросить доступ</div>
            <Button additionalStyles="button__admin button__login">
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
