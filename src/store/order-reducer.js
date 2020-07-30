import orderAPI from "../api/api";

const ADD_CITIES = "ADD_CITIES";

const initialState = {
  cities: "",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    default:
      return state;
  }
};

export const addCities = (cities) => ({ type: ADD_CITIES, cities });

export const requestCities = () => async (dispatch) => {
  try {
    const result = await orderAPI.getCity();
    dispatch(addCities(result.data.data));
  } catch (e) {
    console.log(e);
  }
};
export default orderReducer;
