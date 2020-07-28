import React from "react";
import "./Finished.scss";
import Final from "../final/Final";

const Finished = ({ formData }) => {
  return (
    <section className="finished">
      <h3 className="finished__title">Ваш заказ подтверждён</h3>
      <Final formData={formData} />
    </section>
  );
};

export default Finished;
