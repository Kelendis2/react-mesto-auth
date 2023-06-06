import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onOpenImage,
  onAddPlace,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__button-avatar"
          type="button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__avatar"
            alt="фото пользователя"
            src={currentUser.avatar}
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="element">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onOpenImage={onOpenImage}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
