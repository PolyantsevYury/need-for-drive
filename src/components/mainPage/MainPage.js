import React from "react";
import { useMediaQuery } from "react-responsive";
import MainContent from "./mainContent/MainContent";
import Slider from "./slider/Slider";

const MainPage = () => {
  const isLaptopOrDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <>
      <MainContent />
      {isLaptopOrDesktop && <Slider />}
    </>
  );
};

export default MainPage;
