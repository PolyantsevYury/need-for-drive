import React from "react";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Logo from "../../assets/images/loginLogo.svg";
import "./Login.scss";
import { Button } from "../common/buttons/Buttons";
import { Text } from "../common/forms/Forms";
import { logIn } from "../../store/order-reducer";

const initialValues = {
  username: "",
  password: "",
};

const Login = ({ isAuth, isAuthInProgress, logIn }) => {
  if (isAuth) return <Redirect to="/admin/orders" />;
  const onLoginSubmit = (userData) => {
    logIn(userData);
  };
  return (
    <div className="login-wrapper">
      <div className="login">
        <img className="login__logo" src={Logo} alt="" />
        <Formik initialValues={initialValues} onSubmit={onLoginSubmit}>
          <Form className="login-form">
            <h3 className="login-form__label">Вход</h3>
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
              >
                Войти
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.order.isAuth,
  isAuthInProgress: state.order.isAuthInProgress,
});

export default connect(mapStateToProps, { logIn })(Login);
