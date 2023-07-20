import React from "react";

import PopupWithForm from "./PopupWithForm";
import CardPopup from "./CardPopup";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardNameRef = React.useRef("");
  const cardLinkRef = React.useRef("");

  React.useEffect(() => {
    cardNameRef.current.value = "";
    cardLinkRef.current.value = "";
  });

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={"card"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <CardPopup cardNameRef={cardNameRef} cardLinkRef={cardLinkRef} />
    </PopupWithForm>
  );
}
