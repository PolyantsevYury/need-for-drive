import React, { useEffect } from "react";
import "./AdminPage.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./orders/Orders";
import NavBar from "./NavBar";
import Header from "./Header";
import NavBarMobile from "./NavBarMobile";
import Error from "./error/Error";
import CarSetting from "./carSetting/CarSetting";
import CarsTable from "./carsTable/CarsTable";
import { authCheck } from "../../store/auth-reducer";
import { AdminPreloader } from "../common/preloader/Preloader";

const AdminPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isAuth = useSelector((state) => state.auth.isAuth);
  const isAuthChecking = useSelector((state) => state.auth.isAuthChecking);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);
  if (isAuth === false) return <Redirect to="/login" />;

  return (
    <div className="admin">
      {isMobile ? <NavBarMobile /> : <NavBar />}
      <div className="admin__container">
        <div className="admin__header">
          <Header />
        </div>
        <div className="admin__content">
          <div className="admin__content-container">
            {isAuthChecking ? (
              <AdminPreloader />
            ) : (
              <Switch>
                <Route exact path="/admin/orders" render={() => <Orders />} />
                <Route exact path="/admin/table" render={() => <CarsTable />} />
                <Route
                  exact
                  path="/admin/car-setting"
                  render={() => <CarSetting />}
                />
                <Route path="*" render={() => <Error />} />
              </Switch>
            )}
          </div>
          <div className="admin__footer">
            <a className="admin__footer-link" href="/">
              Главная страница
            </a>
            <span className="admin__footer-copyright">
              Copyright © 2020 Simbirsoft
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
