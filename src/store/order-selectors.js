export const getPoints = (state) => {
  return state.order.points;
};

export const getCities = (state) => {
  return state.order.cities;
};

export const getRate = (state) => {
  return state.order.rate;
};

export const getCars = (state) => {
  return state.order.cars;
};

export const getCurrentModel = (state) => {
  return state.order.currentModel;
};

export const getOrderId = (state) => {
  return state.order.orderId;
};

export const getFinishedOrderData = (state) => {
  const { finishedOrderData } = state.order;
  const getCorrectStatusName = (name) => {
    switch (name) {
      case "new":
        return "создан и ждет обработки";
      case "issued":
        return "обрабатывается";
      case "confirmed":
        return "подтвержден";
      case "cancelled":
        return "отменен";
      default:
        return "создан и ждет обработки";
    }
  };

  return {
    status: getCorrectStatusName(finishedOrderData?.orderStatusId?.name),
    locationCity: finishedOrderData?.cityId?.name,
    locationPoint: finishedOrderData?.pointId?.address,
    price: finishedOrderData?.price,
    modelName: finishedOrderData?.carId?.name,
    modelNumber: "K 761 HA 73",
    fullFuel: finishedOrderData?.isFullTank,
    childSeat: finishedOrderData?.isNeedChildChair,
    rightHand: finishedOrderData?.isRightWheel,
    rate: finishedOrderData?.rateId?.rateTypeId?.name,
    color: finishedOrderData?.color,
    dateFrom: finishedOrderData?.dateFrom,
    dateTo: finishedOrderData?.dateTo,
    modelImg: finishedOrderData?.carId?.thumbnail?.path,
  };
};
