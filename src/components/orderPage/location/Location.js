import React, { useEffect } from "react";
import "./Location.scss";
import { connect } from "react-redux";
import Map from "../../../assets/images/map.jpg";
import { InputText } from "../../common/forms/Forms";
import { requestCities, requestPoints } from "../../../store/order-reducer";
import { getCitiesNames, getPoints } from "../../../store/order-selectors";

const Location = ({
  formData,
  onChange,
  citiesNames,
  requestCities,
  points,
  requestPoints,
}) => {
  useEffect(() => {
    requestCities();
    requestPoints();
  }, [requestCities, requestPoints]);

  const currentPoints = [];
  points.map(
    (point) =>
      formData.locationCity === point.cityId.name &&
      currentPoints.push(point.address)
  );

  return (
    <section className="location">
      <div className="location__form">
        <InputText
          items={[
            {
              name: "locationCity",
              label: "Город",
              placeholder: "Начните вводить город",
              value: formData.locationCity,
              options: citiesNames,
            },
            {
              name: "locationPoint",
              label: "Пункт выдачи",
              placeholder: "Начните вводить пункт",
              value: formData.locationPoint,
              options: currentPoints,
            },
          ]}
          onChange={onChange}
        />
      </div>
      <p>Выбрать на карте:</p>
      <img className="location__map" src={Map} alt="" />
    </section>
  );
};

const mapStateToProps = (state) => ({
  citiesNames: getCitiesNames(state),
  points: getPoints(state),
});

export default connect(mapStateToProps, { requestCities, requestPoints })(
  Location
);
