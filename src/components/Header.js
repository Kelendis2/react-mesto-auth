import React from "react";
import headerLogo from "../images/logo.svg";
import { useNavigate } from "react-router-dom";

function Header({ userEmail }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  const { email } = userEmail;

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
      <span className="header__user-email">{email}</span>
      <button className="header__button-exit" onClick={signOut}>
        Выйти
      </button>
    </header>
  );
}
export default Header;
