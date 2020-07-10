import React from "react";
import '../styles/mainPage/SideBar.scss';

export const SideBar = () => {
  return (
      <nav className='side-bar'>
        <div className='burger'>
          <div className='burger__vector'></div>
        </div>
        <div className='language'>
          eng
        </div>
      </nav>
  )
};