import React from 'react';
import './App.scss';
import { useMediaQuery } from 'react-responsive'

import {SideBar} from "./components/mainPage/sidebar/Sidebar";
import {MainContent} from "./components/mainPage/mainContent/MainContent";
import {Slider} from "./components/mainPage/slider/Slider";

const App = () => {
  const isLaptopOrDesktop = useMediaQuery({ minWidth: 1024 })
  return (
      <div className='app-wrapper'>
          <SideBar/>
          <MainContent/>
        {isLaptopOrDesktop && <Slider/>}
      </div>
  )
};

export default App;