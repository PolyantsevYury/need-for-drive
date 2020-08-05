import React, { useEffect } from "react";
import "./Finished.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import FinalContainer from "../final/Final";
import { getOrderData } from "../../../store/order-selectors";
import { requestOrder } from "../../../store/order-reducer";

const Finished = ({ orderData, requestOrder }) => {
  const params = useParams();
  const { orderId } = params;

  useEffect(() => {
    requestOrder(orderId);
  }, [orderId, requestOrder]);

  return (
    <section className="finished">
      <h3 className="finished__title">Ваш заказ подтверждён</h3>
      <FinalContainer orderData={orderData} />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    orderData: getOrderData(state),
  };
};

export default compose(
  connect(mapStateToProps, { requestOrder }),
  withRouter
)(Finished);
