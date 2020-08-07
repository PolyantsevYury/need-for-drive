export const getCitiesNames = (state) => {
  const citiesNames = [];
  state.order.cities.map((city) => citiesNames.push(city.name));
  return citiesNames;
};

export const getPoints = (state) => {
  return state.order.points;
};

export const getCities = (state) => {
  return state.order.cities;
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

  return {
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
