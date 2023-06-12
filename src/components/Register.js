import React from "react";
import headerLogo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";


function Register({ handleRegister }) {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/sign-in");
  };

  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const { password, email } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ password, email });
  };

  return (
    <>
      <div className="header">
        <img className="header__logo" alt="Логотип" src={headerLogo} />
        <button className="header__button-exit" onClick={goToLogin}>
          Войти
        </button>
      </div>

      <form className="registration" onSubmit={handleSubmit}>
        <h2 className="registration__title">Регистрация</h2>
        <input
          className="registration__input"
          placeholder="Email"
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formValue.email}
        ></input>
        <input
          className="registration__input"
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <button className="registration__submit" type="submit">
          Зарегестрироваться
        </button>
        <button className="registration__link" onClick={goToLogin}>
          Уже зарегистрированны? Войти
        </button>
      </form>
    </>
  );
}

export default Register;
