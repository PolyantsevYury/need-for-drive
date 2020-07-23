import React from "react";
import './Finished.scss';
import {Final} from "../final/Final";

export const Finished = () => {
  return (
      <section className='finished'>
        <h3 className='finished__title'>Ваш заказ подтверждён</h3>
        <Final/>
      </section>
  )
};