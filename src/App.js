import React from 'react';
import './App.scss';
import {Route, Switch} from "react-router-dom";
import {SideBar} from "./components/sidebar/Sidebar";
import {MainPage} from "./components/mainPage/MainPage";
import {OrderPage} from "./components/orderPage/OrderPage";

const App = () => {
  return (
      <div className='app-wrapper'>
        <SideBar/>
        <Switch>
          <Route exact path='/'
                 render={() => <MainPage/>}/>
          <Route path='/order'
                 render={() => <OrderPage/>}/>
          <Route path='*'
                 render={() => <div>404 NOT FOUND</div>}/>
        </Switch>
      </div>
  )
};

export default App;