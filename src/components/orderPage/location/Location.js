import React, { useEffect } from "react";
import "./Location.scss";
import { connect } from "react-redux";
import Map from "../../../assets/images/map.jpg";
import { InputText } from "../../common/forms/Forms";
import { requestCities } from "../../../store/order-reducer";

const Location = ({ formik, cities, requestCities }) => {
  const addresses = {
    Ulyanovsk: ["Орлова 27", "Нариманова 42"],
    Moscow: ["Орлова 20", "Нариманова 422"],
    Magadan: ["Орлова 21", "Нариманова 2"],
    Sochi: ["Орлова 0", "Нариманова 4"],
  };
  const getCurrentCityAddresses = () => {
    switch (formik.values.locationCity) {
      case "Ульяновск":
        return addresses.Ulyanovsk;
      case "Москва":
        return addresses.Moscow;
      case "Магадан":
        return addresses.Magadan;
      case "Сочи":
        return addresses.Sochi;
      default:
        return false;
    }
  };
  useEffect(() => {
    requestCities();
  }, [requestCities]);

  return (
    <section className="location">
      <div className="location__form">
        <InputText
          items={[
            {
              name: "locationCity",
              label: "Город",
              placeholder: "Начните вводить город",
              value: formik.values.locationCity,
              options: ["Ульяновск", "Москва", "Магадан", "Сочи"],
            },
            {
              name: "locationPlace",
              label: "Пункт выдачи",
              placeholder: "Начните вводить пункт",
              value: formik.values.locationPlace,
              options: getCurrentCityAddresses(),
            },
          ]}
          onChange={formik.handleChange}
        />
      </div>
      <p>Выбрать на карте:</p>
      <img className="location__map" src={Map} alt="" />
    </section>
  );
};

const mapStateToProps = (state) => ({
  cities: state.orderPage.cities,
});

export default connect(mapStateToProps, { requestCities })(Location);
