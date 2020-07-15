import React, {useState} from "react";
import './SideBar.scss';
import {Burger} from "./burger/Burger";
import {SideDrawer} from "./sideDrawer/SideDrawer";

export const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <section className='side-bar'>
        <Burger setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>
        {isMenuOpen && <SideDrawer/>}
        <div className='language'>
          Eng
        </div>
      </section>
  )
};