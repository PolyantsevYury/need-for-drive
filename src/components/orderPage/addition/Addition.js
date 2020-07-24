import React from "react";
import "./Addition.scss";
import { InputCheckbox, InputRadio, InputText } from "../../common/forms/Forms";

const Addition = () => {
  return (
    <section className="addition">
      <div className="addition__option">
        <h4 className="addition__title">Цвет</h4>
        <InputRadio
          name="color"
          items={[
            { label: "Любой", value: "any", defaultChecked: true },
            { label: "Красный", value: "red" },
            { label: "Голубой", value: "blue" },
          ]}
        />
      </div>

      <div className="addition__option">
        <h4 className="addition__title">Дата аренды</h4>
        <InputText
          name="date"
          items={[
            { label: "С", placeholder: "Введите дату и время" },
            { label: "По", placeholder: "Введите дату и время" },
          ]}
        />
      </div>

      <div className="addition__option">
        <h4 className="addition__title">Тариф</h4>
        <InputRadio
          name="plan"
          direction="column"
          items={[
            { label: "Поминутно, 7₽/мин", value: "minute" },
            {
              label: "На сутки, 1999 ₽/сутки",
              value: "day",
              defaultChecked: true,
            },
          ]}
        />
      </div>

      <div className="addition__option">
        <h4 className="addition__title">Доп услуги</h4>
        <InputCheckbox
          name="extra-options"
          direction="column"
          items={[
            { label: "Полный бак, 500р", value: "fuel" },
            { label: "Детское кресло, 200р", value: "chair" },
            { label: "Правый руль, 1600р", value: "wheel" },
          ]}
        />
      </div>
    </section>
  );
};

export default Addition;
