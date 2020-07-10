import React from 'react';
import './styles/mainPage/App.scss';

import {SideBar} from "./components/Sidebar";
import {MainContent} from "./components/MainContent";
import {Slider} from "./components/Slider";

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