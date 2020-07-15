import React from 'react';
import './SideDrawer.scss';
import Telegram from '../../../../assets/images/socialLinks/Telegram.png';
import Facebook from '../../../../assets/images/socialLinks/Facebook.png';
import Instagram from '../../../../assets/images/socialLinks/Instagram.png';

export const SideDrawer = () => {
  return (
      <>
        <section className='side-drawer'>
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