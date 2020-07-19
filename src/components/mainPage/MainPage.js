import React from "react";
import {MainContent} from "./mainContent/MainContent";
import {Slider} from "./slider/Slider";
import {useMediaQuery} from "react-responsive";

export const MainPage = () => {
  const isLaptopOrDesktop = useMediaQuery({minWidth: 1024})
  return (
      <>
        <MainContent/>
        {isLaptopOrDesktop && <Slider/>}
      </>
  )
};