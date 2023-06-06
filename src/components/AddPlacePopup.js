import React, { useState,useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (isOpen) {
      setValues({});
    }
  }, [isOpen]);

  function handleChange(evt) {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="content"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_title"
          type="text"
          name="name"
          placeholder="Название"
          id="name"
          minLength="2"
          maxLength="30"
          required
          value={values.name ?? ""}
          onChange={handleChange}
        />
        <span className="form__input-error" id="name-error">
          {" "}
        </span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_link"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          id="link"
          required
          value={values.link ?? ""}
          onChange={handleChange}
        />
        <span className="form__input-error" id="link-error">
          {" "}
        </span>
      </label>
    </PopupWithForm>
  );
}
