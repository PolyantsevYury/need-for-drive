import Geocode from "react-geocode";
import orderAPI from "../api/api";

const ADD_CITIES = "ADD_CITIES";
const ADD_POINTS = "ADD_POINTS";
const TOGGLE_IS_POINTS_FETCHING = "TOGGLE_IS_POINTS_FETCHING";
const ADD_CARS = "ADD_CARS";
const SET_CURRENT_CAR = "SET_CURRENT_CAR";
const SET_IS_AUTH = "SET_IS_AUTH";
const TOGGLE_IS_CARS_FETCHING = "TOGGLE_IS_CARS_FETCHING";
const TOGGLE_IS_ORDER_SUBMITTING = "TOGGLE_IS_ORDER_SUBMITTING";
const TOGGLE_IS_ORDER_FETCHING = "TOGGLE_IS_ORDER_FETCHING";
const TOGGLE_IS_ORDER_CANCELLING = "TOGGLE_IS_ORDER_CANCELLING";
const TOGGLE_IS_LOGIN_IN_PROGRESS = "TOGGLE_IS_LOGIN_IN_PROGRESS";
const ADD_ORDER_ID = "ADD_ORDER_ID";
const ADD_FINISHED_ORDER_DATA = "ADD_FINISHED_ORDER_DATA";
const ADD_RATE = "ADD_RATE";
const CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS";

Geocode.setApiKey("AIzaSyDy6vONFHc9t69wZ0rx5FgoXbCGiH7S74w");

