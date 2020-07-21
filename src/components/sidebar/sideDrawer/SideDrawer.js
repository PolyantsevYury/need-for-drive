import React from 'react';
import './SideDrawer.scss';
import Telegram from '../../../assets/images/socialLinks/Telegram.png';
import Facebook from '../../../assets/images/socialLinks/Facebook.png';
import Instagram from '../../../assets/images/socialLinks/Instagram.png';
import {withRouter} from "react-router-dom";
import classNames from "classnames";

const RoutedSideDrawer = ({location}) => {
  const sideDrawerClass = classNames('side-drawer', {'side-drawer--show-slider': location.pathname === "/"});

  return (
      <>
        {console.log(location.pathname)}
        <section className={sideDrawerClass}>
          <nav className='side-drawer__navigation'>
            <ul className='side-drawer__navigation-items'>
              <li><a className='side-drawer__navigation-item' href="/">Парковка</a></li>
              <li><a className='side-drawer__navigation-item' href="/">Страховка</a></li>
              <li><a className='side-drawer__navigation-item' href="/">Бензин</a></li>
              <li><a className='side-drawer__navigation-item' href="/">Обслуживание</a></li>
            </ul>
            <div className='side-drawer__social-items'>
              <img className='side-drawer__social-item' src={Telegram} alt=" "/>
              <img className='side-drawer__social-item' src={Facebook} alt=" "/>
              <img className='side-drawer__social-item' src={Instagram} alt=" "/>
            </div>
          </nav>
        </section>
        <div className='backdrop'>
        </div>
      </>
  )
}

export const SideDrawer = withRouter(RoutedSideDrawer)