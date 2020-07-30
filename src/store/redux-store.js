import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import orderReducer from "./order-reducer";
import testReducer from "./test-reducer";

const reducers = combineReducers({
  orderPage: orderReducer,
  testPage: testReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
