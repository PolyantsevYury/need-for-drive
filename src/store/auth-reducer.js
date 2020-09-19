import Cookies from "js-cookie";
import orderAPI from "../api/api";

const TOGGLE_IS_AUTH_IN_PROGRESS = "TOGGLE_IS_AUTH_IN_PROGRESS";
const TOGGLE_IS_AUTH_FAILED = "TOGGLE_IS_AUTH_FAILED";

const initialState = {
  isAuthInProgress: false,
  isAuthFailed: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IS_AUTH_IN_PROGRESS:
      return {
        ...state,
        isAuthInProgress: action.isAuthInProgress,
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

export const toggleIsAuthInProgress = (isAuthInProgress) => ({
  type: TOGGLE_IS_AUTH_IN_PROGRESS,
  isAuthInProgress,
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

export const authCheck = () => async () => {
  try {
    const accessToken = Cookies.get("access_token");
    await orderAPI.getAuthCheck(accessToken);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const logOut = () => async () => {
  try {
    const accessToken = Cookies.get("access_token");
    await orderAPI.postLogOut(accessToken);
    Cookies.remove("access_token");
    Cookies.remove("basic_token");
    Cookies.remove("refresh_token");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default authReducer;
