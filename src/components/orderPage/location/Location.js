import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Location.scss";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { requestCities, requestPoints } from "../../../store/order-reducer";
import { getCities, getPoints } from "../../../store/order-selectors";
import Preloader from "../../common/preloader/Preloader";
import MarkerIcon from "../../../assets/images/marker.svg";
import { SearchCity, SearchPoints } from "../../common/forms/Forms";

const mapContainerStyle = {
  maxWidth: 700,
  width: "100%",
  height: 340,
  marginTop: 16,
};
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 54.308025,
  lng: 48.375888,
};

const Location = ({ formik, cities, requestCities, points, requestPoints }) => {
  useEffect(() => {
    if (points.length === 0) {
      requestCities();
      requestPoints();
    }
  }, [points, requestCities, requestPoints]);

  // Set points for current city
  const [currentPoints, setCurrentPoints] = React.useState([]);
  useEffect(() => {
    const sortedPoints = [];
    points.map(
      (point) =>
        formik.values.locationCity === point.cityId.name &&
        sortedPoints.push(point)
    );
    setCurrentPoints(sortedPoints);
  }, [formik.values.locationCity, points]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Change the center of the map depending on the city
  useEffect(() => {
    const isCityValid = cities.find(
      (city) => city.name === formik.values.locationCity
    );
    if (isCityValid && mapRef.current) {
      const { lat, lng } = isCityValid;
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(11);
    }
  }, [cities, formik.values.locationCity]);

  // Change the center of the map depending on the point
  useEffect(() => {
    const isPointValid = currentPoints.find(
      (point) => point.address === formik.values.locationPoint
    );

    if (isPointValid && mapRef.current) {
      const { lat, lng } = isPointValid;
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(12);
    }
  }, [currentPoints, formik.values.locationPoint]);

  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDy6vONFHc9t69wZ0rx5FgoXbCGiH7S74w",
  });

  if (!isLoaded) return <Preloader />;

  return (
    <section className="location">
      <div className="location__form">
        <SearchCity formik={formik} cities={cities} />
        <SearchPoints formik={formik} points={currentPoints} />
      </div>
      <p>Выбрать на карте:</p>
      <div className="location__map">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={mapOptions}
          onLoad={onMapLoad}
        >
          {currentPoints.map((point) => (
            <Marker
              key={point.id}
              position={{ lat: point.lat, lng: point.lng }}
              icon={{
                url: MarkerIcon,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  locationPoint: point.address,
                });
                setSelectedPoint(point);
              }}
            />
          ))}

          {selectedPoint ? (
            <InfoWindow
              position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
              onCloseClick={() => {
                setSelectedPoint(null);
              }}
            >
              <div>
                <span>{selectedPoint.name}</span>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
  points: getPoints(state),
});

export default connect(mapStateToProps, { requestCities, requestPoints })(
  Location
);
