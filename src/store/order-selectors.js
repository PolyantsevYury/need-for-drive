export const getCitiesNames = (state) => {
  const citiesNames = [];
  state.order.cities.map((city) => citiesNames.push(city.name));
  return citiesNames;
};

export const getPoints = (state) => {
  return state.order.points;
};

export const getCities = (state) => {
  return state.order.cities;
};

export const getCars = (state) => {
  return state.order.cars;
};