const initialState = {
  cities: [],
  points: [],
  isPointsFetching: true,
  cars: [],
  rate: [],
  isCarsFetching: true,
  currentModel: null,
  isOrderSubmitting: false,
  isOrderFetching: false,
  isOrderCancelling: false,
  isLoginInProgress: false,
  orderId: null,
  finishedOrderData: null,
  isAuth: false,
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
    case ADD_RATE:
      return {
        ...state,
        rate: action.rate,
      };
    case TOGGLE_IS_POINTS_FETCHING:
      return {
        ...state,
        isPointsFetching: action.isPointsFetching,
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
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
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
    case TOGGLE_IS_ORDER_FETCHING:
      return {
        ...state,
        isOrderFetching: action.isOrderFetching,
      };
    case TOGGLE_IS_ORDER_CANCELLING:
      return {
        ...state,
        isOrderCancelling: action.isOrderCancelling,
      };
    case TOGGLE_IS_LOGIN_IN_PROGRESS:
      return {
        ...state,
        isLoginInProgress: action.isLoginInProgress,
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
    case CHANGE_ORDER_STATUS:
      return {
        ...state,
        finishedOrderData: {
          ...state.finishedOrderData,
          orderStatusId: {
            ...state.finishedOrderData.orderStatusId,
            name: action.orderStatus,
          },
        },
      };
    default:
      return state;
  }
};

export const addCities = (cities) => ({ type: ADD_CITIES, cities });
export const addPoints = (points) => ({ type: ADD_POINTS, points });
export const addCars = (cars) => ({ type: ADD_CARS, cars });
export const addRate = (rate) => ({ type: ADD_RATE, rate });
export const setCurrentCar = (car) => ({ type: SET_CURRENT_CAR, car });
export const setIsAuth = (isAuth) => ({ type: SET_IS_AUTH, isAuth });
export const addFinishedOrderData = (orderData) => ({
  type: ADD_FINISHED_ORDER_DATA,
  orderData,
});
export const toggleIsCarsFetching = (isCarsFetching) => ({
  type: TOGGLE_IS_CARS_FETCHING,
  isCarsFetching,
});
export const toggleIsPointsFetching = (isPointsFetching) => ({
  type: TOGGLE_IS_POINTS_FETCHING,
  isPointsFetching,
});
export const toggleIsOrderSubmitting = (isOrderSubmitting) => ({
  type: TOGGLE_IS_ORDER_SUBMITTING,
  isOrderSubmitting,
});
export const toggleIsOrderFetching = (isOrderFetching) => ({
  type: TOGGLE_IS_ORDER_FETCHING,
  isOrderFetching,
});
export const toggleIsOrderCancelling = (isOrderCancelling) => ({
  type: TOGGLE_IS_ORDER_CANCELLING,
  isOrderCancelling,
});
export const toggleIsLoginInProgress = (isLoginInProgress) => ({
  type: TOGGLE_IS_LOGIN_IN_PROGRESS,
  isLoginInProgress,
});
export const addOrderId = (orderId) => ({ type: ADD_ORDER_ID, orderId });
export const changeOrderStatus = (orderStatus) => ({
  type: CHANGE_ORDER_STATUS,
  orderStatus,
});

export const requestCities = () => async (dispatch) => {
  try {
    const result = await orderAPI.getCity();
    const cities = result.data.data;
    const getCityLatLng = async (city) => {
      try {
        const address = city.name;
        const response = await Geocode.fromAddress(address);
        const { lat, lng } = response.results[0].geometry.location;
        const cityWithLatLng = city;
        cityWithLatLng.lat = lat;
        cityWithLatLng.lng = lng;
        return cityWithLatLng;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return null;
      }
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
    dispatch(toggleIsPointsFetching(true));
    const result = await orderAPI.getPoint();
    const points = result.data.data;
    const getPointLatLng = async (point) => {
      try {
        const address = `${point.address}, ${point.cityId.name}`;
        const response = await Geocode.fromAddress(address);
        const { lat, lng } = response.results[0].geometry.location;
        const pointWithLatLng = point;
        pointWithLatLng.lat = lat;
        pointWithLatLng.lng = lng;
        return pointWithLatLng;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return null;
      }
    };
    points.map((point) => getPointLatLng(point));
    dispatch(toggleIsPointsFetching(false));
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

export const requestRate = () => async (dispatch) => {
  try {
    const result = await orderAPI.getRate();
    dispatch(addRate(result.data.data));
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
    const statusId = await orderAPI.getStatusId();
    const newStatusId = statusId.data.data.find(
      (status) => status.name === "new"
    ).id;
    const orderBody = {
      orderStatusId: {
        name: "new",
        id: newStatusId,
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
    dispatch(toggleIsOrderFetching(true));
    const result = await orderAPI.getOrder(orderId);
    dispatch(addFinishedOrderData(result.data.data));
    dispatch(toggleIsOrderFetching(false));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const cancelOrder = (orderId, setIsModal) => async (dispatch) => {
  try {
    dispatch(toggleIsOrderCancelling(true));
    const statusId = await orderAPI.getStatusId();
    const cancelledStatusId = statusId.data.data.find(
      (status) => status.name === "cancelled"
    ).id;
    const orderBody = {
      orderStatusId: {
        name: "cancelled",
        id: cancelledStatusId,
      },
    };
    await orderAPI.cancelOrder(orderBody, orderId);
    dispatch(changeOrderStatus("cancelled"));
    dispatch(toggleIsOrderCancelling(false));
    setIsModal(false);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const logIn = (userData) => async (dispatch) => {
  try {
    dispatch(toggleIsLoginInProgress(true));
    const getRandomString = () => {
      const symbols =
        "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
      let randomString = "";
      for (let i = 0; i < 7; i += 1) {
        const index = Math.floor(Math.random() * symbols.length);
        randomString += symbols[index];
      }
      return randomString;
    };
    const basicToken = btoa(`${getRandomString(7)}:4cbcea96de`);
    const orderBody = JSON.stringify(userData);
    const response = await orderAPI.postLogIn(orderBody, basicToken);
    if (response.statusText === "OK") {
      dispatch(setIsAuth(true));
    }
    dispatch(toggleIsLoginInProgress(false));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export default orderReducer;
