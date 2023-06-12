import React from "react";
import headerLogo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const goToRegistration = () => {
    navigate("/sign-up");
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

  const { email, password } = formValue;

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      setErrorMessage("Both fields are required");
      return;
    }
    handleLogin({ email, password });
  };

  return (
    <>
      <div className="header">
        <img className="header__logo" alt="Логотип" src={headerLogo} />
        <button
          className="header__button-registration"
          onClick={goToRegistration}
        >
          Регистрация
        </button>
      </div>
      <form className="registration" onSubmit={handleSubmit}>
        <h2 className="registration__title">Вход</h2>
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
          required
          name="password"
          type="password"
          autoComplete="current-password"
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <p className="registration__error"> {errorMessage} </p>
        <button className="registration__submit" type="submit">
          Войти
        </button>
      </form>
    </>
  );
}

export default Login;
