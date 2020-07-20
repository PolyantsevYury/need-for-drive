import React from "react";
import {Header} from "../common/header/Header";
import './OrderPage.scss'
import {Steps} from "./Steps";

export const OrderPage = () => {
  return (
      <section className='order-page'>
        <div className='order-page__header'>
          <Header/>
        </div>
        <Steps/>
      </section>
  )
};