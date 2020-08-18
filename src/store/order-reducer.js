import { getGeocode, getLatLng } from "use-places-autocomplete";
import orderAPI from "../api/api";

const ADD_CITIES = "ADD_CITIES";
const ADD_POINTS = "ADD_POINTS";
const ADD_CARS = "ADD_CARS";
const SET_CURRENT_CAR = "SET_CURRENT_CAR";
const TOGGLE_IS_CARS_FETCHING = "TOGGLE_IS_CARS_FETCHING";
const TOGGLE_IS_ORDER_SUBMITTING = "TOGGLE_IS_ORDER_SUBMITTING";
const ADD_ORDER_ID = "ADD_ORDER_ID";
const ADD_FINISHED_ORDER_DATA = "ADD_FINISHED_ORDER_DATA";

const initialState = {
  cities: [],
  points: [],
  cars: [],
  isCarsFetching: true,
  currentModel: null,
  isOrderSubmitting: false,
  orderId: null,
  finishedOrderData: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    case ADD_POINTS:
      return {
        ...state,
        points: action.points,
      };
    case ADD_CARS:
      return {
        ...state,
        cars: action.cars,
      };
    case SET_CURRENT_CAR:
      return {
        ...state,
        currentModel: action.car,
      };
    case TOGGLE_IS_CARS_FETCHING:
      return {
        ...state,
        isCarsFetching: action.isCarsFetching,
      };
    case TOGGLE_IS_ORDER_SUBMITTING:
      return {
        ...state,
        isOrderSubmitting: action.isOrderSubmitting,
      };
    case ADD_ORDER_ID:
      return {
        ...state,
        orderId: action.orderId,
      };
    case ADD_FINISHED_ORDER_DATA:
      return {
        ...state,
        finishedOrderData: action.orderData,
      };
    default:
      return state;
  }
};

export const addCities = (cities) => ({ type: ADD_CITIES, cities });
export const addPoints = (points) => ({ type: ADD_POINTS, points });
export const addCars = (cars) => ({ type: ADD_CARS, cars });
export const setCurrentCar = (car) => ({ type: SET_CURRENT_CAR, car });
export const addFinishedOrderData = (orderData) => ({
  type: ADD_FINISHED_ORDER_DATA,
  orderData,
});
export const toggleIsCarsFetching = (isCarsFetching) => ({
  type: TOGGLE_IS_CARS_FETCHING,
  isCarsFetching,
});
export const toggleIsOrderSubmitting = (isOrderSubmitting) => ({
  type: TOGGLE_IS_ORDER_SUBMITTING,
  isOrderSubmitting,
});
export const addOrderId = (orderId) => ({ type: ADD_ORDER_ID, orderId });

export const requestCities = () => async (dispatch) => {
  try {
    const result = await orderAPI.getCity();
    const cities = result.data.data;
    const getCityLatLng = async (city) => {
      const address = city.name;
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      const cityWithLatLng = city;
      cityWithLatLng.lat = lat;
      cityWithLatLng.lng = lng;
      return cityWithLatLng;
    };
    cities.map((city) => getCityLatLng(city));
    dispatch(addCities(cities));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const requestPoints = () => async (dispatch) => {
  try {
    const result = await orderAPI.getPoint();
    const points = result.data.data;
    const getPointLatLng = async (point) => {
      const address = `${point.address}, ${point.cityId.name}`;
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      const pointWithLatLng = point;
      pointWithLatLng.lat = lat;
      pointWithLatLng.lng = lng;
      return pointWithLatLng;
    };
    points.map((point) => getPointLatLng(point));
    dispatch(addPoints(points));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const requestCars = () => async (dispatch) => {
  try {
    dispatch(toggleIsCarsFetching(true));
    const result = await orderAPI.getCars();
    dispatch(toggleIsCarsFetching(false));
    dispatch(addCars(result.data.data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const submitOrder = (
  cityId,
  pointId,
  carId,
  color,
  dateFrom,
  dateTo,
  rateId,
  price,
  isFullTank,
  isNeedChildChair,
  isRightWheel,
  setIsModal
) => async (dispatch) => {
  try {
    dispatch(toggleIsOrderSubmitting(true));
    const orderBody = {
      orderStatusId: {
        name: "new",
        id: "5e26a191099b810b946c5d89",
      },
      cityId: {
        id: cityId,
      },
      pointId: {
        id: pointId,
      },
      carId: {
        id: carId,
      },
      color,
      dateFrom,
      dateTo,
      rateId: {
        id: rateId,
      },
      price,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
    };
    const result = await orderAPI.postOrder(orderBody);
    dispatch(toggleIsOrderSubmitting(false));
    dispatch(addOrderId(result.data.data.id));
    setIsModal(false);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const requestOrder = (orderId) => async (dispatch) => {
  try {
    const result = await orderAPI.getOrder(orderId);
    dispatch(addFinishedOrderData(result.data.data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export default orderReducer;
