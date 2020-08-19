import React from "react";
import Logo from "../../assets/images/loginLogo.svg";
import "./Login.scss";

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
            <button className="login-form__submit-btn" type="button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
