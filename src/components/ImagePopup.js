import React from "react";
function ImagePopup(props) {
  const classPopup = `popup popup_type_photo ${
    props.card._id ? "popup_opened" : ""
  }`;
  return (
    <div className={classPopup}>
      <div className="popup__container popup__container_type_photo">
        <button
          className="popup__close-button popup__close-button_place_photo"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__photo-zoom"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <p className="popup__copyright"> {props.card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
