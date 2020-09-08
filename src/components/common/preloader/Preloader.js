import React from "react";
import preloader from "../../../assets/preloader.svg";
import adminPreloader from "../../../assets/adminPreloader.svg";

export const Preloader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={preloader} alt="" />
    </div>
  );
};

export const AdminPreloader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={adminPreloader} alt="" />
    </div>
  );
};
