import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/",
  headers: {
    "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
    Authorization: "Bearer 4cbcea96de",
  },
});

const orderAPI = {
  getCity() {
    return instance.get(`db/city/`);
  },
  getPoint() {
    return instance.get(`db/point/`);
  },
  getCars() {
    return instance.get(`db/car/`);
  },
  postOrder(orderBody) {
    return instance.post(`db/order/`, orderBody);
  },
};

export default orderAPI;
