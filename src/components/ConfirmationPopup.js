import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({ isOpen, onClose }) {
  return (
    <PopupWithForm
      name="trash"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}
