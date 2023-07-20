import React from "react";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={
        isOpen ? `popup popup-image popup_opened` : `popup popup-image`
      }
    >
      <div className="popup-image__overlay">
        <button
          className="popup__close popup-image__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup-image__picture" src={card.link} alt={card.name} />
        <h2 className="popup-image__title">{card.name}</h2>
      </div>
    </div>
  );
}
