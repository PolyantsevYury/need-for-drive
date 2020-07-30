const initialState = {
  test: "",
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return {
        ...state,
        test: action.test,
      };
    default:
      return state;
  }
};

export const useTest = (test) => ({ type: "TEST", test });

export default testReducer;
