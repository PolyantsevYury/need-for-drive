import orderAPI from "../api/api";

const ADD_CITIES = "ADD_CITIES";
const ADD_POINTS = "ADD_POINTS";
const ADD_CARS = "ADD_CARS";
const TOGGLE_IS_CARS_FETCHING = "TOGGLE_IS_CARS_FETCHING";

const initialState = {
  cities: [],
  points: [],
  cars: [],
  isCarsFetching: true,
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
    case TOGGLE_IS_CARS_FETCHING:
      return {
        ...state,
        isCarsFetching: action.isCarsFetching,
      };
    default:
      return state;
  }
};

export const addCities = (cities) => ({ type: ADD_CITIES, cities });
export const addPoints = (points) => ({ type: ADD_POINTS, points });
export const addCars = (cars) => ({ type: ADD_CARS, cars });
export const toggleIsCarsFetching = (isCarsFetching) => ({
  type: TOGGLE_IS_CARS_FETCHING,
  isCarsFetching,
});

export const requestCities = () => async (dispatch) => {
  try {
    const result = await orderAPI.getCity();
    dispatch(addCities(result.data.data));
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

export const requestPoints = () => async (dispatch) => {
  try {
    const result = await orderAPI.getPoint();
    dispatch(addPoints(result.data.data));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export const submitOrder = () => async () => {
  try {
    const orderBody = {
      orderStatusId: {
        name: "new",
        id: "5e26a191099b810b946c5d89",
      },
      cityId: {
        name: "Ульяновск",
        id: "5e26a128099b810b946c5d87",
      },
      pointId: {
        id: "5e26a148099b810b946c5d88",
      },
      carId: {
        id: "5e25ca0d099b810b946c5d65",
      },
      color: "голубой",
      dateFrom: 1468959781804,
      dateTo: 1469029434776,
      rateId: {
        id: "5e26a0e2099b810b946c5d86",
      },
      price: 20000,
      isFullTank: true,
      isNeedChildChair: true,
      isRightWheel: true,
    };
    await orderAPI.postOrder(orderBody);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export default orderReducer;
