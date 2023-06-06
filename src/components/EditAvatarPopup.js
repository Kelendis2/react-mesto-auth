import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const [isValidity, setIsValidity] = useState(true);
  const inputRef = useRef(0);

  useEffect(() => {
    isOpen && (inputRef.current.value = "");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  function handleChange() {
    setIsValidity(inputRef.current.checkValidity());
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Изменить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className={`form__input form__input_type_avatar" ${!isValidity}`}
          type="url"
          placeholder="Ссылка на картинку"
          name="avatar"
          id="avatar"
          required
          ref={inputRef}
          onChange={(evt) => handleChange(evt.target.value)}
        />
        <span className="form__input-error" id="avatar-error">
          {" "}
        </span>
      </label>
    </PopupWithForm>
  );
}
