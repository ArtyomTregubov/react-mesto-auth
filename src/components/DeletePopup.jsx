import React from "react";

export default function DeletePopup() {
  return (
    <div className="popup popup-delete">
      <div className="popup__overlay">
        <button className="popup__close" type="button"></button>
        <h2 className="popup__title">Вы уверены?</h2>
        <form action="#" name="add-form" className="popup__main" noValidate>
          <fieldset className="popup__info">
            <button
              className="popup__save-button popup__delete-button"
              type="submit"
            >
              Да
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
