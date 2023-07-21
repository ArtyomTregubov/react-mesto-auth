import React from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <div
      className={
        isOpen ? `popup popup-${name} popup_opened` : `popup popup-${name}`
      }
    >
      <div className="popup__overlay">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          name="add-form"
          className="popup__main"
          onSubmit={onSubmit}
        >
          <fieldset className="popup__info">{children}</fieldset>
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
