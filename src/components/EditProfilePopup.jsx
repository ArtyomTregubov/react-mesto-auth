import React from "react";

import PopupWithForm from "./PopupWithForm";
import ProfileFormFields from "./ProfileFormFields";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  function onChangeName(value) {
    setName(value);
  }

  function onChangeDescription(value) {
    setDescription(value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
    >
      <ProfileFormFields
        name={name}
        description={description}
        onChangeName={onChangeName}
        onChangeDescription={onChangeDescription}
      />
    </PopupWithForm>
  );
}
