import React from "react";
import { useMediaQuery } from "react-responsive";
import MainContent from "./mainContent/MainContent";
import Slider from "./slider/Slider";
import SideBar from "../sidebar/Sidebar";

const MainPage = () => {
  const isLaptopOrDesktop = useMediaQuery({ minWidth: 1024 });
  return (
    <>
      <SideBar />
      <MainContent />
      {isLaptopOrDesktop && <Slider />}
    </>
  );
};

export default MainPage;
