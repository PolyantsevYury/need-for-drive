import Cookies from "js-cookie";
import orderAPI from "../api/api";

const SET_IS_AUTH = "SET_IS_AUTH";
const TOGGLE_IS_AUTH_IN_PROGRESS = "TOGGLE_IS_AUTH_IN_PROGRESS";
const TOGGLE_IS_AUTH_IN_CHECKING = "TOGGLE_IS_AUTH_IN_CHECKING";
const TOGGLE_IS_AUTH_FAILED = "TOGGLE_IS_AUTH_FAILED";

const initialState = {
  isAuth: null,
  isAuthInProgress: false,
  isAuthChecking: true,
  isAuthFailed: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case TOGGLE_IS_AUTH_IN_PROGRESS:
      return {
        ...state,
        isAuthInProgress: action.isAuthInProgress,
      };
    case TOGGLE_IS_AUTH_IN_CHECKING:
      return {
        ...state,
        isAuthChecking: action.isAuthChecking,
      };
    case TOGGLE_IS_AUTH_FAILED:
      return {
        ...state,
        isAuthFailed: action.isAuthFailed,
      };
    default:
      return state;
  }
};

export const setIsAuth = (isAuth) => ({
  type: SET_IS_AUTH,
  isAuth,
});
export const toggleIsAuthInProgress = (isAuthInProgress) => ({
  type: TOGGLE_IS_AUTH_IN_PROGRESS,
  isAuthInProgress,
});
export const toggleIsAuthChecking = (isAuthChecking) => ({
  type: TOGGLE_IS_AUTH_IN_CHECKING,
  isAuthChecking,
});
export const toggleIsAuthFailed = (isAuthFailed) => ({
  type: TOGGLE_IS_AUTH_FAILED,
  isAuthFailed,
});

export const logIn = (userData) => async (dispatch) => {
  try {
    dispatch(toggleIsAuthInProgress(true));
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
      const cookiesExpiresDays = response.data.expires_in / 86400;
      Cookies.set("basic_token", basicToken, {
        expires: cookiesExpiresDays,
      });
      Cookies.set("access_token", response.data.access_token, {
        expires: cookiesExpiresDays,
      });
      Cookies.set("refresh_token", response.data.refresh_token, {
        expires: cookiesExpiresDays,
      });
    }
    dispatch(toggleIsAuthInProgress(false));
  } catch (error) {
    dispatch(toggleIsAuthInProgress(false));
    dispatch(toggleIsAuthFailed(true));
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const authCheck = () => async (dispatch) => {
  try {
    dispatch(toggleIsAuthChecking(true));
    const accessToken = Cookies.get("access_token");
    await orderAPI.getAuthCheck(accessToken);
    dispatch(setIsAuth(true));
    dispatch(toggleIsAuthChecking(false));
  } catch (error) {
    if (error.status === 401) {
      try {
        const refreshToken = Cookies.get("refresh_token");
        const basicToken = Cookies.get("basic_token");
        const orderBody = JSON.stringify({ refresh_token: refreshToken });
        const response = await orderAPI.postRefreshToken(orderBody, basicToken);
        Cookies.set("access_token", response.data.access_token, {
          expires: 7,
        });
        Cookies.set("refresh_token", response.data.refresh_token, {
          expires: 7,
        });
        dispatch(toggleIsAuthChecking(false));
        dispatch(setIsAuth(true));
      } catch (error) {
        dispatch(toggleIsAuthChecking(false));
        dispatch(setIsAuth(false));
      }
    } else {
      dispatch(toggleIsAuthChecking(false));
      dispatch(setIsAuth(false));
    }
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const accessToken = Cookies.get("access_token");
    await orderAPI.postLogOut(accessToken);
    dispatch(setIsAuth(false));
    Cookies.remove("access_token");
    Cookies.remove("basic_token");
    Cookies.remove("refresh_token");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default authReducer;
