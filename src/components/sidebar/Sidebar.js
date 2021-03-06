import React, { useState } from "react";
import "./SideBar.scss";
import { useMediaQuery } from "react-responsive";
import Burger from "./burger/Burger";
import SideDrawer from "./sideDrawer/SideDrawer";

const SideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <div className="side-bar" />
      <Burger setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <SideDrawer setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      {(!isMobile || (isMobile && isMenuOpen)) && (
        <div className="language">Eng</div>
      )}
    </>
  );
};

export default SideBar;
