import Cookies from "js-cookie";
import orderAPI from "../api/api";

const TOGGLE_IS_ORDERS_FETCHING = "TOGGLE_IS_ORDERS_FETCHING";
const SET_ORDERS = "SET_ORDERS";
const SET_TOTAL_ORDERS_COUNT = "SET_TOTAL_ORDERS_COUNT";
const SET_CURRENT_ORDERS_PAGE = "SET_CURRENT_ORDERS_PAGE";

const initialState = {
  orders: null,
  ordersPageSize: 3,
  totalOrdersCount: 0,
  currentOrdersPage: 1,
  isOrdersFetching: true,
};

const ordersTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.ordersData,
      };
    case TOGGLE_IS_ORDERS_FETCHING:
      return {
        ...state,
        isOrdersFetching: action.isOrdersFetching,
      };
    case SET_CURRENT_ORDERS_PAGE:
      return {
        ...state,
        currentOrdersPage: action.currentOrdersPage,
      };
    case SET_TOTAL_ORDERS_COUNT: {
      return { ...state, totalOrdersCount: action.count };
    }
    default:
      return state;
  }
};

export const toggleIsOrdersFetching = (isOrdersFetching) => ({
  type: TOGGLE_IS_ORDERS_FETCHING,
  isOrdersFetching,
});
export const setOrders = (ordersData) => ({ type: SET_ORDERS, ordersData });
export const setTotalOrdersCount = (totalOrdersCount) => ({
  type: SET_TOTAL_ORDERS_COUNT,
  count: totalOrdersCount,
});
export const setCurrentOrdersPage = (currentOrdersPage) => ({
  type: SET_CURRENT_ORDERS_PAGE,
  currentOrdersPage,
});

export const requestOrdersPage = (page, pageSize) => async (dispatch) => {
  try {
    const accessToken = `${Cookies.get("access_token")}`;
    dispatch(toggleIsOrdersFetching(true));
    const result = await orderAPI.getOrders(page, pageSize, accessToken);
    dispatch(setOrders(result.data.data));
    dispatch(setTotalOrdersCount(result.data.count));
    dispatch(toggleIsOrdersFetching(false));
  } catch (e) {
    dispatch(toggleIsOrdersFetching(false));
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export default ordersTableReducer;
