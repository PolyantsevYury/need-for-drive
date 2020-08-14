import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Location.scss";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { InputText } from "../../common/forms/Forms";
import { requestCities, requestPoints } from "../../../store/order-reducer";
import { getCitiesNames, getPoints } from "../../../store/order-selectors";
import Preloader from "../../common/preloader/Preloader";
import MarkerIcon from "../../../assets/images/marker.svg";

const libraries = ["places"];
const mapContainerStyle = {
  maxWidth: 700,
  width: "100%",
  height: 340,
  marginTop: 16,
};
const options = {
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
  const { isLoaded } = useLoadScript({
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

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  if (!isLoaded) return <Preloader />;

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
          onClick={(event) => {
            setMarkers((current) => [
              ...current,
              {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
              },
            ]);
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: MarkerIcon,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Выбрано</h2>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
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
