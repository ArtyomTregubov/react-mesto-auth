import React from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar } = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="pen-overlay" onClick={onEditAvatar}>
          <div className="pen"></div>
          <img alt="аватар" className="profile__avatar" src={avatar} />
        </div>

        <div className="profile__info">
          <h1 className="profile__info-name">{name}</h1>
          <p className="profile__info-description">{about}</p>
          <button
            className="profile__info-button-edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
