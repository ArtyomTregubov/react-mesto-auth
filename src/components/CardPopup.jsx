import React from "react";

export default function CardPopup({ cardNameRef, cardLinkRef }) {
  return (
    <>
      <input
        type="text"
        name="name"
        className="popup__input popup__input_form_name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="image-name"
        ref={cardNameRef}
      />
      <span className="popup__input-error" id="image-name-error"></span>
      <input
        type="url"
        name="about"
        className="popup__input popup__input_form_description"
        placeholder="Ссылка на картинку"
        required
        id="link"
        ref={cardLinkRef}
      />
      <span className="popup__input-error" id="link-error"></span>
    </>
  );
}
