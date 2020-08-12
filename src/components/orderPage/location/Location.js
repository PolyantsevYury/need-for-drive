import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Location.scss";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import { InputText } from "../../common/forms/Forms";
import { requestCities, requestPoints } from "../../../store/order-reducer";
import { getCitiesNames, getPoints } from "../../../store/order-selectors";

const libraries = ["places"];
const mapContainerStyle = {
  maxWidth: 700,
  width: "100%",
  height: 340,
  marginTop: 16,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 54.308025,
  lng: 48.375888,
};

const Location = ({
  formData,
  onChange,
  citiesNames,
  requestCities,
  points,
  requestPoints,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDy6vONFHc9t69wZ0rx5FgoXbCGiH7S74w",
    libraries,
  });
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

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

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
      <div className="location__map">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
        />
      </div>
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
