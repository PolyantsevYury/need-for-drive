import React, { useEffect } from "react";
import "./Finished.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import Status from "../status/Status";
import { getFinishedOrderData } from "../../../store/order-selectors";
import { addOrderId, requestOrder } from "../../../store/order-reducer";
import Preloader from "../../common/preloader/Preloader";

const Finished = ({
  finishedOrderData,
  requestOrder,
  isOrderFetching,
  addOrderId,
}) => {
  const params = useParams();
  const { orderId } = params;
  useEffect(() => {
    requestOrder(orderId);
  }, [orderId, requestOrder]);

  useEffect(() => {
    addOrderId(orderId);
  }, [orderId, addOrderId]);

  if (isOrderFetching) return <Preloader />;

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
    isOrderFetching: state.order.isOrderFetching,
  };
};

export default compose(
  connect(mapStateToProps, { requestOrder, addOrderId }),
  withRouter
)(Finished);
