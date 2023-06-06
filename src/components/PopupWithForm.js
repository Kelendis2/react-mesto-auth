import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  const popupClass = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;
  return (
    <div className={popupClass}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          className={`popup__close-button popup__close-button_place_${name}`}
          onClick={onClose}
          type="button"
        ></button>
        <form
          className={`form form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="form__title">{title}</h2>
          {children}
          <button
            className="form__button-save"
            type="submit"
            value={buttonText}
          >
            {" "}
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
