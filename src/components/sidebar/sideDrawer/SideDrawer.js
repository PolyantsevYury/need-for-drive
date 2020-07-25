import React from "react";
import "./SideDrawer.scss";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import Telegram from "../../../assets/images/socialLinks/Telegram.png";
import Facebook from "../../../assets/images/socialLinks/Facebook.png";
import Instagram from "../../../assets/images/socialLinks/Instagram.png";

const RoutedSideDrawer = ({ location, isMenuOpen, setIsMenuOpen }) => {
  const sideDrawerClass = classNames(
    "side-drawer",
    { "side-drawer--show-slider": location.pathname === "/need-for-drive" },
    { "side-drawer--open": isMenuOpen }
  );

  const backDropClass = classNames("backdrop", {
    "backdrop--active": isMenuOpen && location.pathname === "/need-for-drive",
  });

  return (
    <>
      <section className={sideDrawerClass}>
        <nav className="side-drawer__navigation">
          <ul className="side-drawer__navigation-items">
            <li>
              <Link
                to="/need-for-drive"
                className="side-drawer__navigation-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Парковка
              </Link>
            </li>
            <li>
              <Link
                to="/need-for-drive"
                className="side-drawer__navigation-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Страховка
              </Link>
            </li>
            <li>
              <Link
                to="/need-for-drive"
                className="side-drawer__navigation-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Бензин
              </Link>
            </li>
            <li>
              <Link
                to="/need-for-drive"
                className="side-drawer__navigation-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Обслуживание
              </Link>
            </li>
          </ul>
          <div className="side-drawer__social-items">
            <img className="side-drawer__social-item" src={Telegram} alt=" " />
            <img className="side-drawer__social-item" src={Facebook} alt=" " />
            <img className="side-drawer__social-item" src={Instagram} alt=" " />
          </div>
        </nav>
      </section>
      <div className={backDropClass} />
    </>
  );
};

RoutedSideDrawer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

const SideDrawer = withRouter(RoutedSideDrawer);

export default SideDrawer;
