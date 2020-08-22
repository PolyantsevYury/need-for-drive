import React from "react";
import "./AdminPage.scss";

const AdminPage = () => {
  return (
    <div className="admin">
      <div className="admin__side-bar"> </div>
      <div className="content-wrapper">
        <div className="admin__header"> </div>
        <div className="admin__content content">
          <h2 className="content__title">Заказы</h2>
          <div className="content__card"> </div>
        </div>
        <div className="admin__footer"> </div>
      </div>
    </div>
  );
};

export default AdminPage;
