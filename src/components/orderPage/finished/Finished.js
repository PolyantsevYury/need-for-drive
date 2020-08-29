import React, { useEffect } from "react";
import "./Finished.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import Status from "../status/Status";
import { getFinishedOrderData } from "../../../store/order-selectors";
import { requestOrder } from "../../../store/order-reducer";

const Finished = ({ finishedOrderData, requestOrder }) => {
  const params = useParams();
  const { orderId } = params;
  useEffect(() => {
    requestOrder(orderId);
  }, [orderId, requestOrder]);

  return (
    <section className="finished">
      <h3 className="finished__title">Ваш заказ {finishedOrderData?.status}</h3>
      <Status orderData={finishedOrderData} />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    finishedOrderData: getFinishedOrderData(state),
  };
};

export default compose(
  connect(mapStateToProps, { requestOrder }),
  withRouter
)(Finished);
