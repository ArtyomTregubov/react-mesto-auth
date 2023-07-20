import React from "react";

export default function ProfileFormFields({
  name,
  description,
  onChangeName,
  onChangeDescription,
}) {
  function handleChangeName(e) {
    onChangeName(e.target.value);
  }
  function handleChangeDescription(e) {
    onChangeDescription(e.target.value);
  }
  return (
    <>
      <input
        type="text"
        name="name"
        className="popup__input popup__input_form_name"
        placeholder="Жак-Ив Кусто"
        required
        minLength="2"
        maxLength="40"
        id="name"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__input-error" id="name-error"></span>
      <input
        type="text"
        name="about"
        className="popup__input popup__input_form_description"
        placeholder="Исследователь океана"
        required
        minLength="2"
        maxLength="200"
        id="description"
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error" id="description-error"></span>
    </>
  );
}
