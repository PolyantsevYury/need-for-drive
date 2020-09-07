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
  getCarsPage(currentPage = 1, pageSize = 5) {
    return instance.get(`db/car?page=${currentPage - 1}&limit=${pageSize}`);
  },
  postOrder(orderBody) {
    return instance.post(`db/order/`, orderBody);
  },
  cancelOrder(orderBody, orderId) {
    return instance.put(`db/order/${orderId}`, orderBody);
  },
  getOrder(orderId) {
    return instance.get(`db/order/${orderId}`);
  },
  getRate() {
    return instance.get(`db/rate/`);
  },
  getStatusId() {
    return instance.get(`db/orderStatus/`);
  },
  postLogIn(orderBody, basicToken) {
    return instance.post(`auth/login`, orderBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicToken}`,
      },
    });
  },
};

export default orderAPI;
