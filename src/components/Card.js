import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onOpenImage, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_activ"
  }`;

  function handleClick() {
    onOpenImage(card);
  }
  function hendleLikeCard() {
    onCardLike(card);
  }
  function hendleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <li className="element__item">
      <img
        className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="element__trash"
          type="button"
          onClick={hendleDeleteCard}
        />
      )}
      <div className="element__photo-info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            id="likes"
            name="likes"
            onClick={hendleLikeCard}
          ></button>
          <span className="element__like-quantity">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
