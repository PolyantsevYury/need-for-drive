import React, {useState} from "react";
import './SideBar.scss';
import {Burger} from "./burger/Burger";
import {SideDrawer} from "./sideDrawer/SideDrawer";
import {useMediaQuery} from 'react-responsive'

export const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
      <>
        <div className='side-bar'/>
        <Burger setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/>
        {isMenuOpen && <SideDrawer/>}
        {(!isMobile || (isMobile && isMenuOpen)) && <div className='language'>Eng</div>}
      </>
  )
};