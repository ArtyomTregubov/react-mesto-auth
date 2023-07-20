import React from "react";

import image_succes from "../images/succes.svg";
import image_error from "../images/error.svg";

export default function InfoTooltip({ isOpen, isError, onClose }) {
  return (
    <div
      className={
        isOpen
          ? `popup popup-registration popup_opened`
          : `popup popup-registration`
      }
    >
      <div className="popup__overlay">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
        <img
          src={isError ? image_error : image_succes}
          alt={isError ? "Ошибка" : "Успех"}
          className="popup-registration__logo"
        />
        <h2 className="popup__title popup-registration__title">
          {isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </h2>
      </div>
    </div>
  );
}
