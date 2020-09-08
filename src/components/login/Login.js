import React from "react";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import * as Yup from "yup";
import Logo from "../../assets/images/loginLogo.svg";
import "./Login.scss";
import { Button } from "../common/buttons/Buttons";
import { Text } from "../common/forms/Forms";
import { logIn } from "../../store/auth-reducer";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Пожалуйста введите логин"),
  password: Yup.string().required("Пожалуйста введите пароль"),
});

const Login = ({ isAuthInProgress, isAuthFailed, logIn }) => {
  const accessToken = Cookies.get("access_token");
  if (accessToken) return <Redirect to="/admin/orders" />;

  const onLoginSubmit = (userData) => {
    logIn(userData);
  };
  return (
    <div className="login-wrapper">
      <div className="login">
        <img className="login__logo" src={Logo} alt="" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onLoginSubmit}
        >
          {(formik) => {
            return (
              <Form className="login-form">
                <h3 className="login-form__label">Вход</h3>
                {isAuthFailed && (
                  <span className="error-message">
                    Неверный логин или пароль
                  </span>
                )}
                <Text
                  name="username"
                  title="Почта"
                  placeholder="admin@gmail.com"
                  type="text"
                />
                <Text name="password" title="Пароль" type="password" />
                <div className="login-form__footer">
                  <div className="login-form__request">Запросить доступ</div>
                  <Button
                    type="submit"
                    additionalStyles="button__admin button__login"
                    isLoading={isAuthInProgress}
                    isDisabled={!formik.isValid}
                  >
                    Войти
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthInProgress: state.auth.isAuthInProgress,
  isAuthFailed: state.auth.isAuthFailed,
});

export default connect(mapStateToProps, { logIn })(Login);
