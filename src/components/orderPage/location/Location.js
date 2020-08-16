import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import "./Location.scss";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import matchSorter from "match-sorter";
import { Search } from "../../common/forms/Forms";
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
  formik,
  citiesNames,
  requestCities,
  points,
  requestPoints,
}) => {
  useEffect(() => {
    requestCities();
    requestPoints();
  }, [requestCities, requestPoints]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDy6vONFHc9t69wZ0rx5FgoXbCGiH7S74w",
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [currentAddresses, setCurrentAddresses] = React.useState([]);

  useEffect(() => {
    const currentPoints = [];
    const addresses = [];
    const getPointLatLng = async (point) => {
      const pointAddress = point.address;
      const address = `${pointAddress}, ${point.cityId.name}`;
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      addresses.push(pointAddress);
      currentPoints.push({ lat, lng, address: pointAddress, name: point.name });
    };
    points.map(
      (point) =>
        formik.values.locationCity === point.cityId.name &&
        getPointLatLng(point)
    );
    setCurrentAddresses(addresses);
    setMarkers(currentPoints);
  }, [formik.values.locationCity, points]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  if (!isLoaded) return <Preloader />;

  return (
    <section className="location">
      <div className="location__form">
        <GoogleSearch
          panTo={panTo}
          formik={formik}
          currentAddresses={currentAddresses}
          citiesNames={citiesNames}
          markers={markers}
        />
      </div>
      <p>Выбрать на карте:</p>
      <div className="location__map">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.lat}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: MarkerIcon,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              onClick={() => {
                formik.setValues({
                  ...formik.values,
                  locationPoint: marker.address,
                });
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
                <h4>{selected.name}</h4>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </section>
  );
};

function GoogleSearch({
  panTo,
  formik,
  citiesNames,
  currentAddresses,
  markers,
}) {
  const handleCitySelect = async (address) => {
    formik.setValues({ ...formik.values, locationCity: address });
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error", error);
    }
  };
  function useCityMatch(location) {
    return useMemo(
      () =>
        location.trim() === "" ? null : matchSorter(citiesNames, location),
      [location]
    );
  }
  const cityResults = useCityMatch(formik.values.locationCity);

  const handlePointSelect = (address) => {
    formik.setValues({ ...formik.values, locationPoint: address });
    const currentPoint = markers.find((point) => point.address === address);
    const { lat, lng } = currentPoint;
    panTo({ lat, lng });
  };
  function usePointMatch(location) {
    return useMemo(
      () =>
        location.trim() === "" ? null : matchSorter(currentAddresses, location),
      [location]
    );
  }
  const pointResults = usePointMatch(formik.values.locationPoint);

  return (
    <>
      {/* City */}
      <Combobox onSelect={handleCitySelect}>
        <ComboboxInput
          id="locationCity"
          name="locationCity"
          value={formik.values.locationCity}
          onChange={formik.handleChange}
          placeholder="Начните вводить город"
        />
        {cityResults && (
          <ComboboxPopover>
            {cityResults.length > 0 ? (
              <ComboboxList>
                {cityResults.slice(0, 10).map((result, index) => (
                  <ComboboxOption key={index} value={result} />
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                Город не найден
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>

      {/* Point */}
      <Combobox onSelect={handlePointSelect}>
        <ComboboxInput
          id="locationPoint"
          name="locationPoint"
          value={formik.values.locationPoint}
          onChange={formik.handleChange}
          placeholder="Начните вводить пункт"
        />
        {pointResults && (
          <ComboboxPopover>
            {pointResults.length > 0 ? (
              <ComboboxList>
                {pointResults.slice(0, 10).map((result, index) => (
                  <ComboboxOption key={index} value={result} />
                ))}
              </ComboboxList>
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                Пункт не найден
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </>
  );
}

const mapStateToProps = (state) => ({
  citiesNames: getCitiesNames(state),
  points: getPoints(state),
});

export default connect(mapStateToProps, { requestCities, requestPoints })(
  Location
);
