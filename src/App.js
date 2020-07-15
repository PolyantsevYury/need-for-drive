import React from 'react';
import './App.scss';

import {SideBar} from "./components/mainPage/sidebar/Sidebar";
import {MainContent} from "./components/mainPage/mainContent/MainContent";
import {Slider} from "./components/mainPage/slider/Slider";

const App = () => {
  return (
      <div className='app-wrapper'>
          <SideBar/>
          <MainContent/>
          <Slider/>
      </div>
  )
};

export default App;