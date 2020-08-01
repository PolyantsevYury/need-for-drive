export const getCitiesNames = (state) => {
  const citiesNames = [];
  state.order.cities.map((city) => citiesNames.push(city.name));
  return citiesNames;
};

export const getPoints = (state) => {
  return state.order.points;
};
