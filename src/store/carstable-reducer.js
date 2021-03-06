import orderAPI from "../api/api";

const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_CARS = "SET_CARS";
const SET_TOTAL_CARS_COUNT = "SET_TOTAL_CARS_COUNT";
const SET_CURRENT_CARS_PAGE = "SET_CURRENT_CARS_PAGE";

const initialState = {
  cars: [],
  carsPageSize: 5,
  totalCarsCount: 0,
  currentCarsPage: 1,
  isFetching: false,
  carBrandsForFiltering: [],
};

const carsTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARS:
      return {
        ...state,
        cars: action.cars,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_CURRENT_CARS_PAGE:
      return {
        ...state,
        currentCarsPage: action.currentCarsPage,
      };
    case SET_TOTAL_CARS_COUNT: {
      return { ...state, totalCarsCount: action.count };
    }
    default:
      return state;
  }
};

export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const setCars = (cars) => ({ type: SET_CARS, cars });
export const setTotalCarsCount = (totalCarsCount) => ({
  type: SET_TOTAL_CARS_COUNT,
  count: totalCarsCount,
});
export const setCurrentCarsPage = (currentCarsPage) => ({
  type: SET_CURRENT_CARS_PAGE,
  currentCarsPage,
});

export const requestCarsPage = (page, pageSize, filteredCategories) => async (
  dispatch
) => {
  try {
    dispatch(toggleIsFetching(true));
    const result = await orderAPI.getCarsPage(
      page,
      pageSize,
      filteredCategories
    );
    dispatch(setCars(result.data.data));
    dispatch(setTotalCarsCount(result.data.count));
    dispatch(toggleIsFetching(false));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export default carsTableReducer;
